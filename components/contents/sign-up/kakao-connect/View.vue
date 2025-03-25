<script setup lang="ts">
import type { KakaoAuthData } from "@/types/hooks";
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

// state
const kakaoData = ref<KakaoAuthData>();

// ref
const raw = useTemplateRef("raw");

// session
const etcInflow = useSessionStorage<string | null>("etcInflow", null);

// computed
const session = computed(() => {
  return stores.session.signUp?.type === "KAKAO" ? stores.session.signUp : null;
});
const isKakaoPermalink = computed(() => {
  return etcInflow.value && /\/etc\/kakao-permalink/.test(etcInflow.value);
});

// 로그인에서 온건지 체크
const fromLogin = useCheckBackPath(useEtcRoute("/login"));

// api
const apiConnectToCi = useApiSignUpConnectToCi(uid);

// 연동하기
const connect = useDebounceFn(() => {
  if (!session.value) return;

  apiConnectToCi.mutate(
    {
      snsType: "KAKAO",
      snsId: String(session.value.data.user.id),
      ciKey: session.value.data.user.kakao_account.ci,
    },
    {
      onSuccess: () => {
        alertOpen({
          message: useT("alertMessage.015"),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();

                if (isKakaoPermalink.value && kakaoData.value) {
                  stores.session.$setSignUp(null);
                  raw.value?.kakaoLogin(kakaoData.value);
                } else {
                  stores.session.$setSignUp(null);
                  router.push(localePath("/"));
                }
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

// 연동하기 클릭
const connectClick = () => {
  connect();
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// init
const init = () => {
  if (
    stores.session.signUp?.type === "KAKAO" &&
    stores.session.signUp.data.agree
  ) {
    kakaoData.value = {
      token: stores.session.signUp.data.token,
      user: stores.session.signUp.data.user,
      agree: stores.session.signUp.data.agree,
    };
  }
};
</script>

<template>
  <ContentsSignUpCheckSession
    type="KAKAO"
    :check-path="`(${useEtcRoute('/sign-up')}|${useEtcRoute('/login')}|/m/join/kakao/permalink?.+|/etc/kakao-permalink?.+)`"
    :denied-path="fromLogin ? useEtcRoute('/login') : useEtcRoute('/sign-up')"
    @clear="init"
  >
    <div>
      <div
        class="border-top border-bottom inner mt-[2.8rem] px-8 md:mt-24 md:px-16"
      >
        <div class="titi fs-16 pt-[19.4rem] text-center md:pt-[22.6rem]">
          <p>
            다음 아이디로 가입된 회원 정보가 있습니다.<br />
            아래 버튼을 눌러 카카오 계정을 연동하시고<br />
            더욱 편리하게 이용해보세요.
          </p>
        </div>
        <div
          class="fs-16 mt-8 rounded-lg bg-primary-foreground p-12 text-center md:mx-auto md:flex md:w-[60rem] md:flex-row md:justify-center md:p-16"
        >
          <p class="font-bold text-primary md:ml-[.4rem]">
            {{ session?.data.ciCheck?.loginId }}
          </p>
        </div>

        <div class="btn-wrap mb-[9.4rem] mt-16 md:my-24">
          <a
            role="button"
            tabindex="0"
            class="btn-txt bg-[#fee500] font-bold md:!max-w-full"
            @click="connectClick"
            @keypress.enter.space="connectClick"
          >
            <i
              class="kakao mr-[.4rem] mt-[-.2rem] inline-block size-[2.8rem] bg-contain bg-center bg-no-repeat md:mr-[.8rem] md:mt-[-.4rem] md:size-16"
            ></i>
            카카오로 연동하기
          </a>
        </div>
      </div>
    </div>
  </ContentsSignUpCheckSession>

  <ContentsLoginViewKakaoRaw ref="raw" />

  <CommonAlert ref="alertLayer" />
</template>

<style lang="css" scoped>
.titi {
  background: url("@/assets/img/login/img-car-sucess.png") no-repeat center
    9.4rem / 8.4rem auto;
}
.kakao {
  background-image: url("@/assets/img/login/btn-login-kakao.png");
}

@media (min-width: 768px) {
  .titi {
    background: url("@/assets/img/login/img-car-sucess.png") no-repeat center
      6rem / 15rem auto;
  }
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
