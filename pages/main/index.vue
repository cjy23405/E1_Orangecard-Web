<script setup lang="ts">
// 레이아웃 선택
definePageMeta({
  layout: "main",
});

// 퍼블 관련 : start
const scrollContainer = ref<HTMLElement | null>(null);
const headerH = ref(0);
const winH = ref(0);

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
  winH.value = window.innerHeight;

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
// 퍼블 관련 : end

// life cycle
onMounted(() => {
  // 퍼블 관련 : start
  positionCheck();
  handleResize();

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
  // 퍼블 관련 : end
});
onBeforeUnmount(() => {
  // 퍼블 관련 : start
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
  // 퍼블 관련 : end
});
</script>

<template>
  <div>
    <ContentsMainPopups />
    <div
      v-show="winH > 0"
      ref="scrollContainer"
      class="main-wrap mt-[-5.6rem] overflow-hidden md:-mt-32"
      @scroll="handleScroll"
    >
      <ContentsMainIntro :is-animated="isAnimated1" :height="winH" />
      <ContentsMainAbout :is-animated="isAnimated2" :height="winH" />
      <ContentsMainCard :is-animated="isAnimated3" :height="winH" />
      <ContentsMainService :is-animated="isAnimated4" :height="winH" />
      <ContentsMainOther :is-animated="isAnimated5" :height="winH" />
      <ContentsMainEvent :is-animated="isAnimated6" :height="winH" />
    </div>
  </div>
</template>

<style lang="css" scoped>
@media (min-width: 768px) {
  .section {
    min-width: 118rem;
  }
}
</style>
