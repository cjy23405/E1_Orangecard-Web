<script setup lang="ts">
// 레이아웃 선택
definePageMeta({
  layout: "etc",
});

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setPageTitle(useT("location.100"));
  stores.layout.$setUseFooter(false);
  stores.layout.$setUseHeaderLine(false);
  stores.layout.$setGnbActive("100");
});

// SEO
$setSEO({
  location: [useT("location.100")],
});
</script>

<template>
  <ContentsEtcCorporateTaxiLoginView />
</template>
