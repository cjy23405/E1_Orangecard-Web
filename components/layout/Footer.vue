<script setup lang="ts">
// props
const props = withDefaults(
  defineProps<{
    pageType?: string;
    init?: boolean;
  }>(),
  {
    pageType: "main",
    init: false,
  },
);

// router
const localePath = useLocalePath();

// state
const family = ref("");

// 패밀리 사이트
const familyUpdate = () => {
  if (!window || !family.value) return;

  window.open(family.value);

  nextTick(() => {
    family.value = "";
  });
};
</script>

<template>
  <div
    :class="[
      'footer bg-gray-200',
      {
        [`is-${props.pageType}`]: props.pageType,
        hidden: !init,
      },
    ]"
  >
    <div class="border-b border-solid border-border">
      <div
        class="inner relative h-auto px-8 pb-[1.9rem] pt-[11.6rem] md:flex md:h-48 md:flex-row md:px-0 md:py-[3.4rem]"
      >
        <span
          class="logo absolute left-8 top-[3.6rem] block h-[4.4rem] w-28 bg-contain bg-center bg-no-repeat text-[0] md:relative md:left-0 md:top-0 md:h-[5.2rem] md:w-[8.2rem]"
          >E1</span
        >
        <p class="overflow-hidden text-zero md:mx-44 md:flex">
          <NuxtLink
            :to="localePath('/customer/agreement/0')"
            class="float-start w-1/2 text-base text-gray-600 md:w-auto md:text-xl md:leading-[2.4rem]"
            >이용약관</NuxtLink
          >
          <NuxtLink
            :to="localePath('/customer/agreement/1')"
            class="bold float-start w-1/2 text-base text-gray-700 md:ml-24 md:w-auto md:text-xl md:leading-[2.4rem]"
            >개인정보처리방침</NuxtLink
          >
          <NuxtLink
            :to="localePath('/customer/agreement/2')"
            class="float-start mt-[1.6rem] w-1/2 text-base text-gray-600 md:ml-24 md:mt-0 md:w-auto md:text-xl md:leading-[2.4rem]"
            >이메일무단수집거부</NuxtLink
          >
          <NuxtLink
            :to="localePath('/customer/agreement/3')"
            class="float-start mt-[1.6rem] w-1/2 text-base text-gray-600 md:ml-24 md:mt-0 md:w-auto md:text-xl md:leading-[2.4rem]"
            >위치기반서비스이용약관</NuxtLink
          >
        </p>
        <div
          class="absolute right-8 top-[3.6rem] w-80 md:relative md:right-0 md:top-0"
        >
          <FormSelect
            v-model="family"
            button-class="bg-transparent"
            placeholder="Family Site"
            :options="[
              {
                value: 'https://www.lscns.co.kr/kr/main.asp',
                text: 'LS전선(주)',
              },
              {
                value: 'https://www.lsholdings.co.kr/ko',
                text: 'LS그룹',
              },
              {
                value: 'https://www.ls-electric.com/ko/',
                text: 'LS ELECTRIC',
              },
              {
                value: 'https://www.lsmnm.com',
                text: 'LS MnM',
              },
              {
                value: 'https://www.lsmtron.co.kr/',
                text: 'LS엠트론(주)',
              },
              {
                value: 'https://www.gaoncable.com/',
                text: '가온전선(주)',
              },
              {
                value: 'https://www.lsyesco.com/',
                text: '(주)예스코',
              },
              {
                value: 'https://www.lsnetworks.co.kr/',
                text: '(주)LS네트웍스',
              },
              {
                value: 'https://ir.ls-sec.co.kr',
                text: 'LS증권',
              },
            ]"
            @update:model-value="familyUpdate"
          />
        </div>
      </div>
    </div>
    <div class="footer-btm">
      <div class="inner relative px-8 pb-[3.2rem] pt-8 md:px-0 md:py-16">
        <div class="footer-info">
          <div class="md:bar md:bar-big">
            <p class="bold fs-12 text-gray-600 md:inline-block">
              고객센터 1688-2121
            </p>
            <p class="fs-12 mt-[.4rem] text-gray-600 md:mt-0 md:inline-block">
              팩스 02-3441-4119
            </p>
            <p class="fs-12 mt-[.4rem] text-gray-600 md:mt-0 md:inline-block">
              E-mail webmaster@e1.co.kr
            </p>
          </div>
          <p class="fs-12 mt-[.4rem] text-gray-600">
            서울특별시 용산구 한강대로 92 LS용산타워 20, 21F
          </p>
        </div>
        <p
          class="footer-sns absolute left-1/2 top-8 md:left-auto md:right-[31rem] md:top-0"
        >
          <a
            href="https://www.youtube.com/user/E1orangecard"
            target="_blank"
            class="btn-foot-sns youtube inline-block size-16 bg-contain bg-center bg-no-repeat text-zero md:mt-[4.6rem] md:size-[4.8rem]"
            >youtube</a
          >
          <a
            href="https://www.instagram.com/titi_e1official/#"
            target="_blank"
            class="btn-foot-sns instagram ml-[.8rem] inline-block size-16 bg-contain bg-center bg-no-repeat text-zero md:mt-[4.6rem] md:size-[4.8rem]"
            >instagram</a
          >
          <a
            href="https://blog.naver.com/e1orangecard"
            target="_blank"
            class="btn-foot-sns blog ml-[.8rem] inline-block size-16 bg-contain bg-center bg-no-repeat text-zero md:mt-[4.6rem] md:size-[4.8rem]"
            >blog</a
          >
        </p>
        <p class="mt-[.4rem] text-xs text-gray-500 md:mt-[.6rem] md:text-sm">
          Copyright © 2024 by E1 corporation. All rights reserved.
        </p>
        <p
          class="ismsp mt-[3.2rem] py-[1.2rem] pl-[6.4rem] text-sm text-gray-500 md:absolute md:right-0 md:top-[-.7rem] md:py-[2.4rem] md:pl-[8.8rem]"
        >
          <span class="block">인증범위 : E1 오렌지카드 서비스 운영</span
          ><span class="block">유효기간 : 2023.10.21 ~ 2026.10.20</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.logo {
  background-image: url("@/assets/img/foot/logo-e-1.png");
}

.btn-foot-sns.youtube {
  background-image: url("@/assets/img/foot/btn-youtube.png");
}
.btn-foot-sns.instagram {
  background-image: url("@/assets/img/foot/btn-instagram.png");
}
.btn-foot-sns.blog {
  background-image: url("@/assets/img/foot/btn-blog.png");
}
.ismsp {
  background: url("@/assets/img/foot/img-ismsp.png") no-repeat left top;
  background-size: 6rem auto;
}

@media (min-width: 768px) {
  .ismsp {
    background-size: 8.4rem auto !important;
  }
  .is-mobile .ismsp {
    background-size: 6rem auto !important;
  }
}
</style>
