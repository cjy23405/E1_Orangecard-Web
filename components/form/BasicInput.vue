<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { Props } from "@/types/components/form/BasicInput";

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// formControl
const formControl = inject<{
  error?: globalThis.ComputedRef<string>;
}>("formControl", {});

// props
const props = withDefaults(defineProps<Props>(), {
  defaultValue: undefined,
  modelValue: undefined,
  class: "",
  inputClass: "",
  clearButtonAttrs: () => ({}),
  useClear: true,
  disabled: false,
  readonly: false,
  useError: true,
});

// emit
const emit = defineEmits<{
  "update:modelValue": [payload: string | number];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);

// state
const isFocused = ref(false);

// computed
const error = computed(() => {
  return props.useError && (formControl.error?.value || "");
});
const bindClearButtonAttrs = computed(() => {
  const notKeys = ["class", "onClick"];
  const attr = useObjectFilter({ ...props.clearButtonAttrs }, (el, key) => {
    return notKeys.indexOf(String(key)) === -1;
  });

  return attr;
});
const isInputed = computed((): boolean => {
  const isNumber = typeof modelValue.value === "number";
  const isString = typeof modelValue.value === "string";
  if (isNumber || isString) {
    return isNumber || (isString && (modelValue.value as string).length > 0);
  } else {
    return !!input.value?.el?.value;
  }
});

// ref
const input = useTemplateRef("input");

// timer
let timer: ReturnType<typeof setTimeout>;

// focusin
const focusin = () => {
  clearTimeout(timer);
  isFocused.value = true;
};

// focusout
const focusout = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    isFocused.value = false;
    clearTimeout(timer);
  }, 50);
};

// clear click
const clearClick = (e: MouseEvent) => {
  const isNumber = typeof modelValue.value === "number";
  const isString = typeof modelValue.value === "string";

  if (isNumber || isString) {
    modelValue.value = "";
  } else if (input.value?.el) {
    input.value.el.value = "";
  }

  input.value?.el?.focus();

  if (typeof props.clearButtonAttrs.onClick === "function") {
    props.clearButtonAttrs.onClick(e);
  }
};

// life cycle
onBeforeUnmount(() => {
  clearTimeout(timer);
});

// expose
defineExpose<{
  getEl: () => HTMLInputElement | null;
}>({
  getEl: () => input.value?.el || null,
});
</script>

<template>
  <div
    :class="
      cn(
        [
          'relative',
          {
            'use-clear': useClear,
            'is-focused': isFocused,
            'is-inputed': isInputed,
          },
        ],
        props.class,
      )
    "
    @focusin="focusin"
    @focusout="focusout"
  >
    <Input
      ref="input"
      v-model="modelValue"
      :default-value="defaultValue"
      :class="cn({ error: !!error }, props.inputClass)"
      :disabled="disabled"
      :readonly="readonly"
      v-bind="$attrs"
    />
    <button
      v-if="!disabled && !readonly && useClear"
      type="button"
      :class="cn('ipt-btn-remove hidden', clearButtonAttrs.class)"
      v-bind="bindClearButtonAttrs"
      @click="clearClick"
    >
      remove input
    </button>
  </div>
</template>

<style lang="css" scoped>
.ipt-btn-remove {
  position: absolute;
  width: 2.4rem;
  height: 2.4rem;
  right: 1.6rem;
  top: 50%;
  margin-top: -1.2rem;
  background: url("@/assets/img/form/ic-input-del.png") no-repeat center center;
  background-size: 100% auto;
  font-size: 0;
  text-indent: -999rem;
}
.use-clear.is-focused.is-inputed .ipt-btn-remove {
  display: block;
}
.use-clear.is-focused.is-inputed input {
  padding-right: 5.6rem;
}
</style>
