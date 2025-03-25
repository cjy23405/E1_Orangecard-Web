<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { plainToClass } from "class-transformer";

// 스토어
const stores = {
  session: useStoreSession(),
};

// state
const phone = ref("");
const phoneCheck = ref(null);

// computed
const session = computed(() => {
  return stores.session.signUp?.type === "KAKAO" ? stores.session.signUp : null;
});

// 휴대폰 번호 update
const phoneUpdate = () => {
  form.value?.setFieldValue("phone", phone.value);
};
const phoneCheckUpdate = () => {
  form.value?.setFieldValue("phoneCheck", phoneCheck.value);
};

// form
class VerifyPhoneForm {
  phone: string = "";
  phoneCheck: boolean = false;
}
const labels: {
  [key: string]: string;
} = {
  phone: "휴대폰번호",
};
const form = useTemplateRef("form");
const formRaw = useTemplateRef("formRaw");
const initialValues = plainToClass(VerifyPhoneForm, {});
const formSchema = toTypedSchema(
  z.object({
    phone: z.string().superRefine((val, ctx) => {
      const formValues = form.value?.getValues() as VerifyPhoneForm;
      const reg = usePhoneReg();

      if (!formValues) return;

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.004", [labels.phone]),
        });
      } else if (!reg.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.032", [labels.phone]),
        });
      } else if (!formValues.phoneCheck) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.017", [labels.phone]),
        });
      }
    }),
  }),
);

// 회원가입
const signUp = useDebounceFn(() => {
  const values = form.value?.values as VerifyPhoneForm;

  if (!session.value || !values) return;

  raw.value?.kakaoSignUp({
    data: session.value.data,
    fromLogin: session.value.fromLogin,
    fromEnterId: session.value.fromEnterId,
    fromVerifyPhone: true,
    id: session.value.enterId,
    phone: values.phone,
  });
}, 300);

// submit
const submit = async () => {
  const validate = await form.value?.validate();

  if (validate?.valid) {
    signUp();
  } else if (validate?.errors) {
    const el = useGetValidateErrorEl(Object.keys(validate.errors));
    $elFocus(el);
  }
};

// 가입 완료하기 클릭
const submitClick = () => {
  formRaw.value?.dispatchEvent(new Event("submit", { cancelable: true }));
};

// ref
const raw = useTemplateRef("raw");
</script>

<template>
  <CommonBeforeunload />

  <ContentsSignUpVerificationKakaoRaw ref="raw" />

  <ContentsSignUpCheckSession
    type="KAKAO"
    :check-path="`(${useEtcRoute('/sign-up')}|${useEtcRoute('/login')}|${useEtcRoute('/sign-up/kakao-enter-id')}|/m/join/kakao/permalink?.+|/etc/kakao-permalink?.+)`"
    :denied-path="
      session?.fromLogin ? useEtcRoute('/login') : useEtcRoute('/sign-up')
    "
  >
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
            <div class="fs-16 text-center">
              <p>휴대폰 인증을 진행해주세요.</p>
            </div>

            <div class="mt-16 md:mx-auto md:mt-24 md:w-[60rem]">
              <FormField name="phone">
                <FormItem>
                  <FormValidation>
                    <FormControl>
                      <FormPhone
                        v-model="phone"
                        v-model:check="phoneCheck"
                        @update:model-value="phoneUpdate"
                        @update:check="phoneCheckUpdate"
                      />
                    </FormControl>
                  </FormValidation>
                </FormItem>
              </FormField>
            </div>

            <div class="btn-wrap mt-8 md:my-24">
              <a
                role="button"
                tabindex="0"
                class="btn-txt primary"
                @click="submitClick"
                @keypress.enter.space="submitClick"
              >
                가입 완료하기
              </a>
            </div>
          </div>
        </form>
      </Form>
    </div>
  </ContentsSignUpCheckSession>
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
