<template>
  <div>
    <div class="mt-[2.8rem] bg-gray-100 px-8 py-[2.8rem] md:mt-24 md:py-8">
      <div class="inner">
        <div class="ipt-wrap">
          <label
            class="relative mb-[.8rem] block font-bold text-gray-800 md:mb-0"
            >충전소 선택</label
          >
          <Select default-value="item1">
            <SelectTrigger class="!bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="item1">주식회사과천엘피지충전소</SelectItem>
              <SelectItem value="item2">주식회사과천엘피지충전소</SelectItem>
              <SelectItem value="item3">주식회사과천엘피지충전소</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
            >적립<strong class="ml-[.4rem] align-baseline text-primary"
              >2,000P</strong
            ></span
          >
          <span
            >사용<strong class="ml-[.4rem] align-baseline text-primary"
              >6,000P</strong
            ></span
          >
        </div>
        <div class="mt-[1.2rem] md:ml-8 md:mt-0 md:inline-block md:w-80">
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
              <th class="text-left">충전소</th>
              <th>이용내역</th>
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
              <td class="text-center">
                {{ point.detail }}
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
  layout: "sub",
});

onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("충전소 포인트 내역");
});

const pointList = [
  {
    date: "2024-12-30",
    mall: "과천충전소",
    status: "적립",
    detail: "수동적립",
    point: "1,000,000",
  },
  {
    date: "2024-12-30",
    mall: "과천충전소과천충전소과천충전소과천충전소과천충전소과천충전소과천충전소과천충전소과천충전소",
    status: "사용",
    detail: "수동적립",
    point: "1,000",
  },
  {
    date: "2024-12-30",
    mall: "과천충전소과천충전소과천충전소",
    status: "사용취소",
    detail: "자동적립",
    point: "1,000",
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
table tr > *:last-child {
  width: 10rem;
  padding-right: 2rem;
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
