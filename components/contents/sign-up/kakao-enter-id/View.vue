<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { plainToClass } from "class-transformer";

// uid
const uid = getCurrentInstance()?.uid;

// 스토어
const stores = {
  session: useStoreSession(),
};

// computed
const session = computed(() => {
  return stores.session.signUp?.type === "KAKAO" ? stores.session.signUp : null;
});

// api
const apiIdCheck = useApiSignUpIdCheck(uid);

// 아이디 중복체크
const idCheck = async (id: string): Promise<boolean | null> => {
  let isCheck: boolean | null = null;

  await apiIdCheck
    .mutateAsync({
      loginId: id,
    })
    .then(() => {
      isCheck = false;
    })
    .catch(() => {
      isCheck = true;
    });

  return isCheck;
};

// form
class EnterIdForm {
  id: string = "";
}
const labels: {
  [key: string]: string;
} = {
  id: "아이디",
};
const form = useTemplateRef("form");
const formRaw = useTemplateRef("formRaw");
const initialValues = plainToClass(EnterIdForm, {});
const formSchema = toTypedSchema(
  z.object({
    id: z.string().superRefine(async (val, ctx) => {
      const reg = useIdReg();

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.004", [labels.id]),
        });
      } else if (!reg.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.009"),
        });
      } else {
        const is = await idCheck(val);

        if (is === null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: useT("formMessage.011"),
          });
        } else if (is) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: useT("formMessage.010"),
          });
        }
      }
    }),
  }),
);

// 해외번호 체크
const phoneCheck = useDebounceFn(() => {
  const values = form.value?.values as EnterIdForm;

  if (!session.value || !values) return;

  raw.value?.kakaoPhoneCheck({
    data: session.value.data,
    fromLogin: session.value.fromLogin,
    fromEnterId: true,
    id: values.id,
  });
}, 300);

// submit
const submit = async () => {
  const validate = await form.value?.validate();

  if (validate?.valid) {
    phoneCheck();
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
    :check-path="`(${useEtcRoute('/sign-up')}|${useEtcRoute('/login')}|/m/join/kakao/permalink?.+|/etc/kakao-permalink?.+)`"
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
              <p>로그인에 사용하실 ID를 입력해주세요.</p>
            </div>

            <div class="mt-16 md:mx-auto md:mt-24 md:w-[60rem]">
              <FormField v-slot="{ componentField }" name="id">
                <FormItem>
                  <FormValidation
                    success-message="사용할 수 있는 아이디입니다."
                  >
                    <FormControl>
                      <FormBasicInput
                        id="id"
                        type="text"
                        required
                        :title="labels.id"
                        placeholder="영문,숫자 조합 6~16자"
                        v-bind="componentField"
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
