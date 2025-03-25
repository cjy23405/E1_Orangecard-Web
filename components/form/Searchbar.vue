<script setup lang="ts">
import type { HTMLAttributes, InputHTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

interface Props
  extends /* @vue-ignore */ Omit<InputHTMLAttributes, "onSubmit"> {
  modelValue?: string;
  disabled?: boolean;
  readonly?: boolean;
  class?: HTMLAttributes["class"];
  inputClass?: HTMLAttributes["class"];
  inputElClass?: HTMLAttributes["class"];
}

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// props
const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  disabled: false,
  readonly: false,
  class: "",
  inputClass: "",
  inputElClass: "",
});

// emit
const emit = defineEmits<{
  "update:modelValue": [v?: string];
  submit: [v?: string];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);

// submit
const submit = () => {
  emit("submit", modelValue.value);
};
</script>

<template>
  <div :class="cn('ipt-wrap flex w-full flex-row', props.class)">
    <FormBasicInput
      v-model="modelValue"
      type="text"
      :disabled="disabled"
      :readonly="readonly"
      :class="cn('w-full', inputClass)"
      :input-class="inputElClass"
      v-bind="$attrs"
      :use-error="false"
      @keyup.enter="submit"
    />
    <button
      class="btn-txt dgray ml-[.8rem] min-w-32 md:min-w-64"
      :disabled="disabled"
      @click="submit"
    >
      검색
    </button>
  </div>
</template>
