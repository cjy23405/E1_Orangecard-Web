<script setup lang="ts">
import type { HTMLAttributes, InputHTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { useVModel } from "@vueuse/core";

interface Props extends /* @vue-ignore */ Omit<InputHTMLAttributes, "class"> {
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
}

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// props
const props = defineProps<Props>();

// emits
const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

// ref
const el = useTemplateRef("el");

// expose
defineExpose({
  el,
});
</script>

<template>
  <input
    ref="el"
    v-model="modelValue"
    :class="
      cn(
        'relative flex w-full rounded-lg border border-solid border-gray-300 text-lg text-gray-900 placeholder-gray-500 focus-visible:outline-none focus:border-gray-900 disabled:bg-gray-100 disabled:border-gray-300 disabled:cursor-not-allowed disabled:text-gray-600',
        props.class,
      )
    "
    v-bind="$attrs"
  />
</template>

<style lang="css" scoped>
@tailwind components;
@layer components {
  input {
    @apply md:h-[5.6rem] h-[4.8rem] bg-no-repeat text-lg md:text-xl md:py-[1.6rem] md:px-[2rem] py-[1.3rem] px-[1.5rem];
  }
  input.error {
    border-color: #f13434;
  }
}
</style>
