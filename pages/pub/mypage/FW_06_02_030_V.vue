<template>
  <div>
    <div class="mt-[2.8rem] bg-gray-100 px-8 py-[2.8rem] md:mt-24 md:py-8">
      <div class="inner">
        <period-item></period-item>
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
              >1,234L</strong
            ></span
          >
          <span
            >충전금액<strong class="ml-[.4rem] align-baseline text-primary"
              >6,000,000원</strong
            ></span
          >
        </div>
        <div
          class="bar fs-14 text-right text-gray-900 md:inline-block md:py-[1.7rem]"
        >
          <span class="hidden md:inline">&nbsp;</span>
          <span
            >적립포인트<strong class="ml-[.4rem] align-baseline text-primary"
              >1,234P</strong
            ></span
          >
          <span
            >사용포인트<strong class="ml-[.4rem] align-baseline text-primary"
              >6,000P</strong
            ></span
          >
        </div>
        <div class="mt-[1.2rem] md:ml-8 md:mt-0 md:inline-block md:w-80">
          <Select default-value="lpg">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lpg">LPG</SelectItem>
              <SelectItem value="h2">수소</SelectItem>
              <SelectItem value="ev">EV</SelectItem>
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
              <th class="text-left">충전소</th>
              <th>충전량</th>
              <th class="hidden md:table-cell">충전금액</th>
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
              <td class="text-center">{{ point.amount }}L</td>
              <td class="hidden text-center md:table-cell">
                {{ point.charge }}원
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
        <div class="gray-box mt-8 md:mt-[6.6rem]">
          <ul class="list-dot text-gray-600">
            <li>오렌지 포인트이용내역은 최근 1년까지 조회가 가능합니다.</li>
            <li>1년 이후의 이용내역은 고객센터에 문의 하시기 바랍니다.</li>
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
  layout: "sub",
});

onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("충전 내역");
});

const pointList = [
  {
    date: "2024-12-30",
    mall: "과천충전소",
    status: "적립",
    amount: 999.99,
    charge: 9999999,
    point: 1000000,
  },
  {
    date: "2024-12-30",
    mall: "과천충전소과천충전소과천충전소과천충전소과천충전소과천충전소과천충전소과천충전소과천충전소",
    status: "사용",
    amount: 999.99,
    charge: 9999999,
    point: 1000,
  },
  {
    date: "2024-12-30",
    mall: "과천충전소과천충전소과천충전소",
    status: "사용취소",
    amount: 999.99,
    charge: 9999999,
    point: 10000,
  },
];
</script>
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
