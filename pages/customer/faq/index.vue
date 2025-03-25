<script setup lang="ts">
import type { FaqQuery } from "@/types/components/contents/customer/faq";

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
const query = computed((): FaqQuery => {
  return { ...route.query };
});

// 쿼리 변경
const changeQuery = (query: FaqQuery) => {
  router.push({
    query: {
      ...query,
    },
  });
};

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("004002");
  stores.layout.$setPageTitle(useT("location.004002"));
});

// SEO
$setSEO({
  location: [useT("location.004002"), useT("location.004")],
});
</script>

<template>
  <ContentsCustomerFaqList :query="query" @change-query="changeQuery" />
</template>
