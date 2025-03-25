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

const emailType = [
  { title: "직접입력", id: "self" },
  { title: "구글", id: "google" },
  { title: "네이버", id: "naver" },
  { title: "다음", id: "daum" },
  { title: "카카오", id: "kakao" },
  { title: "네이트", id: "nate" },
];
const selectedValue = ref<string>("self");
const inputValue = ref<string>("");
watch(selectedValue, (newValue) => {
  switch (newValue) {
    case "google":
      inputValue.value = "gmail.com";
      break;
    case "naver":
      inputValue.value = "naver.com";
      break;
    case "daum":
      inputValue.value = "daum.net";
      break;
    case "kakao":
      inputValue.value = "kakao.com";
      break;
    case "nate":
      inputValue.value = "nate.com";
      break;
    case "self":
    default:
      inputValue.value = "";
      break;
  }
});
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
        class="flex-1 md:w-[31rem] md:flex-none"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
      />
      <span class="mx-[.6rem] leading-[4.8rem]">@</span>
      <Input
        v-model="inputValue"
        class="flex-1"
        :type="props.type"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
      />
    </div>

    <div class="ipt-wrap mt-[.8rem]">
      <Select v-model="selectedValue">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="(item, index) in emailType"
            :key="index"
            :value="item.id"
            >{{ item.title }}</SelectItem
          >
        </SelectContent>
      </Select>
      <p
        v-if="props.isError"
        class="error-txt mt-[.8rem] pl-[.8rem] text-sm text-e1error md:text-base"
      >
        이메일 형식이 아닙니다.
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
