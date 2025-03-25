<script setup lang="ts">
// beforeunload
const beforeunload = (e: BeforeUnloadEvent) => {
  e.preventDefault();
  return false;
};

// life cycle
onMounted(() => {
  window.addEventListener("beforeunload", beforeunload);
});
onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", beforeunload);
});
</script>

<template>
  <slot />
</template>
