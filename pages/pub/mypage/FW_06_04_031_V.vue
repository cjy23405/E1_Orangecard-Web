<template>
  <div>
    <div
      class="border-top border-bottom inner mt-[2.8rem] flex min-h-[60vh] flex-col justify-center px-8 md:mt-24 md:px-16"
    >
      <div class="md:mx-auto md:w-[60rem]">
        <input-item
          class="mb-8"
          :label-text="'비밀번호'"
          :type="'password'"
          :placeholder="'영문자, 숫자, 특수문자, 포함 10~16자리'"
          :title-top="true"
          :required="true"
        ></input-item>
        <input-item
          :label-text="'비밀번호 확인'"
          :type="'password'"
          :placeholder="'비밀번호를 다시 입력해주세요.'"
          :title-top="true"
          :required="true"
        ></input-item>
      </div>
      <div class="btn-wrap mt-16 md:my-24 md:!w-[82rem]">
        <NuxtLink class="btn-txt gray">닫기</NuxtLink>
        <NuxtLink class="btn-txt primary">생성 완료</NuxtLink>
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
  stores.layout.$setPageTitle("비밀번호 생성");
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
