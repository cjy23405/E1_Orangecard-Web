<script setup lang="ts">
// route
const localePath = useLocalePath();
</script>

<template>
  <section>
    <div class="inner relative px-8 md:px-0">
      <div class="gra-line-top relative z-10 py-24 md:pt-[9.8rem]">
        <p class="bottom flex flex-row md:block md:overflow-hidden">
          <strong class="fs-26 flex-1 font-bold md:block"
            >포인트 <br />사용하기</strong
          >
          <NuxtLink
            :to="localePath('/association/service')"
            class="next fs-16 self-end md:float-end md:mr-[3.6rem]"
            >사용처 더 알아보기</NuxtLink
          >
        </p>

        <div
          class="border-top border-bottom md:round-box mt-4 py-8 md:mt-[1.6rem] md:px-48 md:py-16"
        >
          <ul class="list-point mt-8">
            <li><p class="point-e1">E1 충전소</p></li>
            <li><p class="point-mall">오렌지 포인트몰</p></li>
            <li><p class="point-coupon">모바일 쿠폰몰</p></li>
          </ul>
          <ul class="list-point mt-[1.6rem] md:mt-24">
            <li><p class="point-service">제휴 서비스</p></li>
            <li><p class="point-event">이벤트 응모</p></li>
            <li>
              <p class="point-donation">
                포인트 기부<span class="hidden md:inline">하기</span>
              </p>
            </li>
            <li>
              <p class="point-gift">
                포인트 선물<span class="hidden md:inline">하기</span>
              </p>
            </li>
          </ul>
          <div class="gray-box mt-16 md:mt-24">
            <ul class="list-dot text-gray-600">
              <li>
                오렌지 포인트몰, 모바일 기프트몰 이용 및 포인트 기부, 선물하기,
                이벤트 응모는 오렌지카드 모바일 APP에서 가능합니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
@tailwind components;
@layer components {
  .gra-line-top::before {
    @apply content-[''] top-0 left-0 w-full h-[2px] absolute;
    background: linear-gradient(
      to right,
      hsl(var(--primary)),
      rgba(233, 99, 32, 0)
    );
  }
  .underbar {
    @apply inline-block mt-[.8rem] font-bold text-3xl leading-[3rem] relative before:content-[''] before:bottom-0 before:left-0 before:w-full before:bg-primary before:opacity-20 before:h-[1rem] before:absolute;
  }
  .underbar span {
    @apply text-lg leading-[2.2rem] md:text-xl md:leading-[2.4rem] font-normal align-baseline;
  }
  .list-point {
    @apply text-center flex flex-row md:justify-center;
  }
  .list-point li {
    @apply flex-1 text-base leading-[2rem] md:text-2xl md:leading-[2.8rem] md:max-w-[20rem];
  }
  .list-point li p {
    @apply pt-[4.4rem] md:pt-[8.8rem];
  }
  .list-point li p.point-e1 {
    background: url("@/assets/img/introduction/point-e1.png") no-repeat center
      top/4rem auto;
  }
  .list-point li p.point-mall {
    background: url("@/assets/img/introduction/point-mall.png") no-repeat center
      top/4rem auto;
  }
  .list-point li p.point-coupon {
    background: url("@/assets/img/introduction/point-coupon.png") no-repeat
      center top/4rem auto;
  }
  .list-point li p.point-service {
    background: url("@/assets/img/introduction/point-service.png") no-repeat
      center top/4rem auto;
  }
  .list-point li p.point-event {
    background: url("@/assets/img/introduction/point-event.png") no-repeat
      center top/4rem auto;
  }
  .list-point li p.point-donation {
    background: url("@/assets/img/introduction/point-donation.png") no-repeat
      center top/4rem auto;
  }
  .list-point li p.point-gift {
    background: url("@/assets/img/introduction/point-gift.png") no-repeat center
      top/4rem auto;
  }
}
@media (min-width: 768px) {
  .list-point li p {
    background-size: 8rem auto !important;
  }
}
</style>
