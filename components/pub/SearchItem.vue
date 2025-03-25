<template>
  <div class="ipt-wrap flex w-full flex-row">
    <input-item class="w-full" :placeholder="props.placeholder"></input-item>
    <button class="btn-txt dgray ml-[.8rem] min-w-32 md:min-w-64">검색</button>
  </div>
</template>
<script setup lang="ts">
import InputItem from "@/components/pub/InputItem.vue";
import { defineProps } from "vue";
const props = withDefaults(
  defineProps<{
    placeholder?: string;
  }>(),
  {
    placeholder: "입력",
  },
);
</script>
<style lang="css" scoped></style>
