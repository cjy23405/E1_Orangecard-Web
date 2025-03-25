<script setup lang="ts">
import { cn } from "@/lib/utils";
import { AlertDialogTitle, type AlertDialogTitleProps } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  AlertDialogTitleProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AlertDialogTitle
    v-bind="delegatedProps"
    :class="
      cn(
        ' text-gray-900 border-b border-solid border-border py-[1.5rem] font-bold text-xl md:py-[2.4rem] md:text-2xl mb-0',
        props.class,
      )
    "
  >
    <slot />
  </AlertDialogTitle>
</template>
