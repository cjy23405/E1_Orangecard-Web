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
  stores.layout.$setGnbActive("001001");
  stores.layout.$setPageTitle(useT("location.001001"));
});

// SEO
$setSEO({
  location: [useT("location.001001"), useT("location.001")],
});
</script>

<template>
  <div class="section-bg -mb-16 overflow-hidden md:mb-0">
    <ContentsAboutPointCardInfo />
    <ContentsAboutPointCardMember />
    <ContentsAboutPointCardOrangeCard />
    <ContentsAboutPointCardPoint />
  </div>
</template>

<style lang="css" scoped>
.section-bg {
  background: #fff url("@/assets/img/introduction/bg-m-introduce-oca.png")
    no-repeat 0 50% / 100% 100%;
}
@media (min-width: 768px) {
  .section-bg {
    background: #fff url("@/assets/img/introduction/bg-introduce-oca.png")
      no-repeat 0 50% / 100% 2990px;
  }
}
</style>
