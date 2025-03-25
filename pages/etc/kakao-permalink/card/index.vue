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
  stores.layout.$setPageTitle(useT("location.102"));
  stores.layout.$setUseFooter(false);
  stores.layout.$setUseHeaderLine(false);
});

// SEO
$setSEO({
  location: [useT("location.102")],
});
</script>

<template>
  <CommonCheckLogin>
    <ContentsEtcKakaoPermalinkCardView />
  </CommonCheckLogin>
</template>
