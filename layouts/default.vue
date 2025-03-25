<script setup lang="ts">
// 스토어
const stores = {
  layout: useStoreLayout(),
};

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("");
  stores.layout.$setUseFooter(true);
  stores.layout.$setUseHeaderLine(false);
});
</script>

<template>
  <div class="layoutDefault">
    <slot />
  </div>
</template>
