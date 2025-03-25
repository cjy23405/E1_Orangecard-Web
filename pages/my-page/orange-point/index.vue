<script setup lang="ts">
import type { OrangePointQuery } from "@/types/components/contents/my-page/orange-point";

// 레이아웃 선택
definePageMeta({
  layout: "sub",
});

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// route
const route = useRoute();
const router = useRouter();

// computed
const query = computed((): OrangePointQuery => {
  return { ...route.query };
});

// 쿼리 변경
const changeQuery = (query: OrangePointQuery) => {
  router.push({
    query: {
      ...query,
    },
  });
};

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle(useT("location.202001"));
});

// SEO
$setSEO({
  location: [useT("location.202001"), useT("location.202")],
});
</script>

<template>
  <CommonCheckLogin>
    <ContentsMyPageOrangePointList :query="query" @change-query="changeQuery" />
  </CommonCheckLogin>
</template>
