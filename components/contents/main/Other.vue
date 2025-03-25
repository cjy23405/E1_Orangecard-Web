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
</script>

<template>
  <section
    :class="[
      'section sec5 bg-gray-100 py-72 pt-[25%] md:pt-48',
      { animate: isAnimated },
    ]"
    :style="{
      height: `${height}px`,
    }"
  >
    <div class="inner md:!pt-0">
      <div class="ani-text md:relative md:text-right">
        <h4>오렌지 포인트를 사용하는</h4>
        <h4>더 많은 방법이 있어요</h4>
        <p
          class="ico-mob fs-16 mx-auto mt-[3.7rem] inline-block w-auto pl-[2.8rem] !text-gray-600"
        >
          모바일 앱에서 사용 가능합니다.
        </p>
        <div
          class="mt-[15%] flex flex-col whitespace-nowrap md:absolute md:left-0 md:top-1/2 md:mt-0 md:w-1/2 md:-translate-y-1/2"
        >
          <div
            class="ml-36 flex w-1/2 justify-end self-start md:ml-72 md:justify-start"
          >
            <span
              class="point-use1 bg- block flex-none text-base text-gray-900 md:text-2xl"
              >오렌지 포인트몰</span
            >
            <span
              class="point-use2 ml-[3.2rem] block flex-none text-base text-gray-900 md:ml-[4.2rem] md:text-2xl"
              >희망충전 포인트기부</span
            >
          </div>
          <div
            class="mr-28 mt-[0.8rem] flex w-1/2 justify-start self-end md:mr-0 md:mt-8 md:justify-end"
          >
            <span
              class="point-use3 flex-none text-base text-gray-900 md:text-2xl"
              >포인트 선물하기</span
            >
            <span
              class="point-use4 ml-[4.1rem] flex-none text-base text-gray-900 md:ml-[5.6rem] md:text-2xl"
              >모바일 쿠폰몰</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.ico-mob {
  background: url("@/assets/img/main/icon-mob.png") no-repeat left center;
  background-size: 2.4rem auto;
}
.point-use1::before,
.point-use2::before,
.point-use3::before,
.point-use4::before {
  content: "";
  display: block;
  width: 80px;
  height: 80px;
  margin: 0 auto 4px;
  background: no-repeat 50% 50% / 100% 100%;
}
@media (min-width: 768px) {
  .point-use1::before,
  .point-use2::before,
  .point-use3::before,
  .point-use4::before {
    width: 100px;
    height: 100px;
    margin-bottom: 8px;
  }
}
.point-use1::before {
  background-image: url("@/assets/img/main/img-1.png");
}
.point-use2::before {
  background-image: url("@/assets/img/main/img-2.png");
}
.point-use3::before {
  background-image: url("@/assets/img/main/img-3.png");
}
.point-use4::before {
  background-image: url("@/assets/img/main/img-4.png");
}
</style>
