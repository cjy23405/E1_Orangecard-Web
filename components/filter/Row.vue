<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// props
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    labelAttrs?: HTMLAttributes;
    label?: string;
    for?: string;
  }>(),
  {
    class: "",
    labelAttrs: () => ({}),
    label: "",
    for: "",
  },
);

// computed
const bindLabelAttrs = computed(() => {
  const notKeys = ["class"];
  const attr = useObjectFilter({ ...props.labelAttrs }, (el, key) => {
    return notKeys.indexOf(String(key)) === -1;
  });

  return attr;
});
</script>

<template>
  <div :class="cn('ipt-wrap', props.class)" v-bind="$attrs">
    <label
      v-if="label"
      :for="props.for"
      :class="
        cn(
          'relative mb-[.8rem] block font-bold text-gray-800 md:mb-0',
          labelAttrs.class,
        )
      "
      v-bind="bindLabelAttrs"
    >
      {{ label }}
    </label>
    <slot />
  </div>
</template>

<style lang="css" scoped>
@tailwind components;
@layer components {
  .ipt-wrap:not(.titleTop) > label {
    @apply md:w-[12.8rem];
  }
  .ipt-wrap:not(.titleTop) > label ~ * {
    @apply md:ml-[12.8rem];
  }
}
@media (min-width: 768px) {
  .ipt-wrap:not(.titleTop) > label ~ * {
    width: calc(100% - 12.8rem);
  }
}
</style>
