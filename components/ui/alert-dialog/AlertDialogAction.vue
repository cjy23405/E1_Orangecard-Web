<script setup lang="ts">
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertDialogAction, type AlertDialogActionProps } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  AlertDialogActionProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AlertDialogAction
    v-bind="delegatedProps"
    :class="
      cn(
        buttonVariants(),
        'btn-txt primary small focus-visible:ring-0 focus-visible:ring-transparent md:max-w-lg',
        props.class,
      )
    "
  >
    <slot />
  </AlertDialogAction>
</template>
