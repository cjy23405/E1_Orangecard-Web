<script setup lang="ts">
// 레이아웃 선택
definePageMeta({
  layout: "sub",
  validate: (route) => {
    return typeof route.params.id === "string" && /^\d+$/.test(route.params.id);
  },
});

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// route
const route = useRoute();

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("004001");
  stores.layout.$setPageTitle(useT("location.004001"));
});
</script>

<template>
  <ContentsCustomerNoticeDetail :id="Number(route.params.id)" />
</template>
