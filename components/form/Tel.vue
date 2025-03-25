<script setup lang="ts">
// props
const props = withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: "",
  },
);

// emit
const emit = defineEmits<{
  "update:modelValue": [v?: string];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);

// state
const isFocus = ref(false);

// focus
const focus = () => {
  isFocus.value = true;
};
const blur = () => {
  isFocus.value = false;
  replaceNumber();
};

// 번호 변환
const replaceNumber = () => {
  modelValue.value = modelValue.value.replace(/[^\d]/g, "");
};

// setup
replaceNumber();
</script>

<template>
  <FormBasicInput
    v-model="modelValue"
    :type="isFocus ? 'tel' : 'text'"
    pattern="\d*"
    maxlength="11"
    @focus="focus"
    @blur="blur"
  />
</template>
