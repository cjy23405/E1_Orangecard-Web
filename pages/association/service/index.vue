<script setup lang="ts">
import type { AssociationServiceQuery } from "@/types/components/contents/association/service";

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
const query = computed((): AssociationServiceQuery => {
  return { ...route.query };
});

// 쿼리 변경
const changeQuery = (query: AssociationServiceQuery) => {
  router.push({
    query: {
      ...query,
    },
  });
};

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("002002");
  stores.layout.$setPageTitle(useT("location.002002"));
});

// SEO
$setSEO({
  location: [useT("location.002002"), useT("location.002")],
});
</script>

<template>
  <ContentsAssociationServiceList :query="query" @change-query="changeQuery" />
</template>
