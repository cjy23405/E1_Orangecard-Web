<script setup lang="ts">
import { cn } from "@/lib/utils";
import {
  CalendarHeadCell,
  type CalendarHeadCellProps,
  useForwardProps,
} from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  CalendarHeadCellProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <CalendarHeadCell
    :class="
      cn('rounded-md text-sm font-normal text-muted-foreground', props.class)
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeadCell>
</template>

<style lang="css" scoped>
thead th {
  height: 2rem;
}
</style>
