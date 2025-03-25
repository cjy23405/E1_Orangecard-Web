<script setup lang="ts">
import { plainToClass } from "class-transformer";
import { DateTime } from "luxon";
import { cn } from "@/lib/utils";
import { dateTimeFormat, getStringToDate } from "@/utils/datetime";
import type { DatePickerModel } from "@/types/components/form/DateTimeInput";
import { DateTimeInputDateTime } from "@/types/components/form/DateTimeInput";
import type { HTMLAttributes } from "vue";

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
    modelValue: string;
    class?: HTMLAttributes["class"];
    id?: string;
    title?: string;
    placeholder?: string;
    disabled?: boolean;
    mode?: "date" | "datetime" | "time";
    minDate?: string | Date;
    maxDate?: string | Date;
  }>(),
  {
    modelValue: "",
    class: "",
    id: "",
    title: "",
    placeholder: "",
    disabled: false,
    mode: "date",
    minDate: "",
    maxDate: "",
  },
);

// emit
const emit = defineEmits<{
  "update:modelValue": [v?: string];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);

// state
const calendarVal = ref<string | number | Date | DatePickerModel>(null);

// computed
const error = computed(() => {
  return formControl.error?.value || "";
});
const modelValueDate = computed<DateTimeInputDateTime>(() => {
  const val = modelValue.value as string;
  const date = getStringToDate(val || "", props.mode);

  return date;
});
const calendarDate = computed<DateTimeInputDateTime>(() => {
  const format = dateTimeFormat(props.mode);
  const val = calendarVal.value as Date;
  const date = getStringToDate(
    val instanceof Date ? DateTime.fromJSDate(val).toFormat(format) : "",
    props.mode,
  );

  return date;
});
const minDateP = computed<DateTimeInputDateTime>(() => {
  const format = dateTimeFormat(props.mode);
  const min = props.minDate;
  const d =
    typeof min === "string"
      ? getStringToDate(min, props.mode)
      : getStringToDate(DateTime.fromJSDate(min).toFormat(format), format);

  return d;
});
const maxDateP = computed<DateTimeInputDateTime>(() => {
  const format = dateTimeFormat(props.mode);
  const max = props.maxDate;
  const d =
    typeof max === "string"
      ? getStringToDate(max, props.mode)
      : getStringToDate(DateTime.fromJSDate(max).toFormat(format), format);

  return d;
});
const buttonText = computed(() => {
  if (calendarVal.value) {
    const cD = calendarDate.value;
    return cD.text.replace(/ /g, "&nbsp;");
  } else {
    return "";
  }
});

// ref
const calendar = useTemplateRef("calendar");

// check min max
const checkMinMax: (d: DateTimeInputDateTime) => DateTimeInputDateTime = (
  d,
) => {
  if (d.date && minDateP.value.date && d.date < minDateP.value.date) {
    return minDateP.value;
  } else if (d.date && maxDateP.value.date && d.date > maxDateP.value.date) {
    return maxDateP.value;
  } else {
    return d;
  }
};

// Popover openAutoFocus
const openAutoFocus = () => {
  if (!calendarVal.value && props.mode === "time") {
    const today = DateTime.now()
      .set({ hour: 0, minute: 0, second: 0 })
      .toJSDate();

    calendarVal.value = today;
  }
};

// reset
const reset = () => {
  modelValue.value = "";
};

// watch
watch(
  modelValue,
  () => {
    const mD = modelValueDate.value;
    const cD = calendarDate.value;

    if (mD.text !== cD.text) {
      const dateP = checkMinMax(mD);

      calendarVal.value = dateP.date;
    }
  },
  {
    deep: true,
  },
);
watch(
  calendarVal,
  () => {
    const mD = modelValueDate.value;
    const cD = calendarDate.value;

    if (mD.text !== cD.text) {
      const dateP = checkMinMax(cD);

      modelValue.value = dateP.text;

      if (dateP.date && calendarVal.value !== dateP.date) {
        calendar.value?.datePicker?.updateValue(dateP.date);
      }
    }
  },
  {
    deep: true,
  },
);

// life cycle
onBeforeMount(() => {
  const d = modelValueDate.value;
  calendarVal.value = d.date;
});

// expose
defineExpose<{
  getDateTime: () => DateTimeInputDateTime;
}>({
  getDateTime: () => {
    return plainToClass(DateTimeInputDateTime, modelValueDate.value || {});
  },
});
</script>

<template>
  <ClientOnly>
    <div>
      <Popover>
        <PopoverTrigger as-child>
          <FormDateButton
            :id="id"
            :title="title"
            :text="buttonText"
            :placeholder="placeholder"
            :class="cn({ error: !!error }, props.class)"
            :disabled="disabled"
          />
        </PopoverTrigger>
        <PopoverContent
          class="w-[28rem] p-2"
          align="end"
          @open-auto-focus="openAutoFocus"
        >
          <VCalendar
            ref="calendar"
            v-model="calendarVal"
            :mode="mode"
            :min-date="minDateP.date"
            :max-date="maxDateP.date"
            :time-accuracy="3"
          />
          <div v-if="mode === 'time'" class="flex justify-center pb-4">
            <PopoverClose as-child>
              <Button type="button" variant="ghost" @click="reset"
                >초기화</Button
              >
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </ClientOnly>
</template>

<style lang="css" scoped>
.error {
  border-color: #f13434;
}
</style>
