<script setup lang="ts">
// hook
const hookKakaoAuth = useHookKakaoAuth("signUpAuthenticationPopup");

// ref
const raw = useTemplateRef("raw");

// 카카오 인증
const kakaoAuth = () => {
  hookKakaoAuth
    ?.open()
    .then((data) => {
      raw.value?.kakaoCheck(data);
    })
    .catch(() => {});
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
  <a
    role="button"
    tabindex="0"
    class="btn-txt bg-[#fee500] font-bold md:!max-w-full"
    @click="kakaoClick"
    @keypress.enter.space="kakaoClick"
  >
    <i
      class="kakao mr-[.4rem] mt-[-.2rem] inline-block size-[2.8rem] bg-contain bg-center bg-no-repeat md:mr-[.8rem] md:mt-[-.4rem] md:size-16"
    ></i>
    카카오 인증
  </a>

  <ContentsSignUpVerificationKakaoRaw ref="raw" />
</template>

<style lang="css" scoped>
.kakao {
  background-image: url("@/assets/img/login/btn-login-kakao.png");
}
</style>
