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
  stores.layout.$setPageTitle(useT("location.201"));
  stores.layout.$setUseFooter(true);
  stores.layout.$setUseHeaderLine(false);
});

// SEO
$setSEO({
  location: [useT("location.201")],
});
</script>

<template>
  <ContentsLoginView />
</template>
