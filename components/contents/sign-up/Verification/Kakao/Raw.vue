<script setup lang="ts">
import type { KakaoAuthData } from "@/types/hooks";
import type { SessionSignUpKakaoData } from "@/types/stores";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// 스토어
const stores = {
  session: useStoreSession(),
};

// route
const localePath = useLocalePath();
const router = useRouter();

// api
const apiCiCheck = useApiSignUpCiCheck(uid);
const apiSnsCheck = useApiSignUpSnsCheck(uid);
const apiIdCheck = useApiSignUpIdCheck(uid);
const apiSignUpSns = useApiSignUpSns(uid);

// 카카오 가입
const kakaoSignUp = ({
  data,
  fromLogin = false,
  fromEnterId = false,
  fromVerifyPhone = false,
  id,
  phone,
}: {
  data: SessionSignUpKakaoData;
  fromLogin?: boolean;
  fromEnterId?: boolean;
  fromVerifyPhone?: boolean;
  id?: string;
  phone?: string;
}) => {
  const cn = useSessionStorage<string | null>("campaignNo", null);
  const campaignNo = cn.value || undefined;
  const email =
    (data.user.kakao_account.is_email_valid &&
      data.user.kakao_account.is_email_verified &&
      data.user.kakao_account.email) ||
    "";
  const loginId = id || email;
  const cellPhone =
    phone ||
    data.user.kakao_account.phone_number
      .replace(/^\+82 /, "0")
      .replace(/-/g, "");
  const birthday =
    data.user.kakao_account.birthyear + data.user.kakao_account.birthday;
  const agreeA0 = useFindAgree(data, "agree_use");
  const agreeB1 = useFindAgree(data, "agree_private");
  const agreeB2 = useFindAgree(data, "agree_private_opt");
  const agreeEmail = useFindAgree(data, "agree_email");
  const agreeSms = useFindAgree(data, "agree_sms");
  const agreeAppPush = useFindAgree(data, "agree_benefit");
  const agreeTalk = useFindAgree(data, "agree_talk");

  apiSignUpSns.mutate(
    {
      snsType: "KAKAO",
      snsId: String(data.user.id),
      campaignNo,
      loginId,
      name: data.user.kakao_account.name,
      cellPhone,
      ciKey: data.user.kakao_account.ci,
      certMethod: "70",
      authType: "KKO",
      birthday,
      email,
      agreeEmail: useReturnYN(agreeEmail),
      agreeSms: useReturnYN(agreeSms),
      agreeBenefit: useReturnYN(agreeAppPush),
      agreeTalk: useReturnYN(agreeTalk),
      terms: [
        {
          termsCd: "A0",
          termsYn: useReturnYN(agreeA0),
        },
        {
          termsCd: "B1",
          termsYn: useReturnYN(agreeB1),
        },
        {
          termsCd: "B2",
          termsYn: useReturnYN(agreeB2),
        },
      ],
    },
    {
      onSuccess: (successData) => {
        if (!successData.data) return;

        stores.session.$setSignUp({
          type: "KAKAO",
          data: {
            token: data.token,
            user: data.user,
            agree: data.agree,
          },
          fromLogin,
          fromEnterId,
          fromVerifyPhone,
          completeId: successData.data.loginId,
        });
        cn.value = null;
        router.push(localePath(useEtcRoute("/sign-up/complete")));
      },
      onError: (err) => {
        cn.value = null;
        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      },
    },
  );
};

// 카카오 해외 번호 체크
const kakaoPhoneCheck = ({
  data,
  fromLogin = false,
  fromEnterId = false,
  id,
}: {
  data: SessionSignUpKakaoData;
  fromLogin?: boolean;
  fromEnterId?: boolean;
  id?: string;
}) => {
  const phone = data.user.kakao_account.phone_number;

  if (/^\+82/.test(phone)) {
    kakaoSignUp({
      data,
      fromLogin,
      fromEnterId,
      id,
    });
  } else {
    stores.session.$setSignUp({
      type: "KAKAO",
      data: {
        token: data.token,
        user: data.user,
        agree: data.agree,
      },
      fromLogin,
      fromEnterId,
      enterId: id,
    });
    router.push(localePath(useEtcRoute("/sign-up/kakao-verify-phone")));
  }
};

// 카카오 이메일 유효성, 아이디 중복 여부 체크
const kakaoEmailCheck = (
  data: SessionSignUpKakaoData,
  fromLogin: boolean = false,
) => {
  if (
    data.user.kakao_account.is_email_valid &&
    data.user.kakao_account.is_email_verified &&
    data.user.kakao_account.email
  ) {
    // 이메일 유효
    // 아이디 중복 여부 체크
    apiIdCheck.mutate(
      {
        loginId: data.user.kakao_account.email,
      },
      {
        onSuccess: () => {
          // 아이디 중복 X
          kakaoPhoneCheck({
            data,
            fromLogin,
          });
        },
        onError: (err) => {
          if (err.data.header?.code === "B0009") {
            // 아이디 중복 O
            stores.session.$setSignUp({
              type: "KAKAO",
              data: {
                token: data.token,
                user: data.user,
                agree: data.agree,
              },
              fromLogin,
            });
            router.push(localePath(useEtcRoute("/sign-up/kakao-enter-id")));
          } else {
            alertOpen({
              message: useApiGetErrorMessage(err.data),
            });
          }
        },
      },
    );
  } else {
    // 이메일 유효하지 않음
    stores.session.$setSignUp({
      type: "KAKAO",
      data: {
        token: data.token,
        user: data.user,
        agree: data.agree,
      },
      fromLogin,
    });
    router.push(localePath(useEtcRoute("/sign-up/kakao-enter-id")));
  }
};

// 카카오 가입 여부 체크
const kakaoCheck = (data: KakaoAuthData, fromLogin: boolean = false) => {
  // ci 체크
  apiCiCheck.mutate(
    {
      ciKey: data.user.kakao_account.ci,
    },
    {
      onSuccess: (ciCheckData) => {
        // 연동 여부 체크
        apiSnsCheck.mutate(
          {
            snsType: "kakao",
            snsId: String(data.user.id),
          },
          {
            onSuccess: (snsCheckData) => {
              if (ciCheckData.data?.customerKey && ciCheckData.data?.loginId) {
                // ci 가입 계정 O
                stores.session.$setSignUp({
                  type: "KAKAO",
                  data: {
                    token: data.token,
                    user: data.user,
                    agree: data.agree,
                    ciCheck: ciCheckData.data,
                  },
                  fromLogin,
                });

                if (snsCheckData.data?.loginId) {
                  // 연동 O
                  router.push(
                    localePath(useEtcRoute("/sign-up/kakao-account-exists")),
                  );
                } else {
                  // 연동 X
                  router.push(
                    localePath(useEtcRoute("/sign-up/kakao-connect")),
                  );
                }
              } else {
                // ci 가입 계정 X
                if (snsCheckData.data?.loginId) {
                  // 연동 O
                  stores.session.$setSignUp({
                    type: "KAKAO",
                    data: {
                      token: data.token,
                      user: data.user,
                      agree: data.agree,
                      snsCheck: snsCheckData.data,
                    },
                    fromLogin,
                  });
                  router.push(
                    localePath(useEtcRoute("/sign-up/kakao-connect-exists")),
                  );
                } else {
                  // 연동 X
                  const birthday =
                    data.user.kakao_account.birthyear +
                    data.user.kakao_account.birthday;
                  const checkAge = useAgeCheck(birthday);

                  // 연령 체크
                  if (checkAge) {
                    kakaoEmailCheck(
                      {
                        token: data.token,
                        user: data.user,
                        agree: data.agree,
                      },
                      fromLogin,
                    );
                  } else {
                    alertOpen({
                      message: useT("alertMessage.003"),
                    });
                  }
                }
              }
            },
            onError: (err) => {
              alertOpen({
                message: useApiGetErrorMessage(err.data),
              });
            },
          },
        );
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      },
    },
  );
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// expose
defineExpose({
  kakaoCheck,
  kakaoPhoneCheck,
  kakaoSignUp,
});
</script>

<template>
  <CommonAlert ref="alertLayer" />
</template>
