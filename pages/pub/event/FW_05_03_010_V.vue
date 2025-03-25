<template>
  <div class="inner">
    <box-list :show-more="true" class="md:px-40" @show-more="onShowMore">
      <box-list-item
        v-for="(item, index) in items"
        :key="index"
        class="box-item"
      >
        <NuxtLink
          class="block md:flex md:flex-row md:items-center md:justify-start md:text-zero"
        >
          <span
            class="hidden text-center text-2xl text-gray-900 md:w-32 md:first:block"
            >{{ item.index }}</span
          >
          <span
            class="notice-title ellipsis2 block text-lg font-normal text-gray-900 md:ml-16 md:!block md:w-full md:truncate md:text-2xl"
            >{{ item.title }}</span
          >
          <span
            class="date-text mt-[.6rem] block text-right text-base text-gray-600 md:ml-16 md:mt-0 md:w-52 md:text-lg"
            >{{ item.date }}</span
          >
        </NuxtLink>
      </box-list-item>
    </box-list>
  </div>
</template>
<script setup lang="ts">
import BoxList from "@/components/pub/BoxList/BoxList.vue";
import BoxListItem from "@/components/pub/BoxList/BoxListItem.vue";
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
  stores.layout.$setGnbActive("003003");
  stores.layout.$setPageTitle("당첨자확인");
});

const items = [
  {
    index: 999,
    title:
      "<티티Go to 충전소 오카 패밀리데이> 당첨자 안내<티티Go to 충전소 오카 패밀리데이> 당첨자 안내<티티Go to 충전소 오카 패밀리데이> 당첨자 안내<티티Go to 충전소 오카 패밀리데이> 당첨자 안내<티티Go to 충전소 오카 패밀리데이> 당첨자 안내",
    date: "2024-10-30",
  },
  {
    index: 999,
    title: "<티티Go to 충전소 오카 패밀리데이> 당첨자 안내",
    date: "2024-10-30",
  },
];

const onShowMore = () => {
  // alert("more");
};
</script>
<style lang="css" scoped></style>
