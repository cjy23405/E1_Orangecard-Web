<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { plainToClass } from "class-transformer";
import type { CardData } from "@/types/api";
import type { AlertOptions } from "@/types/components/common/Alert";

// 오렌지 첫자리
const orangeCode = "10";
const orangeFirst = "0021";
const orangeFirstReg = new RegExp(`^${orangeFirst}`);

// uid
const uid = getCurrentInstance()?.uid;

// route
const localePath = useLocalePath();
const router = useRouter();

// api
const apiCardList = useApiCardList(`cardList_${uid}`, {
  cardStatCd: "20",
});
const apiCardCheckPassword = useApiCardCheckPassword();
const apiCardAdd = useApiCardAdd(uid);
const apiMyProfile = useApiMyProfile();

// api ssr
await apiCardList.suspense();
await apiCardCheckPassword.suspense();
await apiMyProfile.suspense();

// state
const type = ref<CardData["cardType"]>("10");
const card = ref<[string, string, string, string]>([orangeFirst, "", "", ""]);
const cardDisabled = ref<[boolean, boolean, boolean, boolean]>([
  true,
  false,
  false,
  false,
]);
const agree = ref("");

// ref
const cardTypeGuide = useTemplateRef("cardTypeGuide");

// computed
const checkPassword = computed(() => {
  return apiCardCheckPassword.data.value?.data?.pwState || false;
});
const myID = computed(() => {
  return apiMyProfile.data.value?.data?.loginId;
});

// form
class CardAddForm {
  cardType: CardData["cardType"] = orangeCode;
  cardNum: string = orangeFirst;
  cardPw: string = "";
  cardPwCheck: string = "";
}
const labels: {
  [key: string]: string;
} = {
  cardType: "카드종류",
  cardNum: "카드번호",
  cardPw: "카드비밀번호",
  cardPwCheck: "카드비밀번호 확인",
};
const form = useTemplateRef("form");
const formRaw = useTemplateRef("formRaw");
const initialValues = plainToClass(CardAddForm, {});
const formSchema = toTypedSchema(
  z.object({
    cardType: z.string().refine((v) => v, {
      message: useT("formMessage.002", [labels.srType]),
    }),

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
      } else if (
        formValues.cardType !== orangeCode &&
        orangeFirstReg.test(val)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.021"),
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

// submit call
const submitCall = useDebounceFn(async () => {
  const values = form.value?.values as CardAddForm;

  if (!values) return;

  apiCardAdd.mutate(
    {
      cardType: values.cardType,
      cardNum: values.cardNum,
      cardPw: checkPassword.value
        ? undefined
        : useSha256(values.cardPw, "card"),
      registChannel: "21",
      partnerCorporation: "",
    },
    {
      onSuccess: () => {
        alertOpen({
          message: useT("alertMessage.002"),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
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
  if (agree.value !== "Y") return;

  const validate = await form.value?.validate();

  if (validate?.valid) {
    if (!apiCardAdd.isPending.value) {
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

// 카드종류 update
const typeUpdate = async () => {
  const isOrange = type.value === orangeCode;

  card.value[0] = isOrange ? orangeFirst : "";
  cardDisabled.value[0] = isOrange;

  cardUpdate();

  form.value?.setFieldValue("cardType", type.value);

  const validate = await form.value?.validateField("cardNum");

  if (!validate?.valid) {
    form.value?.setFieldError("cardNum", "");
  }
};

// 카드번호 update
const cardUpdate = () => {
  form.value?.setFieldValue("cardNum", card.value.join(""));
};

// init
const init = () => {
  if (!apiCardList.data.value || !apiCardList.data.value.data) return;

  if (apiCardList.data.value.data.length >= 5) {
    alertOpen({
      message: useT("alertMessage.023"),
      buttons: [
        {
          callback: (closeFn) => {
            closeFn();
            router.replace(localePath("/my-page/card"));
          },
        },
      ],
    });
  }
};

// 등급 혜택 레이어 열기
const cardTypeGuideOpen = () => {
  if (cardTypeGuide.value) {
    cardTypeGuide.value.open();
  }
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// watch
watch(apiCardList.isSuccess, () => {
  if (apiCardList.isSuccess.value) {
    init();
  }
});

// life cycle
onMounted(() => {
  init();
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
          class="border-top border-bottom inner mt-[2.8rem] px-8 md:mt-24 md:px-16"
        >
          <div class="py-[2.8rem] md:py-16">
            <p class="fs-18 mb-[1.2rem] font-bold md:mb-16">카드 정보 입력</p>
            <div class="md:px-16">
              <FormField name="cardType">
                <FormItem>
                  <FormValidation :label="labels.cardType">
                    <template #label>
                      <label
                        role="presentation"
                        class="relative mb-[.8rem] block font-bold text-gray-800"
                        >카드종류
                        <a
                          role="button"
                          tabindex="0"
                          class="btn-info ml-[.8rem]"
                          @click="cardTypeGuideOpen"
                          @keypress.enter.space="cardTypeGuideOpen"
                        >
                          카드종류란?
                        </a>
                      </label>
                    </template>
                    <FormControl>
                      <RadioGroup
                        v-model="type"
                        class="ipt-line"
                        @update:model-value="typeUpdate"
                      >
                        <div class="ipt-item">
                          <RadioGroupItem
                            id="type1"
                            value="10"
                          ></RadioGroupItem>
                          <label for="type1">오렌지카드</label>
                        </div>
                        <div class="ipt-item ml-16">
                          <RadioGroupItem
                            id="type2"
                            value="20"
                          ></RadioGroupItem>
                          <label for="type2">원카드</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormValidation>
                </FormItem>
              </FormField>

              <FormField name="cardNum">
                <FormItem>
                  <FormValidation for="cardNum" :label="labels.cardNum">
                    <FormControl>
                      <FormCardInput
                        :id="[
                          type !== orangeCode ? 'cardNum' : 'cardNum1',
                          type === orangeCode ? 'cardNum' : 'cardNum2',
                          'cardNum3',
                          'cardNum4',
                        ]"
                        v-model="card"
                        :disabled="cardDisabled"
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
            </div>
          </div>

          <div class="border-top pb-16 pt-[2.8rem] md:pt-16">
            <p class="fs-16 font-bold text-gray-700">
              개인정보 수집 및 이용에 대한 안내 동의<strong
                class="fs-16 ml-[.2rem] align-baseline font-bold text-primary"
                >(필수)</strong
              >
            </p>

            <div>
              <div
                :class="[
                  'overflow-hidden',
                  {
                    'h-0': type !== '10',
                  },
                ]"
                :aria-hidden="type !== '10'"
              >
                <AgreementsDetailBox code="B5" />
              </div>
              <div
                :class="[
                  'overflow-hidden',
                  {
                    'h-0': type !== '20',
                  },
                ]"
                :aria-hidden="type !== '20'"
              >
                <AgreementsDetailBox code="B6" />
              </div>
            </div>

            <ul class="list-dot text-gray-600">
              <li>
                고객님께서는 동의를 거부할 수 있습니다.
                <span class="block md:inline">
                  (단, 동의 거부시에는 오렌지카드 서비스 제공이 제한됩니다.)
                </span>
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

        <div class="btn-wrap p-8 pb-0 md:p-24 md:pb-0">
          <a
            role="button"
            tabindex="0"
            class="btn-txt primary"
            :aria-disabled="agree !== 'Y' || apiCardAdd.isPending.value"
            @click="submitClick"
            @keypress.enter.space="submitClick"
          >
            등록하기
          </a>
        </div>
      </form>
    </Form>

    <PopupCardTypeGuide ref="cardTypeGuide" />

    <CommonAlert ref="alertLayer" />
  </div>
</template>

<style lang="css" scoped>
.ipt-item + .ipt-item.ml-16 {
  margin-left: 4rem;
}
.ipt-wrap + .ipt-wrap {
  margin-top: 2.8rem;
}
@media (min-width: 768px) {
  .ipt-item + .ipt-item.ml-16 {
    margin-left: 6rem;
  }
  .ipt-wrap + .ipt-wrap {
    margin-top: 3.2rem;
  }
}
</style>
