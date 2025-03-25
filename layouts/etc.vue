<script setup lang="ts">
// 스토어
const stores = {
  layout: useStoreLayout(),
};

// state
const init = ref(false);

// computed
const pageTitle = computed(() => {
  return usePageTitle(stores.layout.pageTitle);
});

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setUseFooter(true);
  stores.layout.$setUseHeaderLine(false);
});
onMounted(() => {
  init.value = true;
});
</script>

<template>
  <div class="layoutEtc">
    <LayoutHeader page-type="etc" />
    <div class="cont">
      <!-- eslint-disable vue/no-v-html -->
      <h2
        v-if="pageTitle"
        class="block text-center text-6xl font-medium text-gray-900 md:text-9xl"
        v-html="pageTitle"
      ></h2>
      <slot />
    </div>
    <LayoutFooter v-if="stores.layout.useFooter" page-type="sub" :init="init" />
  </div>
</template>
