<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// props
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    modelValue?: [string, string, string, string];
    id?: [string, string, string, string];
    disabled?: [boolean, boolean, boolean, boolean];
  }>(),
  {
    class: "",
    modelValue: undefined,
    id: undefined,
    disabled: () => [false, false, false, false],
  },
);

// emit
const emit = defineEmits<{
  "update:modelValue": [payload?: [string, string, string, string]];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);

// update
const update = () => {
  emit("update:modelValue", modelValue.value);
};
</script>

<template>
  <div :class="cn('flex flex-row', props.class)">
    <FormBasicInput
      :id="id[0]"
      v-model="modelValue[0]"
      class="flex-1"
      input-class="small:!px-4"
      type="text"
      maxlength="4"
      :use-clear="false"
      :disabled="disabled[0]"
      @update:model-value="update"
    />
    <span>-</span>
    <FormBasicInput
      :id="id[1]"
      v-model="modelValue[1]"
      class="flex-1"
      input-class="small:!px-4"
      type="text"
      maxlength="4"
      :use-clear="false"
      :disabled="disabled[1]"
      @update:model-value="update"
    />
    <span>-</span>
    <FormBasicInput
      :id="id[2]"
      v-model="modelValue[2]"
      class="flex-1"
      input-class="small:!px-4"
      type="text"
      maxlength="4"
      :use-clear="false"
      :disabled="disabled[2]"
      @update:model-value="update"
    />
    <span>-</span>
    <FormBasicInput
      :id="id[3]"
      v-model="modelValue[3]"
      class="flex-1"
      input-class="small:!px-4"
      type="text"
      maxlength="4"
      :use-clear="false"
      :disabled="disabled[3]"
      @update:model-value="update"
    />
  </div>
</template>

<style lang="css" scoped>
span {
  line-height: 4.8rem;
  margin: 0 0.3rem;
}
@media (min-width: 768px) {
  span {
    line-height: 5.8rem;
    margin: 0 1.6rem;
  }
}
</style>
