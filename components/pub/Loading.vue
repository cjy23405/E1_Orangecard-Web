<template>
  <div
    class="fixed left-0 top-0 z-[9999] flex size-full flex-col justify-center"
    :class="{ 'bg-black/50': !props.nobg }"
  >
    <LottieAnimation
      :animation-data="animationData"
      class="!size-32 md:!size-60"
    />
    <div class="fs-16 md:fs-18 mt-[1.6rem] text-center">
      <p v-if="loadingText">{{ loadingText }}</p>
      <p v-if="loadingText2">{{ loadingText2 }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import loadingJson from "@/assets/json/loading.json";
const animationData = ref(loadingJson);

const props = defineProps<{
  loadingText?: string;
  loadingText2?: string;
  nobg?: boolean;
}>();
</script>
