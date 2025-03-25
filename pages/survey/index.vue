<script setup lang="ts">
import type { SurveyQuery } from "@/types/components/contents/survey";

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

// route
const route = useRoute();

// computed
const query = computed((): SurveyQuery | null => {
  if (
    (!route.query.c && !route.query.P1 && !route.query.P2) ||
    typeof route.query.c === "string" ||
    (typeof route.query.P1 === "string" && typeof route.query.P2 === "string")
  ) {
    return { ...route.query };
  } else {
    return null;
  }
});
const id = computed(() => {
  return Number(query.value?.id);
});

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
  <ClientOnly>
    <ContentsSurveyIntro :id="id" :query="query" />
  </ClientOnly>
</template>
