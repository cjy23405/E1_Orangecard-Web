<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// props
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    type?: "orange" | "gray";
    isNotice?: boolean;
    isMini?: boolean;
  }>(),
  {
    class: "",
    type: "orange",
    isNotice: false,
    isMini: false,
  },
);
</script>

<template>
  <span
    :class="
      cn(
        [
          'badge fs-12 inline-block h-[2.4rem] rounded-lg text-center font-bold !leading-[2.4rem] md:h-[2.8rem] md:rounded-[1.4rem] md:!leading-[2.8rem]',
          type,
          {
            notice: isNotice,
            'px-[1.2rem] min-w-[4.5rem] md:!px-[1.6rem] md:min-w-[5.7rem]':
              isMini,
            'px-[.8rem] min-w-[3.7rem] md:!px-[1.2rem] md:min-w-[4.9rem]':
              !isMini,
          },
        ],
        props.class,
      )
    "
  >
    <slot />
  </span>
</template>

<style lang="css" scoped>
@tailwind components;
@layer components {
  .orange {
    @apply bg-primary-foreground text-primary;
  }
  .gray {
    @apply bg-gray-200 text-gray-800 px-[.8rem] !w-auto;
  }
  .notice {
    background: transparent url("@/assets/img/icon/ic-notice.png") no-repeat
      left center;
    background-size: 2rem auto;
    @apply h-[2rem] pl-[2.8rem] text-base !leading-[2rem] text-left !pr-0 text-right;
  }
}
</style>
