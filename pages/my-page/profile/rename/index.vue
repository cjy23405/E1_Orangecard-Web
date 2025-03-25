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
  stores.layout.$setPageTitle(useT("location.202005001"));
});

// SEO
$setSEO({
  location: [
    useT("location.202005001"),
    useT("location.202005"),
    useT("location.202"),
  ],
});
</script>

<template>
  <CommonCheckLogin>
    <ContentsMyPageProfileRenameVerification />
  </CommonCheckLogin>
</template>
