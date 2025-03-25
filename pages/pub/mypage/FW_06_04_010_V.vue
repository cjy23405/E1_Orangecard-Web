<template>
  <div>
    <div
      class="border-top border-bottom inner mt-[2.8rem] px-8 md:mt-24 md:px-0"
    >
      <!-- 필수입력정보 -->
      <join-info-1 :type-ipin="typeIpin"></join-info-1>
      <!-- 차량정보 -->
      <join-info-2 :type-ipin="typeIpin" :show-terms-text="true"></join-info-2>
      <!-- 추가정보 -->
      <join-info-3></join-info-3>
    </div>
    <div class="btn-wrap p-8 pb-0 md:pt-24">
      <NuxtLink class="btn-txt gray">취소</NuxtLink>
      <NuxtLink class="btn-txt primary">수정</NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import joinInfo1 from "@/components/pub/JoinInfo/joinInfo1.vue";
import joinInfo2 from "@/components/pub/JoinInfo/joinInfo2.vue";
import joinInfo3 from "@/components/pub/JoinInfo/joinInfo3.vue";
const typeIpin = ref(true);
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
  stores.layout.$setPageTitle("회원정보 수정");
});
</script>
