<script setup lang="ts">
import type { LoginSetup } from "@/types/api";

// props
const props = defineProps<{
  callback?: LoginSetup["callback"];
}>();

// isKakaoTalk
const isKakaoTalk = useIsKakaoTalk();

// hook
const hookKakaoAuth = useHookKakaoAuth(
  isKakaoTalk ? "_self" : "loginAuthenticationPopup",
);

// session
const kakaoSelfLogin = useSessionStorage<string | null>("kakaoSelfLogin", null);

// ref
const raw = useTemplateRef("raw");

// 카카오 인증
const kakaoAuth = () => {
  if (isKakaoTalk) {
    kakaoSelfLogin.value = "login";
    hookKakaoAuth?.open();
  } else {
    hookKakaoAuth
      ?.open()
      .then((kakaoData) => {
        raw.value?.kakaoLogin(kakaoData, props.callback);
      })
      .catch(() => {});
  }
};

// 카카오 인증 클릭
const kakaoClick = useDebounceFn(() => {
  kakaoAuth();
}, 300);

// life cycle
onBeforeUnmount(() => {
  hookKakaoAuth?.clear();
});
</script>

<template>
  <div class="btn-wrap mt-[3.2rem] md:mt-16">
    <a
      role="button"
      tabindex="0"
      class="btn-txt bg-[#fee500] font-bold md:!max-w-full"
      @click="kakaoClick"
      @keypress.enter.space="kakaoClick"
    >
      <i
        class="kakao mr-[.4rem] mt-[-.2rem] inline-block size-[2.8rem] bg-contain bg-center bg-no-repeat"
      ></i
      >카카오 로그인
    </a>

    <CommonAlert ref="alertLayer" />

    <ContentsLoginViewKakaoRaw ref="raw" />
  </div>
</template>

<style lang="css" scoped>
.kakao {
  background-image: url("@/assets/img/login/btn-login-kakao.png");
}
</style>
