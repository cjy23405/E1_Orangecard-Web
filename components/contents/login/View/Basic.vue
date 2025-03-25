<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { plainToClass } from "class-transformer";
import type { LoginSetup } from "@/types/api";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// props
const props = defineProps<{
  callback?: LoginSetup["callback"];
}>();

// 스토어
const stores = {
  auth: useStoreAuth(),
};

// api
const apiFailCount = useApiAuthLoginFailCount(uid);
const { isPending, mutate } = useApiAuthLogin(uid);

// state
const saveId = ref(false);
const useCaptcha = ref(false);
const captchaVal = ref("");
const captchaCheck = ref(false);
const failCount = ref(0);

// ref
const captcha = useTemplateRef("captcha");

// form
class LoginForm {
  loginId: string = "";
  password: string = "";
  captcha: string = "";
}
const labels: {
  [key: string]: string;
} = {
  loginId: "아이디",
  password: "비밀번호",
  captcha: "보안문자",
};
const form = useTemplateRef("form");
const formRaw = useTemplateRef("formRaw");
const initialValues = plainToClass(LoginForm, {});
const formSchema = toTypedSchema(
  z.object({
    loginId: z.string().refine((v) => v, {
      message: useT("formMessage.004", [labels.loginId]),
    }),
    password: z.string().refine((v) => v, {
      message: useT("formMessage.004", [labels.password]),
    }),
    captcha: z.string().superRefine((val, ctx) => {
      if (!useCaptcha.value) return;

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.004", [labels.captcha]),
        });
      }
    }),
  }),
);

// 실패 횟수 조회
const checkFailCount = async () => {
  const values = form.value?.values as LoginForm;

  if (!values) {
    failCount.value = 0;
    return 0;
  } else {
    await apiFailCount
      .mutateAsync({
        loginId: values.loginId,
      })
      .catch(() => {
        if (apiFailCount.error.value) {
          alertOpen({
            message: useApiGetErrorMessage(apiFailCount.error.value.data),
          });
        }
      });

    if (apiFailCount.data.value?.data) {
      failCount.value = apiFailCount.data.value.data.failCnt;
      return apiFailCount.data.value.data.failCnt;
    } else {
      failCount.value = 0;
      return 0;
    }
  }
};

// 로그인
const login = useDebounceFn(() => {
  const values = form.value?.values as LoginForm;

  if (!values) return;

  mutate(
    {
      loginId: values.loginId,
      password: useSha256(values.password),
    },
    {
      onSuccess: (data) => {
        if (!data.data) return;

        if (saveId.value) {
          stores.auth.$setId(values.loginId);
        } else {
          stores.auth.$setId("");
        }

        useApiAuthLoginSetup({
          type: "PASSWORD",
          data: data.data,
          callback: props.callback,
        });
      },
      onError: (err) => {
        if (err.data.header?.code === "B0138") {
          if (useCaptcha.value) {
            captcha.value?.captchaRefresh();
          }

          if (failCount.value >= 4 && !useCaptcha.value) {
            useCaptcha.value = true;
          }
        }

        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      },
    },
  );
}, 300);

// submit
const submit = async () => {
  const validate = await form.value?.validate();

  if (validate?.valid) {
    const failCount = await checkFailCount();

    if (failCount >= 5 && !useCaptcha.value) {
      useCaptcha.value = true;
    } else if (useCaptcha.value && !captchaCheck.value) {
      alertOpen({
        message: useT("alertMessage.031"),
      });
    } else if (
      (!useCaptcha.value || (useCaptcha.value && captchaCheck.value)) &&
      !isPending.value
    ) {
      login();
    }
  } else if (validate?.errors) {
    const el = useGetValidateErrorEl(Object.keys(validate.errors));
    $elFocus(el);
  }
};

// 로그인 클릭
const loginClick = () => {
  formRaw.value?.dispatchEvent(new Event("submit", { cancelable: true }));
};

// 캡차 update
const captchaUpdate = () => {
  form.value?.setFieldValue("captcha", captchaVal.value);
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// life cycle
onMounted(() => {
  // 아이디 저장 기록 있으면 불러오기
  if (stores.auth.id.length) {
    form.value?.setFieldValue("loginId", stores.auth.id);
    saveId.value = true;
  }
});
</script>

<template>
  <Form
    ref="form"
    as=""
    :validation-schema="formSchema"
    :initial-values="initialValues"
  >
    <form ref="formRaw" @submit.prevent="submit">
      <FormField v-slot="{ componentField }" name="loginId">
        <FormItem>
          <FormValidation>
            <FormControl>
              <FormBasicInput
                id="loginId"
                type="text"
                :title="labels.loginId"
                placeholder="아이디를 입력해주세요."
                required
                v-bind="componentField"
                @keypress.enter="loginClick"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormValidation class="md:mt-8">
            <FormControl>
              <FormBasicInput
                id="password"
                type="password"
                :title="labels.password"
                placeholder="비밀번호를 입력하세요."
                required
                v-bind="componentField"
                @keypress.enter="loginClick"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <div class="ipt-line mt-[1.6rem] md:mt-8">
        <div class="ipt-item">
          <Checkbox
            id="saveId"
            v-model:checked="saveId"
            class="ipt-check"
          ></Checkbox>
          <label for="saveId">아이디 저장</label>
        </div>
      </div>

      <FormCaptcha
        v-if="useCaptcha"
        ref="captcha"
        v-model="captchaVal"
        v-model:check="captchaCheck"
        @update:model-value="captchaUpdate"
      />

      <div class="btn-wrap my-8 md:mb-[2.8rem] md:mt-16">
        <a
          role="button"
          tabindex="0"
          class="btn-txt primary md:!max-w-full"
          :aria-disabled="isPending"
          @click="loginClick"
          @keypress.enter.space="loginClick"
        >
          로그인
        </a>
      </div>
    </form>

    <CommonAlert ref="alertLayer" />
  </Form>
</template>

<style lang="css" scoped>
@media (min-width: 768px) {
  .ipt-wrap + .ipt-wrap {
    margin-top: 2rem;
  }
}
.btn-refresh {
  background-image: url("@/assets/img/login/btn-refresh.png");
}
</style>
