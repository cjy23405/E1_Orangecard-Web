<template>
  <div class="bg">
    <div class="inner -mb-16 md:-mb-48">
      <div class="mx-auto pb-48 pt-[3.2rem] md:pb-[23rem]">
        <section-1 class="px-8 md:px-0"></section-1>
        <section-2 class="px-8 md:px-0"></section-2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import section1 from "@/components/pub/Introduction/titi/section1.vue";
import section2 from "@/components/pub/Introduction/titi/section2.vue";
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
  stores.layout.$setGnbActive("001002");
  stores.layout.$setPageTitle("&#logo#&캐릭터 티티 소개");
});
</script>
<style lang="css" scoped>
.bg {
  background: #fff url("@/assets/img/introduction/bg-m-introduce-titi.png")
    no-repeat 0 50% / 100% 100%;
}
@media (min-width: 768px) {
  .bg {
    background: #fff url("@/assets/img/introduction/bg-introduce-titi.png")
      no-repeat 0 50% / 100% 2710px;
  }
}
</style>
