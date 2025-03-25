<script setup lang="ts">
import { useQueryClient } from "@tanstack/vue-query";
import { plainToClass } from "class-transformer";
import { DateTime } from "luxon";
import {
  RangeDateTimeDateTimes,
  type RangeDateTimeModelValueRange,
} from "@/types/components/filter/RangeDateTime";
import type { StationPointQuery } from "@/types/components/contents/my-page/station-point";

// uid
const uid = getCurrentInstance()?.uid;

// props
const props = withDefaults(
  defineProps<{
    query?: StationPointQuery;
  }>(),
  {
    query: () => ({}),
  },
);

// emit
const emit = defineEmits<{
  changeQuery: [StationPointQuery];
}>();

// state
const codeVal = ref<string>();
const code = ref<string>();
const typeVal = ref<string>();
const type = ref<number>();
const start = ref<string>();
const end = ref<string>();

// api
const queryClient = useQueryClient();
const apiChargeStationList = useApiPointChargeStationList();
const {
  data,
  fetchNextPage,
  refetch,
  hasNextPage,
  isFetchingNextPage,
  isPending,
} = useApiPointStationPointHistoryList(uid, {
  searchType: type,
  stationId: code,
  startDt: start,
  endDt: end,
});

// computed
const chargeStationOptions = computed(() => {
  return (
    apiChargeStationList.data.value?.data?.map((item) => {
      return {
        value: item.stationId,
        text: item.stationNm,
      };
    }) || []
  );
});
const disabled = computed(() => {
  return !chargeStationOptions.value.length;
});

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

// code update
const codeSet = () => {
  code.value = codeVal.value;
};
const codeUpdate = () => {
  codeSet();
  search();

  emit("changeQuery", {
    ...props.query,
    code: code.value,
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
  if (!chargeStationOptions.value.length) return;

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

  if (props.query.code) {
    codeVal.value = String(props.query.code);
    code.value = String(props.query.code);
  } else {
    codeVal.value = chargeStationOptions.value[0]?.value || undefined;
    code.value = chargeStationOptions.value[0]?.value || undefined;
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
    codeSet();
    typeSet();
    search();
  });
};

// search
const search = useDebounceFn(() => {
  queryClient.resetQueries({ queryKey: ["stationPointHistoryList", uid] });
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
watch(apiChargeStationList.isSuccess, () => {
  if (apiChargeStationList.isSuccess.value) {
    init();
  }
});
watch(
  () => props.query.code,
  () => {
    if (typeof props.query.code === "string") {
      const q = props.query.code;
      codeVal.value = q;
      code.value = q;
    } else {
      codeVal.value = chargeStationOptions.value[0]?.value || undefined;
      code.value = chargeStationOptions.value[0]?.value || undefined;
    }

    codeSet();
    search();
  },
);
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
    <div
      class="mt-[2.8rem] bg-gray-100 px-8 py-[2.8rem] md:mt-24 md:px-0 md:py-8"
    >
      <div class="inner">
        <FilterRow label="충전소 선택" for="code">
          <FormSelect
            v-model="codeVal"
            button-id="code"
            :options="chargeStationOptions"
            :disabled="disabled"
            @update:model-value="codeUpdate"
          />
        </FilterRow>

        <FilterRow label="기간선택" for="date">
          <FilterRangeDateTime
            ref="dateRange"
            v-model="dateRangeVal"
            start-id="date"
            :disabled="disabled"
            @submit="dateRangeSubmit"
          />
        </FilterRow>
      </div>
    </div>

    <div class="inner px-8 pt-[2.8rem] md:px-0 md:pt-16">
      <div class="md:text-right">
        <div
          class="bar fs-14 text-right text-gray-900 md:inline-block md:py-[1.7rem]"
        >
          <span>조회 기간 내</span>
          <span class="no-bar"
            >적립<strong class="ml-[.4rem] align-baseline text-primary"
              >{{ data?.pages[0].data?.totalSavePnt.toLocaleString() }}P</strong
            ></span
          >
          <span
            >사용<strong class="ml-[.4rem] align-baseline text-primary"
              >{{ data?.pages[0].data?.totalUsePnt.toLocaleString() }}P</strong
            ></span
          >
        </div>
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
            :disabled="disabled"
            @update:model-value="typeUpdate"
          />
        </div>
      </div>

      <div
        v-if="
          data &&
          data.pages.length &&
          data.pages[0].data?.chargingPntUsageList.length
        "
        class="md:round-box md:mt-[1.6rem] md:p-16 md:pt-4"
      >
        <table class="fs-14 w-full break-words">
          <colgroup>
            <col class="cell-1" />
            <col class="cell-2" />
            <col class="cell-3" />
            <col class="cell-4" />
          </colgroup>
          <thead>
            <tr class="border-bottom">
              <th class="text-left">거래일</th>
              <th class="text-left">충전소</th>
              <th>이용내역</th>
              <th class="text-right">포인트</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(group, i) in data.pages" :key="i">
              <tr
                v-for="(item, j) in group.data?.chargingPntUsageList"
                :key="j"
                class="border-bottom"
              >
                <td class="date-text text-left">
                  {{ useFormattedDate(item.transactionDt, "yyyy-MM-dd") }}
                </td>
                <td>
                  <span class="ellipsis2">{{ item.stationNm }}</span>
                </td>
                <td
                  :class="[
                    'text-center text-gray-600',
                    {
                      '!text-primary': /^P$/.test(item.transactionTypeCd),
                    },
                  ]"
                >
                  {{ item.transactionTypeNm }}
                </td>
                <td
                  :class="[
                    'text-right text-gray-600',
                    {
                      '!text-primary': /^P$/.test(item.transactionTypeCd),
                      'line-through': /^C$/.test(item.transactionTypeCd),
                    },
                  ]"
                >
                  {{
                    /^P$/.test(item.transactionTypeCd)
                      ? "+"
                      : /^C$/.test(item.transactionTypeCd)
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

        <div class="gray-box mt-8 md:mt-[6.6rem]">
          <ul class="list-dot text-gray-600">
            <li>오렌지 포인트 이용내역은 최근 1년까지 조회가 가능합니다.</li>
            <li>1년 이후의 이용내역은 고객센터에 문의 하시기 바랍니다.</li>
            <li>상세 문의는 고객센터(1688-2121)로 문의하시기 바랍니다.</li>
          </ul>
        </div>
      </div>

      <div v-else-if="!isPending || disabled" class="nodata">
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
  padding-left: 2rem;
}
table tr > *:last-child {
  padding-right: 2rem;
}
.cell-1 {
  width: 30%;
}
.cell-3 {
  width: 20%;
}
.cell-4 {
  width: 26%;
}
@media (min-width: 768px) {
  .ipt-wrap + .ipt-wrap {
    margin-top: 0.8rem;
  }
  .ipt-wrap:not(.titleTop) > label {
    width: 12.8rem;
  }
  .ipt-wrap:not(.titleTop) > label ~ * {
    margin-left: 12.8rem;
  }
  .ipt-wrap:not(.titleTop) > label ~ * {
    width: calc(100% - 12.8rem);
  }
  .btn-txt.dgray {
    min-width: 16rem !important;
  }
  table tr > * {
    height: 8.2rem;
    padding: 2.9rem 2rem;
  }
  table tr > *:first-child {
    padding-left: 4rem;
  }
  table tr > *:last-child {
    padding-right: 4rem;
  }
  .cell-1 {
    width: 28%;
  }
  .cell-3 {
    width: 20%;
  }
  .cell-4 {
    width: 20%;
  }
}
</style>
