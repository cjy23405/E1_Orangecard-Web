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
    isSmall?: boolean;
    isBigMargin?: boolean;
  }>(),
  {
    class: "",
    isSmall: false,
    isBigMargin: false,
  },
);
</script>

<template>
  <li
    :class="
      cn(
        [
          'round-box pb-[1.6rem] md:px-16 md:py-12',
          {
            'px-8 pt-8': !isSmall,
            'px-[1.6rem] pt-[1.3rem]': isSmall,
            'mb-[.8rem]': !isBigMargin,
            'mb-[1.2rem]': isBigMargin,
          },
        ],
        props.class,
      )
    "
  >
    <slot />
  </li>
</template>
