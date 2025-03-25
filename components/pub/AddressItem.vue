<script setup lang="ts">
import { defineProps } from "vue";
import { Input } from "@/components/ui/input";

const props = withDefaults(
  defineProps<{
    type?: string;
    isError?: boolean;
    required?: boolean;
    labelText?: string;
  }>(),
  {
    type: "text",
    labelText: "",
    require: false,
    isError: false,
  },
);
</script>
<template>
  <div class="ipt-wrap">
    <label
      v-if="props.labelText"
      class="relative mb-[.8rem] block font-bold text-gray-800"
      :class="{ required: required }"
      >{{ labelText }}</label
    >
    <div class="flex flex-row">
      <Input :type="'text'" :placeholder="'우편번호'" :disabled="true" />
      <NuxtLink class="btn-txt dgray ml-[.8rem]">우편번호 검색</NuxtLink>
    </div>
    <Input
      :type="'text'"
      :placeholder="'주소'"
      :disabled="true"
      class="my-[.8rem]"
    />
    <Input
      :type="'text'"
      :placeholder="'상세 주소'"
      :class="{ error: isError }"
    />
    <p
      v-if="props.isError"
      class="error-txt mt-[.8rem] pl-[.8rem] text-sm text-e1error md:text-base"
    >
      주소는 80 바이트를 넘을 수 없습니다.
    </p>
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
