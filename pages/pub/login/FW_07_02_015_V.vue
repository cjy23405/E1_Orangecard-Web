<template>
  <div>
    <div
      class="border-top border-bottom inner mt-[2.8rem] flex min-h-[60vh] flex-col justify-center px-8 md:mt-24 md:px-16"
    >
      <div class="fs-16 text-center">
        <p>휴대폰 인증을 진행해주세요.</p>
      </div>
      <div class="mt-16 md:mx-auto md:mt-24 md:w-[60rem]">
        <phone-item v-if="true" :is-error="true"></phone-item>
      </div>
      <div class="btn-wrap mt-8 md:my-24">
        <NuxtLink class="btn-txt primary">가입 완료하기</NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PhoneItem from "@/components/pub/PhoneItem.vue";
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
  stores.layout.$setPageTitle("휴대폰 인증");
});
</script>
<style lang="css" scoped>
@media (min-width: 768px) {
  .btn-wrap {
    width: 60rem;
    margin-left: auto;
    margin-right: auto;
  }
  .btn-wrap .btn-txt {
    max-width: 100%;
  }
}
</style>
