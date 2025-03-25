<script setup lang="ts">
import type { SignUpBasicRequest } from "@/types/api";
import type { AlertOptions } from "@/types/components/common/Alert";
import type { ProfileForm } from "@/types/components/form/Profile";

// uid
const uid = getCurrentInstance()?.uid;

// 스토어
const stores = {
  session: useStoreSession(),
};

// session
const etcInflow = useSessionStorage<string | null>("etcInflow", null);

// route
const localePath = useLocalePath();
const router = useRouter();

// api
const apiSignUpBasic = useApiSignUpBasic(uid);
const apiSignUpSns = useApiSignUpSns(uid);

// computed
const session = computed(() => {
  return stores.session.signUp;
});
const initial = computed((): Partial<ProfileForm> | null => {
  if (
    !session.value ||
    (session.value.type !== "NAVER" &&
      session.value.type !== "IPIN" &&
      session.value.type !== "PHONE")
  ) {
    return null;
  } else {
    const name = (() => {
      if (session.value.type === "NAVER") {
        return session.value.data?.auth.name || "";
      } else if (session.value.type === "IPIN") {
        return session.value.data.name;
      } else {
        return session.value.data.name;
      }
    })();
    const birthday = (() => {
      if (session.value.type === "NAVER") {
        return session.value.data?.auth.birthDay || "";
      } else if (session.value.type === "IPIN") {
        return session.value.data.birthDay;
      } else {
        return session.value.data.birthDay;
      }
    })();
    const cellPhone = (() => {
      if (session.value.type === "NAVER") {
        return session.value.data?.auth.cellPhone || "";
      } else if (session.value.type === "IPIN") {
        return "";
      } else {
        return session.value.data.cellPhone;
      }
    })();

    return {
      name,
      birthday,
      cellPhone,
      cellPhoneCheck: session.value.type !== "IPIN",

      agreePrivateOpt: session.value.agree?.B4,
      agreeEmail: session.value.agree?.email,
      agreeSms: session.value.agree?.sms,
      agreeBenefit: session.value.agree?.appPush,
      agreeTalk: session.value.agree?.talk,
    };
  }
});

// submit call
const submitCall = useDebounceFn(async (values: ProfileForm) => {
  if (
    !session.value ||
    (session.value.type !== "NAVER" &&
      session.value.type !== "IPIN" &&
      session.value.type !== "PHONE") ||
    !session.value.agree
  )
    return;

  const ciKey = (() => {
    if (session.value.type === "NAVER") {
      return session.value.data?.auth.ciKey || "";
    } else if (session.value.type === "IPIN") {
      return session.value.data.ciKey;
    } else {
      return session.value.data.ciKey;
    }
  })();

  const agreePrivateOpt = values.agreePrivateOpt === "Y";
  const agreeB8 = values.agreeB8 === "Y";

  const terms: SignUpBasicRequest["terms"] = Object.keys(session.value.agree)
    .filter((key) => !/B4|email|sms|appPush|talk/.test(key))
    .map((key) => ({
      termsCd: key,
      termsYn:
        session.value && session.value.type !== "KAKAO" && session.value.agree
          ? session.value.agree[key]
          : "N",
    }));

  const data: SignUpBasicRequest = {
    loginId: values.loginId,
    name: values.name,
    loginPw: values.loginPw ? useSha256(values.loginPw) : "",
    cellPhone: values.cellPhone,
    ciKey,
    certMethod: session.value.type === "IPIN" ? "10" : "30",
    authType: session.value.type === "IPIN" ? "I" : "H",
    birthday: values.birthday,
    email: values.email,

    terms,

    ...(agreeB8
      ? {
          carInfoList: values.carList.length ? values.carList : undefined,
        }
      : {}),

    ...(agreePrivateOpt
      ? {
          agreeEmail: values.agreeEmail,
          agreeSms: values.agreeSms,
          agreeBenefit: values.agreeBenefit,
          agreeTalk: values.agreeTalk,

          gender: values.gender || undefined,
          zipCode: values.address ? values.address.zipCode : "",
          sido: values.address ? values.address.sido : "",
          gugun: values.address ? values.address.gugun : "",
          addr: values.address ? values.address.addr : "",
          addrJi: values.address ? values.address.addrJi : "",
          addrDtl: values.address ? values.address.addrDtl : "",
          homePhone: values.homePhone,
          marriedDt: values.marriedDt,
        }
      : {}),
  };

  if (session.value?.type === "NAVER") {
    apiSignUpSns.mutate(
      {
        ...data,
        snsType: "NAVER",
        snsId: session.value?.data?.snsId || "",
      },
      {
        onSuccess: (successData) => {
          if (
            session.value &&
            session.value.type !== "KAKAO" &&
            successData.data
          ) {
            stores.session.$setSignUp({
              ...session.value,
              completeId: successData.data.loginId,
            });
            router.push(localePath(useEtcRoute("/sign-up/complete")));
          }
        },
        onError: (err) => {
          alertOpen({
            message: useApiGetErrorMessage(err.data),
          });
        },
      },
    );
  } else {
    apiSignUpBasic.mutate(data, {
      onSuccess: (successData) => {
        if (
          session.value &&
          session.value.type !== "KAKAO" &&
          successData.data
        ) {
          stores.session.$setSignUp({
            ...session.value,
            completeId: successData.data.loginId,
          });
          router.push(localePath(useEtcRoute("/sign-up/complete")));
        }
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      },
    });
  }
}, 300);

// 가입하기 클릭
const submitClick = (values: ProfileForm) => {
  submitCall(values);
};

// 취소 클릭
const cancelClick = useDebounceFn(() => {
  alertOpen({
    message: useT("alertMessage.010"),
    buttons: [
      {
        type: "cancel",
      },
      {
        callback: (closeFn) => {
          closeFn();
          stores.session.$setSignUp(null);

          if (etcInflow.value) {
            router.replace(etcInflow.value);
          } else {
            router.replace(localePath("/"));
          }
        },
      },
    ],
  });
}, 300);

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};
</script>

<template>
  <CommonBeforeunload />

  <ContentsSignUpCheckSession
    :check-path="useEtcRoute('/sign-up/agreements')"
    :denied-path="useEtcRoute('/sign-up')"
  >
    <FormProfile
      v-if="initial"
      :auth-type="session?.type"
      :submit-disabled="
        apiSignUpBasic.isPending.value || apiSignUpSns.isPending.value
      "
      :init-values="initial"
      @cancel="cancelClick"
      @submit="submitClick"
    />
  </ContentsSignUpCheckSession>

  <CommonAlert ref="alertLayer" />
</template>
