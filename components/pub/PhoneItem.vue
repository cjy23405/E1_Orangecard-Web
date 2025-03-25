<script setup lang="ts">
import { defineProps } from "vue";
import { Input } from "@/components/ui/input";

const props = withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    isError?: boolean;
    labelText?: string;
    required?: boolean;
  }>(),
  {
    type: "text",
    placeholder: "",
    disabled: false,
    isError: false,
    labelText: "",
    require: false,
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
      <Input
        class="flex-1"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
      />
      <NuxtLink class="btn-txt dgray ml-[.8rem]">인증번호 발송</NuxtLink>
    </div>
    <div class="ipt-wrap mt-[.8rem] md:mt-8">
      <div class="flex flex-row">
        <div class="relative flex-1">
          <Input
            class="!pr-44"
            :type="'text'"
            :placeholder="'인증번호'"
            :class="{ error: isError }"
          />
          <p class="absolute right-[.8rem] top-[1.2rem] md:right-8 md:top-6">
            <span class="fs-14 align-baseline leading-[2.4rem] text-e1error"
              >00:00</span
            >
            <NuxtLink class="btn-mini">시간연장</NuxtLink>
          </p>
        </div>
        <NuxtLink class="btn-txt dgray ml-[.8rem]">확인</NuxtLink>
      </div>
      <p
        v-if="props.isError"
        class="error-txt mt-[.8rem] pl-[.8rem] text-sm text-e1error md:text-base"
      >
        인증번호가 일치하지 않습니다.
      </p>
    </div>
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
