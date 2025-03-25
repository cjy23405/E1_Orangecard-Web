<template>
  <div class="inner px-8 pt-[2.8rem] md:!px-40">
    <box-list :show-more="true" @show-more="onShowMore">
      <box-list-item>
        <NuxtLink
          class="block md:flex md:flex-row md:items-center md:justify-start md:text-zero"
        >
          <badge class="mb-[.6rem] md:mb-0" :is-notice="true">공지</badge>
          <span
            class="hidden text-center text-2xl text-gray-900 md:w-32 md:first:block"
            >000</span
          >
          <span
            class="notice-title ellipsis2 block text-lg font-normal text-gray-900 md:ml-16 md:!block md:w-full md:truncate md:text-2xl"
            >E1오렌지카드 APP 리뉴얼 안내</span
          >
          <span
            class="date-text mt-[.6rem] block text-right text-base text-gray-600 md:ml-16 md:mt-0 md:min-w-40 md:text-lg"
            >0000-00-00</span
          >
        </NuxtLink>
      </box-list-item>
      <box-list-item>
        <NuxtLink
          class="block md:flex md:flex-row md:items-center md:justify-start md:text-zero"
        >
          <badge class="mb-[.6rem] md:mb-0" :is-notice="true">공지</badge>
          <span
            class="hidden text-center text-2xl text-gray-900 md:w-32 md:first:block"
            >000</span
          >
          <span
            class="notice-title ellipsis2 block text-lg font-normal text-gray-900 md:ml-16 md:!block md:w-full md:truncate md:text-2xl"
          >
            E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드
            APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼
            안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼
            안내E1오렌지카드 APP 리뉴얼 안내</span
          >
          <span
            class="date-text mt-[.6rem] block text-right text-base text-gray-600 md:ml-16 md:mt-0 md:min-w-40 md:text-lg"
            >0000-00-00</span
          >
        </NuxtLink>
      </box-list-item>
      <box-list-item>
        <NuxtLink
          class="block md:flex md:flex-row md:items-center md:justify-start md:text-zero"
        >
          <span
            class="hidden text-center text-2xl text-gray-900 md:w-32 md:first:block"
            >000</span
          >
          <span
            class="notice-title ellipsis2 block text-lg font-normal text-gray-900 md:ml-16 md:!block md:w-full md:truncate md:text-2xl"
          >
            E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드
            APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼
            안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼
            안내E1오렌지카드 APP 리뉴얼 안내</span
          >
          <span
            class="date-text mt-[.6rem] block text-right text-base text-gray-600 md:ml-16 md:mt-0 md:min-w-40 md:text-lg"
            >0000-00-00</span
          >
        </NuxtLink>
      </box-list-item>
      <box-list-item>
        <NuxtLink
          class="block md:flex md:flex-row md:items-center md:justify-start md:text-zero"
        >
          <span
            class="hidden text-center text-2xl text-gray-900 md:w-32 md:first:block"
            >000</span
          >
          <span
            class="notice-title ellipsis2 block text-lg font-normal text-gray-900 md:ml-16 md:!block md:w-full md:truncate md:text-2xl"
          >
            E1오렌지카드 APP 리뉴얼 안내</span
          >
          <span
            class="date-text mt-[.6rem] block text-right text-base text-gray-600 md:ml-16 md:mt-0 md:min-w-40 md:text-lg"
            >0000-00-00</span
          >
        </NuxtLink>
      </box-list-item>
    </box-list>
  </div>
</template>
<script setup lang="ts">
import BoxList from "@/components/pub/BoxList/BoxList.vue";
import BoxListItem from "@/components/pub/BoxList/BoxListItem.vue";
import Badge from "@/components/pub/Badge.vue";

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
  stores.layout.$setGnbActive("004001");
  stores.layout.$setPageTitle("공지사항");
});

const onShowMore = () => {
  // alert("more");
};
</script>
<style lang="css" scoped>
.badge ~ .notice-title {
  font-weight: bold;
}
</style>
