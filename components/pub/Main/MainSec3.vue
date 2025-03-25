<template>
  <section class="section sec3 bg-e1green-foreground py-[16.8rem]">
    <div class="inner md:!px-0">
      <div class="ani-text md:float-end md:text-right">
        <h4>신용/체크카드로</h4>
        <h4 class="text-e1green">적립과 할인을 한번에</h4>
        <NuxtLink class="btn-txt white small next mt-[3.6rem]"
          >제휴카드 알아보기</NuxtLink
        >
      </div>
      <div class="-mx-8 md:hidden">
        <Carousel
          class="mt-[20%]"
          :opts="{
            align: 'center',
            loop: false,
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
              class="car-item basis-3/4 first:ml-[5.3rem] last:mr-[5.3rem]"
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
      class="after:contnet-[''] pc-swiper relative mt-[-19rem] hidden after:absolute after:right-0 after:top-0 after:h-full after:w-12 md:block md:w-1/2 md:!px-0"
    >
      <Carousel
        :opts="{
          align: 'end',
          loop: true,
          duration: 50,
          startIndex: 5,
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
            class="car-item basis-[30rem]"
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
import card01 from "@/assets/img/main/card01.png";
import card02 from "@/assets/img/main/card02.png";
import card03 from "@/assets/img/main/card03.png";
import card04 from "@/assets/img/main/card04.png";
import card05 from "@/assets/img/main/card05.png";
import card06 from "@/assets/img/main/card06.png";

const items = [
  {
    src: card01,
    alt: "제휴카드 1 - 신한카드 LPG",
  },
  {
    src: card02,
    alt: "제휴카드 2 - IBK 기업은행",
  },
  {
    src: card03,
    alt: "제휴카드 3 - 롯데체크카드 LPG",
  },
  {
    src: card04,
    alt: "제휴카드 4 - 신한카드",
  },
  {
    src: card05,
    alt: "제휴카드 5 - 개인택시운송사업자카드",
  },
  {
    src: card06,
    alt: "제휴카드 6 - 국민카드",
  },
];
</script>
<style lang="css" scoped>
.pc-swiper:after {
  background: linear-gradient(
    to left,
    rgba(244, 249, 236, 1),
    rgba(244, 249, 236, 0)
  );
}
</style>
