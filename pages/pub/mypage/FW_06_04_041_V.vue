<template>
  <div>
    <div class="inner mt-[2.8rem] px-8 md:mt-24 md:px-16">
      <div class="titi fs-16 pt-[16.3rem] text-center md:pt-[16.6rem]">
        <p>
          그동안 E1 오렌지카드서비스를 <br />이용해주셔서 진심으로 감사합니다.
        </p>
        <p class="mt-[1.6rem]">
          앞으로 더욱 좋은 모습으로 <br />
          다시 만나 뵙길 희망합니다.
        </p>
      </div>
      <div class="btn-wrap mb-0 mt-[11.2rem] md:mb-16 md:mt-24">
        <NuxtLink class="btn-txt primary">메인으로</NuxtLink>
      </div>
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
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("회원탈퇴 완료");
});
</script>
<style lang="css" scoped>
.titi {
  background: url("@/assets/img/mypage/img-withdrawal.png") no-repeat center
    5.3rem / 9.4rem auto;
}
@media (min-width: 768px) {
  .titi {
    background: url("@/assets/img/mypage/img-withdrawal.png") no-repeat center
      0rem / 15rem auto;
  }
  .btn-wrap {
    width: 40rem;
    margin-left: auto;
    margin-right: auto;
  }
  .btn-wrap .btn-txt {
    max-width: 100%;
  }
}
</style>
