<template>
  <div class="inner md:!pt-40">
    <div class="flex flex-row md:px-[34.2rem]">
      <NuxtLink
        class="img-phone before:size- fs-14 relative h-[15.6rem] flex-1 rounded-lg border border-solid border-gray-300 pt-[7.7rem] text-center before:absolute before:left-1/2 before:top-[3.7rem] before:ml-[-2.4rem] before:block before:size-[4.8rem] before:bg-contain before:bg-center before:bg-no-repeat before:content-[''] md:h-96 md:pt-44 md:before:top-[5.6rem] md:before:ml-[-4.2rem] md:before:size-[8.4rem]"
      >
        <p class="text-lg font-bold">휴대폰 인증</p>
      </NuxtLink>
      <NuxtLink
        class="img-ipin fs-14 relative ml-[.8rem] h-[15.6rem] flex-1 rounded-lg border border-solid border-gray-300 pt-[7.7rem] text-center before:absolute before:left-1/2 before:top-[3.7rem] before:ml-[-2.4rem] before:block before:size-[4.8rem] before:bg-contain before:bg-center before:bg-no-repeat before:content-[''] md:h-96 md:pt-44 md:before:top-[5.6rem] md:before:ml-[-4.2rem] md:before:size-[8.4rem]"
      >
        <p class="text-lg font-bold">아이핀 인증</p>
      </NuxtLink>
    </div>
    <div
      class="mt-[1.6rem] rounded-lg bg-gray-100 p-[1.6rem] md:!mx-40 md:mt-[3.2rem]"
    >
      <ul class="list-dot text-gray-600">
        <li>
          오렌지카드는 신용평가기관인 SCI평가정보㈜를 통해 본인인증 서비스를
          제공하고 있으며, 본인인증 수단으로 휴대폰과 아이핀을 제공하고
          있습니다.
        </li>
        <li>
          본인인증에 문제가 있는 경우, SCI평가정보㈜ SIREN24 고객센터
          1577-1006로 문의해 주시기 바랍니다.
        </li>
      </ul>
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
  stores.layout.$setPageTitle("본인인증");
});
</script>
<style lang="css" scoped>
.img-phone:before {
  background-image: url("@/assets/img/auth-phone.png");
}
.img-ipin:before {
  background-image: url("@/assets/img/auth-ipin.png");
}
</style>
