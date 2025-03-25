<script setup lang="ts">
import type { SessionSignUp } from "@/types/stores";
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

// hook
const hookPhoneAuth = useHookPhoneAuth("signUpAuthenticationPopup");
const hookIpinAuth = useHookIpinAuth("signUpAuthenticationPopup");
const hookNaverAuth = useHookNaverAuth("signUpAuthenticationPopup", true);

// api
const apiCiCheck = useApiSignUpCiCheck(uid);
const apiSnsCheck = useApiSignUpSnsCheck(uid);

// ci 체크
const ciCheck = (ciKey: string, session: SessionSignUp) => {
  apiCiCheck.mutate(
    {
      ciKey,
    },
    {
      onSuccess: (ciCheckData) => {
        if (ciCheckData.header?.code === "B0013") {
          stores.session.$setSignUp(session);
          router.push(localePath(useEtcRoute("/sign-up/agreements")));
        } else {
          alertOpen({
            message: useT("alertMessage.004"),
            buttons: [
              {
                text: useT("alertButton.003"),
                callback: (closeFn) => {
                  closeFn();
                  router.push(localePath(useEtcRoute("/login")));
                },
              },
            ],
          });
        }
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      },
    },
  );
};

// 휴대폰 인증
const phoneAuth = (
  authType: SessionSignUp["type"] = "PHONE",
  snsId?: string,
) => {
  hookPhoneAuth
    ?.open()
    .then((data) => {
      const checkAge = useAgeCheck(data.birthDay);

      // 연령 체크
      if (checkAge) {
        ciCheck(
          data.ciKey,
          authType === "NAVER"
            ? {
                type: "NAVER",
                data: {
                  snsId: snsId || "",
                  auth: data,
                },
              }
            : {
                type: "PHONE",
                data,
              },
        );
      } else {
        alertOpen({
          message: useT("alertMessage.003"),
        });
      }
    })
    .catch(() => {});
};

// 휴대폰 인증 클릭
const phoneClick = useDebounceFn(() => {
  phoneAuth();
}, 300);

// 아이핀 인증
const ipinAuth = () => {
  hookIpinAuth
    ?.open()
    .then((data) => {
      const checkAge = useAgeCheck(data.birthDay);

      // 연령 체크
      if (checkAge) {
        ciCheck(data.ciKey, {
          type: "IPIN",
          data,
        });
      } else {
        alertOpen({
          message: useT("alertMessage.003"),
        });
      }
    })
    .catch(() => {});
};

// 아이핀 인증 클릭
const ipinClick = useDebounceFn(() => {
  ipinAuth();
}, 300);

// 네이버 인증
const naverAuth = () => {
  hookNaverAuth
    ?.open()
    .then((data) => {
      apiSnsCheck.mutate(
        {
          snsType: "naver",
          snsId: data.id,
        },
        {
          onSuccess: (snsCheckData) => {
            if (snsCheckData.header?.code === "C0010") {
              phoneAuth("NAVER", data.id);
            } else {
              stores.session.$setSignUp({
                type: "NAVER",
                loginId: snsCheckData.data?.loginId || "",
              });
              router.push(
                localePath(useEtcRoute("/sign-up/sns-account-exists")),
              );
            }
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

// 네이버 인증 클릭
const naverClick = useDebounceFn(() => {
  naverAuth();
}, 300);

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// life cycle
onMounted(() => {
  stores.session.$setSignUp(null);
});
onBeforeUnmount(() => {
  hookPhoneAuth?.clear();
  hookIpinAuth?.clear();
  hookNaverAuth?.clear();
});
</script>

<template>
  <div
    class="border-top border-bottom inner mt-[2.8rem] py-16 md:mt-24 md:py-24"
  >
    <div class="md:px-[29rem]">
      <div class="btn-wrap mt-8 md:mt-0">
        <a
          role="button"
          tabindex="0"
          class="btn-txt gray font-bold md:!max-w-full"
          @click="phoneClick"
          @keypress.enter.space="phoneClick"
        >
          <i
            class="phone mr-[.4rem] mt-[-.2rem] inline-block size-[2.8rem] bg-contain bg-center bg-no-repeat md:mr-[.8rem] md:mt-[-.4rem] md:size-16"
          ></i>
          휴대폰 인증
        </a>
      </div>
      <div class="btn-wrap mt-[3.2rem]">
        <a
          role="button"
          tabindex="0"
          class="btn-txt gray font-bold md:!max-w-full"
          @click="ipinClick"
          @keypress.enter.space="ipinClick"
        >
          <i
            class="ipin mr-[.4rem] mt-[-.2rem] inline-block size-[2.8rem] bg-contain bg-center bg-no-repeat md:mr-[.8rem] md:mt-[-.4rem] md:size-16"
          ></i>
          아이핀 인증
        </a>
      </div>
      <div class="btn-wrap mt-[3.2rem]">
        <!-- 카카오 -->
        <ContentsSignUpVerificationKakao />
      </div>
      <div class="btn-wrap">
        <a
          role="button"
          tabindex="0"
          class="btn-txt bg-[#03c75a] font-bold text-white md:!max-w-full"
          @click="naverClick"
          @keypress.enter.space="naverClick"
        >
          <i
            class="naver mr-[.4rem] mt-[-.2rem] inline-block size-[2.8rem] bg-contain bg-center bg-no-repeat md:mr-[.8rem] md:mt-[-.4rem] md:size-16"
          ></i>
          네이버 인증
        </a>
      </div>
    </div>

    <div class="mt-16 md:mt-24 md:px-24">
      <div class="gray-box">
        <ul class="list-dot text-gray-600">
          <li>
            회원가입은 무료이며, 만 14세 이상 본인인증이 가능하신 분만 가입이
            가능합니다.
          </li>
          <li>
            본인인증을 위해 입력하신 개인정보는 본인인증기관에서 수집하는
            정보이며, 이 때 수집된 정보는 본인인증 외 어떠한 용도로도 이용되거나
            별도로 저장되지 않습니다.
          </li>
          <li>
            오렌지카드는 신용평가기관인 SCI평가정보㈜를 통해 본인인증 서비스를
            제공하고 있으며, 본인인증 수단으로 휴대폰과 아이핀을 제공하고
            있습니다.
          </li>
          <li>
            본인인증에 문제가 있는 경우, SCI평가정보㈜ SIREN24 고객센터
            1577-1006로 문의해 주시기 바랍니다.
          </li>
          <li>애플 ID로 로그인하시려면 E1오렌지카드 앱을 이용해주세요.</li>
        </ul>
      </div>
    </div>

    <CommonAlert ref="alertLayer" />
  </div>
</template>

<style lang="css" scoped>
@media (min-width: 768px) {
  .btn-wrap + .btn-wrap {
    margin-top: 1.6rem;
  }
  .ipt-wrap + .ipt-wrap {
    margin-top: 2rem;
  }
  .bar > *:not(.icon-type) {
    font-size: 1.8rem;
    line-height: 2.4rem;
  }
}
.phone {
  background-image: url("@/assets/img/login/btn-login-phone.png");
}
.ipin {
  background-image: url("@/assets/img/login/btn-login-ipin.png");
}
.naver {
  background-image: url("@/assets/img/login/btn-login-naver.png");
}
</style>
