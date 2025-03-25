<template>
  <div>
    <Tabs default-value="all" class="inner mt-[1.6rem] md:mt-16">
      <div class="w-full overflow-auto">
        <TabsList class="justify-start">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="serviceType1">쇼핑</TabsTrigger>
          <TabsTrigger value="serviceType2">취미/문화</TabsTrigger>
          <TabsTrigger value="serviceType3">정비/차량</TabsTrigger>
          <TabsTrigger value="serviceType4">외부 제휴</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent class="tabinner md:!px-[9.8rem]" value="all">
        <box-list :show-more="true" @show-more="onShowMore">
          <box-list-item
            v-for="(item, index) in items"
            :key="index"
            class="box-item h-[43.2rem] md:relative md:mb-8 md:inline-block md:h-[63.2rem] md:p-16 md:pb-[14.6rem]"
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
                </span>
              </p>
            </div>
            <div class="mt-10 py-[4.2rem] text-center md:mt-[2.8rem] md:py-28">
              <p
                class="relative mx-auto w-[9.6rem] before:absolute before:left-1/2 before:top-1/2 before:size-48 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray-200 before:content-[''] md:w-64 md:before:size-80 md:before:h-80"
              >
                <img
                  class="z-1 relative h-[3.6rem] md:h-24"
                  :src="item.src"
                  :alt="item.name"
                  @error="onImageError"
                />
              </p>
            </div>
            <div
              class="flex h-[19rem] flex-col !items-center justify-center overflow-hidden pb-4 md:my-[3.2rem] md:h-[16.6rem]"
            >
              <p class="fs-12 md:!fs-14 text-center">
                {{ item.sub }}
              </p>
              <div class="mt-[.2rem] flex flex-row justify-center text-center">
                <ul class="list-dot small fs-12 md:!fs-14 mx-auto !w-auto">
                  <li
                    v-for="(benefit, i) in item.benefits"
                    :key="i"
                    class="block w-auto"
                  >
                    {{ benefit }}
                  </li>
                </ul>
              </div>
              <p class="bar bar-gray mt-[1.2rem] text-center md:w-full">
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
            <p class="btn-wrap md:absolute md:bottom-16 md:left-0 md:px-16">
              <NuxtLink class="btn-txt gray" @click="isDialogOpen = true"
                >이용방법</NuxtLink
              >
            </p>
          </box-list-item>
        </box-list>
      </TabsContent>
    </Tabs>

    <alert-item
      :show="isDialogOpen"
      ondialogch
      :alert-title="'CU 편의점 이용방법 안내'"
      :cancel="'확인'"
      :ok="'서비스 바로가기'"
      @update:is-dialog-open="isDialogOpen = false"
    >
      <div>
        <strong>[포인트 사용]</strong>
        <p>①실물 오렌지카드 제시</p>
        <p>②비밀번호 입력</p>
        <p>③오렌지 포인트로 결제 금액 설정</p>
        <strong>[포인트 적립]</strong>
        <p>①실물 오렌지카드 제시</p>
        <p>②결제금액의 1% 적립</p>
        <strong>[유의사항]</strong>
        <p>①적립 불가 상품: 담배 및 주류</p>
        <p>
          ②사용 불가 상품: 비식품면세상품(공중전화카드, 종량제 봉투, 복권 등) ,
          업무대행서비스(로또, 스포츠토토 등)
        </p>
      </div>
    </alert-item>
  </div>
</template>
<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BoxList from "@/components/pub/BoxList/BoxList.vue";
import BoxListItem from "@/components/pub/BoxList/BoxListItem.vue";
import AlertItem from "@/components/pub/AlertItem.vue";
import Badge from "@/components/pub/Badge.vue";
//test img
import testImg from "@/assets/img/benefit/service02.png";
import defaultImg from "@/assets/img/benefit/service01.png"; //추후에 noimage로 변경

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
  stores.layout.$setGnbActive("002002");
  stores.layout.$setPageTitle("제휴서비스");
});

const onShowMore = () => {
  // alert("more");
};

const isDialogOpen = ref(false);
const items = [
  {
    benefittype: "쇼핑",
    src: "",
    name: "CU",
    sub: "전국 9,500개 대한민국 1등 편의점",
    benefits: ["포인트 사용 가능", "포인트 적립 1%"],
  },
  {
    benefittype: "쇼핑",
    src: testImg,
    name: "이마트",
    sub: "전국 이마트 매장에서 신세계 상품권 교환 가능",
    benefits: ["오렌지 포인트로 신세계 상품권 교환 (5,000P 단위)"],
  },
  {
    benefittype: "쇼핑",
    src: testImg,
    name: "기프트쇼",
    sub: "스타벅스, 투썸, 파리바게트 등 인기 제휴처 모바일 쿠폰 구매",
    benefits: [
      "모바일 쿠폰 구매 시 오렌지 포인트 사용 가능",
      "오렌지 포인트 사용 가능",
    ],
  },
  {
    benefittype: "쇼핑",
    src: testImg,
    name: "프로스펙스",
    benefits: ["포인트사용 가능"],
  },
  {
    benefittype: "취미/문화",
    src: testImg,
    name: "CGV",
    sub: "온라인 예매 및 현장 구매 시 오렌지 포인트 사용",
    benefits: ["포인트사용 가능"],
  },
  {
    benefittype: "취미/문화",
    src: testImg,
    name: "알라딘",
    benefits: [
      "베스트셀러/추천도서를 포인트로 구매 가능",
      "포인트 사용 가능",
      "포인트적립: 구매금액의 2%",
      "알라딘 적립금 전환 가능",
    ],
  },
  {
    benefittype: "차량/정비",
    src: testImg,
    name: "평우서비스",
    sub: "평우복지 정비센터 빵빵용달 정비센터 등 정비 전문업체",
    benefits: [
      "포인트 사용 가능",
      "포인트 적립: 0.5%",
      "차량 무상점검(연 1회)",
      "워셔액 제공(최초 1회)",
    ],
  },
  {
    benefittype: "차량/정비",
    src: testImg,
    name: "LPG 전문 경정비 서비스",
    benefits: [
      "한국 가스공사/E1이 인증한 LPG 전문 정비 서비스",
      "포인트 사용 가능",
      "포인트 적립: 1%",
      "15개 항목 무료 점검",
      "타이어펑크 무료 수리",
    ],
  },
  {
    benefittype: "차량/정비",
    src: testImg,
    name: "롯데 렌터카",
    benefits: [
      "전국 롯데 렌터카 이용 가능",
      "결제금액 40% 할인",
      "제주 지역 추가 할인율 제공",
    ],
  },
  {
    benefittype: "외부 제휴",
    src: testImg,
    name: "E1 X 롯데오토리스 제휴 혜택",
    benefits: [
      "롯데오토리스 Biz car에서 LPG 화물차 리스하면, 차량운영비는 DOWN 포인트는 UP",
    ],
    types: ["LPG", "H2수소", "EV전기"],
  },
  {
    benefittype: "외부 제휴",
    src: testImg,
    name: "E1 X 카동 신차 구매",
    benefits: [
      "롯데오토리스 Biz car에서 LPG 화물차 리스하면, 차량운영비는 DOWN 포인트는 UP",
    ],
    types: ["LPG"],
  },
  {
    benefittype: "외부 제휴",
    src: testImg,
    name: "자동차보험 가입 혜택",
    benefits: [
      "롯데오토리스 Biz car에서 LPG 화물차 리스하면, 차량운영비는 DOWN 포인트는 UP",
    ],
    types: ["LPG", "H2수소", "EV전기"],
  },
];
</script>
<style lang="css" scoped>
img {
  mix-blend-mode: multiply;
}
.popup-data strong {
  display: block;
  font-weight: bold;
}
.popup-data * + strong {
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .box-item {
    width: calc(50% - 1rem);
  }
  .box-item:nth-child(2n-1) {
    margin-right: 2rem;
  }
}
</style>
