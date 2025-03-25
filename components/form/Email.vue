<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { Props as InputProps } from "@/types/components/form/BasicInput";

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// domains
const domains = [
  {
    text: "직접입력",
    value: "_self",
  },
  {
    text: "구글",
    value: "gmail.com",
  },
  {
    text: "네이버",
    value: "naver.com",
  },
  {
    text: "다음",
    value: "daum.net",
  },
  {
    text: "카카오",
    value: "kakao.com",
  },
  {
    text: "네이트",
    value: "nate.com",
  },
];

// props
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    idAttrs?: InputProps;
    domainAttrs?: InputProps;
    disabled?: boolean;
    readonly?: boolean;
  }>(),
  {
    modelValue: "",
    idAttrs: () => ({}),
    domainAttrs: () => ({}),
    disabled: false,
    readonly: false,
  },
);

// emit
const emit = defineEmits<{
  "update:modelValue": [v?: string];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);

// state
const id = ref("");
const domain = ref("");
const selectDomain = ref("_self");

// computed
const bindIdAttrs = computed(() => {
  const notKeys = ["class", "disabled", "readonly"];
  const attr = useObjectFilter({ ...props.idAttrs }, (el, key) => {
    return notKeys.indexOf(String(key)) === -1;
  });

  return attr;
});
const bindDomainAttrs = computed(() => {
  const notKeys = ["class", "disabled", "readonly"];
  const attr = useObjectFilter({ ...props.domainAttrs }, (el, key) => {
    return notKeys.indexOf(String(key)) === -1;
  });

  return attr;
});
const value = computed(() => {
  if (id.value || domain.value) {
    return `${id.value}@${domain.value}`;
  } else {
    return "";
  }
});

// change domain
const changeDomain = () => {
  if (selectDomain.value === "_self") {
    domain.value = "";
  } else {
    domain.value = selectDomain.value;
  }
};

// model to value
const modelToValue = () => {
  const v = modelValue.value.split("@");

  id.value = v[0] || "";
  domain.value = v[1] || "";

  domains.forEach((item) => {
    if (item.value === domain.value) {
      selectDomain.value = item.value;
    }
  });
};

// setup
modelToValue();

// watch
watch(modelValue, () => {
  if (modelValue.value !== value.value) {
    modelToValue();
  }
});
watch(value, () => {
  if (value.value !== modelValue.value) {
    modelValue.value = value.value;
  }
});
</script>

<template>
  <div class="flex flex-row">
    <FormBasicInput
      v-model="id"
      type="text"
      :class="cn('flex-1 md:w-[31rem] md:flex-none', idAttrs.class)"
      :disabled="disabled"
      :readonly="readonly"
      title="이메일 아이디"
      v-bind="bindIdAttrs"
    />
    <span class="mx-[.6rem] leading-[4.8rem]">@</span>
    <FormBasicInput
      v-model="domain"
      type="text"
      :class="cn('flex-1', domainAttrs.class)"
      :disabled="disabled || selectDomain !== '_self'"
      :readonly="readonly"
      title="이메일 도메인"
      v-bind="bindDomainAttrs"
    />
  </div>

  <FormSelect
    v-model="selectDomain"
    class="mt-[.8rem]"
    :options="domains"
    @update:model-value="changeDomain"
  />
</template>
