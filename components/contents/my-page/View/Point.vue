<script setup lang="ts">
// route
const localePath = useLocalePath();

// api
const { data } = useApiMyPointInfo();

// computed
const infoData = computed(() => {
  return data.value?.data;
});

// print
const print = (num?: number) => {
  return typeof num === "number" ? num.toLocaleString() : "";
};
</script>

<template>
  <div
    class="round-box mt-[.8rem] p-8 md:mt-0 md:min-h-[13.5rem] md:flex-1 md:p-12"
  >
    <NuxtLink
      :to="localePath('/my-page/orange-point')"
      class="next fs-16 relative block w-full"
    >
      오렌지 포인트
    </NuxtLink>
    <p class="fs-16 mt-[.8rem] text-primary md:mt-[1.6rem]">
      <strong class="fs-20 mr-[.4rem] align-baseline font-bold text-primary">{{
        print(infoData?.totalPnt)
      }}</strong
      >P
    </p>
    <p class="bar md:fs-14 mt-[.8rem] text-gray-600 md:mt-[1.6rem]">
      <span
        >충전전용
        <strong class="align-baseline text-gray-700"
          >{{ print(infoData?.chargeOnlyPnt) }}P</strong
        ></span
      >
      <span
        >소멸예정
        <strong class="align-baseline text-gray-700"
          >{{ print(infoData?.expiringPnt) }}P</strong
        ></span
      >
      <span
        v-if="infoData && infoData?.stationPoint > 0"
        class="mt-[.8rem] block md:mt-0 md:inline mobile:!ml-0 mobile:before:!content-none"
      >
        <NuxtLink
          :to="localePath('/my-page/station-point')"
          class="btn-morepoint relative inline-block pr-8 align-baseline after:absolute after:right-0 after:top-[0.2rem] after:size-[1.6rem] after:content-[''] md:after:top-[0.4rem]"
          >충전소포인트
          <strong class="inline-block w-auto align-baseline text-gray-700"
            >{{ print(infoData?.stationPoint) }}P</strong
          ></NuxtLink
        >
      </span>
    </p>
  </div>
</template>
