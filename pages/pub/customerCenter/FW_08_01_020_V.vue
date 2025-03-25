<template>
  <div class="inner md:!px-40">
    <board-detail :board-data="detailData">
      안녕하세요. E1 오렌지카드 입니다. E1 오렌지카드의 ‘서비스 이용약관’ 내용이
      변경되어 2024년 7월 2일자로 새롭게 시행되기에 이를 알려드리니, 서비스
      이용에 불편이 없으시길 바랍니다.
    </board-detail>
  </div>
</template>
<script setup lang="ts">
import BoardDetail from "@/components/pub/BoardDetail/BoardDetail.vue";

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

const detailData = {
  title:
    "E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼 안내E1오렌지카드 APP 리뉴얼 안내",
  date: "2024-10-30",
  file: "titi_imagetiti_imagetitititi_imagetiti_imagetiti_imagetiti_imagetiti_imagetiti_imagetiti_image_imagetiti_imagetiti_imagetiti_imagetiti_imagetiti_imagetiti_imagetiti_imagetiti_imagetiti_imagetiti_image.png",
};
</script>
