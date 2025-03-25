<template>
  <section class="section sec4 py-52">
    <div class="inner">
      <div class="ani-text md:text-left">
        <h4>E1 충전소는 물론,</h4>
        <h4>제휴 가맹점에서</h4>
        <h4 class="text-primary">현금처럼 사용할 수 있어요</h4>
        <NuxtLink class="btn-txt gray small next mt-[3.6rem]"
          >가맹점 알아보기</NuxtLink
        >
      </div>
      <div class="-mx-8 mt-[20%] md:hidden">
        <Carousel
          :opts="{
            align: 'center',
            loop: false,
            duration: 50,
            dragFree: true,
          }"
          :plugins="[
            Autoplay({
              delay: 1500,
              stopOnMouseEnter: true,
              stopOnInteraction: false,
            }),
          ]"
        >
          <CarouselContent>
            <CarouselItem
              v-for="(item, index) in items"
              :key="index"
              class="car-item basis-1/2 first:ml-32 last:mr-32"
            >
              <img :src="item.src" :alt="item.alt" class="w-full" />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="hidden" />
          <CarouselNext class="hidden" />
        </Carousel>
      </div>
    </div>

    <div
      class="after:contnet-[''] pc-swiper relative ml-auto mt-[-25rem] hidden after:absolute after:left-0 after:top-0 after:h-full after:w-12 md:block md:w-1/2 md:!px-0"
    >
      <Carousel
        :opts="{
          align: 'start',
          loop: true,
          duration: 50,
          dragFree: true,
        }"
        :plugins="[
          Autoplay({
            delay: 2000,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]"
      >
        <CarouselContent>
          <CarouselItem
            v-for="(item, index) in items"
            :key="index"
            class="car-item basis-[25rem]"
          >
            <img :src="item.src" :alt="item.alt" class="w-full" />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="hidden" />
        <CarouselNext class="hidden" />
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
import Autoplay from "embla-carousel-autoplay";
import logoE1 from "@/assets/img/main/e1.png";
import logoCgv from "@/assets/img/main/cgv.png";
import logoCu from "@/assets/img/main/cu.png";
import logoPw from "@/assets/img/main/pw.png";
import logoAl from "@/assets/img/main/al.png";
import logoPro from "@/assets/img/main/pro.png";
const items = [
  {
    src: logoE1,
    alt: "제휴가맹점 1 - E1",
  },
  {
    src: logoCgv,
    alt: "제휴가맹점 2 - cgv",
  },
  {
    src: logoCu,
    alt: "제휴가맹점 3 - cu",
  },
  {
    src: logoPw,
    alt: "제휴가맹점 4 - 평우서비스",
  },
  {
    src: logoAl,
    alt: "제휴가맹점 5 - 알라딘",
  },
  {
    src: logoPro,
    alt: "제휴가맹점 6 - 프로스펙스",
  },
];
</script>
<style lang="css" scoped>
.pc-swiper:after {
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}
</style>
