<script setup lang="ts">
// 스토어
const stores = {
  auth: useStoreAuth(),
};

// computed
const isCorpTaxiAuthenticated = computed(() => {
  return stores.auth.isCorpTaxiAuthenticated;
});

// check login
const checkLogin = () => {
  if (!isCorpTaxiAuthenticated.value) {
    $corpTaxiLogout();
    $replaceCorpTaxiLogin();
  }
};

// watch
watch(isCorpTaxiAuthenticated, () => {
  checkLogin();
});

// life cycle
onMounted(() => {
  checkLogin();
});
</script>

<template>
  <ClientOnly>
    <slot v-if="isCorpTaxiAuthenticated" />
  </ClientOnly>
</template>
