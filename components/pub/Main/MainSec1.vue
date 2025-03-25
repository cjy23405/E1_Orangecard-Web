<template>
  <section
    class="section sec1 relative block bg-e1yellow-foreground before:absolute before:bottom-[35%] before:left-[15%] before:h-[13.1rem] before:w-[7.8rem] before:bg-contain before:bg-center before:bg-no-repeat before:content-none after:absolute after:left-[80%] after:top-[20%] after:h-[34rem] after:w-[21.2rem] after:bg-contain after:bg-center after:bg-no-repeat after:content-none md:before:content-[''] md:after:content-['']"
  >
    <div class="inner relative h-full">
      <div
        class="titi-img absolute -bottom-8 left-0 h-[50vh] min-h-[42.4rem] w-full bg-bottom bg-no-repeat text-zero md:min-h-[49.6rem]"
      >
        티티이미지
      </div>
      <div class="ani-text">
        <h3>
          <span
            class="logo-e1 mr-[.4rem] mt-[.6rem] inline-block size-[3.6rem] bg-contain bg-center bg-no-repeat text-zero md:size-24"
            >E1</span
          >고객을 위한 특권
        </h3>
        <h2 class="text-primary">오렌지카드</h2>
        <p class="mt-[3.6rem]">적립은 빠르게, 가까운 충전소 찾기는 쉽게.</p>
        <p>APP회원 전용 특별 이벤트도 준비되어 있어요.</p>
        <div class="btn-wrap subinner absolute bottom-16 left-0 md:!px-[33rem]">
          <NuxtLink
            class="btn-txt onShadow fs-16 google large font-bold before:mb-[-.6rem] before:mr-[0.6rem] before:inline-block before:size-[2.4rem] before:!bg-contain before:content-[''] md:before:mb-[-1.6rem] md:before:size-[4.8rem]"
            >Google Play</NuxtLink
          >
          <NuxtLink
            class="btn-txt onShadow fs-16 apple large font-bold before:mb-[-.6rem] before:mr-[0.6rem] before:inline-block before:size-[2.4rem] before:!bg-contain before:content-[''] md:!ml-8 md:before:mb-[-1.6rem] md:before:size-[4.8rem]"
            >App Store</NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="css" scoped>
.logo-e1 {
  background-image: url("@/assets/img/main/e-1-logo.png");
}
.titi-img {
  background-image: url("@/assets/img/main/img-titi-mob.png");
  background-size: 36rem auto;
}
/* .animate .titi-img {
  animation: move 2s alternate;
} */
@media (min-width: 768px) {
  .titi-img {
    background: url("@/assets/img/main/img-titi.png") no-repeat bottom center !important;
    background-size: 72.2rem auto !important;
  }
}
@keyframes move {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.btn-txt.google:before {
  background: url("@/assets/img/main/google.png") no-repeat center center;
}
.btn-txt.apple:before {
  background: url("@/assets/img/main/apple.png") no-repeat center center;
}
.sec1:before {
  background-image: url("@/assets/img/main/coin-2.png");
  animation: float 2s ease-in-out infinite;
}
.sec1:after {
  background-image: url("@/assets/img/main/coin-3.png");
  animation: float2 4s ease-in-out infinite;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(30px);
  }
}
@keyframes float2 {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(40px) scale(0.9);
  }
}
</style>
