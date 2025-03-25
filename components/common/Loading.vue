<script setup lang="ts">
import { useIsFetching, useIsMutating } from "@tanstack/vue-query";
import loadingJson from "@/assets/json/loading.json";

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// lottie
const animationData = ref(loadingJson);

// api 로딩 여부
const isFetching = useIsFetching();
const isMutating = useIsMutating({
  predicate: (mutation) => {
    if (
      Array.isArray(mutation.options.mutationKey) &&
      mutation.options.mutationKey[0] === "signUpIdCheck"
    ) {
      return false;
    } else {
      return true;
    }
  },
});

// state
const isShow = ref(false);

// watch
watch([isFetching, isMutating], () => {
  if (isFetching.value + isMutating.value === 0) {
    isShow.value = false;
  } else {
    isShow.value = true;
  }
});
</script>

<template>
  <div
    v-show="stores.layout.useLoading && isShow"
    class="fixed left-0 top-0 z-[9999] flex size-full flex-col justify-center bg-black/50"
  >
    <LottieAnimation
      :animation-data="animationData"
      class="!size-32 md:!size-60"
    />
  </div>
</template>
