<script setup lang="ts">
import Autoplay from "embla-carousel-autoplay";
import type { CarouselApi } from "@/components/ui/carousel";

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

// api
const { data } = useApiEventBannerList();

// computed
const list = computed(() => {
  return data.value?.data || [];
});

// Carousel 관련
const carouselPc = ref<CarouselApi>();
const totalCountPc = ref(0);
const currentPc = ref(0);

const percentPc = computed(() => {
  const crr = currentPc.value === 1 ? 0 : currentPc.value;
  return (crr / totalCountPc.value) * 100;
});

const setCarouselPc = (val: CarouselApi) => {
  carouselPc.value = val;
};

watchOnce(carouselPc, (carousel) => {
  if (!carousel) return;

  totalCountPc.value = carousel.scrollSnapList().length;
  currentPc.value = carousel.selectedScrollSnap() + 1;

  carousel.on("select", () => {
    currentPc.value = carousel.selectedScrollSnap() + 1;
  });
});

const carouselMobile = ref<CarouselApi>();
const totalCountMobile = ref(0);
const currentMobile = ref(0);

const setCarouselMobile = (val: CarouselApi) => {
  carouselMobile.value = val;
};

watchOnce(carouselMobile, (carousel) => {
  if (!carousel) return;

  totalCountMobile.value = carousel.scrollSnapList().length;
  currentMobile.value = carousel.selectedScrollSnap() + 1;

  carousel.on("select", () => {
    currentMobile.value = carousel.selectedScrollSnap() + 1;
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

<template>
  <section
    v-if="list.length"
    :class="[
      'section sec6 !pt-0 md:pt-48 mobile:!h-auto',
      { animate: isAnimated },
    ]"
    :style="{
      height: `${height}px`,
    }"
  >
    <div class="inner p-8 md:!px-0 md:pb-48">
      <!-- mobile -->
      <div ref="viewport" class="relative -mx-8 md:hidden">
        <Carousel
          :opts="{
            align: 'center',
            loop: false,
            duration: 50,
          }"
          :plugins="[
            Autoplay({
              delay: 3000,
              stopOnMouseEnter: true,
              stopOnInteraction: false,
            }),
          ]"
          class="md:hidden"
          @init-api="setCarouselMobile"
        >
          <CarouselContent>
            <CarouselItem
              v-for="item in list"
              :key="item.postingNo"
              class="car-item basis-[92%] first:ml-8 last:mr-8"
            >
              <NuxtLink :to="localePath(`/event/${item.postingNo}`)">
                <div
                  class="relative overflow-hidden rounded-lg pt-[18.75%]"
                  :aria-label="item.eventTitle"
                  :style="{
                    background: `url('${item.mobileMainBannerImage}') no-repeat 50% 50% / cover`,
                  }"
                ></div>
              </NuxtLink>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="hidden" />
          <CarouselNext class="hidden" />
        </Carousel>
        <p class="absolute bottom-0 right-[2.8rem] leading-[1.2rem]">
          <span class="fs-12 leading-1 font-bold text-gray-900">{{
            currentMobile
          }}</span>
          <span class="fs-12 leading-1 text-gray-900"
            >/{{ totalCountMobile }}</span
          >
        </p>
      </div>

      <!-- pc -->
      <div class="relative hidden md:block md:!px-[6.4rem]">
        <h4>진행이벤트</h4>
        <div
          class="absolute right-[6.4rem] top-10 flex w-[30rem] flex-row items-center justify-center"
        >
          <div class="h-[2px] w-80 rounded-sm bg-gray-200">
            <div
              :style="{ width: percentPc + '%' }"
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
          }"
          :plugins="[plugin]"
          @init-api="setCarouselPc"
        >
          <CarouselContent>
            <CarouselItem
              v-for="item in list"
              :key="item.postingNo"
              class="car-item basis-full"
            >
              <NuxtLink :to="localePath(`/event/${item.postingNo}`)">
                <div
                  class="relative overflow-hidden rounded-lg pt-[38.775510%]"
                  :aria-label="item.eventTitle"
                  :style="{
                    background: `url('${item.webMainBannerImage}') no-repeat 50% 50% / cover`,
                  }"
                ></div>
              </NuxtLink>
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
