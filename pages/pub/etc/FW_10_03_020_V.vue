<template>
  <div class="size-full">
    <loading
      :loading-text="'페이지 이동 중입니다.'"
      :loading-text2="'잠시만 기다려주세요.'"
      :nobg="true"
    ></loading>
  </div>
</template>
<script setup lang="ts">
import Loading from "@/components/pub/Loading.vue";
// 스토어
const stores = {
  layout: useStoreLayout(),
};

// 레이아웃 선택
definePageMeta({
  layout: "default",
});

onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("");
});
</script>
<style lang="css" scoped></style>
