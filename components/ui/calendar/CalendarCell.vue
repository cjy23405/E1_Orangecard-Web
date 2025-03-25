<script setup lang="ts">
import { cn } from "@/lib/utils";
import {
  CalendarCell,
  type CalendarCellProps,
  useForwardProps,
} from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  CalendarCellProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <CalendarCell
    :class="
      cn(
        'relative h-14 w-12 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md  [&:has([data-selected][data-outside-view])]:bg-accent/50',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <!-- [&:has([data-selected])]:bg-accent -->
    <slot />
  </CalendarCell>
</template>
