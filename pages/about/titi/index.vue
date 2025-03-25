<script setup lang="ts">
// 레이아웃 선택
definePageMeta({
  layout: "sub",
});

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("001002");
  stores.layout.$setPageTitle(
    `${useT("location.001002000")} ${useT("location.001002")}`,
  );
});

// SEO
$setSEO({
  location: [useT("location.001002"), useT("location.001")],
});
</script>

<template>
  <div class="bg">
    <div class="inner -mb-16 md:-mb-48">
      <div class="mx-auto pb-48 pt-[3.2rem] md:pb-[23rem]">
        <ContentsAboutTitiMascot />
        <ContentsAboutTitiWallpaper />
      </div>
    </div>
  </div>
</template>

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
