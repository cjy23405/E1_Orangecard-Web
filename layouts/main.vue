<script setup lang="ts">
// 스토어
const stores = {
  layout: useStoreLayout(),
};

// state
const init = ref(false);

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("");
  stores.layout.$setUseFooter(true);
  stores.layout.$setUseHeaderLine(false);
});
onMounted(() => {
  init.value = true;
});
</script>

<template>
  <div class="layoutMain">
    <LayoutHeader />
    <div class="cont !p-0">
      <slot />
    </div>
    <LayoutFooter v-if="stores.layout.useFooter" :init="init" />
  </div>
</template>
