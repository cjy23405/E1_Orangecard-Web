<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";

interface LottieProps {
  animationData?: object;
  animationLink?: string;
  loop?: boolean | number;
  autoPlay?: boolean;
  renderer?: string;
  rendererSettings?: object;
  width?: number | string;
  height?: number | string;
  speed?: number;
  delay?: number;
  direction?: string;
  pauseOnHover?: boolean;
  playOnHover?: boolean;
  noMargin?: boolean;
  scale?: number;
  backgroundColor?: string;
  pauseAnimation?: boolean;
  assetsPath?: string;
  onLoopComplete?: () => void;
  onEnterFrame?: () => void;
  onSegmentStart?: () => void;
  onComplete?: () => void;
  onAnimationLoaded?: () => void;
}

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// attrs
const attrs = useAttrs();

// props
const props = withDefaults(defineProps<LottieProps>(), {
  animationData: () => ({}),
  animationLink: "",
  loop: true,
  autoPlay: true,
  renderer: "",
  rendererSettings: () => ({}),
  width: "",
  height: "",
  speed: 1,
  delay: 0,
  direction: "",
  pauseOnHover: false,
  playOnHover: false,
  noMargin: false,
  scale: 1,
  backgroundColor: "",
  pauseAnimation: false,
  assetsPath: "",
  onLoopComplete: () => {},
  onEnterFrame: () => {},
  onSegmentStart: () => {},
  onComplete: () => {},
  onAnimationLoaded: () => {},
});

// computed
const delegatedProps = computed(() => {
  return { ...attrs, ...props };
});
</script>

<template>
  <ClientOnly>
    <Vue3Lottie v-bind="delegatedProps" />
  </ClientOnly>
</template>
