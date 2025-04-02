<script setup lang="ts">
import loadingJson from "@/assets/json/loading.json";

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// lottie
const animationData = ref(loadingJson);

// computed
const useLoading = computed(() => {
  return stores.layout.useLoading;
});

// watch
watch(useLoading, () => {
  if (useLoading.value) {
    stores.layout.$setUseLoading(false);
  }
});

// life cycle
onBeforeMount(() => {
  stores.layout.$setUseLoading(false);
});
onBeforeUnmount(() => {
  stores.layout.$setUseLoading(true);
});
</script>

<template>
  <div class="fixed left-0 top-0 z-0 flex size-full flex-col justify-center">
    <LottieAnimation
      :animation-data="animationData"
      class="!size-32 md:!size-60"
    />
    <div class="fs-16 md:fs-18 mt-[1.6rem] text-center">
      <p>
        페이지 이동 중입니다.<br />
        잠시만 기다려주세요.
      </p>
    </div>
  </div>
</template>
