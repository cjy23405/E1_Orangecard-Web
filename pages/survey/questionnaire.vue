<script setup lang="ts">
import type { SurveyQuery } from "@/types/components/contents/survey";

// 레이아웃 선택
definePageMeta({
  layout: "etc",
  key: "/survey/:id/:no",
  validate: (route) => {
    const checkId =
      typeof route.query.id === "string" && /^\d+$/.test(route.query.id);
    const checkNo =
      typeof route.query.no === "string" && /^\d+$/.test(route.query.no);
    return checkId && checkNo;
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
  return { ...route.query };
});
const id = computed(() => {
  return Number(query.value?.id);
});
const no = computed(() => {
  return Number(query.value?.no);
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
    <ContentsSurveyQuestionnaire :id="id" :no="no" />
  </ClientOnly>
</template>
