<script setup lang="ts">
import { plainToClass } from "class-transformer";
import {
  RangeDateTimeDateTimes,
  type RangeDateTimeModelValueRange,
} from "@/types/components/filter/RangeDateTime";

// 레이아웃 선택
definePageMeta({
  layout: "sub",
});

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("필터용 폼 컴포넌트 예제");
});

// dateRange1 폼
const dateRangeVal1 = ref<RangeDateTimeModelValueRange>({
  start: "2024-12-25",
  end: "2025-01-10",
});
const dateRange1 = useTemplateRef("dateRange1");
const dateRangeDateTime1 = computed((): RangeDateTimeDateTimes => {
  return plainToClass(
    RangeDateTimeDateTimes,
    dateRange1.value?.getDateTime() || {},
  );
});

// dateRange2 폼
const dateRangeVal2 = ref<RangeDateTimeModelValueRange>();
const dateRange2 = useTemplateRef("dateRange2");
const dateRangeDateTime2 = computed((): RangeDateTimeDateTimes => {
  return plainToClass(
    RangeDateTimeDateTimes,
    dateRange2.value?.getDateTime() || {},
  );
});

// datetimeRange 폼
const datetimeRangeVal = ref<RangeDateTimeModelValueRange>();
const datetimeRange = useTemplateRef("datetimeRange");
const datetimeRangeDateTime = computed((): RangeDateTimeDateTimes => {
  return plainToClass(
    RangeDateTimeDateTimes,
    datetimeRange.value?.getDateTime() || {},
  );
});

// timeRange 폼
const timeRangeVal = ref<RangeDateTimeModelValueRange>();
const timeRange = useTemplateRef("timeRange");
const timeRangeDateTime = computed((): RangeDateTimeDateTimes => {
  return plainToClass(
    RangeDateTimeDateTimes,
    timeRange.value?.getDateTime() || {},
  );
});
</script>

<template>
  <div class="border-top mt-[2.8rem] bg-gray-100 px-8 py-[2.8rem]">
    <div class="inner">
      <FilterRow label="충전소 선택" for="station">
        <FormSelect
          button-id="station"
          :options="[
            {
              value: 'value1',
              text: 'option1',
            },
            {
              value: 'value2',
              text: 'option2',
            },
            {
              value: 'value3',
              text: 'option3',
            },
          ]"
        />
      </FilterRow>

      <FilterRow label="기간선택" for="date">
        <FilterRangeDateTime
          ref="dateRange1"
          v-model="dateRangeVal1"
          start-id="date"
          min-date="2024-12-12"
          max-date="2025-01-30"
          disabled
        />
      </FilterRow>
      <pre>{{ dateRangeVal1 }}</pre>
      <pre>{{ dateRangeDateTime1 }}</pre>

      <FilterRow label="기간선택" for="date">
        <FilterRangeDateTime
          ref="dateRange2"
          v-model="dateRangeVal2"
          start-id="date"
          min-date="2024-12-12"
          max-date="2025-01-30"
        />
      </FilterRow>
      <pre>{{ dateRangeVal2 }}</pre>
      <pre>{{ dateRangeDateTime2 }}</pre>

      <FilterRow label="기간선택" for="datetime">
        <FilterRangeDateTime
          ref="datetimeRange"
          v-model="datetimeRangeVal"
          start-id="datetime"
          mode="datetime"
        />
      </FilterRow>
      <pre>{{ datetimeRangeVal }}</pre>
      <pre>{{ datetimeRangeDateTime }}</pre>

      <FilterRow label="기간선택" for="time">
        <FilterRangeDateTime
          ref="timeRange"
          v-model="timeRangeVal"
          start-id="time"
          mode="time"
          min-date="05:20:00"
          max-date="12:30:00"
        />
      </FilterRow>
      <pre>{{ timeRangeVal }}</pre>
      <pre>{{ timeRangeDateTime }}</pre>
    </div>
  </div>
</template>
