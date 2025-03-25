<template>
  <div class="inner">
    <box-list :show-more="true" @show-more="onShowMore">
      <box-list-item
        v-for="(item, index) in items"
        :key="index"
        class="box-item !p-0 md:!mb-8 md:inline-block"
        :is-big-margin="true"
      >
        <div class="flex flex-row px-8 py-[1.3rem] md:px-12 md:py-[2.1rem]">
          <p class="bar flex-1">
            <span
              v-if="item.types.length > 2"
              class="fs-12 font-bold text-gray-600 md:!text-lg"
            >
              전체
            </span>
            <span
              v-for="(type, i) in item.types"
              v-else
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
          <p class="fs-12 date-text text-gray-600">
            {{ item.startDate }}
            <span class="mx-[.3rem]">~</span>
            {{ item.endDate }}
          </p>
        </div>
        <div
          class="w-full overflow-hidden rounded-ee-lg rounded-es-lg md:relative md:h-[25rem]"
        >
          <img
            class="z-1 relative w-full rounded-ee-lg rounded-es-lg md:absolute md:top-1/2 md:-translate-y-1/2"
            :src="item.src"
            :alt="item.name"
          />
        </div>
      </box-list-item>
    </box-list>
  </div>
</template>
<script setup lang="ts">
import BoxList from "@/components/pub/BoxList/BoxList.vue";
import BoxListItem from "@/components/pub/BoxList/BoxListItem.vue";
//test img
import testImg from "@/assets/img/test/event.png";
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
  stores.layout.$setGnbActive("003001");
  stores.layout.$setPageTitle("진행이벤트");
});

const items = [
  {
    types: ["LPG", "H2수소", "EV전기"],
    src: testImg,
    name: "오렌지 포인트로 차량정비하세요!",
    startDate: "2024-10-30",
    endDate: "2024-12-31",
  },
  {
    types: ["LPG", "H2수소"],
    src: testImg,
    name: "오렌지 포인트로 차량정비하세요!",
    startDate: "2024-10-30",
    endDate: "2024-12-31",
  },
  {
    types: ["H2수소", "EV전기"],
    src: testImg,
    name: "오렌지 포인트로 차량정비하세요!",
    startDate: "2024-10-30",
    endDate: "2024-12-31",
  },
];

const onShowMore = () => {
  // alert("more");
};
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
