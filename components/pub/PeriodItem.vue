<script setup lang="ts">
import DatePicker from "@/components/pub/DatePicker.vue";

withDefaults(
  defineProps<{
    isMini?: boolean;
  }>(),
  {
    isMini: false,
  },
);
</script>
<template>
  <div class="ipt-wrap">
    <label class="relative mb-[.8rem] block font-bold text-gray-800"
      >기간선택</label
    >
    <div class="md:overflow-hidden">
      <div
        class="flex flex-row overflow-x-auto md:float-start md:block md:w-auto md:overflow-y-hidden"
      >
        <p class="select-period">
          <input id="rdWeek" type="radio" name="rdPeriod" />
          <label for="rdWeek" class="btn-txt line medium">1주일</label>
        </p>
        <p class="select-period">
          <input id="rdMonth" type="radio" name="rdPeriod" />
          <label for="rdMonth" class="btn-txt line medium">1개월</label>
        </p>
        <p class="select-period">
          <input id="rdMonth3" type="radio" name="rdPeriod" />
          <label for="rdMonth3" class="btn-txt line medium">3개월</label>
        </p>
        <p v-if="!isMini" class="select-period">
          <input id="rdMonth6" type="radio" name="rdPeriod" />
          <label for="rdMonth6" class="btn-txt line medium">6개월</label>
        </p>
        <p v-if="!isMini" class="select-period">
          <input id="rdyear" type="radio" name="rdPeriod" />
          <label for="rdyear" class="btn-txt line medium">1년</label>
        </p>
      </div>
      <div
        class="mt-[.8rem] flex flex-row items-center md:float-start md:ml-[2.4rem] md:mt-0"
        :class="{
          'md:w-[42.6rem]': !isMini,
          'md:w-[60rem]': isMini,
        }"
      >
        <date-picker class="flex-1 md:min-w-80"></date-picker>
        <span class="fs-18 mx-[.8rem] leading-[4.8rem]">~</span>
        <date-picker class="flex-1 md:min-w-80"></date-picker>
      </div>
      <div class="mt-[.8rem] md:float-start md:ml-[.8rem] md:mt-0">
        <NuxtLink class="btn-txt dgray md:w-64">조회</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@tailwind components;
@layer components {
  .select-period {
    min-width: calc(33% - 0.6rem);
    @apply relative inline-block overflow-hidden md:w-[8rem] md:min-w-0;
  }
  .select-period + .select-period {
    @apply ml-[.8rem];
  }
  .select-period input {
    @apply absolute top-0 left-0 size-0;
  }
  .select-period label {
    @apply size-full block md:min-w-0 min-w-0 md:text-xl;
  }
  .select-period input:checked + label {
    @apply font-bold text-primary !border-primary;
  }
  .ipt-wrap:not(.titleTop) > label {
    @apply md:w-[12.8rem];
  }
  .ipt-wrap:not(.titleTop) > label ~ * {
    @apply md:ml-[12.8rem];
  }
}
@media (min-width: 768px) {
  .ipt-wrap:not(.titleTop) > label ~ * {
    width: calc(100% - 12.8rem);
  }
  .btn-txt.dgray {
    min-width: 16rem !important;
  }
}
</style>
