<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { plainToClass } from "class-transformer";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// api
const { isPending, mutate } = useApiCardResetPassword(uid);
const apiMyProfile = useApiMyProfile();

// api ssr
await apiMyProfile.suspense();

// route
const localePath = useLocalePath();
const router = useRouter();

// 스토어
const stores = {
  session: useStoreSession(),
};

// computed
const myID = computed(() => {
  return apiMyProfile.data.value?.data?.loginId;
});

// form
class ResetCardPasswordForm {
  cardPwNew: string = "";
  cardPwNewCheck: string = "";
}
const labels: {
  [key: string]: string;
} = {
  cardPwNew: "카드비밀번호",
  cardPwNewCheck: "카드비밀번호 확인",
};
const form = useTemplateRef("form");
const formRaw = useTemplateRef("formRaw");
const initialValues = plainToClass(ResetCardPasswordForm, {});
const formSchema = toTypedSchema(
  z.object({
    cardPwNew: z.string().superRefine((val, ctx) => {
      const check = useCardPasswordCheck(val, myID.value || "");

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.004", [labels.cardPwNew]),
        });
      } else if (check) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: check,
        });
      }
    }),

    cardPwNewCheck: z.string().superRefine((val, ctx) => {
      const formValues = form.value?.getValues() as ResetCardPasswordForm;

      if (!formValues) return;

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.003", [labels.cardPwNewCheck]),
        });
      } else if (val !== formValues.cardPwNew) {
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
  const values = form.value?.values as ResetCardPasswordForm;

  if (!values || !stores.session.auth) return;

  mutate(
    {
      changeCd: "2",
      cardPwNew: useSha256(values.cardPwNew, "card"),
    },
    {
      onSuccess: () => {
        alertOpen({
          message: useT("alertMessage.025"),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
                stores.session.$setAuth(null);
                router.replace(localePath("/my-page/card"));
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

  <CommonCheckAuthSession
    check-path="/my-page/card/reset-password"
    denied-path="/my-page/card/reset-password"
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
            <div class="mt-16 md:mx-auto md:w-[60rem]">
              <FormField v-slot="{ componentField }" name="cardPwNew">
                <FormItem>
                  <FormValidation
                    class="mb-8"
                    for="cardPwNew"
                    :label="labels.cardPwNew"
                    :title-top="true"
                    success-message="사용할 수 있는 비밀번호입니다."
                  >
                    <FormControl>
                      <FormBasicInput
                        id="cardPwNew"
                        type="password"
                        required
                        placeholder="숫자 4자리를 입력해주세요."
                        maxlength="4"
                        v-bind="componentField"
                        @keypress.enter="submitClick"
                      />
                    </FormControl>
                  </FormValidation>
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="cardPwNewCheck">
                <FormItem>
                  <FormValidation
                    for="cardPwNewCheck"
                    :label="labels.cardPwNewCheck"
                    :title-top="true"
                    success-message="비밀번호가 일치합니다."
                  >
                    <FormControl>
                      <FormBasicInput
                        id="cardPwNewCheck"
                        type="password"
                        required
                        placeholder="비밀번호를 다시 입력해주세요."
                        maxlength="4"
                        v-bind="componentField"
                        @keypress.enter="submitClick"
                      />
                    </FormControl>
                  </FormValidation>
                </FormItem>
              </FormField>
            </div>

            <div class="btn-wrap mb-[8.3rem] mt-16 md:my-24 md:!w-[82rem]">
              <NuxtLink :to="localePath('/my-page/card')" class="btn-txt gray">
                취소
              </NuxtLink>
              <a
                role="button"
                tabindex="0"
                class="btn-txt primary"
                :aria-disabled="isPending"
                @click="submitClick"
                @keypress.enter.space="submitClick"
              >
                변경 완료
              </a>
            </div>
          </div>
        </form>
      </Form>
    </div>
  </CommonCheckAuthSession>

  <CommonAlert ref="alertLayer" />
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
