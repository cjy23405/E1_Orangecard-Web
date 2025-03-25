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
  stores.layout.$setPageTitle(useT("location.101"));
  stores.layout.$setUseFooter(false);
  stores.layout.$setUseHeaderLine(false);
});

// SEO
$setSEO({
  location: [useT("location.101")],
});
</script>

<template>
  <CommonCheckLogin>
    <ContentsEtcLotteAutoCardView />
  </CommonCheckLogin>
</template>
