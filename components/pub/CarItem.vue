<template>
  <div class="ipt-wrap">
    <label
      v-if="props.labelText"
      class="relative mb-[.8rem] hidden font-bold text-gray-800 md:block"
      :class="{ required: required }"
      >{{ labelText }}</label
    >
    <div class="flex flex-row">
      <input-item
        class="w-full"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
      ></input-item>
      <button
        class="btn-txt dgray ml-[.8rem] min-w-32 md:min-w-64"
        :disabled="props.disabled"
      >
        조회
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import InputItem from "@/components/pub/InputItem.vue";
import { defineProps } from "vue";
const props = withDefaults(
  defineProps<{
    placeholder?: string;
    disabled?: boolean;
    labelText?: string;
    required?: boolean;
  }>(),
  {
    placeholder: "서울12가3456",
    disabled: false,
    labelText: "",
    require: false,
  },
);
</script>
<style lang="css" scoped></style>
