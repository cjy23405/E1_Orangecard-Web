<template>
  <div class="md:inner mt-[2.8rem] md:mt-16">
    <div class="md:round-box">
      <div
        class="border-y border-solid border-gray-300 p-8 pb-6 md:border-t-0 md:px-16 md:py-12"
      >
        <div class="md:flex md:flex-row">
          <span
            v-if="item.types.length > 2"
            class="fs-12 font-bold text-gray-600 md:hidden md:!text-lg"
          >
            전체
          </span>
          <span
            v-for="(type, index) in item.types"
            v-else
            :key="index"
            class="fs-12 font-bold md:hidden md:!text-lg"
            :class="{
              'text-primary': type === 'LPG',
              'text-e1h2blue': type === 'H2수소',
              'text-e1evgreen': type === 'EV전기',
            }"
            >{{ type }}</span
          >
          <p class="fs-16 md:ellipsis my-[.6rem] font-bold md:my-0 md:flex-1">
            {{ item.title }}
          </p>
          <span class="bar fs-14 text-gray-600">
            <span>당첨자발표</span>
            <span class="date-text">{{ item.announcement }}</span>
          </span>
        </div>
      </div>
      <div class="p-8 pb-16 md:p-16">
        <pre class="fs-14 text-center">
안녕하세요, E1 오렌지카드 고객여러분!

티티와 함께하는 오윷완 이벤트!
이벤트 당첨결과를 아래와 같이 발표합니다.
응모하신 모든분들께 감사드리며, 
앞으로도 지속적인 관심과 참여 부탁드립니다.</pre
        >
        <div class="relative mt-[5.3rem] pt-[6.6rem] md:mt-24 md:pt-[13.3rem]">
          <p
            class="titi-bubble-box fs-12 md:left md:fs-22 absolute left-[12.7rem] right-0 top-0 h-[4.2rem] w-auto bg-primary-foreground px-12 py-[1.2rem] text-center align-baseline text-gray-900 md:left-[27rem] md:right-auto md:top-8 md:h-28 md:px-24 md:py-8"
          >
            <strong class="fs-12 md:fs-22 align-baseline font-bold text-primary"
              >이벤트 당첨</strong
            >을 축하합니다~!
          </p>
          <div
            class="winner-box rounded-lg bg-gray-100 px-[3.6rem] pb-24 pt-[7.8rem] text-center before:absolute before:left-0 before:top-0 before:size-60 before:bg-contain before:bg-center before:bg-no-repeat before:content-[''] md:left-8 md:px-24 md:pb-32 md:pt-24 md:before:size-[30rem]"
          >
            <div
              v-for="(rankWinner, i) in winners"
              :key="i"
              class="border-top pb-20 pt-16 first:border-none first:pb-20 first:pt-0 last:pb-0 md:pb-28 md:pt-24 md:first:pb-28"
            >
              <div v-if="rankWinner.winnerList">
                <p class="fs-18 md:fs-22 pt-[1.6rem] font-bold">
                  <span
                    class="tit relative mx-auto w-auto px-[.4rem] after:absolute after:bottom-0 after:left-0 after:h-4 after:w-full after:bg-primary after:opacity-10 after:content-['']"
                  >
                    {{ rankWinner.rank }}등
                    <strong
                      class="fs-18 md:fs-22 align-baseline font-bold text-primary"
                      >{{ rankWinner.product }}</strong
                    ></span
                  >
                  <span
                    class="count-round fs-14 md:fs-16 ml-[.7rem] mt-[-1.6rem] inline-block rounded-lg rounded-es-sm bg-primary px-4 py-[.6rem] font-normal text-white md:mt-[-1.2rem]"
                    >{{ rankWinner.count }}명</span
                  >
                </p>
                <ul class="fs-14 mt-24 px-[.4rem] text-left md:text-center">
                  <li
                    v-for="(winnerUser, index) in rankWinner.winnerList"
                    :key="index"
                  >
                    <strong class="mr-[.8rem] align-baseline font-bold">{{
                      winnerUser.winnerName
                    }}</strong
                    >({{ winnerUser.winnerId }})
                  </li>
                </ul>
              </div>
              <div v-else>
                <p
                  class="tit fs-16 md:fs-22 relative mx-auto inline-block w-auto px-[.4rem] after:absolute after:bottom-0 after:left-0 after:h-4 after:w-full after:bg-primary after:opacity-10 after:content-['']"
                >
                  {{ rankWinner.rank }}등 {{ rankWinner.product }} /
                  {{ rankWinner.count }}명
                </p>
              </div>
            </div>
          </div>
          <div class="mt-8 rounded-lg bg-gray-100 p-[1.6rem] md:mt-16">
            <ul class="list-dot fs-14 text-gray-600">
              <li>상품은 발표일 기준 익일 오전 10시에 지급됩니다.</li>
              <li>
                지급된 오렌지 포인트는 제휴가맹점 및 전국 E1충전소 등에서
                사용하실 수 있습니다.
              </li>
              <li>당첨자확인은 모바일 앱에서도 확인 가능합니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <p class="btn-wrap border-top px-8 pt-8 md:mt-24 md:!border-none md:pt-0">
      <NuxtLink class="btn-txt gray">목록</NuxtLink>
    </p>
  </div>
</template>
<script setup lang="ts">
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
  stores.layout.$setGnbActive("003002");
  stores.layout.$setPageTitle("당첨자발표");
});

interface Item {
  types: string[];
  title: string;
  announcement: string;
}

const item: Item = {
  types: ["LPG", "H2수소", "EV전기"],
  title: "티티송 뮤직비디오 퀴즈 맞추고 티티 방향제 받자",
  announcement: "2024-10-30",
};

const winners = [
  {
    rank: 1,
    product: "오렌지 포인트 100만 P",
    count: 1,
    winnerList: [
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
    ],
  },
  {
    rank: 2,
    product: "오렌지 포인트 10만 P",
    count: 3,
    winnerList: [
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
    ],
  },
  {
    rank: 3,
    product: "오렌지 포인트 1만 P",
    count: 30,
    winnerList: [
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
      {
        winnerName: "홍*동",
        winnerId: "hone*****",
      },
    ],
  },
  {
    rank: 4,
    product: "스타벅스 아메리카노 T",
    count: 2000,
  },
];
</script>
<style lang="css" scoped>
.winner-box:before {
  background-image: url("@/assets/img/event/event-titi.png");
}

.winner-box ul li {
  width: 50%;
  display: inline-block;
  margin-top: 2rem;
  text-align: center;
}
.winner-box ul li:only-child {
  width: 100%;
}
.winner-box ul li:nth-child(1),
.winner-box ul li:nth-child(2) {
  margin-top: 0;
}
.titi-bubble-box {
  border-radius: 1rem 1rem 1rem 0.2rem;
}
.count-round {
  border-radius: 1.2rem 1.2rem 1.2rem 0.4rem;
}
@media (min-width: 768px) {
  .winner-box ul li {
    width: 20%;
    margin-top: 4rem;
  }
  .winner-box ul li:nth-child(3),
  .winner-box ul li:nth-child(4),
  .winner-box ul li:nth-child(5) {
    margin-top: 0;
  }
  .titi-bubble-box {
    border-radius: 2rem 2rem 2rem 0.4rem;
  }
}
</style>
