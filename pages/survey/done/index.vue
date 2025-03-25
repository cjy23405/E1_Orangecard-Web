<script setup lang="ts">
// 레이아웃 선택
definePageMeta({
  layout: "etc",
  validate: (route) => {
    return typeof route.query.id === "string" && /^\d+$/.test(route.query.id);
  },
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
  location: [useT("location.103")],
});
</script>

<template>
  <ContentsSurveyDoneView />
</template>
