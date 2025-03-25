<script setup lang="ts">
// route
const route = useRoute();

// setup
const setup = () => {
  useHookNaverAuthSetup(route.query.useagree === "true");
};

// life cycle
onMounted(() => {
  setup();

  document.addEventListener("naverSDKLoaded", setup);
});

onBeforeUnmount(() => {
  document.removeEventListener("naverSDKLoaded", setup);
});
</script>

<template>
  <div></div>
</template>
