<script setup lang="ts">
import type { FuelCode } from "@/types/common";

// props
const props = defineProps<{
  code?: FuelCode;
}>();

// route
const localePath = useLocalePath();

// api
const { data } = useApiMyChargeInfo({
  fuelType: "A",
});

// computed
const infoData = computed(() => {
  return data.value?.data;
});
const thisData = computed(() => {
  return infoData.value?.find((item) => item.fuelType === props.code);
});
const diff = computed(() => {
  if (thisData.value) {
    return (
      Math.floor(Number(thisData.value.excTierQty)) -
      Math.floor(thisData.value.monthAccLiter)
    );
  } else {
    return 0;
  }
});
const unit = computed(() => {
  return useFuelUnit(thisData.value?.fuelType);
});
</script>

<template>
  <div
    class="round-box mt-[.8rem] p-8 md:ml-8 md:mt-0 md:min-h-[13.5rem] md:flex-1 md:p-12"
  >
    <NuxtLink
      :to="localePath('/my-page/charge-history')"
      class="next fs-16 relative block w-full"
    >
      이번 달 충전량
    </NuxtLink>
    <p class="fs-16 mt-[.8rem] text-primary md:mt-[1.6rem]">
      <strong class="fs-20 mr-[.4rem] align-baseline font-bold text-primary">{{
        thisData?.monthAccLiter
      }}</strong
      >{{ unit }}
    </p>
    <p
      v-if="thisData?.fuelType === 'L' && diff > 0 && thisData.tierCd === 'NOR'"
      class="bar mt-[.8rem] text-gray-600 md:mt-[1.6rem]"
    >
      <span
        ><strong class="align-baseline text-gray-700"
          >{{ diff }} {{ unit }}</strong
        >
        더 충전하시면 우수회원 혜택을 누리실 수 있어요.</span
      >
    </p>
  </div>
</template>
