<template>
  <div class="round-box relative mb-[.8rem] p-8 last:mb-0 md:px-16 md:py-12">
    <p class="fs-16 font-bold text-gray-800">
      {{ props.cardName }}
      <Badge v-if="props.isMainCard" :is-mini="true" class="ml-[1.6rem] md:ml-8"
        >대표</Badge
      >
    </p>
    <p class="fs-16 my-[1.6rem] text-gray-800 md:my-[2.8rem]">
      {{ props.cardNumber }}
    </p>
    <p class="fs-16 date-text text-gray-600">발급일 : {{ props.date }}</p>
    <div
      v-if="!props.isLost"
      class="btn-wrap mt-[1.6rem] md:absolute md:right-16 md:top-12 md:mt-0 md:!block md:!w-auto"
    >
      <NuxtLink v-if="!props.isMainCard" class="btn-txt line small"
        >대표카드 설정</NuxtLink
      >
      <NuxtLink class="btn-txt line small">분실신고</NuxtLink>
    </div>
    <NuxtLink
      v-if="props.isLost"
      class="btn-remove absolute right-8 top-1/2 size-[2.4rem] -translate-y-1/2 text-zero md:right-16"
      >카드 삭제</NuxtLink
    >
  </div>
</template>
<script setup lang="ts">
import Badge from "@/components/pub/Badge.vue";

const props = defineProps<{
  cardName: string;
  isMainCard?: boolean;
  cardNumber: string;
  date: string;
  isLost?: boolean;
}>();
</script>
<style lang="css" scoped>
.btn-remove {
  background: url("@/assets/img/mypage/btn-remove.png") no-repeat center
    center/100% auto;
}
.badge {
  min-width: 4.5rem !important;
}
@media (min-width: 768px) {
  .btn-txt.small {
    width: auto !important;
    display: inline-block;
    padding: 0 2rem !important;
  }
  .badge {
    min-width: 5.7rem !important;
  }
}
</style>
