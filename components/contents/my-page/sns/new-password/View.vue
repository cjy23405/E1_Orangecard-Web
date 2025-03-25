<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { plainToClass } from "class-transformer";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// api
const apiMyProfile = useApiMyProfile();
const apiMyNewPassword = useApiMyNewPassword(uid);

// api ssr
await apiMyProfile.suspense();

// route
const localePath = useLocalePath();
const router = useRouter();

// state
const loginId = computed(() => {
  return apiMyProfile.data.value?.data?.loginId || "";
});

// form
class NewPasswordForm {
  password: string = "";
  passwordCheck: string = "";
}
const labels: {
  [key: string]: string;
} = {
  password: "비밀번호",
  passwordCheck: "비밀번호 확인",
};
const form = useTemplateRef("form");
const formRaw = useTemplateRef("formRaw");
const initialValues = plainToClass(NewPasswordForm, {});
const formSchema = toTypedSchema(
  z.object({
    password: z.string().superRefine((val, ctx) => {
      const check = usePasswordCheck(val, loginId.value);

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.004", [labels.password]),
        });
      } else if (check) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: check,
        });
      }
    }),

    passwordCheck: z.string().superRefine((val, ctx) => {
      const formValues = form.value?.getValues() as NewPasswordForm;

      if (!formValues) return;

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.003", [labels.passwordCheck]),
        });
      } else if (val !== formValues.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.014"),
        });
      }
    }),
  }),
);

// 비밀번호 생성
const reset = useDebounceFn(() => {
  const values = form.value?.values as NewPasswordForm;

  if (!values) return;

  apiMyNewPassword.mutate(
    {
      password: useSha256(values.password),
    },
    {
      onSuccess: () => {
        alertOpen({
          message: useT("alertMessage.016"),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
                router.replace(localePath("/my-page/sns"));
              },
            },
          ],
        });
      },
      onError: (err) => {
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
    if (!apiMyNewPassword.isPending.value) {
      reset();
    }
  } else if (validate?.errors) {
    const el = useGetValidateErrorEl(Object.keys(validate.errors));
    $elFocus(el);
  }
};

// 생성 완료 클릭
const submitClick = () => {
  formRaw.value?.dispatchEvent(new Event("submit", { cancelable: true }));
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// 간편 로그인 설정 에서 온건지 체크
const fromSns = useCheckBackPath("/my-page/sns");

// life cycle
onMounted(() => {
  // 정상 접근 아니면 return
  if (!fromSns) {
    router.replace(localePath("/my-page/sns"));
  }
});
</script>

<template>
  <div>
    <Form
      ref="form"
      as=""
      :validation-schema="formSchema"
      :initial-values="initialValues"
    >
      <form ref="formRaw" @submit.prevent="submit">
        <div
          class="border-top border-bottom inner mt-[2.8rem] flex min-h-[60vh] flex-col justify-center px-8 md:mt-24 md:px-16"
        >
          <div class="md:mx-auto md:w-[60rem]">
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormValidation
                  for="password"
                  :label="labels.password"
                  :title-top="true"
                  class="mb-8"
                  required
                  success-message="사용할 수 있는 비밀번호입니다."
                >
                  <FormControl>
                    <FormBasicInput
                      id="password"
                      type="password"
                      required
                      placeholder="영문대소문자,숫자,특수문자 포함 10~16자리"
                      v-bind="componentField"
                      @keypress.enter="submitClick"
                    />
                  </FormControl>
                </FormValidation>
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="passwordCheck">
              <FormItem>
                <FormValidation
                  for="passwordCheck"
                  :label="labels.passwordCheck"
                  :title-top="true"
                  required
                  success-message="비밀번호가 일치합니다."
                >
                  <FormControl>
                    <FormBasicInput
                      id="passwordCheck"
                      type="password"
                      required
                      placeholder="비밀번호를 다시 입력해주세요."
                      v-bind="componentField"
                      @keypress.enter="submitClick"
                    />
                  </FormControl>
                </FormValidation>
              </FormItem>
            </FormField>
          </div>

          <div class="btn-wrap mb-28 mt-16 md:my-24">
            <a
              role="button"
              tabindex="0"
              class="btn-txt primary"
              :aria-disabled="apiMyNewPassword.isPending.value"
              @click="submitClick"
              @keypress.enter.space="submitClick"
            >
              생성 완료
            </a>
          </div>
        </div>
      </form>
    </Form>

    <CommonAlert ref="alertLayer" />
  </div>
</template>

<style lang="css" scoped>
@media (min-width: 768px) {
  .btn-wrap {
    width: 60rem;
    margin-left: auto;
    margin-right: auto;
  }
  .btn-wrap .btn-txt {
    max-width: 100%;
  }
}
</style>
