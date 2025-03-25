<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import type {
  SelectOptions,
  SelectSelected,
} from "@/types/components/form/Select";

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// formControl
const formControl = inject<{
  error?: globalThis.ComputedRef<string>;
}>("formControl", {});

// props
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    options?: SelectOptions;
    disabled?: boolean;
    title?: string;
    placeholder?: string;
    buttonId?: string;
    class?: HTMLAttributes["class"];
    buttonClass?: HTMLAttributes["class"];
  }>(),
  {
    modelValue: "",
    options: () => [],
    disabled: false,
    title: "",
    placeholder: "",
    buttonId: "",
    class: "",
    buttonClass: "",
  },
);

// emit
const emit = defineEmits<{
  "update:modelValue": [v?: string];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);

// state
const value = ref("");

// computed
const error = computed(() => {
  return formControl.error?.value || "";
});
const options = computed(() => props.options);
const selected = computed((): SelectSelected => {
  const v = options.value.filter((item) => {
    return value.value === item.value;
  });

  return v.length ? v[0] : null;
});

// watch
watch(modelValue, () => {
  if (value.value !== modelValue.value) {
    value.value = modelValue.value;
  }
});
watch(value, () => {
  if (value.value !== modelValue.value) {
    modelValue.value = value.value;
  }
});
watch(
  options,
  () => {
    const isVal = options.value.find((item) => {
      return item.value === modelValue.value;
    });

    if (!isVal) {
      value.value = "";
    }
  },
  {
    deep: true,
  },
);

// life cycle
onBeforeMount(() => {
  value.value = modelValue.value;
});

// expose
defineExpose<{
  getSelected: () => SelectSelected;
}>({
  getSelected: () => selected.value,
});
</script>

<template>
  <div :class="cn('ipt-wrap', props.class)">
    <Select v-bind="$attrs" v-model="value" :disabled="disabled" :title="title">
      <SelectTrigger
        :id="buttonId"
        :title="title"
        :class="
          cn('disabled:text-gray-600', { error: !!error }, props.buttonClass)
        "
      >
        <SelectValue :placeholder="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            v-for="(item, i) in options"
            :key="i"
            :value="item.value"
            :disabled="item.disabled"
          >
            {{ item.text }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>

<style lang="css" scoped>
.error {
  border-color: #f13434;
}
</style>
