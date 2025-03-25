<script setup lang="ts">
// life cycle
onMounted(() => {
  useHookKakaoAuthSetup();

  document.addEventListener("kakaoSDKLoaded", useHookKakaoAuthSetup);
});

onBeforeUnmount(() => {
  document.removeEventListener("kakaoSDKLoaded", useHookKakaoAuthSetup);
});
</script>

<template>
  <div></div>
</template>
