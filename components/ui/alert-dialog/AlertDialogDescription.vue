<script setup lang="ts">
import { cn } from "@/lib/utils";
import {
  AlertDialogDescription,
  type AlertDialogDescriptionProps,
} from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  AlertDialogDescriptionProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AlertDialogDescription
    v-bind="delegatedProps"
    :class="
      cn(
        'text-lg py-[4rem] px-[2rem] text-muted-foreground md:py-[4.8rem] md:px-[2.8rem] md:text-xl ',
        props.class,
      )
    "
  >
    <slot />
  </AlertDialogDescription>
</template>
