<script setup lang="ts">
import type { KakaoAuthData } from "@/types/hooks";

// 스토어
const stores = {
  session: useStoreSession(),
};

// route
const localePath = useLocalePath();

// state
const id = ref("");
const kakaoData = ref<KakaoAuthData>();

// ref
const raw = useTemplateRef("raw");

// session
const etcInflow = useSessionStorage<string | null>("etcInflow", null);

// computed
const isKakaoPermalink = computed(() => {
  return etcInflow.value && /\/etc\/kakao-permalink/.test(etcInflow.value);
});

// kakao login
const kakaoLogin = useDebounceFn(() => {
  if (!kakaoData.value) return;
  raw.value?.kakaoLogin(kakaoData.value);
}, 300);

// init
const init = () => {
  id.value = stores.session.signUp?.completeId || "";

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

  stores.session.$setSignUp(null);
};
</script>

<template>
  <ContentsSignUpCheckSession
    :check-path="`(${useEtcRoute('/sign-up/profile')}|${useEtcRoute('/sign-up')}|${useEtcRoute('/sign-up/kakao-enter-id')}|${useEtcRoute('/sign-up/kakao-verify-phone')}|${useEtcRoute('/login')}|/auth/kakao/callback?.+)`"
    :denied-path="useEtcRoute('/login')"
    @clear="init"
  >
    <div>
      <div
        class="border-top border-bottom inner mt-[2.8rem] px-8 md:mt-24 md:px-16"
      >
        <div class="titi fs-16 pt-[19.4rem] text-center md:pt-[22.6rem]">
          <p>오렌지카드 회원 가입이 완료되었습니다.</p>
          <p>로그인 후 이용해주세요.</p>
        </div>
        <div
          class="fs-16 mt-8 rounded-lg bg-primary-foreground p-12 text-center md:mx-auto md:flex md:w-[60rem] md:flex-row md:justify-center md:p-16"
        >
          <p>오렌지카드 온라인 회원 아이디</p>
          <p class="font-bold text-primary md:ml-[.4rem]">
            {{ id }}
          </p>
        </div>
        <div class="btn-wrap mb-[9.4rem] mt-16 md:my-24">
          <a
            v-if="isKakaoPermalink"
            role="button"
            tabindex="0"
            class="btn-txt primary"
            @click="kakaoLogin"
            @keypress.enter.space="kakaoLogin"
          >
            로그인
          </a>
          <NuxtLink
            v-else
            :to="localePath(useEtcRoute('/login'))"
            class="btn-txt primary"
          >
            로그인
          </NuxtLink>
        </div>
      </div>
    </div>
  </ContentsSignUpCheckSession>

  <ContentsLoginViewKakaoRaw ref="raw" />
</template>

<style lang="css" scoped>
.titi {
  background: url("@/assets/img/login/img-membership-comp.png") no-repeat center
    8.4rem / 9.4rem auto;
}
@media (min-width: 768px) {
  .titi {
    background: url("@/assets/img/login/img-membership-comp.png") no-repeat
      center 6rem / 15rem auto;
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
