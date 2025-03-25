<script setup lang="ts">
import card01 from "@/assets/img/main/card01.png";
import card02 from "@/assets/img/main/card02.png";
import card03 from "@/assets/img/main/card03.png";
import card04 from "@/assets/img/main/card04.png";
import card05 from "@/assets/img/main/card05.png";
import card06 from "@/assets/img/main/card06.png";

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

const items = [
  {
    src: card01,
  },
  {
    src: card02,
  },
  {
    src: card03,
  },
  {
    src: card04,
  },
  {
    src: card05,
  },
  {
    src: card06,
  },
];
</script>

<template>
  <section
    :class="[
      'section sec3  bg-e1green-foreground py-[16.8rem] pt-[30%] md:pt-48',
      { animate: isAnimated },
    ]"
    :style="{
      height: `${height}px`,
    }"
  >
    <div class="inner md:!px-0">
      <div class="ani-text md:float-end md:text-right">
        <h4>신용/체크카드로</h4>
        <h4 class="text-e1green">적립과 할인을 한번에</h4>
        <NuxtLink
          :to="localePath('/association/card')"
          class="next mt-[3.6rem] block !w-[17.2rem] rounded-[1.2rem] bg-white pb-[0.1rem] text-center text-lg font-bold leading-[4.3rem] text-gray-900 md:!w-[21rem] md:text-2xl md:leading-[5.5rem]"
          >제휴카드 알아보기</NuxtLink
        >
      </div>
      <div class="-mx-8 md:hidden">
        <div class="cards cards--mobile">
          <div class="cards-list">
            <template v-for="i in 3" :key="i">
              <div
                v-for="(item, index) in items"
                :key="index"
                class="cards-item"
              >
                <div
                  class="cards-img"
                  :style="{
                    backgroundImage: `url('${item.src}')`,
                  }"
                ></div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div
      class="after:contnet-[''] pc-swiper relative mt-[-19rem] hidden after:absolute after:right-0 after:top-0 after:h-full after:w-12 md:block md:w-1/2 md:!px-0"
    >
      <div class="cards">
        <div class="cards-list">
          <template v-for="i in 2" :key="i">
            <div v-for="(item, index) in items" :key="index" class="cards-item">
              <div
                class="cards-img"
                :style="{
                  backgroundImage: `url('${item.src}')`,
                }"
              ></div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.pc-swiper:after {
  background: linear-gradient(
    to left,
    rgba(244, 249, 236, 1),
    rgba(244, 249, 236, 0)
  );
}

.cards {
  overflow: hidden;
}
.cards-list {
  display: flex;
  align-items: center;
  width: 300px;
  animation: cards-slide 20s infinite linear;
}
.cards-item {
  flex: none;
  width: 100%;
  position: relative;
  padding-left: 10px;
  box-sizing: border-box;
}
.cards-img::before {
  content: "";
  display: block;
  padding-top: 63.060748%;
}
.cards-img {
  background: no-repeat 50% 50% / 100% 100%;
}
.cards--mobile {
  margin-top: 52px;
}
.cards--mobile .cards-list {
  width: 269px;
}
.cards--mobile .cards-item {
  padding-left: 15px;
}
@keyframes cards-slide {
  0% {
    transform: translateX(0%) translateZ(0);
  }
  100% {
    transform: translateX(-600%) translateZ(0);
  }
}
</style>
