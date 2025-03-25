<template>
  <section>
    <p class="fs-18 pt-[2.8rem] text-center md:pt-[6.8rem]">
      조용한 요정 세상에서 살다가 <br />E1의 마스코트가 되기 위해
      <span class="block md:inline">지구에 온 친환경 에너지 요정 티티</span>
    </p>
    <div class="titi-img relative pt-[8.4rem] md:mt-24 md:pt-[28rem]">
      <img
        src="@/assets/img/introduction/titi-star.png"
        alt="별이미지"
        class="absolute right-[1.8rem] top-[.4rem] size-[5.6rem] md:right-32 md:top-[-13.5rem] md:size-[8.5rem]"
      />
      <img
        src="@/assets/img/introduction/titi-star.png"
        alt="별이미지"
        class="absolute left-0 top-[4.2rem] size-[3.2rem] md:-top-16 md:size-[5.6rem]"
      />
      <img
        src="@/assets/img/introduction/titi-star.png"
        alt="별이미지"
        class="absolute right-0 top-[6.4rem] size-[2.4rem] md:right-[4.8rem] md:top-[-4.4rem] md:size-[3.2rem]"
      />
      <div
        class="titi-bubble mx-auto flex max-w-[30rem] flex-col justify-center py-12 text-center font-bold text-primary md:absolute md:left-[12.9rem] md:top-[7.1rem] md:h-[13.4rem] md:w-[51.6rem] md:max-w-full md:py-[3.9rem] md:text-2xl md:leading-[2.8rem]"
      >
        미세먼지 없는 맑은 하늘을 지키고 싶어 <br />모두의 친환경 E1의
        마스코트가 되기로 했어요.
      </div>

      <div
        class="mx-auto max-w-xl md:absolute md:left-[48.2rem] md:top-0 md:mx-0 md:w-[70rem] md:max-w-full"
      >
        <img
          src="@/assets/img/introduction/titi.png"
          alt="티티 이미지"
          class=""
        />
      </div>

      <div class="titi-introduction md:ml-16 md:w-[43rem]">
        <p
          class="text-[2.6rem] font-bold leading-[3.6rem] md:px-8 md:text-[4rem] md:leading-[4rem]"
        >
          티티
        </p>
        <dl class="border-top border-alpha fs-18 mt-8">
          <dt class="birth">생일</dt>
          <dd>4월 21일</dd>
          <dt class="job">직업</dt>
          <dd>E1 마스코트</dd>
          <dd class="md:inline">
            <span class="hidden md:mr-[.5rem] md:inline">/</span>오렌지테레비
            크리에이터
          </dd>
          <dt class="like">좋아하는 것</dt>
          <dd>
            나를 닮은 한라봉<span class="hidden md:mr-[.5rem] md:inline"
              >,</span
            >
          </dd>
          <dd class="md:inline">미세먼지 없는 맑은 하늘</dd>
        </dl>
      </div>
    </div>
    <div class="titi-down relative mt-[5.2rem] px-16 md:mt-[27.3rem]">
      <Carousel
        :opts="{
          align: 'start',
          loop: false,
          duration: 50,
        }"
      >
        <CarouselContent class="z-10">
          <CarouselItem
            v-for="(item, index) in items"
            :key="index"
            class="basis-1/2 px-[.5rem] text-center md:basis-1/4"
          >
            <img :src="item.src" class="mx-auto max-w-44 md:max-w-80" />
            <NuxtLink
              class="btn-downtiti mx-auto mt-[1.6rem] inline-block w-auto rounded-lg bg-white/50 p-[1.3rem] font-bold md:mt-[3.2rem] md:px-16 md:py-6 md:text-lg"
              >다운로드</NuxtLink
            >
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious
          class="btn-car-prev absolute left-[-4.4rem] z-20 size-[4.4rem]"
        />
        <CarouselNext
          class="btn-car-next absolute right-[-4.4rem] z-20 size-[4.4rem]"
        />
      </Carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import pose1 from "@/assets/img/test/pose-a.png";
import pose2 from "@/assets/img/test/pose-b.png";
import pose3 from "@/assets/img/test/pose-i.png";
import pose4 from "@/assets/img/test/pose-j.png";

const items = [
  {
    src: pose1,
  },
  {
    src: pose2,
  },
  {
    src: pose3,
  },
  {
    src: pose4,
  },
];
</script>

<style lang="css" scoped>
@tailwind components;
@layer components {
  .titi-bubble {
    background: url("@/assets/img/introduction/bubble-mob.png") no-repeat center
      center / 100% auto;
  }
  dl > * {
    @apply pl-[3.8rem] md:pl-20;
  }
  dt {
    @apply relative mt-[3.2rem] font-bold md:mt-[3.4rem];
  }
  dt::before {
    @apply size-[3.2rem] md:size-[4.4rem] content-[''] absolute left-0 top-[-.4rem];
  }
  dt + dd {
    @apply mt-[.4rem] md:mt-[.6rem];
  }
  dl > dd {
    @apply md:inline;
  }
  dl > dd + dd {
    @apply md:pl-0;
  }
  .birth::before {
    background: url("@/assets/img/introduction/ico-birth.png") no-repeat center
      center / 100% auto;
  }
  .job::before {
    background: url("@/assets/img/introduction/ico-job.png") no-repeat center
      center / 100% auto;
  }
  .like::before {
    background: url("@/assets/img/introduction/ico-like.png") no-repeat center
      center / 100% auto;
  }
  .btn-car-prev {
    background: url("@/assets/img/introduction/btn-arrow-left-44.png") no-repeat
      center center / 2.4rem auto;
  }
  .btn-car-next {
    background: url("@/assets/img/introduction/btn-arrow-right-44.png")
      no-repeat center center / 2.4rem auto;
  }
  .btn-car-prev *,
  .btn-car-next * {
    display: none;
  }
  .btn-downtiti:after {
    content: "";
    display: inline-block;
    width: 1.8rem;
    height: 1.8rem;
    background: url("@/assets/img/introduction/btn-downtiti.png") no-repeat
      center center/100% auto;
    margin-bottom: -0.4rem;
    margin-left: 0.2rem;
  }
  .border-alpha {
    border-top-color: rgba(0, 0, 0, 0.2) !important;
  }
}
@media (min-width: 768px) {
  .titi-bubble {
    background: url("@/assets/img/introduction/bubble-pc.png") no-repeat center
      bottom / 100% auto;
  }
}
</style>
