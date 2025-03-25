<template>
  <div>
    <Tabs default-value="all" class="inner mt-[1.6rem] md:mt-16">
      <div class="w-full overflow-auto">
        <TabsList class="justify-start">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="cardType1">일반</TabsTrigger>
          <TabsTrigger value="cardType2">화물</TabsTrigger>
          <TabsTrigger value="cardType3">택시</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent class="tabinner md:!px-[9.8rem]" value="all">
        <box-list
          :show-more="true"
          class="md:overflow-hidden"
          @show-more="onShowMore"
        >
          <box-list-item
            v-for="(item, index) in items"
            :key="index"
            class="box-item min-h-[43.2rem] md:relative md:mb-8 md:inline-block md:h-[63.2rem] md:p-16"
            :is-small="true"
          >
            <div>
              <p class="flex flex-row">
                <span class="ellipsis fs-16 flex-1 font-bold">
                  {{ item.name }}
                </span>
                <span>
                  <Badge :type="'gray'">
                    {{ item.benefittype }}
                  </Badge>
                  <Badge :type="'gray'" class="ml-[.4rem]">{{
                    item.cardtype
                  }}</Badge>
                </span>
              </p>
            </div>
            <div class="mt-10 py-[2.2rem] text-center md:mt-0 md:py-[3.7rem]">
              <p
                class="relative mx-auto h-[8.7rem] w-52 before:absolute before:left-1/2 before:top-1/2 before:size-48 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray-200 before:content-[''] md:h-[14.2rem] md:w-[21.6rem] md:before:size-80 md:before:h-80"
              >
                <img
                  class="z-1 relative w-full"
                  :src="item.src"
                  :alt="item.name"
                  @error="onImageError"
                />
              </p>
            </div>
            <p class="mt-[.6rem] text-center md:mt-[1.2rem]">
              <NuxtLink class="blue-link">자세히보기</NuxtLink>
            </p>
            <div
              class="flex h-[17rem] flex-col !items-center justify-center md:h-[23rem]"
            >
              <div class="flex flex-row justify-center">
                <ul class="list-dot small fs-12 md:!fs-14 mx-auto !w-auto">
                  <li
                    v-for="(benefit, i) in item.benefits"
                    :key="i"
                    class="block w-auto text-center"
                  >
                    {{ benefit }}
                  </li>
                </ul>
              </div>
              <p
                class="bar bar-gray mt-[1.2rem] text-center md:mt-[1.6rem] md:w-full"
              >
                <span
                  v-for="(type, i) in item.types"
                  :key="i"
                  class="fs-12 font-bold md:!text-lg"
                  :class="{
                    'text-primary': type === 'LPG',
                    'text-e1h2blue': type === 'H2수소',
                    'text-e1evgreen': type === 'EV전기',
                  }"
                  >{{ type }}</span
                >
              </p>
            </div>
            <p class="btn-wrap">
              <NuxtLink class="btn-txt gray md:!hidden">전화걸기</NuxtLink>
              <NuxtLink class="btn-txt gray !hidden md:!ml-0 md:!block">{{
                item.tel
              }}</NuxtLink>
            </p>
          </box-list-item>
        </box-list>
      </TabsContent>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BoxList from "@/components/pub/BoxList/BoxList.vue";
import BoxListItem from "@/components/pub/BoxList/BoxListItem.vue";
import Badge from "@/components/pub/Badge.vue";
//test img
import testImg from "@/assets/img/benefit/card02.png";
import defaultImg from "@/assets/img/benefit/card01.png"; //추후에 noimage로 변경

const onImageError = (e: Event) => {
  const target = e.target as HTMLImageElement | null;
  if (target) {
    target.src = defaultImg;
  }
};

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
  stores.layout.$setGnbActive("002001");
  stores.layout.$setPageTitle("제휴카드");
});

const onShowMore = () => {
  // alert("more");
};

const items = [
  {
    benefittype: "일반",
    src: "",
    name: "E1 LPG KB 국민카드",
    benefits: ["리터당 100원 할인", "생활 편의 영역 10% 할인"],
    types: ["LPG"],
    cardtype: "신용",
    tel: "010-1234-1234",
  },
  {
    benefittype: "일반",
    src: testImg,
    name: "E1 LPG 롯데카드",
    benefits: [
      "리터당87원 적립",
      "롯데마트 10% 적립",
      "하이패스 최대 30% 적립",
    ],
    types: ["LPG"],
    cardtype: "신용",
    tel: "010-1234-1234",
  },
  {
    benefittype: "일반",
    src: testImg,
    name: "E1 IBK카드",
    benefits: [
      "리터당87원 적립",
      "롯데마트 10% 적립",
      "하이패스 최대 30% 적립",
    ],
    types: ["LPG"],
    cardtype: "신용",
    tel: "010-1234-1234",
  },
  {
    benefittype: "일반",
    src: testImg,
    name: "E1 LPG 롯데카드",
    benefits: ["리터당 47원 적립", "연회비 없음"],
    types: ["LPG"],
    cardtype: "체크",
    tel: "010-1234-1234",
  },
  {
    benefittype: "화물",
    src: testImg,
    name: "E1 LPG 화물복지 신한카드",
    benefits: [
      "LPG 충전 1% 할인",
      "오렌지 포인트 최대 2.5% 적립",
      "유가보조금 지원",
    ],
    types: ["LPG"],
    cardtype: "신용",
    tel: "010-1234-1234",
  },
  {
    benefittype: "택시",
    src: testImg,
    name: "E1 개인택시 롯데카드",
    benefits: ["LPG 충전 2% 적립", "외식업종 10% 할인"],
    types: ["LPG"],
    cardtype: "신용",
    tel: "010-1234-1234",
  },
  {
    benefittype: "택시",
    src: testImg,
    name: "E1 개인택시 신한카드",
    benefits: ["충전금액 최대 2% 혜택", "요식, 의료 업종 5% 할인"],
    types: ["LPG"],
    cardtype: "신용",
    tel: "010-1234-1234",
  },
  {
    benefittype: "일반",
    src: testImg,
    name: "E1 LPG KB 국민카드",
    benefits: ["리터당 100원 할인", "생활 편의 영역 10% 할인"],
    types: ["LPG", "H2수소", "EV전기"],
    cardtype: "체크",
    tel: "010-1234-1234",
  },
  {
    benefittype: "일반",
    src: testImg,
    name: "E1 LPG 롯데카드",
    benefits: ["리터당 100원 할인", "생활 편의 영역 10% 할인"],
    types: ["LPG", "H2수소", "EV전기"],
    cardtype: "체크",
    tel: "010-1234-1234",
  },
  {
    benefittype: "화물",
    src: testImg,
    name: "E1 LPG 화물복지 신한카드",
    benefits: ["리터당 100원 할인", "생활 편의 영역 10% 할인"],
    types: ["LPG"],
    cardtype: "체크",
    tel: "010-1234-1234",
  },
];
</script>
<style lang="css" scoped>
@media (min-width: 768px) {
  .box-item {
    width: calc(50% - 1rem);
  }
  .box-item:nth-child(2n-1) {
    margin-right: 2rem;
  }
}
</style>
