<script setup lang="ts">
import { useQueryClient } from "@tanstack/vue-query";
import { plainToClass } from "class-transformer";
import { DateTime } from "luxon";
import type { ChargeHistoryListRequest } from "@/types/api";
import type { SelectOptions } from "@/types/components/form/Select";
import {
  RangeDateTimeDateTimes,
  type RangeDateTimeModelValueRange,
} from "@/types/components/filter/RangeDateTime";
import type { ChargeHistoryQuery } from "@/types/components/contents/my-page/charge-history";

// uid
const uid = getCurrentInstance()?.uid;

// fuel
const fuelList = useFuelList();
const fuelReg = useFuelReg();

// props
const props = withDefaults(
  defineProps<{
    query?: ChargeHistoryQuery;
  }>(),
  {
    query: () => ({}),
  },
);

// emit
const emit = defineEmits<{
  changeQuery: [ChargeHistoryQuery];
}>();

// state
const typeVal = ref<ChargeHistoryListRequest["fuelType"]>();
const type = ref<ChargeHistoryListRequest["fuelType"]>();
const start = ref<string>();
const end = ref<string>();
const unit = ref<string>();

// computed
const fuelOptions = computed((): SelectOptions => {
  return fuelList.map((item) => {
    return {
      value: item.code as string,
      text: item.name,
    };
  });
});

// api
const queryClient = useQueryClient();
const {
  data,
  fetchNextPage,
  refetch,
  hasNextPage,
  isFetchingNextPage,
  isPending,
} = useApiChargeHistoryList(uid, {
  fuelType: type,
  startDt: start,
  endDt: end,
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

// type update
const typeSet = () => {
  type.value = typeVal.value;
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

  if (props.query.type && fuelReg.test(String(props.query.type))) {
    typeVal.value = String(
      props.query.type,
    ) as ChargeHistoryListRequest["fuelType"];
    type.value = String(
      props.query.type,
    ) as ChargeHistoryListRequest["fuelType"];
  } else {
    typeVal.value = fuelList[0].code;
    type.value = fuelList[0].code;
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
  refetch()
    .then(() => {
      unit.value = useFuelUnit(type.value);
    })
    .catch(() => {});
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
    if (
      typeof props.query.type === "string" &&
      fuelReg.test(String(props.query.type))
    ) {
      const q = props.query.type as ChargeHistoryListRequest["fuelType"];
      typeVal.value = q;
      type.value = q;
    } else {
      typeVal.value = fuelList[0].code;
      type.value = fuelList[0].code;
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
        <FilterRow label="기간선택" for="date">
          <FilterRangeDateTime
            ref="dateRange"
            v-model="dateRangeVal"
            start-id="date"
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
            >충전량<strong class="ml-[.4rem] align-baseline text-primary"
              >{{ data?.pages[0].data?.totalChargingQuantity.toLocaleString()
              }}{{ unit }}</strong
            ></span
          >
          <span
            >충전금액<strong class="ml-[.4rem] align-baseline text-primary"
              >{{
                data?.pages[0].data?.totalChargingPrice.toLocaleString()
              }}원</strong
            ></span
          >
        </div>
        <div
          class="bar fs-14 text-right text-gray-900 md:inline-block md:py-[1.7rem]"
        >
          <span class="hidden md:inline">&nbsp;</span>
          <span
            >적립포인트<strong class="ml-[.4rem] align-baseline text-primary"
              >{{ data?.pages[0].data?.totalSavePnt.toLocaleString() }}P</strong
            ></span
          >
          <span
            >사용포인트<strong class="ml-[.4rem] align-baseline text-primary"
              >{{ data?.pages[0].data?.totalUsePnt.toLocaleString() }}P</strong
            ></span
          >
        </div>
        <div class="mt-[1.2rem] md:ml-8 md:mt-0 md:inline-block md:w-80">
          <FormSelect
            v-model="typeVal"
            :options="fuelOptions"
            @update:model-value="typeUpdate"
          />
        </div>
      </div>

      <div
        v-if="
          data && data.pages.length && data.pages[0].data?.chargingList.length
        "
        class="md:round-box md:mt-[1.6rem] md:p-16 md:pt-4"
      >
        <table class="fs-14 w-full break-words">
          <thead>
            <tr class="border-bottom">
              <th class="text-left">거래일</th>
              <th class="text-left">충전소</th>
              <th>충전량</th>
              <th class="hidden md:table-cell">충전금액</th>
              <th class="text-right">포인트</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(group, i) in data.pages" :key="i">
              <tr
                v-for="(item, j) in group.data?.chargingList"
                :key="j"
                class="border-bottom"
              >
                <td class="date-text text-left">
                  {{ useFormattedDate(item.transactionDt, "yyyy-MM-dd") }}
                </td>
                <td>
                  <span class="ellipsis2">{{ item.franchiseNm }}</span>
                </td>
                <td class="text-center">
                  {{ item.chargingQuantity.toLocaleString() }}{{ unit }}
                </td>
                <td class="hidden text-center md:table-cell">
                  {{ item.chargingPrice.toLocaleString() }}원
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
        <div class="gray-box mt-8 md:mt-[6.6rem]">
          <ul class="list-dot text-gray-600">
            <li>오렌지 포인트 이용내역은 최근 1년까지 조회가 가능합니다.</li>
            <li>1년 이후의 이용내역은 고객센터에 문의 하시기 바랍니다.</li>
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
  width: 6rem;
}
table tr > *:last-child {
  width: 9rem;
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
    width: 17rem;
    padding-right: 4rem;
  }
}
</style>
