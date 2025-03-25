<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div :class="cn('flex-row flex w-full ', props.class)" class="btn-wrap">
    <slot class="px-[1.6rem] pb-[1.6rem] md:px-[2.4rem] md:pb-[2.4rem]" />
  </div>
</template>
