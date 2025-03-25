<script setup lang="ts">
import { tabs } from "@/components/contents/customer/agreement/Tabs/initTabs";

// 레이아웃 선택
definePageMeta({
  layout: "sub",
});

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// route
const localePath = useLocalePath();
const router = useRouter();

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("004004");
  stores.layout.$setPageTitle(useT(tabs[0].name));

  // 상세로 연결
  router.replace(localePath(`/customer/agreement/0`));
});
</script>

<template>
  <div></div>
</template>
