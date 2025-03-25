<template>
  <div>
    <div
      class="border-top border-bottom inner mt-[2.8rem] flex min-h-[60vh] flex-col justify-center px-8 md:mt-24 md:px-16"
    >
      <div class="fs-16 text-center">
        <p>
          회원님의 소중한 개인정보를 보호하기 위해
          <span class="block md:inline"> 한번 더 인증해주세요.</span>
        </p>
      </div>
      <div v-if="type === 'kakao'" class="gray-box">
        <NuxtLink class="btn-auth kakao">카카오로 인증하기</NuxtLink>
      </div>
      <div v-else-if="type === 'naver'" class="gray-box">
        <NuxtLink class="btn-auth naver">네이버로 인증하기</NuxtLink>
      </div>
      <div v-else>
        <div class="mt-16 md:mx-auto md:w-[60rem]">
          <input-item
            :type="'password'"
            :placeholder="'비밀번호를 입력해주세요.'"
            :error-text="'비밀번호를 확인해주세요.'"
          ></input-item>
        </div>
        <div class="btn-wrap mb-[8.3rem] mt-16 md:my-24">
          <NuxtLink class="btn-txt primary">확인</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import InputItem from "@/components/pub/InputItem.vue";
// 스토어
const stores = {
  layout: useStoreLayout(),
};

// 레이아웃 선택
definePageMeta({
  layout: "sub",
});

onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("비밀번호 확인");
});

const type = ref("naver");
</script>
<style lang="css" scoped>
@tailwind components;
@layer components {
  .gray-box {
    @apply mt-16 flex h-[6rem] md:h-[7.2rem] w-full flex-row items-center justify-center text-center md:mx-auto md:w-[60rem];
  }
  .btn-auth {
    @apply relative pl-[4rem] md:pl-[6rem] before:content-[''] before:absolute before:size-[3rem] before:top-1/2 before:left-[0rem] before:-translate-y-1/2 md:before:size-[4rem] text-lg leading-[2.2rem] block font-bold md:text-2xl md:leading-[2.8rem];
  }
  .kakao::before {
    background: url("@/assets/img/mypage/btn-login-kakao.png") no-repeat center
      center/100% auto;
  }
  .naver::before {
    background: url("@/assets/img/mypage/btn-login-naver.png") no-repeat center
      center/100% auto;
  }
}
@media (min-width: 768px) {
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
