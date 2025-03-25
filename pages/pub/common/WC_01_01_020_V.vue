<template>
  <div
    class="inner relative flex min-h-[80vh] flex-col justify-center !pb-[4.8rem] text-center md:min-h-[70vh] md:!pb-[6.4rem] md:!pt-0"
  >
    <p
      class="fs-16 nopage md:fs-18 font-normal text-gray-700 before:mb-[1.6rem] before:block before:h-[8.4rem] before:w-full before:bg-contain before:bg-center before:bg-no-repeat before:content-[''] md:before:h-60"
    >
      페이지를 찾을 수 없어요
    </p>
    <p class="fs-14 md:fs-16 mt-[1.6rem] text-gray-600">
      요청하신 페이지가 제거되었거나, 이름이 변경되었거나,<br />
      일시적으로 사용이 중단되었습니다.
    </p>
    <p class="btn-wrap absolute bottom-0 left-0 w-full px-8">
      <NuxtLink class="btn-txt gray">이전으로</NuxtLink>
      <NuxtLink class="btn-txt primary">메인으로</NuxtLink>
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
  layout: "sub",
});

onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("");
});
</script>
<style lang="css" scoped>
.nopage:before {
  background-image: url("@/assets/img/nopage.png");
}
</style>
