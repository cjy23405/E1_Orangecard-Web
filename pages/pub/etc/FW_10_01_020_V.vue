<template>
  <div>
    <div class="mt-[2.8rem] bg-gray-100 px-8 py-16 md:mt-24 md:py-8">
      <div class="inner">
        <div class="md:flex md:flex-row md:items-center">
          <p class="font-bold md:w-[12.8rem]">가용포인트</p>
          <p class="mt-[.8rem] text-xl leading-[2.4rem] text-primary md:mt-0">
            <strong class="mr-[.3rem] text-3xl font-bold leading-[3rem]"
              >1,000,000</strong
            >P
          </p>
        </div>
        <period-item :is-mini="true" class="mt-[2.8rem]"></period-item>
      </div>
    </div>
    <div class="inner px-8 pt-8 md:px-0 md:pt-16">
      <div class="md:text-right">
        <div class="md:ml-8 md:mt-0 md:inline-block md:w-80">
          <Select default-value="all">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="earn">적립</SelectItem>
              <SelectItem value="use">사용</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <!-- 검색결과 없음 
      <div class="nodata">
        <p>검색 결과가 없습니다.</p>
      </div>-->
      <!-- 검색 결과 -->
      <div class="md:round-box md:mt-[1.6rem] md:p-16 md:pt-4">
        <table class="fs-14 w-full break-words">
          <thead>
            <tr class="border-bottom">
              <th class="text-left">거래일</th>
              <th class="text-left">가맹점</th>
              <th>적립/사용</th>
              <th class="text-right">포인트</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(point, index) in pointList"
              :key="index"
              class="border-bottom"
            >
              <td class="date-text text-left">{{ point.date }}</td>
              <td>
                <span class="ellipsis2">{{ point.mall }}</span>
              </td>
              <td
                class="text-center text-gray-600"
                :class="{ '!text-primary': point.status === '적립' }"
              >
                {{ point.status }}
              </td>
              <td
                class="text-right text-gray-600"
                :class="{
                  '!text-primary': point.status === '적립',
                  'line-through': point.status === '사용취소',
                }"
              >
                {{ point.point }}P
              </td>
            </tr>
          </tbody>
        </table>
        <p class="btn-wrap mt-8 md:mt-24">
          <NuxtLink class="btn-more">더보기</NuxtLink>
        </p>
        <div class="gray-box mt-8 md:mt-24">
          <ul class="list-dot text-gray-600">
            <li>충전소포인트이용내역은 최근 1년까지 조회가 가능합니다.</li>
            <li>1년 이후의 이용내역은 고객센터에 문의 하시기 바랍니다.</li>
            <li>상세 문의는 고객센터(1688-2121)로 문의하시기 바랍니다.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PeriodItem from "@/components/pub/PeriodItem.vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// 스토어
const stores = {
  layout: useStoreLayout(),
};

// 레이아웃 선택
definePageMeta({
  layout: "etc",
});

onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setPageTitle("법인택시 포인트 내역");
  stores.layout.$setUseFooter(false);
  stores.layout.$setUseHeaderLine(false);
});

const pointList = [
  {
    date: "2024-12-30",
    mall: "과천충전소",
    status: "적립",
    detail: "부탄",
    point: 1000000,
  },
  {
    date: "2024-12-30",
    mall: "과천충전소과천충전소과천충전소과천충전소과천충전소과천충전소과천충전소과천충전소과천충전소",
    status: "사용",
    detail: "이벤트 응모",
    point: 1000,
  },
  {
    date: "2024-12-30",
    mall: "과천충전소과천충전소과천충전소",
    status: "사용취소",
    detail: "부탄",
    point: 10000,
  },
];
</script>
<style lang="css" scoped>
.no-border * {
  border: none;
}
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
