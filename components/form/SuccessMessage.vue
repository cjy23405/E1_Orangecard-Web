<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { useFormField } from "@/components/ui/form/useFormField";

// form field
const { error, valid, isTouched } = useFormField();

// props
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    message?: string;
  }>(),
  {
    class: "",
    message: "",
  },
);
</script>

<template>
  <p
    v-if="!error && isTouched && valid && message"
    :class="
      cn(
        'error-txt mt-[.8rem] pl-[.8rem] text-sm text-e1evgreen md:text-base',
        props.class,
      )
    "
  >
    {{ message }}
  </p>
</template>
