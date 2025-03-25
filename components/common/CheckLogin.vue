<script setup lang="ts">
// 스토어
const stores = {
  auth: useStoreAuth(),
};

// computed
const isAuthenticated = computed(() => {
  return stores.auth.isAuthenticated;
});

// check login
const checkLogin = () => {
  if (!isAuthenticated.value) {
    $replaceLogin();
  }
};

// watch
watch(isAuthenticated, () => {
  checkLogin();
});

// life cycle
onMounted(() => {
  checkLogin();
});
</script>

<template>
  <ClientOnly>
    <slot v-if="isAuthenticated" />
  </ClientOnly>
</template>
