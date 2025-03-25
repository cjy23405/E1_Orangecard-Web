<script setup lang="ts">
import { useQueryClient } from "@tanstack/vue-query";
import { plainToClass } from "class-transformer";
import { DateTime } from "luxon";
import {
  RangeDateTimeDateTimes,
  type RangeDateTimeModelValueRange,
} from "@/types/components/filter/RangeDateTime";
import type { PointQuery } from "@/types/components/contents/etc/corporate-taxi/point";

// uid
const uid = getCurrentInstance()?.uid;

// 스토어
const stores = {
  auth: useStoreAuth(),
};

// props
const props = withDefaults(
  defineProps<{
    query?: PointQuery;
  }>(),
  {
    query: () => ({}),
  },
);

// emit
const emit = defineEmits<{
  changeQuery: [PointQuery];
}>();

// state
const typeVal = ref<string>();
const type = ref<number>();
const start = ref<string>();
const end = ref<string>();

// api
const queryClient = useQueryClient();
const {
  data,
  fetchNextPage,
  refetch,
  hasNextPage,
  isFetchingNextPage,
  isPending,
} = useApiPointHistoryList(
  uid,
  {
    searchType: type,
    startDt: start,
    endDt: end,
  },
  true,
);

// dateRange
const dateRangeVal = ref<RangeDateTimeModelValueRange>();
const dateRange = useTemplateRef("dateRange");
const dateRangeDateTime = computed((): RangeDateTimeDateTimes => {
  return plainToClass(
    RangeDateTimeDateTimes,
    dateRange.value?.getDateTime() || {},
  );
});

// dateRange update
const dateRangeSet = () => {
  if (dateRangeDateTime.value.start.date && dateRangeDateTime.value.end.date) {
    start.value = DateTime.fromJSDate(
      dateRangeDateTime.value.start.date,
    ).toFormat("yyyyMMdd");
    end.value = DateTime.fromJSDate(dateRangeDateTime.value.end.date).toFormat(
      "yyyyMMdd",
    );
  } else {
    start.value = undefined;
    end.value = undefined;
  }
};
const dateRangeSubmit = () => {
  dateRangeSet();
  search();

  emit("changeQuery", {
    ...props.query,
    start: start.value,
    end: end.value,
  });
};

// type update
const typeSet = () => {
  type.value = Number(typeVal.value);
};
const typeUpdate = () => {
  typeSet();
  search();

  emit("changeQuery", {
    ...props.query,
    type: type.value,
  });
};

// init
const init = () => {
  if (props.query.start && props.query.end) {
    dateRangeVal.value = {
      start: DateTime.fromFormat(
        String(props.query.start),
        "yyyyMMdd",
      ).toFormat("yyyy-MM-dd"),
      end: DateTime.fromFormat(String(props.query.end), "yyyyMMdd").toFormat(
        "yyyy-MM-dd",
      ),
    };
  }

  if (props.query.type) {
    typeVal.value = String(props.query.type);
    type.value = Number(props.query.type);
  } else {
    typeVal.value = "0";
    type.value = 0;
  }

  nextTick(() => {
    dateRangeSet();
    typeSet();
    search();
  });
};

// search
const search = useDebounceFn(() => {
  queryClient.resetQueries({ queryKey: ["pointHistoryList", uid] });
  refetch();
}, 300);

// more
const more = () => {
  fetchNextPage();
};

// 더보기 클릭
const moreClick = () => {
  if (isFetchingNextPage.value) return;
  more();
};

// watch
watch(
  () => props.query.type,
  () => {
    if (typeof props.query.type === "string") {
      const q = props.query.type;
      typeVal.value = q;
      type.value = Number(q);
    } else {
      typeVal.value = "0";
      type.value = 0;
    }

    typeSet();
    search();
  },
);
watch([() => props.query.start, () => props.query.end], () => {
  if (
    typeof props.query.start === "string" &&
    typeof props.query.end === "string"
  ) {
    dateRangeVal.value = {
      start: DateTime.fromFormat(
        String(props.query.start),
        "yyyyMMdd",
      ).toFormat("yyyy-MM-dd"),
      end: DateTime.fromFormat(String(props.query.end), "yyyyMMdd").toFormat(
        "yyyy-MM-dd",
      ),
    };
  } else {
    dateRangeVal.value = undefined;
  }

  nextTick(() => {
    dateRangeSet();
    search();
  });
});

// life cycle
onMounted(() => {
  init();
});
</script>

<template>
  <div>
    <div class="mt-[2.8rem] bg-gray-100 px-8 py-16 md:mt-24 md:px-0 md:py-8">
      <div class="inner">
        <FilterRow
          class="!min-h-0"
          label="가용포인트"
          :label-attrs="{
            class: '!leading-[1.38] md:!top-[50%] md:!mt-[-0.69em]',
            role: 'presentation',
          }"
        >
          <p class="mt-[.8rem] text-xl leading-[2.4rem] text-primary md:mt-0">
            <strong class="mr-[.3rem] text-3xl font-bold leading-[3rem]">{{
              stores.auth.corpTaxi?.totalPnt.toLocaleString()
            }}</strong
            >P
          </p>
        </FilterRow>

        <FilterRow class="!mt-[2.8rem]" label="기간선택" for="date">
          <FilterRangeDateTime
            ref="dateRange"
            v-model="dateRangeVal"
            start-id="date"
            :buttons="['week', 'month', 'month3']"
            @submit="dateRangeSubmit"
          />
        </FilterRow>
      </div>
    </div>

    <div class="inner px-8 pt-[2.8rem] md:px-0 md:pt-16">
      <div class="md:text-right">
        <div class="mt-[1.2rem] md:ml-8 md:mt-0 md:inline-block md:w-80">
          <FormSelect
            v-model="typeVal"
            :options="[
              {
                value: '0',
                text: '전체',
              },
              {
                value: '1',
                text: '적립',
              },
              {
                value: '2',
                text: '사용/소멸',
              },
            ]"
            @update:model-value="typeUpdate"
          />
        </div>
      </div>

      <div
        v-if="
          data && data.pages.length && data.pages[0].data?.pntUsageList.length
        "
        class="md:round-box md:mt-[1.6rem] md:p-16 md:pt-4"
      >
        <table class="fs-14 w-full break-words">
          <thead>
            <tr class="border-bottom">
              <th class="text-left">거래일</th>
              <th class="text-left">가맹점</th>
              <th class="">상세내역</th>
              <th class="text-right">포인트</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(group, i) in data.pages" :key="i">
              <tr
                v-for="(item, j) in group.data?.pntUsageList"
                :key="j"
                class="border-bottom"
              >
                <td class="date-text text-left">
                  {{ useFormattedDate(item.transactionDt, "yyyy-MM-dd") }}
                </td>
                <td>
                  <span class="ellipsis2">{{ item.franchiseNm }}</span>
                </td>
                <td
                  :class="[
                    'text-center text-gray-600',
                    {
                      '!text-primary': /^PP/.test(item.transactionTypeCd),
                    },
                  ]"
                >
                  {{ item.transactionTypeNm }}
                </td>
                <td
                  :class="[
                    'text-right text-gray-600',
                    {
                      '!text-primary': /^PP/.test(item.transactionTypeCd),
                      'line-through': /^.C/.test(item.transactionTypeCd),
                    },
                  ]"
                >
                  {{
                    /^PP/.test(item.transactionTypeCd)
                      ? "+"
                      : /^.C/.test(item.transactionTypeCd)
                        ? ""
                        : "-"
                  }}{{ item.points.toLocaleString() }}P
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <p v-if="hasNextPage" class="btn-wrap mt-8 md:mt-24">
          <a
            role="button"
            tabindex="0"
            :aria-disabled="isFetchingNextPage"
            class="btn-more"
            @click="moreClick"
            @keypress.enter.space="moreClick"
          >
            더보기
          </a>
        </p>

        <div class="gray-box mt-8 md:mt-24">
          <ul class="list-dot text-gray-600">
            <li>충전소포인트이용내역은 최근 1년까지 조회가 가능합니다.</li>
            <li>1년 이후의 이용내역은 고객센터에 문의 하시기 바랍니다.</li>
            <li>상세 문의는 고객센터(1688-2121)로 문의하시기 바랍니다.</li>
          </ul>
        </div>
      </div>

      <div v-else-if="!isPending" class="nodata">
        <p>검색 결과가 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
table th {
  height: 5.6rem;
}
table td {
  height: 6.2rem;
  vertical-align: middle;
  padding: 0 0.2rem;
}
table tr > * {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
table tr > *:first-child {
  width: 10.5rem;
  padding-left: 2rem;
}
table tr > *:nth-child(3) {
  width: 5.5rem;
}
table tr > *:last-child {
  width: 10rem;
  padding-right: 2rem;
}
@media (min-width: 768px) {
  table tr > * {
    height: 8.2rem;
    padding: 2.9rem 2rem;
  }
  table tr > *:first-child {
    width: 20rem;
    padding-left: 4rem;
  }
  table tr > *:nth-child(3) {
    width: 20rem;
  }
  table tr > *:last-child {
    width: 20rem;
    padding-right: 4rem;
  }
}
</style>
