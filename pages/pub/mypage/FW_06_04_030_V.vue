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
            2024-12-01 연결완료
          </p>
          <NuxtLink class="btn-mini primary">해제하기</NuxtLink>
        </div>
        <div class="gray-box naver relative mt-[.8rem] md:mt-[1.6rem]">
          <p class="fs-16 font-bold md:text-2xl md:leading-[2.8rem]">네이버</p>
          <p
            class="fs-12 date-text text-gray-800 md:mt-[.6rem] md:text-lg md:leading-[2.2rem]"
          >
            연결정보가 없습니다.
          </p>
          <NuxtLink class="btn-mini">연결하기</NuxtLink>
        </div>
        <ul class="list-dot mt-[.8rem] text-gray-600 md:mt-[1.6rem]">
          <li>
            타인의 기기에서 사용하실때는 SNS 계정의 로그아웃 상태를 반드시
            확인해주세요.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
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
  stores.layout.$setPageTitle("간편 로그인 설정");
});
</script>
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
