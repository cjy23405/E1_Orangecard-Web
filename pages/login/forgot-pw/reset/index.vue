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
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle(useT("location.201002"));
});

// SEO
$setSEO({
  location: [useT("location.201002"), useT("location.201")],
});
</script>

<template>
  <ContentsLoginForgotPwResetView />
</template>
