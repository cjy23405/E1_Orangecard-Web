<template>
  <span
    class="badge fs-12 inline-block h-[2.4rem] rounded-lg text-center font-bold !leading-[2.4rem] md:h-[2.8rem] md:rounded-[1.4rem] md:!leading-[2.8rem]"
    :class="{
      orange: props.type === 'orange',
      gray: props.type === 'gray',
      notice: props.isNotice,
      'px-[1.2rem]': props.isMini,
      'min-w-[4.5rem]': props.isMini,
      'md:!px-[1.6rem]': props.isMini,
      'md:min-w-[5.7rem]': props.isMini,
      'px-[.8rem]': !props.isMini,
      'min-w-[3.7rem]': !props.isMini,
      'md:!px-[1.2rem]': !props.isMini,
      'md:min-w-[4.9rem]': !props.isMini,
    }"
  >
    <slot />
  </span>
</template>
<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

const props = withDefaults(
  defineProps<{
    type?: string;
    isNotice?: boolean;
    isMini?: boolean;
  }>(),
  {
    type: "orange",
    isNotice: false,
    isMini: false,
  },
);
</script>
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
