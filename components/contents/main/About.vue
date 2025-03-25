<script setup lang="ts">
// props
withDefaults(
  defineProps<{
    isAnimated?: boolean;
    height?: number;
  }>(),
  {
    isAnimated: false,
    height: 0,
  },
);

// route
const localePath = useLocalePath();
</script>

<template>
  <section
    :class="[
      'section sec2 relative pb-[35.6rem] pt-32 after:absolute after:bottom-[30%] after:right-[7.5rem] after:z-10 after:h-[9.1rem] after:w-[5.4rem] after:bg-contain after:bg-center after:bg-no-repeat after:content-[\'\'] md:pt-48 md:after:right-[15%] md:after:top-[-9.1rem] md:after:h-[20.8rem] md:after:w-48',
      { animate: isAnimated },
    ]"
    :style="{
      height: `${height}px`,
    }"
  >
    <div class="inner md:relative md:!px-0">
      <div class="ani-text relative md:px-40 md:text-left">
        <h4>충전할 때 마다</h4>
        <h4 class="text-e1yellow">포인트가 차곡차곡 쌓여요</h4>
        <p class="mt-[3.6rem]">첫 충전 시 500P</p>
        <p>우수회원 1,000원당 6P</p>
        <p>일반회원 1,000원당 3P</p>
        <NuxtLink
          :to="localePath('/about/point-card')"
          class="next mt-[2.8rem] block !w-[17.2rem] rounded-[1.2rem] bg-gray-200 pb-[0.1rem] text-center text-lg font-bold leading-[4.3rem] text-gray-900 md:!w-[21rem] md:text-2xl md:leading-[5.5rem]"
          >오렌지카드란?</NuxtLink
        >
      </div>
      <div
        class="img-point absolute bottom-16 left-0 mx-auto h-1/5 min-h-[14.2rem] w-full bg-contain bg-center bg-no-repeat text-zero md:bottom-0 md:left-auto md:right-0 md:mx-0 md:h-[32.5rem] md:w-[54rem]"
      >
        포인트 이미지
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.img-point {
  background-image: url("@/assets/img/main/cash.png");
}

.sec2:after {
  background-image: url("@/assets/img/main/coin-1.png");
  animation: float 4s ease-in-out infinite;
}
@keyframes float {
  0% {
    transform: translate(0, 0); /* 시작 위치 */
  }
  50% {
    transform: translate(0, -30px); /* 위로 이동 */
  }
  100% {
    transform: translate(0, 0); /* 원래 위치로 돌아옴 */
  }
}
</style>
