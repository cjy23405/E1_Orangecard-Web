<script setup lang="ts">
import { defineProps } from "vue";
import { Input } from "@/components/ui/input";

const props = withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    errorText?: string;
    successText?: string;
    labelText?: string;
    required?: boolean;
    titleTop?: boolean; // 웹모드에서도 모바일과 같이 타이틀이 위로 오는 경우
  }>(),
  {
    type: "text",
    placeholder: "",
    disabled: false,
    errorText: "",
    successText: "",
    labelText: "",
    require: false,
    titleTop: false,
  },
);
</script>
<template>
  <div class="ipt-wrap" :class="{ titleTop: titleTop }">
    <label
      v-if="props.labelText"
      class="relative mb-[.8rem] block font-bold text-gray-800"
      :class="{ required: required }"
      >{{ labelText }}</label
    >
    <Input
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :class="{ error: errorText }"
    />
    <!-- 
      
       -->
    <button
      class="ipt-btn-remove hidden"
      :class="{ 'b-move': props.errorText || props.successText }"
    >
      remove input
    </button>
    <p
      v-if="props.errorText"
      class="error-txt mt-[.8rem] pl-[.8rem] text-sm text-e1error md:text-base"
    >
      {{ errorText }}
    </p>
    <p
      v-if="props.successText"
      class="error-txt mt-[.8rem] pl-[.8rem] text-sm text-e1evgreen md:text-base"
    >
      {{ successText }}
    </p>
  </div>
</template>

<style lang="css" scoped>
.ipt-btn-remove {
  position: absolute;
  width: 2.4rem;
  height: 2.4rem;
  right: 1.6rem;
  bottom: 1.2rem;
  background: url("@/assets/img/form/ic-input-del.png") no-repeat center center;
  background-size: 100% auto;
  font-size: 0;
  text-indent: -999rem;
}
.b-move.ipt-btn-remove {
  bottom: initial;
  top: 1.2rem;
}
label ~ .b-move.ipt-btn-remove {
  top: 4rem;
}
@media (min-width: 768px) {
  .ipt-btn-remove {
    bottom: 1.7rem;
  }
  .b-move.ipt-btn-remove {
    bottom: initial;
    top: 1.7rem;
  }
  label ~ .b-move.ipt-btn-remove {
    top: 1.7rem;
  }
  .titleTop label ~ .b-move.ipt-btn-remove {
    top: 4.6rem;
  }
}
input:focus + .ipt-btn-remove {
  display: block;
}
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
