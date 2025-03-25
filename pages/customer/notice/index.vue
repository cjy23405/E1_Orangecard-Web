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
  stores.layout.$setGnbActive("004001");
  stores.layout.$setPageTitle(useT("location.004001"));
});

// SEO
$setSEO({
  location: [useT("location.004001"), useT("location.004")],
});
</script>

<template>
  <ContentsCustomerNoticeList />
</template>
