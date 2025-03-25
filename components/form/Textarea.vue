<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { Props } from "@/types/components/form/Textarea";

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// formControl
const formControl = inject<{
  error?: globalThis.ComputedRef<string>;
}>("formControl", {});

// props
const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  class: "",
});

// emit
const emit = defineEmits<{
  "update:modelValue": [v?: string];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);

// computed
const error = computed(() => {
  return formControl.error?.value || "";
});

// ref
const el = useTemplateRef("el");

// expose
defineExpose({
  el,
});
</script>

<template>
  <textarea
    ref="el"
    v-model="modelValue"
    :class="cn({ error: !!error }, props.class)"
    v-bind="$attrs"
  ></textarea>
</template>

<style lang="css" scoped>
.error {
  border-color: #f13434;
}
</style>
