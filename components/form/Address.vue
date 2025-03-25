<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { AddressData } from "@/types/components/form/Address";
import type { Props as InputProps } from "@/types/components/form/BasicInput";
import type { SearchAddressData } from "@/types/components/popup/SearchAddress";

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// props
const props = withDefaults(
  defineProps<{
    modelValue?: AddressData | null;
    zipCodeAttrs?: InputProps;
    addressAttrs?: InputProps;
    detailAttrs?: InputProps;
    disabled?: boolean;
    readonly?: boolean;
  }>(),
  {
    modelValue: null,
    zipCodeAttrs: () => ({}),
    addressAttrs: () => ({}),
    detailAttrs: () => ({}),
    disabled: false,
    readonly: false,
  },
);

// emit
const emit = defineEmits<{
  "update:modelValue": [v: AddressData];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);

// state
const zipCode = ref("");
const address = ref("");
const detail = ref("");

// computed
const addressData = computed<AddressData | null>(() => {
  if (
    (!data.value.zipCode ||
      !data.value.sido ||
      !data.value.gugun ||
      !data.value.addr ||
      !data.value.addrJi) &&
    !detail.value
  ) {
    return null;
  } else {
    return {
      ...data.value,
      addrDtl: detail.value,
    };
  }
});
const bindZipCodeAttrs = computed(() => {
  const notKeys = ["class", "disabled", "readonly"];
  const attr = useObjectFilter({ ...props.zipCodeAttrs }, (el, key) => {
    return notKeys.indexOf(String(key)) === -1;
  });

  return attr;
});
const bindAddressAttrs = computed(() => {
  const notKeys = ["class", "disabled", "readonly"];
  const attr = useObjectFilter({ ...props.addressAttrs }, (el, key) => {
    return notKeys.indexOf(String(key)) === -1;
  });

  return attr;
});
const bindDetailAttrs = computed(() => {
  const notKeys = ["class", "disabled", "readonly"];
  const attr = useObjectFilter({ ...props.detailAttrs }, (el, key) => {
    return notKeys.indexOf(String(key)) === -1;
  });

  return attr;
});

// 주소
const data = ref<SearchAddressData>({
  zipCode: "",
  sido: "",
  gugun: "",
  addr: "",
  addrJi: "",
});
const layer = useTemplateRef("layer");
const layerOpen = () => {
  if (props.disabled) return;
  if (layer.value) {
    layer.value.open();
  }
};
const updateData = () => {
  zipCode.value = data.value.zipCode as string;
  address.value = data.value.addr as string;
  modelValue.value = addressData.value;
};
const updateDetail = () => {
  modelValue.value = addressData.value;
};

// set model
const setModel = () => {
  if (modelValue.value) {
    zipCode.value = modelValue.value.zipCode as string;
    address.value = modelValue.value.addr as string;
    detail.value = modelValue.value.addrDtl as string;
    data.value = {
      zipCode: modelValue.value.zipCode as string,
      sido: modelValue.value.sido as string,
      gugun: modelValue.value.gugun as string,
      addr: modelValue.value.addr as string,
      addrJi: modelValue.value.addrJi as string,
    };
  } else {
    zipCode.value = "";
    address.value = "";
    detail.value = "";
    data.value = {
      zipCode: "",
      sido: "",
      gugun: "",
      addr: "",
      addrJi: "",
    };
  }
};
setModel();

// watch
watch(modelValue, () => {
  if (JSON.stringify(modelValue.value) !== JSON.stringify(addressData.value)) {
    setModel();
  }
});
</script>

<template>
  <div class="flex flex-row">
    <FormBasicInput
      v-model="zipCode"
      type="text"
      :class="cn('flex-1', zipCodeAttrs.class)"
      disabled
      title="우편번호"
      placeholder="우편번호"
      v-bind="bindZipCodeAttrs"
    />
    <a
      role="button"
      tabindex="0"
      class="btn-txt dgray ml-[.8rem]"
      :aria-disabled="disabled"
      @click="layerOpen"
      @keypress.enter.space="layerOpen"
    >
      우편번호 검색
    </a>
  </div>
  <FormBasicInput
    v-model="address"
    type="text"
    :class="cn('my-[.8rem]', addressAttrs.class)"
    disabled
    title="주소"
    v-bind="bindAddressAttrs"
  />
  <FormBasicInput
    v-model="detail"
    type="text"
    :class="detailAttrs.class"
    :disabled="disabled"
    :readonly="readonly"
    title="상세주소"
    placeholder="상세주소"
    v-bind="bindDetailAttrs"
    @update:model-value="updateDetail"
  />
  <PopupSearchAddress
    ref="layer"
    v-model="data"
    @update:model-value="updateData"
  />
</template>
