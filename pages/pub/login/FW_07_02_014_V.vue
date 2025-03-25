<template>
  <div>
    <div
      class="border-top border-bottom inner mt-[2.8rem] flex min-h-[60vh] flex-col justify-center px-8 md:mt-24 md:px-16"
    >
      <div class="fs-16 text-center">
        <p>로그인에 사용하실 ID를 입력해주세요.</p>
      </div>
      <div class="mt-16 md:mx-auto md:mt-24 md:w-[60rem]">
        <input-item
          :type="'text'"
          :placeholder="'아이디를 입력해주세요.'"
          :error-text="'아이디를 확인해주세요.'"
        ></input-item>
      </div>
      <div class="btn-wrap mt-8 md:my-24">
        <NuxtLink class="btn-txt primary">가입 완료하기</NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import InputItem from "@/components/pub/InputItem.vue";
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
  stores.layout.$setPageTitle("아이디 입력");
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
