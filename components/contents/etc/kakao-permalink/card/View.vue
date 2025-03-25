<script setup lang="ts">
import { useQueryClient } from "@tanstack/vue-query";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { plainToClass } from "class-transformer";
import type { AlertOptions } from "@/types/components/common/Alert";

// 고정 번호
const card1 = "0021";

// uid
const uid = getCurrentInstance()?.uid;

// route
const localePath = useLocalePath();
const router = useRouter();

// api
const queryClient = useQueryClient();
const apiCardList = useApiCardList(`cardList_${uid}`, {
  cardStatCd: "20",
});
const apiCardCheckPassword = useApiCardCheckPassword();
const apiCardAdd = useApiCardAdd(uid);
const apiMyProfile = useApiMyProfile();

// api ssr
await apiCardCheckPassword.suspense();
await apiMyProfile.suspense();

// state
const card = ref<[string, string, string, string]>([card1, "", "", ""]);
const agree = ref("");

// computed
const checkPassword = computed(() => {
  return apiCardCheckPassword.data.value?.data?.pwState || false;
});
const buttonDisabled = computed(() => {
  return (
    apiCardCheckPassword.isPending.value ||
    apiCardList.isPending.value ||
    apiCardAdd.isPending.value
  );
});
const myID = computed(() => {
  return apiMyProfile.data.value?.data?.loginId;
});

// form
class CardAddForm {
  cardNum: string = card1;
  cardPw: string = "";
  cardPwCheck: string = "";
}
const labels: {
  [key: string]: string;
} = {
  cardNum: "카드번호",
  cardPw: "카드비밀번호",
  cardPwCheck: "카드비밀번호 확인",
};
const form = useTemplateRef("form");
const formRaw = useTemplateRef("formRaw");
const initialValues = plainToClass(CardAddForm, {});
const formSchema = toTypedSchema(
  z.object({
    cardNum: z.string().superRefine((val, ctx) => {
      const formValues = form.value?.getValues() as CardAddForm;
      const reg = useCardReg();

      if (!formValues) return;

      if (!val || val.length < 16) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.004", [labels.cardNum]),
        });
      } else if (!reg.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.020"),
        });
      }
    }),

    cardPw: z.string().superRefine((val, ctx) => {
      if (checkPassword.value) return;

      const check = useCardPasswordCheck(val, myID.value || "");

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.004", [labels.cardPw]),
        });
      } else if (check) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: check,
        });
      }
    }),

    cardPwCheck: z.string().superRefine((val, ctx) => {
      if (checkPassword.value) return;

      const formValues = form.value?.getValues() as CardAddForm;

      if (!formValues) return;

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.003", [labels.cardPwCheck]),
        });
      } else if (val !== formValues.cardPw) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.014"),
        });
      }
    }),
  }),
);

// 카드 목록 조회
const checkCardLength = async () => {
  queryClient.resetQueries({ queryKey: ["cardList", `cardList_${uid}`] });
  await apiCardList.refetch();

  if (
    apiCardList.isSuccess.value &&
    apiCardList.data.value &&
    apiCardList.data.value.data &&
    apiCardList.data.value.data.length >= 5
  ) {
    alertOpen({
      message: useT("alertMessage.023"),
    });

    return false;
  } else if (apiCardList.isError.value && apiCardList.error.value) {
    alertOpen({
      message: useApiGetErrorMessage(apiCardList.error.value.data),
    });

    return false;
  }

  return true;
};

// 카드 등록
const addCard = async () => {
  const values = form.value?.values as CardAddForm;

  if (!values) return false;

  await apiCardAdd
    .mutateAsync({
      cardType: "10",
      cardNum: values.cardNum,
      cardPw: checkPassword.value
        ? undefined
        : useSha256(values.cardPw, "card"),
      registChannel: "21",
      partnerCorporation: "",
    })
    .catch(() => {
      if (apiCardAdd.error.value) {
        alertOpen({
          message: useApiGetErrorMessage(apiCardAdd.error.value.data),
        });
      }
    });

  if (apiCardAdd.isSuccess.value) {
    return true;
  } else {
    return false;
  }
};

// submit call
const submitCall = useDebounceFn(async () => {
  const checkCard = await checkCardLength();

  if (!checkCard) return;

  const addCardOk = await addCard();

  if (!addCardOk) return;

  router.push(localePath("/etc/kakao-permalink/done"));
}, 300);

// submit
const submit = async () => {
  if (agree.value !== "Y") return;

  const validate = await form.value?.validate();

  if (validate?.valid) {
    if (!buttonDisabled.value) {
      submitCall();
    }
  } else if (validate?.errors) {
    const el = useGetValidateErrorEl(Object.keys(validate.errors));
    $elFocus(el);
  }
};

// 등록 클릭
const submitClick = () => {
  formRaw.value?.dispatchEvent(new Event("submit", { cancelable: true }));
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
</script>

<template>
  <div class="inner !px-0 !pt-0">
    <div class="border-top mt-[2.8rem] bg-e1yellow-foreground text-center">
      <div class="bg-titi inline-block w-auto py-6 pl-52 pr-8">
        <p class="fs-12 text-left">
          오렌지카드 앱을 다운로드 받으시면 <br />
          더 편리하게 서비스를 이용할 수 있어요.
        </p>
        <p class="mt-[.8rem] flex flex-row items-center">
          <img
            src="@/assets/img/head/logo-orangecard.png"
            alt="E1 Orange Card"
            class="w-[8.8rem]"
          />
          <a
            href="/bridge"
            target="_blank"
            class="btn-small ml-[1.6rem] px-[.8rem] py-[.3rem]"
            >앱 다운로드</a
          >
        </p>
      </div>
    </div>

    <Form
      ref="form"
      as=""
      :validation-schema="formSchema"
      :initial-values="initialValues"
    >
      <form ref="formRaw" @submit.prevent="submit">
        <div class="px-8 py-16">
          <FormField name="cardNum">
            <FormItem>
              <FormValidation for="cardNum" :label="labels.cardNum">
                <FormControl>
                  <FormCardInput
                    :id="['cardNum1', 'cardNum', 'cardNum3', 'cardNum4']"
                    v-model="card"
                    :disabled="[true, false, false, false]"
                    @update:model-value="cardUpdate"
                  />
                </FormControl>
              </FormValidation>
            </FormItem>
          </FormField>

          <FormField
            v-if="!checkPassword"
            v-slot="{ componentField }"
            name="cardPw"
          >
            <FormItem>
              <FormValidation
                for="cardPw"
                :label="labels.cardPw"
                success-message="사용할 수 있는 비밀번호입니다."
              >
                <FormControl>
                  <FormBasicInput
                    id="cardPw"
                    type="password"
                    required
                    placeholder="숫자 4자리를 입력해주세요."
                    maxlength="4"
                    v-bind="componentField"
                  />
                </FormControl>
              </FormValidation>
            </FormItem>
          </FormField>

          <FormField
            v-if="!checkPassword"
            v-slot="{ componentField }"
            name="cardPwCheck"
          >
            <FormItem>
              <FormValidation
                for="cardPwCheck"
                :label="labels.cardPwCheck"
                success-message="비밀번호가 일치합니다."
              >
                <FormControl>
                  <FormBasicInput
                    id="cardPwCheck"
                    type="password"
                    required
                    placeholder="비밀번호를 다시 입력해주세요."
                    maxlength="4"
                    v-bind="componentField"
                  />
                </FormControl>
              </FormValidation>
            </FormItem>
          </FormField>

          <div class="border-top mt-[2.8rem] pt-[2.8rem] md:pt-16">
            <p class="fs-16 font-bold text-gray-700">
              개인정보 수집 및 이용에 대한 안내 동의<strong
                class="fs-16 ml-[.2rem] align-baseline font-bold text-primary"
                >(필수)</strong
              >
            </p>

            <AgreementsDetailBox code="B5" />

            <ul class="list-dot text-gray-600">
              <li>
                고객님께서는 동의를 거부할 수 있습니다.
                <span class="block md:inline">
                  (단, 동의 거부시에는 오렌지카드 서비스 제공이
                  제한됩니다.)</span
                >
              </li>
            </ul>

            <div class="mt-[.8rem] pr-[.8rem] text-right md:mt-[1.6rem]">
              <RadioGroup v-model="agree" class="ipt-line">
                <div class="ipt-item">
                  <RadioGroupItem id="agreeY" value="Y"></RadioGroupItem>
                  <label for="agreeY">동의함</label>
                </div>
                <div class="ipt-item">
                  <RadioGroupItem id="agreeN" value="N"></RadioGroupItem>
                  <label for="agreeN">동의하지 않음</label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div class="border-top btn-wrap px-8 pt-8">
          <a
            role="button"
            tabindex="0"
            class="btn-txt primary"
            :aria-disabled="agree !== 'Y' || buttonDisabled"
            @click="submitClick"
            @keypress.enter.space="submitClick"
          >
            등록하기
          </a>
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
.bg-titi {
  background: url("@/assets/img/etc/bg-titi.png") no-repeat 1rem bottom / 12rem
    auto;
}
.ipt-wrap + .ipt-wrap {
  margin-top: 2.8rem;
}
@media (min-width: 768px) {
  .ipt-wrap + .ipt-wrap {
    margin-top: 3.2rem;
  }
}
</style>
