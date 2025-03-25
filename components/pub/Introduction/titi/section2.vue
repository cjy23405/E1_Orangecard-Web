<template>
  <section class="mt-[14.3rem] md:mt-[28.2rem]">
    <div class="titi-wall md:relative md:pl-[67.4rem]">
      <p
        class="text-[2.6rem] font-bold leading-[3.6rem] md:px-8 md:text-[4rem] md:leading-[4rem]"
      >
        티티 월페이퍼
      </p>
      <div
        class="border-top border-alpha fs-18 relative mt-8 pt-[2.8rem] md:absolute md:left-8 md:top-0 md:mt-0 md:w-[52.7rem] md:border-t-0 md:!border-none md:pt-0"
      >
        <Carousel
          :opts="{
            align: 'center',
            loop: false,
            duration: 50,
          }"
          @init-api="setApi"
        >
          <CarouselContent>
            <CarouselItem v-for="(item, index) in items" :key="index">
              <div class="wallpapaer flex justify-center">
                <img :src="item.pc" class="img-pc" />
                <img :src="item.mob" class="img-mob ml-[1.2rem]" />
              </div>
            </CarouselItem>
          </CarouselContent>
          <div
            class="relative mt-[3.2rem] flex flex-row justify-center align-middle md:mt-[10.2rem]"
          >
            <CarouselPrevious
              class="btn-car-prev relative left-0 top-0 size-[2.4rem] translate-y-0 md:size-[3.2rem]"
            />
            <p class="fs-18 w-56 text-center align-baseline">
              <span class="align-baseline font-bold">{{ current }}</span>
              <span class="mx-[1.2rem] align-baseline">/</span>
              <span class="align-baseline">{{ totalCount }}</span>
            </p>
            <CarouselNext
              class="btn-car-next relative right-0 top-0 size-[2.4rem] translate-y-0 md:size-[3.2rem]"
            />
          </div>
        </Carousel>
      </div>
      <div
        class="md:border-top border-alpha mt-16 md:mt-8 md:w-[46.6rem] md:pt-[3.2rem]"
      >
        <p class="fs-18 text-center font-bold">
          {{ currentItem.title }}
        </p>
        <p class="mt-8 px-8 md:mt-[2.4rem]">
          <NuxtLink
            class="btn-downtiti mx-auto inline-block w-full rounded-lg bg-white/50 p-[1.3rem] text-center font-bold md:px-16 md:py-6 md:text-lg"
            >PC/데스크탑 다운로드</NuxtLink
          >
        </p>
        <p class="mt-8 px-8 md:mt-[2.4rem]">
          <NuxtLink
            class="btn-downtiti mx-auto inline-block w-full rounded-lg bg-white/50 p-[1.3rem] text-center font-bold md:px-16 md:py-6 md:text-lg"
            >모바일 다운로드</NuxtLink
          >
        </p>

        <ul class="list-dot mt-16 md:ml-[.5rem] md:mt-[3.2rem]">
          <li>
            해당 캐릭터에 대한 저작재산권은 주식회사 E1이 보유하고 있습니다.
          </li>
        </ul>
      </div>
    </div>
    <div
      class="mt-[23.9rem] rounded-lg bg-[#fff7e380]/50 py-8 text-center md:mt-[34.5rem] md:flex md:h-48 md:w-full md:flex-row md:py-0 md:pl-[9.6rem]"
    >
      <div
        class="titi-epi relative mx-auto inline-block w-auto pl-72 md:mx-0 md:pl-[26rem]"
      >
        <img
          src="@/assets/img/introduction/titi-ep.png"
          alt="티티 에피소드 이미지"
          class="absolute bottom-[-1.2rem] left-0 size-72 md:bottom-[-2.6rem] md:size-[26rem]"
        />
        <p
          class="fs-18 h-auto flex-1 text-left font-bold text-primary md:my-[4.6rem]"
        >
          티티의 더 많은 <span class="block md:inline"> 에피소드가</span>
          <span class="block md:inline"> 궁금하다면?</span>
        </p>
      </div>
      <div class="mt-[2.2rem] px-8 md:my-[2.9rem] md:pl-[7.2rem]">
        <NuxtLink
          class="btn-octv mx-auto inline-block w-full rounded-lg bg-white/50 p-6 text-center font-bold md:px-16 md:py-8 md:text-lg"
          >E1 공식 유튜브 오렌지테레비</NuxtLink
        >
      </div>
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
import type { CarouselApi } from "@/components/ui/carousel";
//test img
import tabImg from "@/assets/img/test/tablet.png";
import mobImg from "@/assets/img/test/phone.png";
const items = [
  {
    title: "11월 월페이퍼 다운로드",
    pc: tabImg,
    mob: mobImg,
  },
  {
    title: "12월 월페이퍼 다운로드",
    pc: tabImg,
    mob: mobImg,
  },
];

const currentItem = computed(() => items[curIndex.value]);
const api = ref<CarouselApi>();
const totalCount = ref(0);
const current = ref(0);
const curIndex = ref(0);

function setApi(val: CarouselApi) {
  api.value = val;
}

watchOnce(api, (api) => {
  if (!api) return;

  totalCount.value = api.scrollSnapList().length;
  current.value = api.selectedScrollSnap() + 1;
  curIndex.value = api.selectedScrollSnap();

  api.on("select", () => {
    current.value = api.selectedScrollSnap() + 1;
    curIndex.value = api.selectedScrollSnap();
  });
});
</script>
<style lang="css" scoped>
.wallpapaer {
  aspect-ratio: 320 / 136;
}
.wallpapaer img {
  border-radius: 0.4rem;
  box-shadow: 0 1.8px 5.5px 0 rgba(0, 0, 0, 0.25);
  border: solid 0.4rem #1d2023;
  height: 100%;
}

.btn-car-prev {
  background: url("@/assets/img/introduction/btn-my-pre.png") no-repeat center
    center / 100% auto;
}
.btn-car-next {
  background: url("@/assets/img/introduction/btn-my-next.png") no-repeat center
    center / 100% auto;
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
  background: url("@/assets/img/introduction/btn-downtiti.png") no-repeat center
    center/100% auto;
  margin-bottom: -0.4rem;
  margin-left: 0.2rem;
}
.btn-octv:before {
  content: "";
  display: inline-block;
  width: 3.8rem;
  height: 3rem;
  background: url("@/assets/img/introduction/ico-otv.png") no-repeat center
    center/100% auto;
  margin: -1rem 1rem;
}
.border-alpha {
  border-top-color: rgba(0, 0, 0, 0.2) !important;
}
</style>
