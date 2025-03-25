<template>
  <div
    class="border-top border-bottom inner mt-[2.8rem] py-16 md:mt-24 md:py-24"
  >
    <div class="md:px-[29rem]">
      <div class="btn-wrap mt-8 md:mt-0">
        <NuxtLink class="btn-txt gray font-bold md:!max-w-full"
          ><i
            class="phone mr-[.4rem] mt-[-.2rem] inline-block size-[2.8rem] bg-contain bg-center bg-no-repeat md:mr-[.8rem] md:mt-[-.4rem] md:size-16"
          ></i
          >휴대폰 인증</NuxtLink
        >
      </div>
      <div class="btn-wrap mt-[3.2rem]">
        <NuxtLink class="btn-txt gray font-bold md:!max-w-full"
          ><i
            class="ipin mr-[.4rem] mt-[-.2rem] inline-block size-[2.8rem] bg-contain bg-center bg-no-repeat md:mr-[.8rem] md:mt-[-.4rem] md:size-16"
          ></i
          >아이핀 인증</NuxtLink
        >
      </div>
      <div class="btn-wrap mt-[3.2rem]">
        <NuxtLink class="btn-txt bg-[#fee500] font-bold md:!max-w-full"
          ><i
            class="kakao mr-[.4rem] mt-[-.2rem] inline-block size-[2.8rem] bg-contain bg-center bg-no-repeat md:mr-[.8rem] md:mt-[-.4rem] md:size-16"
          ></i
          >카카오 인증</NuxtLink
        >
      </div>
      <div class="btn-wrap">
        <NuxtLink
          class="btn-txt bg-[#03c75a] font-bold text-white md:!max-w-full"
          ><i
            class="naver mr-[.4rem] mt-[-.2rem] inline-block size-[2.8rem] bg-contain bg-center bg-no-repeat md:mr-[.8rem] md:mt-[-.4rem] md:size-16"
          ></i
          >네이버 인증</NuxtLink
        >
      </div>
    </div>

    <div class="mt-16 md:mt-24 md:px-24">
      <div class="gray-box">
        <ul class="list-dot text-gray-600">
          <li>
            회원가입은 무료이며, 만 14세 이상 본인인증이 가능하신 분만 가입이
            가능합니다.
          </li>
          <li>
            본인인증을 위해 입력하신 개인정보는 본인인증기관에서 수집하는
            정보이며, 이 때 수집된 정보는 본인인증 외 어떠한 용도로도 이용되거나
            별도로 저장되지 않습니다.
          </li>
          <li>
            오렌지카드는 신용평가기관인 SCI평가정보㈜를 통해 본인인증 서비스를
            제공하고 있으며, 본인인증 수단으로 휴대폰과 아이핀을 제공하고
            있습니다.
          </li>
          <li>
            본인인증에 문제가 있는 경우, SCI평가정보㈜ SIREN24 고객센터
            1577-1006로 문의해 주시기 바랍니다.
          </li>
          <li>애플 ID로 로그인하시려면 E1오렌지카드 앱을 이용해주세요.</li>
        </ul>
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
  stores.layout.$setPageTitle("회원가입");
});
</script>
<style lang="css" scoped>
@media (min-width: 768px) {
  .btn-wrap + .btn-wrap {
    margin-top: 1.6rem;
  }
  .ipt-wrap + .ipt-wrap {
    margin-top: 2rem;
  }
  .bar > *:not(.icon-type) {
    font-size: 1.8rem;
    line-height: 2.4rem;
  }
}
.phone {
  background-image: url("@/assets/img/login/btn-login-phone.png");
}
.ipin {
  background-image: url("@/assets/img/login/btn-login-ipin.png");
}
.kakao {
  background-image: url("@/assets/img/login/btn-login-kakao.png");
}
.naver {
  background-image: url("@/assets/img/login/btn-login-naver.png");
}
.btn-refresh {
  background-image: url("@/assets/img/login/btn-refresh.png");
}
</style>
