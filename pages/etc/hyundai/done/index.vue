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
  stores.layout.$setPageTitle("");
  stores.layout.$setUseFooter(false);
  stores.layout.$setUseHeaderLine(true);
});

// SEO
$setSEO({
  location: [useT("location.104")],
});
</script>

<template>
  <CommonCheckLogin>
    <ContentsBridgeView title="오렌지카드 등록이 완료되었습니다." />
  </CommonCheckLogin>
</template>
