<template>
  <section class="section sec6 !h-auto !pt-0 md:!h-screen">
    <div class="inner p-8 md:!px-0 md:pb-48">
      <div ref="viewport" class="relative -mx-8 md:hidden">
        <Carousel
          :opts="{
            align: 'center',
            loop: false,
            duration: 50,
            dragFree: true,
          }"
          :plugins="[
            Autoplay({
              delay: 3000,
              stopOnMouseEnter: true,
              stopOnInteraction: false,
            }),
          ]"
          class="md:hidden"
          @init-api="setApi"
        >
          <CarouselContent>
            <CarouselItem
              v-for="(item, index) in items"
              :key="index"
              class="car-item basis-[92%] first:ml-8 last:mr-8"
            >
              <NuxtLink>
                <img :src="item.src" :alt="item.alt" class="w-full rounded-lg"
              /></NuxtLink>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="hidden" />
          <CarouselNext class="hidden" />
        </Carousel>
        <p class="absolute bottom-0 right-[2.8rem] leading-[1.2rem]">
          <span class="fs-12 leading-1 font-bold text-gray-900">{{
            current
          }}</span>
          <span class="fs-12 leading-1 text-gray-900">/{{ totalCount }}</span>
        </p>
      </div>
      <div class="relative hidden md:block md:!px-[6.4rem]">
        <h4>진행이벤트</h4>
        <div
          class="absolute right-[6.4rem] top-10 flex w-[30rem] flex-row items-center justify-center"
        >
          <div class="h-[2px] w-80 rounded-sm bg-gray-200">
            <div
              :style="{ width: percent + '%' }"
              class="progress h-full bg-gray-900"
            ></div>
          </div>
          <div class="ml-[1.6rem] mr-[.8rem] w-auto border">
            <span class="fs-16 font-bold text-gray-900">{{ currentPc }}</span>
            <span class="fs-16 text-gray-900"> / {{ totalCountPc }}</span>
          </div>
          <div>
            <button
              class="btn-autoplay block size-[2.4rem] text-zero"
              :class="{ pause: !isPlayed }"
              @click="toggleAutoplay"
            >
              {{ isPlayed ? "Pause" : "Play" }}
            </button>
          </div>
        </div>
        <Carousel
          class="hidden md:mt-16 md:block"
          :opts="{
            align: 'center',
            loop: true,
            duration: 50,
            dragFree: true,
          }"
          :plugins="[plugin]"
          @init-api="setApiPc"
        >
          <CarouselContent>
            <CarouselItem
              v-for="(item, index) in items2"
              :key="index"
              class="car-item basis-full"
            >
              <NuxtLink>
                <img :src="item.src" :alt="item.alt" class="w-full rounded-lg"
              /></NuxtLink>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious
            class="btn-main-prev right-full size-[6.4rem] rounded-none"
          />
          <CarouselNext class="btn-main-next size-[6.4rem] rounded-none" />
        </Carousel>
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
import Autoplay from "embla-carousel-autoplay"; // Autoplay를 기본으로 가져옵니다.
import type { CarouselApi } from "@/components/ui/carousel";
import { ref } from "vue";
//test banner
import bannerMob1 from "@/assets/img/main/banner-mob1.png";
import bannerMob2 from "@/assets/img/main/banner-mob2.png";
import bannePc1 from "@/assets/img/main/banner-pc.png";
const items = ref([
  {
    src: bannerMob1,
    alt: "오렌지 포인트로 차량 정비 하세요!",
  },
  {
    src: bannerMob2,
    alt: "매일매일 출석체크",
  },
]);
const items2 = ref([
  {
    src: bannePc1,
    alt: "오렌지 포인트로 차량 정비 하세요!",
  },
  {
    src: bannePc1,
    alt: "매일매일 출석체크",
  },
]);
const api = ref<CarouselApi>();
const apiPc = ref<CarouselApi>();
const totalCount = ref(0);
const current = ref(0);
const totalCountPc = ref(0);
const currentPc = ref(0);
const percent = ref(0);

function setApi(val: CarouselApi) {
  api.value = val;
}
function setApiPc(val: CarouselApi) {
  apiPc.value = val;
}

const calculatePercent = (currentValue: number, totalCountValue: number) => {
  if (currentValue === 1) currentValue = 0;
  return (currentValue / totalCountValue) * 100;
};

watch(api, (api) => {
  if (!api) return;
  totalCount.value = api.scrollSnapList().length;
  current.value = api.selectedScrollSnap() + 1;
  api.on("select", () => {
    current.value = api.selectedScrollSnap() + 1;
  });
});

watch(api, (apiPc) => {
  if (!apiPc) return;
  totalCountPc.value = apiPc.scrollSnapList().length;
  currentPc.value = apiPc.selectedScrollSnap() + 1;
  const updateCurrentAndPercent = () => {
    if (!isPlayed.value) return;
    currentPc.value = apiPc.selectedScrollSnap() + 1;
    percent.value = calculatePercent(currentPc.value, totalCountPc.value);
  };
  apiPc.on("select", updateCurrentAndPercent);
  onBeforeUnmount(() => {
    apiPc.off("select", updateCurrentAndPercent);
  });
});

const isPlayed = ref(true);

const plugin = Autoplay({
  delay: 3000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
});

function toggleAutoplay() {
  if (isPlayed.value) {
    plugin.stop();
  } else {
    plugin.reset();
    plugin.play();
  }
  isPlayed.value = !isPlayed.value;
}
</script>

<style lang="css" scoped>
.btn-main-prev {
  background: url("@/assets/img/main/btn-arrow-left-64.png") no-repeat center
    center;
  background-size: contain;
  box-shadow: none;
  margin-left: -3.2rem;
}
.btn-main-prev *,
.btn-main-next * {
  display: none !important;
}
.btn-main-next {
  background: url("@/assets/img/main/btn-arrow-right-64.png") no-repeat center
    center;
  background-size: contain;
  box-shadow: none;
  margin-right: -3.2rem;
}
.progress {
  transition: width 0.3s ease;
}
.btn-autoplay {
  background: url("@/assets/img/main/icon-pause.png") no-repeat center center;
  background-size: contain;
}
.btn-autoplay.pause {
  background: url("@/assets/img/main/icon-play.png") no-repeat center center;
  background-size: contain;
}
</style>
