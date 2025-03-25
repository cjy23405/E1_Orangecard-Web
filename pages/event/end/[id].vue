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
  stores.layout.$setGnbActive("003002");
  stores.layout.$setPageTitle("종료이벤트");
});
</script>

<template>
  <ContentsEventEndDetail :id="Number(route.params.id)" />
</template>
