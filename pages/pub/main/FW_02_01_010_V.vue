<template>
  <div>
    <div
      ref="scrollContainer"
      class="main-wrap mt-[-5.4rem] md:-mt-32"
      @scroll="handleScroll"
    >
      <main-sec1
        class="section h-screen pt-[25%] md:pt-[15%]"
        :class="{ animate: isAnimated1 }"
      ></main-sec1>
      <main-sec-2
        class="section h-screen pt-[30%] md:pt-48"
        :class="{ animate: isAnimated2 }"
      ></main-sec-2>
      <main-sec-3
        class="section h-screen pt-[30%] md:pt-48"
        :class="{ animate: isAnimated3 }"
      ></main-sec-3>
      <main-sec-4
        class="section h-screen pt-[20%] md:pt-48"
        :class="{ animate: isAnimated4 }"
      ></main-sec-4>
      <main-sec-5
        class="section h-screen pt-[25%] md:pt-48"
        :class="{ animate: isAnimated5 }"
      ></main-sec-5>
      <main-sec-6
        class="section h-screen pt-[20%] md:pt-48"
        :class="{ animate: isAnimated6 }"
      ></main-sec-6>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainSec1 from "@/components/pub/Main/MainSec1.vue";
import MainSec2 from "@/components/pub/Main/MainSec2.vue";
import MainSec3 from "@/components/pub/Main/MainSec3.vue";
import MainSec4 from "@/components/pub/Main/MainSec4.vue";
import MainSec5 from "@/components/pub/Main/MainSec5.vue";
import MainSec6 from "@/components/pub/Main/MainSec6.vue";

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// 레이아웃 선택
definePageMeta({
  layout: "main",
});

onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("");
});

const scrollContainer = ref<HTMLElement | null>(null);
const headerH = ref(0);

const handleScroll = () => {
  positionCheck();
};

const positionCheck = () => {
  const scrollPosition = window.scrollY;
  let screenH = window.innerHeight;
  if (useMinH.value === true && isBigScreen.value === true) screenH = 920;
  else if (useMinH.value === true && isBigScreen.value === false) screenH = 600;

  const sectionHeight = screenH - headerH.value;
  const _curIdx = Math.round(scrollPosition / sectionHeight);
  let currentIndex = 0;
  if (_curIdx <= 4) {
    currentIndex = _curIdx;
  } else {
    if (isBigScreen.value === false) {
      currentIndex = Math.ceil(scrollPosition / sectionHeight);
    } else {
      currentIndex = _curIdx;
    }
  }

  if (currentIndex === 0) {
    isAnimated1.value = true;
  } else if (currentIndex === 1) {
    isAnimated2.value = true;
  } else if (currentIndex === 2) {
    isAnimated3.value = true;
  } else if (currentIndex === 3) {
    isAnimated4.value = true;
  } else if (currentIndex === 4) {
    isAnimated5.value = true;
  } else if (currentIndex === 5) {
    isAnimated6.value = true;
  }
};

const isAnimated1 = ref<boolean>(false);
const isAnimated2 = ref<boolean>(false);
const isAnimated3 = ref<boolean>(false);
const isAnimated4 = ref<boolean>(false);
const isAnimated5 = ref<boolean>(false);
const isAnimated6 = ref<boolean>(false);
const isBigScreen = ref(false);
const useMinH = ref(false);

const handleResize = () => {
  if (window.innerWidth > 768) {
    isBigScreen.value = true;
    headerH.value = 80;
    if (window.innerHeight < 920) useMinH.value = true;
  } else {
    isBigScreen.value = false;
    headerH.value = 56;
    if (window.innerHeight < 600) useMinH.value = true;
  }
  positionCheck();
};

onMounted(() => {
  positionCheck();
  handleResize();

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});
</script>
<style lang="css" scoped>
@media (min-width: 768px) {
  .section {
    min-width: 118rem;
  }
}
</style>
