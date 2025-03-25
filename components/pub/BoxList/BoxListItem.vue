<template>
  <li
    class="round-box pb-[1.6rem] md:px-16 md:py-12"
    :class="{
      'px-8': !props.isSmall,
      'pt-8': !props.isSmall,
      'px-[1.6rem]': props.isSmall,
      'pt-[1.3rem]': props.isSmall,
      'mb-[.8rem]': !props.isBigMargin,
      'mb-[1.2rem]': props.isBigMargin,
    }"
  >
    <slot />
  </li>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

const props = withDefaults(
  defineProps<{
    isSmall?: boolean;
    isBigMargin?: boolean;
  }>(),
  {
    isSmall: false,
    isBigMargin: false,
  },
);
</script>
