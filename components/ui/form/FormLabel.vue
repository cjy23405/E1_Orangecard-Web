<script setup lang="ts">
import type { LabelProps } from "radix-vue";
import type { HTMLAttributes } from "vue";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormField } from "./useFormField";

const props = defineProps<
  LabelProps & {
    class?: HTMLAttributes["class"];
    for?: string;
  }
>();

const { error, formItemId } = useFormField();
</script>

<template>
  <Label
    :class="cn(error && 'text-destructive', props.class)"
    :for="props.for || formItemId"
  >
    <slot />
  </Label>
</template>
