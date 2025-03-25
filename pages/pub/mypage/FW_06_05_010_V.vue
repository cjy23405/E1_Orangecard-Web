<template>
  <div class="border-top inner md:no-border mt-[2.8rem] px-8 md:mt-0 md:px-0">
    <div class="pt-[1.2rem] md:px-40 md:pt-0">
      <div>
        <p class="fs-18 mb-8 font-bold md:mb-16">사용중인 카드</p>
        <card
          v-for="(item, i) in useCardList"
          :key="i"
          :card-name="item.cardName"
          :is-main-card="item.isMainCard"
          :card-number="item.cardNumber"
          :date="item.date"
        ></card>
        <p class="md:btn-wrap mt-16 md:mt-24">
          <NuxtLink class="btn-txt gray">카드 비밀번호 변경</NuxtLink>
          <NuxtLink class="btn-txt primary mt-[.8rem] md:mt-0"
            >신규 카드 등록</NuxtLink
          >
        </p>
      </div>
      <div class="mt-[9.2rem] md:mt-48">
        <p class="fs-18 mb-[1.2rem] font-bold md:mb-16">분실 카드</p>
        <card
          v-for="(item, i) in LostCardList"
          :key="i"
          :card-name="item.cardName"
          :card-number="item.cardNumber"
          :date="item.date"
          :is-lost="item.isLost"
        ></card>
        <p class="btn-wrap mt-8 md:mt-24">
          <NuxtLink class="btn-more">더보기</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Card from "@/components/pub/MyPage/card.vue";
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
  stores.layout.$setPageTitle("오렌지카드 관리");
});

const useCardList = [
  {
    cardName: "오렌지카드",
    isMainCard: true,
    cardNumber: "1234-45**-****-1111",
    date: "2024-12-30",
  },
  {
    cardName: "E1 개인택시운송사업자 신한카드",
    isMainCard: false,
    cardNumber: "1234-45**-****-1111",
    date: "2024-12-30",
  },
];
const LostCardList = [
  {
    cardName: "오렌지카드",
    cardNumber: "1234-45**-****-1111",
    date: "2024-12-30",
    isLost: true,
  },
  {
    cardName: "E1 개인택시운송사업자 신한카드",
    cardNumber: "1234-45**-****-1111",
    date: "2024-12-30",
    isLost: true,
  },
];
</script>
