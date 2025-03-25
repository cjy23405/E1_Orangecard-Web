<template>
  <div
    class="inner relative flex min-h-[80vh] flex-col justify-center text-center md:min-h-[70vh] md:!pt-0"
  >
    <p
      class="fs-16 check font-bold text-gray-700 before:mb-[1.6rem] before:block before:h-[8.4rem] before:w-full before:bg-contain before:bg-center before:bg-no-repeat before:content-[''] md:before:h-60"
    >
      서비스 점검 중
    </p>
    <p class="fs-14 mt-[1.6rem] text-gray-600">
      더욱 원활한 서비스 제공을 위해 점검을 실시합니다.<br />
      점검시간동안 홈페이지 이용이 어려운 점<br />
      양해 부탁드립니다.
    </p>
    <p class="border-top fs-14 mt-8 block pt-8 font-bold text-primary">
      2024년 11월 27일 00:00 ~ 2024년 11월 27일 02:00
    </p>
  </div>
</template>
<script setup lang="ts">
// 스토어
const stores = {
  layout: useStoreLayout(),
};

// 레이아웃 선택
definePageMeta({
  layout: "default",
});

onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("");
});
</script>
<style lang="css" scoped>
.check:before {
  background-image: url("@/assets/img/check.png");
}
</style>
