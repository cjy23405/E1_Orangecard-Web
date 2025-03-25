<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { plainToClass } from "class-transformer";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// api
const { isPending, mutate } = useApiForgotPw(uid);

// route
const localePath = useLocalePath();
const router = useRouter();

// 아이디 찾기에서 온건지 체크
const fromId = useCheckBackPath(useEtcRoute("/login/forgot-id/done"));

// 스토어
const stores = {
  session: useStoreSession(),
};

// form
class ResetPasswordForm {
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
const initialValues = plainToClass(ResetPasswordForm, {});
const formSchema = toTypedSchema(
  z.object({
    password: z.string().superRefine((val, ctx) => {
      const check = usePasswordCheck(val, stores.session.forgot?.loginId || "");

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
      const formValues = form.value?.getValues() as ResetPasswordForm;

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

// 비밀번호 변경
const reset = useDebounceFn(() => {
  const values = form.value?.values as ResetPasswordForm;

  if (!values || !stores.session.auth) return;

  mutate(
    {
      ciKey: stores.session.auth.data.ciKey,
      password: useSha256(values.password),
    },
    {
      onSuccess: () => {
        alertOpen({
          message: useT("alertMessage.017"),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
                stores.session.$setAuth(null);
                stores.session.$setForgot(null);
                router.replace(localePath(useEtcRoute("/login")));
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
    if (!isPending.value) {
      reset();
    }
  } else if (validate?.errors) {
    const el = useGetValidateErrorEl(Object.keys(validate.errors));
    $elFocus(el);
  }
};

// 비밀번호 변경 클릭
const submitClick = () => {
  formRaw.value?.dispatchEvent(new Event("submit", { cancelable: true }));
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};
</script>

<template>
  <CommonBeforeunload />

  <ContentsLoginCheckForgotSession
    :check-path="`(${useEtcRoute('/login/forgot-pw')}|${useEtcRoute('/login/forgot-id/done')})`"
    :denied-path="
      fromId ? useEtcRoute('/login/forgot-id') : useEtcRoute('/login/forgot-pw')
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
            class="border-top border-bottom inner mt-[2.8rem] px-8 md:mt-24 md:px-16"
          >
            <div
              class="fs-16 mt-28 rounded-lg bg-primary-foreground p-12 text-center md:mx-auto md:mt-24 md:flex md:w-[60rem] md:flex-row md:justify-center md:p-16"
            >
              <p>오렌지카드 온라인 회원 아이디</p>
              <p class="font-bold text-primary md:ml-[.4rem]">
                {{ stores.session.forgot?.loginId }}
              </p>
            </div>

            <div class="mt-8 md:mx-auto md:w-[60rem]">
              <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                  <FormValidation
                    for="password"
                    :label="labels.password"
                    :title-top="true"
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
                :aria-disabled="isPending"
                @click="submitClick"
                @keypress.enter.space="submitClick"
              >
                입력완료
              </a>
            </div>
          </div>
        </form>
      </Form>
    </div>
  </ContentsLoginCheckForgotSession>

  <CommonAlert ref="alertLayer" />
</template>

<style lang="css" scoped>
.ipt-wrap + .ipt-wrap {
  margin-top: 2rem;
}
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
