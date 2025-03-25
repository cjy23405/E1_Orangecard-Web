<script setup lang="ts">
import { ref } from "vue";
import FullPopup from "@/components/pub/FullPopup.vue";
import SearchItem from "@/components/pub/SearchItem.vue";
import BoxList from "@/components/pub/BoxList/BoxList.vue";

const isPopOpen = ref(false);
// 스토어
const stores = {
  layout: useStoreLayout(),
};
// 레이아웃 선택
definePageMeta({
  layout: "pub-guide",
});
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("");
});
const onShowMore = () => {
  // alert("more");
};
</script>

<template>
  <div>
    <p class="btn-wrap">
      <NuxtLink class="btn-txt primary small" @click="isPopOpen = true">
        우편번호 찾기
      </NuxtLink>
    </p>
    <full-popup
      :title="'우편번호 찾기'"
      :is-open="isPopOpen"
      @close="isPopOpen = false"
    >
      <div class="size-full">
        <!-- 검색영역 -->
        <div class="border-bottom mb-[2.8rem] pb-[2.8rem]">
          <p class="text-lg text-gray-700">
            도로명, 지번 구분없이 검색 할 수 있습니다.
          </p>
          <search-item class="mt-[1.2rem] !px-0"></search-item>
          <p class="mt-[.8rem] text-base text-gray-600">
            예) 서울특별시 강남구 삼성1동 봉은사로 524
          </p>
        </div>
        <!-- 검색전  -->
        <div class="rounded-lg bg-gray-100 p-[1.6rem]">
          <p class="text-lg text-gray-600">주소 검색 예시</p>
          <ul
            class="list-dash small mt-[1.6rem] text-lg leading-[2.2rem] text-gray-900"
          >
            <li>도로명 + 건물번호 예) 봉은사로 524</li>
            <li>건물명 예) 아셈타워</li>
            <li>읍/면/동/리 + 지번 예) 삼성동 159</li>
          </ul>
        </div>
        <!-- 검색결과 없음 -->
        <div class="nodata !min-h-[30vh]">
          <p>조회 결과가 없습니다.</p>
        </div>
        <!-- 검색결과 -->
        <div class="pb-16 md:pb-0">
          <p class="mb-[1.2rem] text-base text-gray-900">
            <strong class="align-baseline text-base font-bold text-primary"
              >1,000</strong
            >건
          </p>
          <box-list
            :show-more="true"
            :small-button="true"
            @show-more="onShowMore"
          >
            <li class="round-box mb-[.8rem] p-[1.6rem] pt-8">
              <NuxtLink>
                <p
                  class="mb-[.4rem] text-base font-bold leading-8 text-gray-600"
                >
                  55780
                </p>
                <p class="mb-[.4rem] text-lg leading-[2.2rem]">
                  전북특별자치도 남원시 대산면 독산길 14
                </p>
                <p class="text-lg leading-[2.2rem]">
                  [지번]전북특별자치도 남원시 대산면 풍촌리 179-2 독산마을회관
                </p>
              </NuxtLink>
            </li>
          </box-list>
        </div>
      </div>
    </full-popup>
  </div>
</template>

<style lang="css" scoped></style>
