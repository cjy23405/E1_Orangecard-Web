<template>
  <div
    id="surveyPage"
    class="flex min-h-[60vh] flex-1 flex-col px-8 pb-16 text-center"
  >
    <div class="flex flex-1 flex-col justify-center pb-10">
      <p
        class="fs-16 pt-40 font-bold text-primary"
        :class="{
          status0: status === 0,
          status1: status === 1,
          status2: status === 2,
        }"
      >
        오카패밀리 만족도 조사
      </p>
      <p v-if="status === 0" class="fs-16 mt-[1.6rem]">
        오렌지카드에 소중한 의견을 남겨주세요.
      </p>
      <p v-if="status === 1" class="fs-16 mt-[1.6rem]">
        설문 참여기간이 아닙니다.
      </p>
      <p v-if="status === 2" class="fs-16 mt-[1.6rem]">
        설문에 응답해주셔서 감사합니다.
      </p>
      <p v-if="status === 0" class="fs-14 mt-[1.6rem] text-gray-600">
        오카패밀리 여러분의 <br />
        목소리에 항상 귀기울이겠습니다.
      </p>
    </div>
    <div class="btn-wrap">
      <NuxtLink v-if="status === 0" class="btn-txt primary md:small"
        >설문 참여</NuxtLink
      >
      <NuxtLink v-else class="btn-txt primary md:small"
        >오렌지카드 홈으로</NuxtLink
      >
    </div>
  </div>
</template>
<script setup lang="ts">
// 0 : 참여가능 / 1 :기간 지남 / 2 : 이미참여
const status = ref(2);
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
.status0 {
  background: url("@/assets/img/survey/img-survey0.png") no-repeat center top /
    8.4rem auto;
}
.status1 {
  background: url("@/assets/img/survey/img-survey1.png") no-repeat center top /
    8.4rem auto;
}
.status2 {
  background: url("@/assets/img/survey/img-survey2.png") no-repeat center top /
    8.4rem auto;
}
</style>
