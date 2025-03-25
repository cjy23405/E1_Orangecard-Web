<script setup lang="ts">
import { useQueryClient } from "@tanstack/vue-query";
import type { MySnsListResponse, MySnsLinkRequest } from "@/types/api";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// route
const localePath = useLocalePath();
const router = useRouter();

// hook
const hookKakaoAuth = useHookKakaoAuth("signUpAuthenticationPopup");
const hookNaverAuth = useHookNaverAuth("signUpAuthenticationPopup", true);

// api
const queryClient = useQueryClient();
const apiMySnsList = useApiMySnsList();
const apiMyPasswordState = useApiMyPasswordState();
const apiMySnsLink = useApiMySnsLink(uid);
const apiMyAgreeEdit = useApiMyAgreeEdit(uid);

// ssr
await apiMySnsList.suspense();

// computed
const snsList = computed((): MySnsListResponse => {
  return apiMySnsList.data.value?.data || [];
});
const kakao = computed(() => {
  return snsList.value.find((item) => item.snsType === "kakao");
});
const naver = computed(() => {
  return snsList.value.find((item) => item.snsType === "naver");
});

// refetch
const refetch = () => {
  queryClient.resetQueries({ queryKey: ["mySnsList"] });
  apiMySnsList.refetch();
};

// password check
const passwordCheck = () => {
  queryClient.resetQueries({ queryKey: ["myPasswordState"] });
  return apiMyPasswordState.refetch();
};

// 연결 하기
const link = (
  snsType: MySnsLinkRequest["snsType"],
  snsId: MySnsLinkRequest["snsId"],
  callback: () => void = () => {},
  addMsg?: string,
) => {
  apiMySnsLink.mutate(
    {
      snsType,
      snsId,
      snsStat: "Y",
      withdrawMbrYn: "N",
    },
    {
      onSuccess: () => {
        callback();
        refetch();
        alertOpen({
          message: useT("alertMessage.018") + (addMsg ? addMsg : ""),
        });
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      },
    },
  );
};

// 해제 하기
const unlink = (type: MySnsLinkRequest["snsType"]) => {
  const snsData = type === "KAKAO" ? kakao.value : naver.value;

  if (!snsData) return;

  passwordCheck()
    .then((data) => {
      if (data.data?.data?.pwState) {
        apiMySnsLink.mutate(
          {
            snsType: type,
            snsId: snsData.snsId,
            snsStat: "N",
            withdrawMbrYn: "N",
          },
          {
            onSuccess: () => {
              if (type === "KAKAO") {
                useHookKakaoRefreshTokenUnlink();
              }
              refetch();
              alertOpen({
                message: useT("alertMessage.019"),
              });
            },
            onError: (err) => {
              alertOpen({
                message: useApiGetErrorMessage(err.data),
              });
            },
          },
        );
      } else {
        alertOpen({
          message: useT("alertMessage.020"),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
                router.push(localePath("/my-page/sns/new-password"));
              },
            },
          ],
        });
      }
    })
    .catch(() => {
      const err = apiMyPasswordState.error.value;

      if (err) {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      }
    });
};

// 카카오 인증
const kakaoAuth = () => {
  hookKakaoAuth
    ?.open()
    .then((kakaoData) => {
      const agreeB2 = useFindAgree(kakaoData, "agree_private_opt");
      const agreeEmail = useFindAgree(kakaoData, "agree_email");
      const agreeSms = useFindAgree(kakaoData, "agree_sms");
      const agreeAppPush = useFindAgree(kakaoData, "agree_benefit");
      const agreeTalk = useFindAgree(kakaoData, "agree_talk");

      apiMyAgreeEdit.mutate(
        {
          agreePrivateOpt: useReturnYN(agreeB2),
          agreeEmail: useReturnYN(agreeEmail),
          agreeSms: useReturnYN(agreeSms),
          agreeBenefit: useReturnYN(agreeAppPush),
          agreeTalk: useReturnYN(agreeTalk),
        },
        {
          onSuccess: (data) => {
            const msg = data.data?.marketingStatusMsg
              ? "\n\n" + data.data?.marketingStatusMsg
              : "";

            link(
              "KAKAO",
              String(kakaoData.user.id),
              () => {
                useHookKakaoLogin(kakaoData.token.refresh_token);
              },
              msg,
            );
          },
          onError: (err) => {
            alertOpen({
              message: useApiGetErrorMessage(err.data),
            });
          },
        },
      );
    })
    .catch(() => {});
};

// 카카오 인증 클릭
const kakaoClick = useDebounceFn(() => {
  if (kakao.value) {
    unlink("KAKAO");
  } else {
    kakaoAuth();
  }
}, 300);

// 네이버 인증
const naverAuth = () => {
  hookNaverAuth
    ?.open()
    .then((data) => {
      link("NAVER", String(data.id));
    })
    .catch(() => {});
};

// 네이버 인증 클릭
const naverClick = useDebounceFn(() => {
  if (naver.value) {
    unlink("NAVER");
  } else {
    naverAuth();
  }
}, 300);

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};
</script>

<template>
  <div>
    <div
      class="border-top border-bottom inner mt-[2.8rem] flex min-h-[60vh] flex-col justify-center px-8 md:mt-24 md:px-16"
    >
      <div class="md:mx-auto md:w-[60rem]">
        <div class="gray-box kakao relative">
          <p class="fs-16 font-bold md:text-2xl md:leading-[2.8rem]">카카오</p>
          <p
            class="fs-12 date-text text-gray-800 md:mt-[.6rem] md:text-lg md:leading-[2.2rem]"
          >
            {{
              !!kakao
                ? `${useFormattedDate(kakao.editDateTime, "yyyy-MM-dd")} 연결완료`
                : "연결정보가 없습니다."
            }}
          </p>
          <a
            role="button"
            tabindex="0"
            :class="[
              'btn-mini',
              {
                primary: !!kakao,
              },
            ]"
            @click="kakaoClick"
            @keypress.enter.space="kakaoClick"
          >
            {{ !!kakao ? "해제하기" : "연결하기" }}
          </a>
        </div>

        <div class="gray-box naver relative mt-[.8rem] md:mt-[1.6rem]">
          <p class="fs-16 font-bold md:text-2xl md:leading-[2.8rem]">네이버</p>
          <p
            class="fs-12 date-text text-gray-800 md:mt-[.6rem] md:text-lg md:leading-[2.2rem]"
          >
            {{
              !!naver
                ? `${useFormattedDate(naver.editDateTime, "yyyy-MM-dd")} 연결완료`
                : "연결정보가 없습니다."
            }}
          </p>
          <a
            role="button"
            tabindex="0"
            :class="[
              'btn-mini',
              {
                primary: !!naver,
              },
            ]"
            @click="naverClick"
            @keypress.enter.space="naverClick"
          >
            {{ !!naver ? "해제하기" : "연결하기" }}
          </a>
        </div>
        <ul class="list-dot mt-[.8rem] text-gray-600 md:mt-[1.6rem]">
          <li>
            타인의 기기에서 사용하실때는 SNS 계정의 로그아웃 상태를 반드시
            확인해주세요.
          </li>
        </ul>
      </div>
    </div>

    <CommonAlert ref="alertLayer" />
  </div>
</template>

<style lang="css" scoped>
@tailwind components;
@layer components {
  .gray-box {
    @apply pl-[7.6rem] before:content-[''] before:absolute before:size-[4rem] before:top-1/2 before:left-[1.6rem] before:-translate-y-1/2 md:before:size-[5.6rem] md:before:left-[2.4rem] md:pl-[10.8rem] md:py-[2.4rem];
  }
  .gray-box.kakao::before {
    background: url("@/assets/img/mypage/btn-login-kakao.png") no-repeat center
      center/100% auto;
  }
  .gray-box.naver::before {
    background: url("@/assets/img/mypage/btn-login-naver.png") no-repeat center
      center/100% auto;
  }
  .btn-mini {
    @apply py-[.3rem] right-[1.6rem] px-[1.2rem] text-base leading-[2rem] md:text-lg md:leading-[2.2rem] absolute top-1/2 -translate-y-1/2 md:right-[2.4rem];
  }
  .btn-mini.primary {
    @apply font-bold;
  }
}
</style>
