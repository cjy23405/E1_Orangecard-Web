<script setup lang="ts">
import { plainToClass } from "class-transformer";
import { DateTime } from "luxon";
import type { HTMLAttributes } from "vue";
import { dateTimeFormat, getStringToDate } from "@/utils/datetime";
import { RangeDateTimeDateTimes } from "@/types/components/filter/RangeDateTime";
import type {
  DatePickerRangeObject,
  RangeDateTimeModelValueRange,
  RangeDateTimeDateTime,
} from "@/types/components/filter/RangeDateTime";
import { cn } from "@/lib/utils";

type Buttons = "week" | "month" | "month3" | "month6" | "year";

// 오늘
const today = DateTime.now().set({ hour: 23, minute: 59, second: 59 });

// 버튼 범위 조건
const radioRange: {
  [key: string]: {
    start: DateTime;
    end: DateTime;
  };
} = {
  week: {
    start: today.minus({ day: 6 }).set({ hour: 0, minute: 0, second: 0 }),
    end: today,
  },
  month: {
    start: today
      .minus({ month: 1, day: -1 })
      .set({ hour: 0, minute: 0, second: 0 }),
    end: today,
  },
  month3: {
    start: today
      .minus({ month: 3, day: -1 })
      .set({ hour: 0, minute: 0, second: 0 }),
    end: today,
  },
  month6: {
    start: today
      .minus({ month: 6, day: -1 })
      .set({ hour: 0, minute: 0, second: 0 }),
    end: today,
  },
  year: {
    start: today
      .minus({ year: 1, day: -1 })
      .set({ hour: 0, minute: 0, second: 0 }),
    end: today,
  },
};
const radioRangeKeys = Object.keys(radioRange);

// uid
const uid = getCurrentInstance()?.uid;

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// props
const props = withDefaults(
  defineProps<{
    modelValue?: RangeDateTimeModelValueRange | null;
    class?: HTMLAttributes["class"];
    startId?: string;
    endId?: string;
    columns?: number;
    disabled?: boolean;
    mode?: "date" | "datetime" | "time";
    minDate?: string | Date;
    maxDate?: string | Date;
    buttons?: Buttons[];
  }>(),
  {
    modelValue: null,
    class: "",
    startId: "",
    endId: "",
    columns: 2,
    disabled: false,
    mode: "date",
    minDate: "",
    maxDate: "",
    buttons: () => ["week", "month", "month3", "month6", "year"],
  },
);

// emit
const emit = defineEmits<{
  "update:modelValue": [v?: RangeDateTimeModelValueRange | null];
  submit: [v?: RangeDateTimeModelValueRange | null];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);

// state
const isOpened = ref(false);
const isMineClick = ref(false);
const calendarVal = ref<DatePickerRangeObject | null>(null);
const idTail = ref(0);
const radioVal = ref("");
const initMinDate = ref("");
const initMaxDate = ref("");

// computed
const modelValueDate = computed<RangeDateTimeDateTimes>(() => {
  const val = modelValue.value;
  const start = getStringToDate(val?.start || "", props.mode);
  const end = getStringToDate(val?.end || "", props.mode);

  return {
    start,
    end,
  };
});
const calendarDate = computed<RangeDateTimeDateTimes>(() => {
  const format = dateTimeFormat(props.mode);
  const val = calendarVal.value;
  const start = getStringToDate(
    val?.start instanceof Date
      ? DateTime.fromJSDate(val.start).toFormat(format)
      : "",
    props.mode,
  );
  const end = getStringToDate(
    val?.end instanceof Date
      ? DateTime.fromJSDate(val.end).toFormat(format)
      : "",
    props.mode,
  );

  return {
    start,
    end,
  };
});
const minDateP = computed<RangeDateTimeDateTime>(() => {
  const format = dateTimeFormat(props.mode);
  const min = props.minDate || initMinDate.value;
  const d =
    typeof min === "string"
      ? getStringToDate(min, props.mode)
      : getStringToDate(DateTime.fromJSDate(min).toFormat(format), format);

  return d;
});
const maxDateP = computed<RangeDateTimeDateTime>(() => {
  const format = dateTimeFormat(props.mode);
  const max = props.maxDate || initMaxDate.value;
  const d =
    typeof max === "string"
      ? getStringToDate(max, props.mode)
      : getStringToDate(DateTime.fromJSDate(max).toFormat(format), format);

  return d;
});
const startText = computed(() => {
  if (calendarVal.value) {
    const cD = calendarDate.value;
    return cD.start.text.replace(/ /g, "&nbsp;");
  } else {
    return "";
  }
});
const endText = computed(() => {
  if (calendarVal.value) {
    const cD = calendarDate.value;
    return cD.end.text.replace(/ /g, "&nbsp;");
  } else {
    return "";
  }
});

// ref
const calendar = useTemplateRef("calendar");
const popoverContent = useTemplateRef("popoverContent");
const startButton = useTemplateRef("startButton");

// check min max
const checkMinMax: (d: RangeDateTimeDateTime) => RangeDateTimeDateTime = (
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

    calendarVal.value = {
      start: today,
      end: today,
    };
  }

  if (popoverContent.value?.el?.$el) {
    popoverContent.value.el.$el.addEventListener("click", popoverContentClick);
  }
};

// reset
// const reset = () => {
//   modelValue.value = null;
// };

// open 제어
const open = () => {
  if (props.disabled) return;
  isOpened.value = true;
};

const close = () => {
  isOpened.value = false;
};

const startClick = () => {
  isMineClick.value = true;

  if (isOpened.value) {
    close();
  } else {
    open();
  }
};

const endClick = () => {
  isMineClick.value = true;

  if (isOpened.value) {
    close();
  } else {
    open();
  }
};

const popoverContentClick = () => {
  isMineClick.value = true;
};

const closeAutoFocus = () => {
  if (popoverContent.value?.el?.$el) {
    popoverContent.value.el.$el.removeEventListener(
      "click",
      popoverContentClick,
    );
  }
};

const docClick = () => {
  if (!isMineClick.value) {
    close();
  }
  isMineClick.value = false;
};

const calendarUpdate = () => {
  close();
  nextTick(() => {
    startButton.value?.el?.el?.$el.focus();
  });
};

// 라디오 변경
const radioUpdate = () => {
  const key = radioVal.value;

  calendarVal.value = {
    start: radioRange[key].start.toJSDate(),
    end: radioRange[key].end.toJSDate(),
  };
};

// 조회 클릭
const submitClick = () => {
  if (props.disabled) return;
  emit("submit", modelValue.value);
};

// 버튼 사용 유무
const hasButton = (name: Buttons) => {
  return !!props.buttons && props.buttons.indexOf(name) !== -1;
};

// watch
watch(
  modelValue,
  () => {
    const mD = modelValueDate.value;
    const cD = calendarDate.value;

    if (cD.start.text !== mD.start.text || cD.end.text !== mD.end.text) {
      const startP = checkMinMax(mD.start);
      const endP = checkMinMax(mD.end);

      if (startP.date instanceof Date && endP.date instanceof Date) {
        const s = startP.date ? startP : endP;
        const e = endP.date ? endP : startP;
        const sD = s.date as Date;
        const eD = e.date as Date;
        const start = sD > eD ? e : s;
        const end = eD < sD ? s : e;
        const startD = start.date as Date;
        const endD = end.date as Date;

        calendarVal.value = {
          start: startD,
          end: endD,
        };
      } else {
        calendarVal.value = {
          start: radioRange.month.start.toJSDate(),
          end: radioRange.month.end.toJSDate(),
        };
      }
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
    const cV = calendarVal.value;
    const startP = checkMinMax(cD.start);
    const endP = checkMinMax(cD.end);
    const format = dateTimeFormat(props.mode);
    let rVal = "";

    if (mD.start.text !== startP.text || mD.end.text !== endP.text) {
      modelValue.value = {
        start: startP.text,
        end: endP.text,
      };
    }

    if (
      startP.date &&
      endP.date &&
      ((cV?.start as RangeDateTimeDateTime).date !== startP.date ||
        (cV?.end as RangeDateTimeDateTime).date !== endP.date)
    ) {
      calendar.value?.datePicker?.updateValue({
        start: startP.date,
        end: endP.date,
      });
    }

    if (startP.text && endP.text) {
      radioRangeKeys.forEach((key) => {
        const r = radioRange[key];
        if (
          r.start.toFormat(format) === startP.text &&
          r.end.toFormat(format) === endP.text
        ) {
          rVal = key;
        }
      });
    }

    radioVal.value = rVal;
  },
  {
    deep: true,
  },
);

// life cycle
onBeforeMount(() => {
  const format = dateTimeFormat(props.mode);
  const d = modelValueDate.value;

  if (d.start.date instanceof Date && d.end.date instanceof Date) {
    calendarVal.value = {
      start: d.start.date,
      end: d.end.date,
    };
  } else {
    calendarVal.value = {
      start: radioRange.month.start.toJSDate(),
      end: radioRange.month.end.toJSDate(),
    };
  }

  initMinDate.value = radioRange.year.start.toFormat(format);
  initMaxDate.value = today.toFormat(format);
});
onMounted(() => {
  idTail.value = uid || 0;

  document.addEventListener("click", docClick);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", docClick);
});

// expose
defineExpose<{
  getDateTime: () => RangeDateTimeDateTimes;
}>({
  getDateTime: () => {
    return plainToClass(RangeDateTimeDateTimes, modelValueDate.value || {});
  },
});
</script>

<template>
  <div :class="cn('block md:flex', props.class)" v-bind="$attrs">
    <div
      class="flex flex-none flex-row overflow-x-auto md:float-start md:block md:w-auto md:overflow-y-hidden"
    >
      <p v-if="hasButton('week')" class="select-period">
        <input
          :id="`range1_${idTail}`"
          v-model="radioVal"
          type="radio"
          :name="`range_${idTail}`"
          :disabled="disabled"
          value="week"
          @update:model-value="radioUpdate"
        />
        <label :for="`range1_${idTail}`" class="btn-txt line medium"
          >1주일</label
        >
      </p>
      <p v-if="hasButton('month')" class="select-period">
        <input
          :id="`range2_${idTail}`"
          v-model="radioVal"
          type="radio"
          :name="`range_${idTail}`"
          :disabled="disabled"
          value="month"
          @update:model-value="radioUpdate"
        />
        <label :for="`range2_${idTail}`" class="btn-txt line medium"
          >1개월</label
        >
      </p>
      <p v-if="hasButton('month3')" class="select-period">
        <input
          :id="`range3_${idTail}`"
          v-model="radioVal"
          type="radio"
          :name="`range_${idTail}`"
          :disabled="disabled"
          value="month3"
          @update:model-value="radioUpdate"
        />
        <label :for="`range3_${idTail}`" class="btn-txt line medium"
          >3개월</label
        >
      </p>
      <p v-if="hasButton('month6')" class="select-period">
        <input
          :id="`range4_${idTail}`"
          v-model="radioVal"
          type="radio"
          :name="`range_${idTail}`"
          :disabled="disabled"
          value="month6"
          @update:model-value="radioUpdate"
        />
        <label :for="`range4_${idTail}`" class="btn-txt line medium"
          >6개월</label
        >
      </p>
      <p v-if="hasButton('year')" class="select-period">
        <input
          :id="`range5_${idTail}`"
          v-model="radioVal"
          type="radio"
          :name="`range_${idTail}`"
          :disabled="disabled"
          value="year"
          @update:model-value="radioUpdate"
        />
        <label :for="`range5_${idTail}`" class="btn-txt line medium">1년</label>
      </p>
    </div>

    <ClientOnly>
      <Popover :open="isOpened">
        <PopoverTrigger as-child>
          <div
            class="mt-[.8rem] flex min-w-0 flex-1 flex-row items-center md:ml-[2.4rem] md:mt-0"
          >
            <FormDateButton
              :id="startId"
              ref="startButton"
              title="기간 시작 날짜"
              :text="startText"
              class="flex-1 md:min-w-80"
              :disabled="disabled"
              @click="startClick"
            />
            <span class="fs-18 mx-[.8rem] flex-none leading-[4.8rem]">~</span>
            <FormDateButton
              :id="endId"
              title="기간 끝 날짜"
              :text="endText"
              class="flex-1"
              :disabled="disabled"
              @click="endClick"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          ref="popoverContent"
          class="w-[28rem] p-2 md:w-[56rem]"
          @open-auto-focus="openAutoFocus"
          @close-auto-focus="closeAutoFocus"
        >
          <VCalendar
            ref="calendar"
            v-model.range="calendarVal"
            :mode="mode"
            :columns="columns"
            :min-date="minDateP.date"
            :max-date="maxDateP.date"
            :time-accuracy="3"
            @update:model-value="calendarUpdate"
          />
          <!-- <div class="flex justify-center pb-4">
            <PopoverClose as-child>
              <Button type="button" variant="ghost" @click="reset">초기화</Button>
            </PopoverClose>
          </div> -->
        </PopoverContent>
      </Popover>
    </ClientOnly>

    <div class="mt-[.8rem] flex-none md:ml-[.8rem] md:mt-0">
      <a
        role="button"
        tabindex="0"
        class="btn-txt dgray md:w-64"
        :aria-disabled="disabled"
        @click="submitClick"
        @keypress.enter.space="submitClick"
      >
        조회
      </a>
    </div>
  </div>
</template>

<style lang="css" scoped>
@tailwind components;
@layer components {
  .select-period {
    min-width: calc(33.333333% - 0.6rem);
    @apply relative inline-block overflow-hidden md:w-[8rem] md:min-w-0;
  }
  .select-period + .select-period {
    @apply ml-[.8rem];
  }
  .select-period input {
    @apply absolute top-0 left-0 size-0;
  }
  .select-period label {
    @apply size-full block md:min-w-0 min-w-0 md:text-xl;
  }
  .select-period input:checked + label {
    @apply font-bold text-primary !border-primary;
  }
  .select-period input:disabled:checked + label {
    @apply text-gray-600 !border-gray-500;
  }
}
@media (min-width: 768px) {
  .btn-txt.dgray {
    min-width: 16rem !important;
  }
}
</style>
