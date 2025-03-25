<script setup lang="ts">
import type { AgreementQuery } from "@/types/components/contents/customer/agreement";
import { tabs } from "@/components/contents/customer/agreement/Tabs/initTabs";

// 레이아웃 선택
definePageMeta({
  layout: "sub",
  key: "/customer/agreement/:tab",
  validate: (route) => {
    return (
      typeof route.params.tab === "string" && /^\d+$/.test(route.params.tab)
    );
  },
});

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// route
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();

// computed
const query = computed((): AgreementQuery => {
  return { ...route.query };
});

// 탭 변경
const changeTab = (tab: number) => {
  stores.layout.$setPageTitle(useT(tabs[tab].name));
  router.push(localePath(`/customer/agreement/${tab}`));
};

// 쿼리 변경
const changeQuery = (query: AgreementQuery) => {
  router.push({
    query: {
      ...query,
    },
  });
};

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("004004");

  if (Number(route.params.tab) < tabs.length) {
    stores.layout.$setPageTitle(useT(tabs[Number(route.params.tab)].name));
  } else {
    stores.layout.$setPageTitle(useT(tabs[0].name));
  }
});
</script>

<template>
  <ContentsCustomerAgreementTabs
    :tab="Number(route.params.tab)"
    :query="query"
    @change-tab="changeTab"
    @change-query="changeQuery"
  />
</template>
