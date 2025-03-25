<script setup lang="ts">
import type { StationPointQuery } from "@/types/components/contents/my-page/station-point";

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
const query = computed((): StationPointQuery => {
  return { ...route.query };
});

// 쿼리 변경
const changeQuery = (query: StationPointQuery) => {
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
  stores.layout.$setPageTitle(useT("location.202002"));
});

// SEO
$setSEO({
  location: [useT("location.202002"), useT("location.202")],
});
</script>

<template>
  <CommonCheckLogin>
    <ContentsMyPageStationPointList
      :query="query"
      @change-query="changeQuery"
    />
  </CommonCheckLogin>
</template>
