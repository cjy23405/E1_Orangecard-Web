<script setup lang="ts">
import type { PointQuery } from "@/types/components/contents/etc/corporate-taxi/point";

// 레이아웃 선택
definePageMeta({
  layout: "etc",
});

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// route
const route = useRoute();
const router = useRouter();

// computed
const query = computed((): PointQuery => {
  return { ...route.query };
});

// 쿼리 변경
const changeQuery = (query: PointQuery) => {
  router.push({
    query: {
      ...query,
    },
  });
};

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setPageTitle(useT("location.100001"));
  stores.layout.$setUseFooter(false);
  stores.layout.$setUseHeaderLine(false);
  stores.layout.$setGnbActive("100");
});

// SEO
$setSEO({
  location: [useT("location.100001"), useT("location.100")],
});
</script>

<template>
  <CommonCheckCorpTaxiLogin>
    <ContentsEtcCorporateTaxiPointList
      :query="query"
      @change-query="changeQuery"
    />
  </CommonCheckCorpTaxiLogin>
</template>
