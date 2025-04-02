<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { plainToClass } from "class-transformer";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// api
const { isPending, mutate } = useApiMyChangePassword(uid);
const apiSkip = useApiMyPasswordChangeSkip(uid);
const apiMyProfile = useApiMyProfile();

// api ssr
await apiMyProfile.suspense();

// route
const router = useRouter();
const route = useRoute();
const { returnurl } = route.query;

// 스토어
const stores = {
  auth: useStoreAuth(),
};

// session
const etcInflow = useSessionStorage<string | null>("etcInflow", null);

// computed
const myID = computed(() => {
  return apiMyProfile.data.value?.data?.loginId;
});
const disabled = computed(() => {
  return isPending.value || apiSkip.isPending.value;
});

// form
class ChangePasswordForm {
  password: string = "";
  passwordNew: string = "";
  passwordNewCheck: string = "";
}
const labels: {
  [key: string]: string;
} = {
  password: "현재 비밀번호",
  passwordNew: "신규 비밀번호",
  passwordNewCheck: "신규 비밀번호 확인",
};
const form = useTemplateRef("form");
const formRaw = useTemplateRef("formRaw");
const initialValues = plainToClass(ChangePasswordForm, {});
const formSchema = toTypedSchema(
  z.object({
    password: z.string().superRefine((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.004", [labels.password]),
        });
      }
    }),

    passwordNew: z.string().superRefine((val, ctx) => {
      const check = usePasswordCheck(val, myID.value || "");

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.004", [labels.passwordNew]),
        });
      } else if (check) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: check,
        });
      }
    }),

    passwordNewCheck: z.string().superRefine((val, ctx) => {
      const formValues = form.value?.getValues() as ChangePasswordForm;

      if (!formValues) return;

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.003", [labels.passwordNewCheck]),
        });
      } else if (val !== formValues.passwordNew) {
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
  const values = form.value?.values as ChangePasswordForm;

  if (!values) return;

  mutate(
    {
      password: useSha256(values.password),
      passwordNew: useSha256(values.passwordNew),
    },
    {
      onSuccess: () => {
        alertOpen({
          message: useT("alertMessage.025"),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
                if (stores.auth.loginInfo) {
                  stores.auth.$setLoginInfo({
                    ...stores.auth.loginInfo,
                    pwdChangeReq: false,
                  });
                }
                callback();
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
    if (!disabled.value) {
      reset();
    }
  } else if (validate?.errors) {
    const el = useGetValidateErrorEl(Object.keys(validate.errors));
    $elFocus(el);
  }
};

// 다음에 변경
const skip = useDebounceFn(() => {
  apiSkip.mutate(
    {},
    {
      onSuccess: () => {
        callback();
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
                callback();
              },
            },
          ],
        });
      },
    },
  );
}, 300);

// 비밀번호 변경 클릭
const submitClick = () => {
  formRaw.value?.dispatchEvent(new Event("submit", { cancelable: true }));
};

// 다음에 변경 클릭
const skipClick = () => {
  if (!disabled.value) {
    skip();
  }
};

// callback
const callback = () => {
  if (etcInflow.value) {
    router.replace(etcInflow.value);
  } else {
    if (typeof returnurl === "string") {
      router.replace(returnurl);
    } else {
      $replaceHome();
    }
  }
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};
</script>

<template>
  <ContentsLoginChangePwCheckChangePw denied-path="/">
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
            <div class="fs-16 pb-8 pt-16 text-center md:py-24">
              <p>
                비밀번호를 다시 한 번 점검해 주세요.<br />
                고객님의 소중한 개인정보 보호를 위해
                <span class="inline-block"
                  >주기적인 비밀번호 변경을 권장합니다.</span
                >
              </p>
            </div>

            <div class="md:mx-auto md:w-[60rem]">
              <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                  <FormValidation
                    for="password"
                    :label="labels.password"
                    :title-top="true"
                    required
                  >
                    <FormControl>
                      <FormBasicInput
                        id="password"
                        type="password"
                        required
                        placeholder="현재 비밀번호를 입력해주세요."
                        v-bind="componentField"
                        @keypress.enter="submitClick"
                      />
                    </FormControl>
                  </FormValidation>
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="passwordNew">
                <FormItem>
                  <FormValidation
                    for="passwordNew"
                    :label="labels.passwordNew"
                    :title-top="true"
                    required
                    success-message="사용할 수 있는 비밀번호입니다."
                  >
                    <FormControl>
                      <FormBasicInput
                        id="passwordNew"
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

              <FormField v-slot="{ componentField }" name="passwordNewCheck">
                <FormItem>
                  <FormValidation
                    for="passwordNewCheck"
                    :label="labels.passwordNewCheck"
                    :title-top="true"
                    required
                    success-message="비밀번호가 일치합니다."
                  >
                    <FormControl>
                      <FormBasicInput
                        id="passwordNewCheck"
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

            <div class="gray-box mt-8 md:mx-auto md:mt-24 md:w-[82rem]">
              <ul class="list-dot text-gray-600">
                <li>
                  다음에 변경 클릭시 2주 동안 해당 페이지는 나타나지 않습니다.
                </li>
                <li>
                  아이디와 동일한 비밀번호나 주민등록번호, 전화번호, 생일 등
                  개인정보와 관련된 숫자, 연속된 숫자, 동일 반복된 숫자 등 다른
                  사람이 쉽게 알아 낼 수 있는 비밀번호는 유출의 위험이 많습니다.
                </li>
                <li>
                  쉬운 비밀번호는 자주 쓰는 사이트의 비밀번호가 같으면 도용되기
                  쉬우므로 주기적으로 변경 하시는 것이 좋습니다.
                </li>
              </ul>
            </div>

            <div class="btn-wrap my-16 md:my-24 md:!w-[82rem]">
              <a
                role="button"
                tabindex="0"
                class="btn-txt gray"
                :aria-disabled="disabled"
                @click="skipClick"
                @keypress.enter.space="skipClick"
              >
                다음에 변경
              </a>
              <a
                role="button"
                tabindex="0"
                class="btn-txt primary"
                :aria-disabled="disabled"
                @click="submitClick"
                @keypress.enter.space="submitClick"
              >
                비밀번호 변경
              </a>
            </div>
          </div>
        </form>
      </Form>
    </div>
  </ContentsLoginChangePwCheckChangePw>

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
