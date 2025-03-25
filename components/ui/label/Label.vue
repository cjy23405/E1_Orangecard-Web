<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Label, type LabelProps } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <Label
    v-bind="delegatedProps"
    :class="
      cn(
        'block fs-14 text-[#343a40] font-bold mb-[1.2rem] peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        props.class,
      )
    "
  >
    <!-- text-sm font-medium leading-none -->
    <slot />
  </Label>
</template>
