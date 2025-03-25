<script setup lang="ts">
import logoE1 from "@/assets/img/main/e1.png";
import logoCgv from "@/assets/img/main/cgv.png";
import logoCu from "@/assets/img/main/cu.png";
import logoPw from "@/assets/img/main/pw.png";
import logoAl from "@/assets/img/main/al.png";
import logoPro from "@/assets/img/main/pro.png";

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
    src: logoE1,
  },
  {
    src: logoCgv,
  },
  {
    src: logoCu,
  },
  {
    src: logoPw,
  },
  {
    src: logoAl,
  },
  {
    src: logoPro,
  },
];
</script>

<template>
  <section
    :class="['section sec4 py-52 pt-[20%] md:pt-48', { animate: isAnimated }]"
    :style="{
      height: `${height}px`,
    }"
  >
    <div class="inner">
      <div class="ani-text md:text-left">
        <h4>E1 충전소는 물론,</h4>
        <h4>제휴 가맹점에서</h4>
        <h4 class="text-primary">현금처럼 사용할 수 있어요</h4>
        <NuxtLink
          :to="localePath('/association/service')"
          class="next mt-[3.6rem] block !w-[17.2rem] rounded-[1.2rem] bg-gray-200 pb-[0.1rem] text-center text-lg font-bold leading-[4.3rem] text-gray-900 md:!w-[21rem] md:text-2xl md:leading-[5.5rem]"
          >가맹점 알아보기</NuxtLink
        >
      </div>
      <div class="-mx-8 md:hidden">
        <div class="cards cards--mobile">
          <div class="cards-list">
            <template v-for="i in 2" :key="i">
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
      class="after:contnet-[''] pc-swiper relative ml-auto mt-[-25rem] hidden after:absolute after:left-0 after:top-0 after:h-full after:w-12 md:block md:w-1/2 md:!px-0"
    >
      <div class="cards">
        <div class="cards-list">
          <template v-for="i in 3" :key="i">
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
    to right,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}

.cards {
  overflow: hidden;
}
.cards-list {
  display: flex;
  align-items: center;
  width: 250px;
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
  padding-top: 100%;
}
.cards-img {
  background: no-repeat 50% 50% / 100% 100%;
}
.cards--mobile {
  margin-top: 52px;
}
.cards--mobile .cards-list {
  width: 216px;
}
.cards--mobile .cards-item {
  padding-left: 16px;
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
