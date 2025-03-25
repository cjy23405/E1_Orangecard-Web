<script setup lang="ts">
import type { AssociationCardQuery } from "@/types/components/contents/association/card";

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
const query = computed((): AssociationCardQuery => {
  return { ...route.query };
});

// 쿼리 변경
const changeQuery = (query: AssociationCardQuery) => {
  router.push({
    query: {
      ...query,
    },
  });
};

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("002001");
  stores.layout.$setPageTitle(useT("location.002001"));
});

// SEO
$setSEO({
  location: [useT("location.002001"), useT("location.002")],
});
</script>

<template>
  <ContentsAssociationCardList :query="query" @change-query="changeQuery" />
</template>
