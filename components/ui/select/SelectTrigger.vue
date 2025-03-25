<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-vue-next";
import {
  SelectIcon,
  SelectTrigger,
  type SelectTriggerProps,
  useForwardProps,
} from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  SelectTriggerProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'ipt-select relative flex w-full rounded-lg border border-solid border-gray-300 text-lg text-gray-900 placeholder-gray-500 focus-visible:outline-none focus:border-gray-900 disabled:bg-gray-100 disabled:border-gray-300 disabled:cursor-not-allowed text-left bg-white',
        props.class,
      )
    "
  >
    <!-- flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start -->
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="size-4 shrink-0 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
<style lang="css" scoped>
@tailwind components;
@layer components {
  .ipt-select {
    background-image: url(@/assets/img/form/icon-arrow-down.png);
    background-position: right 2rem center;
    background-size: 2.4rem auto;
    line-height: 1;
    @apply md:h-[5.6rem] h-[4.8rem] bg-no-repeat text-lg md:text-xl md:py-[1.6rem] md:px-[2rem] py-[1.3rem] px-[1.6rem];
  }
  .ipt-select:disabled {
    background-image: url(@/assets/img/form/icon-arrow-down-dis.png);
    background-size: 2.4rem auto;
  }
  .ipt-select svg,
  .ipt-select img {
    display: none;
  }
}
</style>
