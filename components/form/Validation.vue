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
    errorAttrs?: HTMLAttributes;
    successAttrs?: HTMLAttributes;
    required?: boolean;
    successMessage?: string;
    label?: string;
    for?: string;
    titleTop?: boolean;
  }>(),
  {
    class: "",
    labelAttrs: () => ({}),
    errorAttrs: () => ({}),
    successAttrs: () => ({}),
    required: false,
    successMessage: "",
    label: "",
    for: "",
    titleTop: false,
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
const bindErrorAttrs = computed(() => {
  const notKeys: string[] = [];
  const attr = useObjectFilter({ ...props.errorAttrs }, (el, key) => {
    return notKeys.indexOf(String(key)) === -1;
  });

  return attr;
});
const bindSuccessAttrs = computed(() => {
  const notKeys: string[] = [];
  const attr = useObjectFilter({ ...props.successAttrs }, (el, key) => {
    return notKeys.indexOf(String(key)) === -1;
  });

  return attr;
});
</script>

<template>
  <div
    :class="cn(['ipt-wrap', { titleTop: titleTop }], props.class)"
    v-bind="$attrs"
  >
    <slot name="label">
      <FormLabel
        v-if="label"
        :for="props.for"
        :class="
          cn(
            [
              'relative mb-[.8rem] block font-bold text-gray-800',
              {
                required: required,
              },
            ],
            labelAttrs.class,
          )
        "
        v-bind="bindLabelAttrs"
      >
        {{ label }}
      </FormLabel>
    </slot>
    <slot />
    <FormMessage v-bind="bindErrorAttrs" />
    <FormSuccessMessage v-bind="bindSuccessAttrs" :message="successMessage" />
  </div>
</template>

<style lang="css" scoped>
.required:after {
  content: "";
  display: inline-block;
  position: relative;
  top: 50%;
  right: -0.5rem;
  width: 0.8rem;
  height: 0.8rem;
  background: url("@/assets/img/icon/ic-label-star.png") no-repeat center /
    contain;
}
</style>
