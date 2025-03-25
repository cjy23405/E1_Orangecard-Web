<template>
  <div>
    <div
      class="border-top border-bottom inner mt-[2.8rem] px-8 md:mt-24 md:px-16"
    >
      <div
        class="fs-16 mt-28 rounded-lg bg-primary-foreground p-12 text-center md:mx-auto md:mt-24 md:flex md:w-[60rem] md:flex-row md:justify-center md:p-16"
      >
        <p>오렌지카드 온라인 회원 아이디</p>
        <p class="font-bold text-primary md:ml-[.4rem]">$orange1234$</p>
      </div>
      <div class="mt-8 md:mx-auto md:w-[60rem]">
        <input-item
          :label-text="'비밀번호'"
          :type="'password'"
          :required="true"
          :placeholder="'영문대소문자,숫자,특수문자 포함 10~16자리'"
          :success-text="'사용할 수 있는 비밀번호입니다.'"
          :error-text="'비밀번호는 8자 이상 20자 이하를 입력해야 합니다.'"
          :title-top="true"
        ></input-item>
        <input-item
          :label-text="'비밀번호 확인'"
          :type="'password'"
          :required="true"
          :placeholder="'비밀번호를 다시 입력해주세요.'"
          :success-text="'비밀번호가 일치합니다.'"
          :error-text="'비밀번호가 일치하지 않습니다.'"
          :title-top="true"
        ></input-item>
      </div>
      <div class="btn-wrap mb-28 mt-16 md:my-24">
        <NuxtLink class="btn-txt primary">입력완료</NuxtLink>
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
  stores.layout.$setPageTitle("비밀번호 재설정");
});
</script>
<style lang="css" scoped>
.ipt-wrap + .ipt-wrap {
  margin-top: 2rem;
}
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
