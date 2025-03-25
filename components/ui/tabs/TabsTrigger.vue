<script setup lang="ts">
import { cn } from "@/lib/utils";
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  TabsTriggerProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'trigger md:fs-14 fs-16 tabs-trigger relative inline-flex flex-1 items-center justify-center whitespace-nowrap p-[1.2rem] font-medium text-gray-900 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:font-bold data-[state=active]:text-primary data-[state=active]:!border-primary border-b border-solid border-gray-300 md:p-[1.5rem]',
        props.class,
      )
    "
  >
    <span class="truncate">
      <slot />
    </span>
  </TabsTrigger>
</template>

<style lang="css" scoped>
.trigger[data-state="active"] {
  border-bottom: 2px solid hsl(var(--primary));
  outline: none;
}
</style>
