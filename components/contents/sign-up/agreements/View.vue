<script setup lang="ts">
import type { BooleanYN } from "@/types/common";
import type { SignUpTermsResponse } from "@/types/api";
import type { SessionSignUpAgree } from "@/types/stores";
import type { AlertOptions } from "@/types/components/common/Alert";

type CheckList = {
  [key: string]: string;
};
type CheckListYN = {
  [key: string]: BooleanYN;
};

// 스토어
const stores = {
  session: useStoreSession(),
};

// route
const localePath = useLocalePath();
const router = useRouter();

// api
const { data, suspense, isSuccess } = useApiSignUpTerms();

// api ssr
await suspense();

// state
const all = ref(false);
const checkList = ref<CheckList>({});

// ref
const marketingAgree = useTemplateRef("marketingAgree");

// computed
const session = computed(() => {
  return stores.session.signUp;
});
const list = computed<SignUpTermsResponse>(() => {
  const l: SignUpTermsResponse = data.value?.data || [];
  return l.filter((item) => item.agreementType !== "B4");
});
const checkListKeys = computed(() => {
  return Object.keys(checkList.value);
});
const agree = computed<SessionSignUpAgree>(() => {
  const marketingAgreeChecks = marketingAgree.value?.getChecked();
  const l: CheckListYN = {};

  checkListKeys.value.forEach((key) => {
    l[key] = checkList.value[key] === "Y" ? "Y" : "N";
  });

  return {
    ...l,
    B4: marketingAgreeChecks?.B4 ? "Y" : "N",
    email: marketingAgreeChecks?.email ? "Y" : "N",
    sms: marketingAgreeChecks?.sms ? "Y" : "N",
    appPush: marketingAgreeChecks?.appPush ? "Y" : "N",
    talk: marketingAgreeChecks?.talk ? "Y" : "N",
  };
});

// init
const init = () => {
  if (list.value.length) {
    const l: CheckList = {};

    list.value.forEach((item) => {
      l[item.agreementType] = "";
    });

    checkList.value = l;
  }
};

// 전체 동의
const allChange = (v: boolean) => {
  if (v) {
    checkListKeys.value.forEach((key) => {
      checkList.value[key] = "Y";
    });
    marketingAgree.value?.allCheck(true);
  } else {
    checkListKeys.value.forEach((key) => {
      checkList.value[key] = "N";
    });
    marketingAgree.value?.allCheck(false);
  }
};

// B2 동의
const checkUpdate = (code: string) => {
  if (code === "B2" && checkList.value[code] === "N") {
    marketingAgree.value?.allCheck(false);
  }
};

// 취소 클릭
const cancelClick = useDebounceFn(() => {
  alertOpen({
    message: useT("alertMessage.005"),
    buttons: [
      {
        type: "cancel",
      },
      {
        callback: (closeFn) => {
          closeFn();
          router.replace(localePath(useEtcRoute("/sign-up")));
        },
      },
    ],
  });
}, 300);

// 확인 클릭
const submitClick = useDebounceFn(() => {
  let listAgreeOk = true;

  list.value.forEach((item) => {
    if (
      listAgreeOk &&
      item.required === "Y" &&
      agree.value[item.agreementType] !== "Y"
    ) {
      listAgreeOk = false;

      alertOpen({
        message: useT("alertMessage.006", [item.title]),
        buttons: [
          {
            callback: (closeFn) => {
              closeFn();
            },
            closeAutoFocus: (e) => {
              e.preventDefault();
              document.getElementById(`${item.agreementType}_Y`)?.focus();
            },
          },
        ],
      });
    }
  });

  if (listAgreeOk && session.value && session.value.type !== "KAKAO") {
    stores.session.$setSignUp({
      ...session.value,
      agree: agree.value,
    });
    router.push(localePath(useEtcRoute("/sign-up/profile")));
  }
}, 300);

// all watch
const allWatch = () => {
  let listAgreeOk = true;

  list.value.forEach((item) => {
    if (agree.value[item.agreementType] !== "Y") {
      listAgreeOk = false;
    }
  });

  if (
    listAgreeOk &&
    agree.value.B4 === "Y" &&
    agree.value.email === "Y" &&
    agree.value.sms === "Y" &&
    agree.value.appPush === "Y" &&
    agree.value.talk === "Y"
  ) {
    if (!all.value) {
      all.value = true;
    }
  } else {
    if (all.value) {
      all.value = false;
    }
  }
};

// change
const marketingAgreeChange = () => {
  allWatch();
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// setup
init();

// watch
watch(
  checkList,
  () => {
    allWatch();
  },
  {
    deep: true,
  },
);
watch(isSuccess, () => {
  if (isSuccess.value) {
    init();
  }
});
</script>

<template>
  <CommonBeforeunload />

  <ContentsSignUpCheckSession
    :check-path="useEtcRoute('/sign-up')"
    :denied-path="useEtcRoute('/sign-up')"
  >
    <div>
      <div
        class="border-top border-bottom inner mt-[2.8rem] px-8 md:mt-24 md:px-16"
      >
        <!-- 전체동의 -->
        <div class="pb-[2.8rem] pt-16 md:pb-[5.6rem]">
          <div class="ipt-line">
            <div class="ipt-item">
              <Checkbox
                id="chkAll"
                v-model:checked="all"
                class="ipt-check"
                @update:checked="allChange"
              ></Checkbox>
              <label for="chkAll" class="font-bold">전체동의</label>
            </div>
          </div>
          <div class="px-[1.6rem] pt-[1.6rem] md:px-16">
            <ul class="list-dot text-gray-600">
              <li>
                전체동의는 필수 및 선택정보에 대한 동의도 포함되어있으며,
                개별적으로 동의하실 수 있습니다.
              </li>
              <li>
                필수항목에 대한 동의를 거부하실 경우 회원가입이 제한되며,
                선택항목에 대한 동의는 거부하시더라도 회원가입이 가능합니다.
              </li>
            </ul>
          </div>
        </div>

        <!-- 약관 -->
        <div class="border-top py-[2.8rem] md:py-16">
          <div
            v-for="(item, i) in list"
            :key="item.agreementType"
            :class="{
              'mt-16 md:mt-8': i > 0,
            }"
          >
            <p class="fs-16 font-bold text-gray-700">
              {{ item.title }}
              <strong
                v-if="item.required === 'Y'"
                class="fs-16 align-baseline font-bold text-primary"
              >
                (필수)
              </strong>
              <strong
                v-else
                class="fs-16 align-baseline font-bold text-gray-600"
              >
                (선택)
              </strong>
            </p>

            <AgreementsDetailBox :code="item.agreementType" />

            <div class="pr-[.8rem] text-right">
              <RadioGroup
                v-model="checkList[item.agreementType]"
                class="ipt-line"
                @update:model-value="checkUpdate(item.agreementType)"
              >
                <div class="ipt-item">
                  <RadioGroupItem
                    :id="`${item.agreementType}_Y`"
                    value="Y"
                  ></RadioGroupItem>
                  <label :for="`${item.agreementType}_Y`">동의함</label>
                </div>
                <div class="ipt-item">
                  <RadioGroupItem
                    :id="`${item.agreementType}_N`"
                    value="N"
                  ></RadioGroupItem>
                  <label :for="`${item.agreementType}_N`">동의하지 않음</label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <FormProfileMarketingAgree
          ref="marketingAgree"
          :disabled="checkList.B2 === 'N'"
          @change="marketingAgreeChange"
        />
      </div>

      <div class="btn-wrap p-8 pb-0 md:pt-24">
        <a
          role="button"
          tabindex="0"
          class="btn-txt gray"
          @click="cancelClick"
          @keypress.enter.space="cancelClick"
        >
          취소
        </a>
        <a
          role="button"
          tabindex="0"
          class="btn-txt primary"
          @click="submitClick"
          @keypress.enter.space="submitClick"
        >
          확인
        </a>
      </div>
    </div>
  </ContentsSignUpCheckSession>

  <CommonAlert ref="alertLayer" />
</template>

<style lang="css" scoped>
@media (min-width: 768px) {
  .ipt-line.sub {
    display: inline-block;
    padding-right: 6rem;
    margin-top: 3rem !important;
  }
}
</style>
