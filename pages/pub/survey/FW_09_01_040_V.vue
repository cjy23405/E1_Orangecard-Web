<template>
  <div
    id="surveyPage"
    class="flex min-h-[60vh] flex-1 flex-col px-8 pb-16 text-center"
  >
    <div class="flex flex-1 flex-col justify-center pb-10">
      <p class="fs-16 status pt-40">설문에 응답해주셔서 감사합니다.</p>
      <p class="fs-14 mt-[1.6rem] text-gray-600">
        남겨주신 의견을 바탕으로 오카패밀리 여러분께 <br />
        더 좋은 서비스를 제공할 수 있도록 노력하겠습니다.
      </p>
    </div>
    <div class="btn-wrap">
      <NuxtLink class="btn-txt primary md:small">오렌지카드 홈으로</NuxtLink>
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
  layout: "etc",
});

onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setUseFooter(false);
  stores.layout.$setUseHeaderLine(true);
});
</script>
<style lang="css" scoped>
.status {
  background: url("@/assets/img/survey/img-survey3.png") no-repeat center top /
    8.4rem auto;
}
</style>
