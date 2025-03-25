<template>
  <div class="md:inner mt-[2.8rem] md:mt-0">
    <div class="md:round-box">
      <div
        class="border-y border-solid border-gray-300 p-8 pb-6 md:border-none md:px-16 md:py-[2.8rem]"
      >
        <p class="overflow-hidden">
          <span
            v-if="item.types.length > 2"
            class="fs-12 font-bold text-gray-600 md:!text-lg"
          >
            전체
          </span>
          <span
            v-for="(type, index) in item.types"
            v-else
            :key="index"
            class="fs-12 font-bold md:!text-lg"
            :class="{
              'text-primary': type === 'LPG',
              'text-e1h2blue': type === 'H2수소',
              'text-e1evgreen': type === 'EV전기',
            }"
            >{{ type }}</span
          >
          <span class="bar fs-14 float-end text-gray-600">
            <span>당첨자발표</span>
            <span class="date-text">{{ item.announcement }}</span>
          </span>
        </p>
        <div class="md:mt-4 md:flex md:flex-row">
          <p
            class="fs-16 md:fs-18 md:ellipsis my-[.6rem] font-bold md:my-0 md:flex-1"
          >
            {{ item.title }}
          </p>
          <p class="fs-14 date-text text-gray-600">
            {{ item.startDate }}~{{ item.endDate }}
          </p>
        </div>
      </div>
      <!-- html load : event -->
      <div class="md:border-top">
        <!-- 이벤트 내용이 로드될 위치 -->
      </div>
    </div>
    <p class="btn-wrap border-top p-8 pb-0 md:mt-20 md:!border-none md:pt-0">
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
  stores.layout.$setPageTitle("종료이벤트");
});

interface Item {
  types: string[];
  title: string;
  startDate: string;
  endDate: string;
  announcement: string;
}

const item: Item = {
  types: ["LPG", "H2수소", "EV전기"],
  title: "티티송 뮤직비디오 퀴즈 맞추고 티티 방향제 받자",
  startDate: "2024-12-01",
  endDate: "2024-12-30",
  announcement: "2024-10-30",
};
</script>
<style lang="css" scoped></style>
