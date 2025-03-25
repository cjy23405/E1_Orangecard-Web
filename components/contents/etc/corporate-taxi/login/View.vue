<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { plainToClass } from "class-transformer";
import type { AlertOptions } from "@/types/components/common/Alert";

// 스토어
const stores = {
  auth: useStoreAuth(),
};

// route
const localePath = useLocalePath();
const router = useRouter();

// api
const { isPending, mutate } = useApiAuthCorpTaxiLogin();

// state
const card = ref<[string, string, string, string]>(["", "", "", ""]);
const saveCardNumber = ref(false);
const captchaVal = ref("");
const captchaCheck = ref(false);

// computed
const isCorpTaxiAuthenticated = computed(() => {
  return stores.auth.isCorpTaxiAuthenticated;
});

// check login
const checkLogin = () => {
  if (isCorpTaxiAuthenticated.value) {
    router.replace(localePath("/etc/corporate-taxi/point"));
  }
};

// form
class LoginForm {
  cardNum: string = "";
  cardPw: string = "";
  captcha: string = "";
}
const labels: {
  [key: string]: string;
} = {
  cardNum: "카드번호",
  cardPw: "카드비밀번호",
  captcha: "보안문자",
};
const form = useTemplateRef("form");
const formRaw = useTemplateRef("formRaw");
const initialValues = plainToClass(LoginForm, {});
const formSchema = toTypedSchema(
  z.object({
    cardNum: z.string().refine((v) => v, {
      message: useT("formMessage.004", [labels.cardNum]),
    }),
    cardPw: z.string().refine((v) => v, {
      message: useT("formMessage.004", [labels.cardPw]),
    }),
    captcha: z.string().refine((v) => v, {
      message: useT("formMessage.004", [labels.captcha]),
    }),
  }),
);

// 로그인
const login = useDebounceFn(() => {
  const values = form.value?.values as LoginForm;

  if (!values) return;

  mutate(
    {
      cardNum: values.cardNum,
      cardPw: useSha256(values.cardPw, "card"),
    },
    {
      onSuccess: (data) => {
        if (!data.data) return;

        if (saveCardNumber.value) {
          stores.auth.$setCorpTaxiId(card.value);
        } else {
          stores.auth.$setCorpTaxiId(null);
        }

        useApiAuthCorpTaxLoginSetup(data.data);
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
    if (!captchaCheck.value) {
      alertOpen({
        message: useT("alertMessage.031"),
      });
    } else if (!isPending.value) {
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

// 카드번호 update
const cardUpdate = () => {
  form.value?.setFieldValue("cardNum", card.value.join(""));
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// watch
watch(isCorpTaxiAuthenticated, () => {
  checkLogin();
});

// life cycle
onBeforeMount(() => {
  checkLogin();
});
onMounted(() => {
  // 카드번호 저장 기록 있으면 불러오기
  if (stores.auth.corpTaxiId) {
    card.value = stores.auth.corpTaxiId;
    saveCardNumber.value = true;
    cardUpdate();
  }
});
</script>

<template>
  <div
    class="inner border-top border-bottom mt-[2.8rem] !py-16 md:mt-24 md:!py-24"
  >
    <Form
      ref="form"
      as=""
      :validation-schema="formSchema"
      :initial-values="initialValues"
    >
      <form ref="formRaw" @submit.prevent="submit">
        <div class="md:px-[29rem]">
          <FormCaptcha
            v-model="captchaVal"
            v-model:check="captchaCheck"
            @update:model-value="captchaUpdate"
          />

          <FormField name="cardNum">
            <FormItem>
              <FormValidation
                for="cardNum"
                :label="labels.cardNum"
                :title-top="true"
                class="mt-[2.8rem] md:mt-[3.2rem]"
              >
                <FormControl>
                  <FormCardInput
                    :id="['cardNum', 'cardNum2', 'cardNum3', 'cardNum4']"
                    v-model="card"
                    @update:model-value="cardUpdate"
                  />
                </FormControl>
              </FormValidation>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="cardPw">
            <FormItem>
              <FormValidation
                for="cardPw"
                :label="labels.cardPw"
                :title-top="true"
              >
                <FormControl>
                  <FormBasicInput
                    id="cardPw"
                    type="password"
                    required
                    placeholder="숫자 4자리를 입력해주세요."
                    maxlength="4"
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
                id="saveCardNumber"
                v-model:checked="saveCardNumber"
                class="ipt-check"
              ></Checkbox>
              <label for="saveCardNumber">카드번호 기억하기</label>
            </div>
          </div>

          <div class="btn-wrap pt-8 md:pt-16">
            <a
              role="button"
              tabindex="0"
              class="btn-txt primary md:w-full md:!max-w-full"
              :aria-disabled="isPending"
              @click="loginClick"
              @keypress.enter.space="loginClick"
            >
              로그인
            </a>
          </div>
        </div>
      </form>
    </Form>

    <CommonAlert ref="alertLayer" />
  </div>
</template>

<style lang="css" scoped>
.no-border * {
  border: none;
}
.ipt-wrap + .ipt-wrap {
  margin-top: 2.8rem;
}
@media (min-width: 768px) {
  .ipt-wrap + .ipt-wrap {
    margin-top: 3.2rem;
  }
}
.btn-refresh {
  background-image: url("@/assets/img/login/btn-refresh.png");
}
</style>
