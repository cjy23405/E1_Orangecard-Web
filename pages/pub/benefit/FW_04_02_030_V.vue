<template>
  <div class="mt-[1.6rem] md:mt-16">
    <div>
      <!-- 이벤트 내용이 로드될 위치 -->
    </div>
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
  stores.layout.$setGnbActive("002003");
  stores.layout.$setPageTitle("외부제휴");
});
</script>
