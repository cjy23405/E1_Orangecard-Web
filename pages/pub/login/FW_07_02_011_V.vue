<template>
  <div>
    <div
      class="border-top border-bottom inner mt-[2.8rem] px-8 md:mt-24 md:px-16"
    >
      <div class="titi fs-16 pt-[19.4rem] text-center md:pt-[22.6rem]">
        <p>
          다음 아이디로 가입된 회원 정보가 있습니다. <br />아래 버튼을 눌러
          카카오 계정을 연동하시고 <br />더욱 편리하게 이용해보세요.
        </p>
      </div>
      <div
        class="fs-16 mt-8 rounded-lg bg-primary-foreground p-12 text-center md:mx-auto md:flex md:w-[60rem] md:flex-row md:justify-center md:p-16"
      >
        <p class="font-bold text-primary md:ml-[.4rem]">orange1234@kakao.com</p>
      </div>

      <div class="btn-wrap mb-[9.4rem] mt-16 md:my-24">
        <NuxtLink class="btn-txt bg-[#fee500] font-bold md:!max-w-full"
          ><i
            class="kakao mr-[.4rem] mt-[-.2rem] inline-block size-[2.8rem] bg-contain bg-center bg-no-repeat md:mr-[.8rem] md:mt-[-.4rem] md:size-16"
          ></i
          >카카오로 연동하기</NuxtLink
        >
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
  stores.layout.$setPageTitle("회원 가입");
});
</script>
<style lang="css" scoped>
.titi {
  background: url("@/assets/img/login/img-car-sucess.png") no-repeat center
    9.4rem / 8.4rem auto;
}
.kakao {
  background-image: url("@/assets/img/login/btn-login-kakao.png");
}

@media (min-width: 768px) {
  .titi {
    background: url("@/assets/img/login/img-car-sucess.png") no-repeat center
      6rem / 15rem auto;
  }
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
