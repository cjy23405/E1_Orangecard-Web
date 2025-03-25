<script setup lang="ts">
// uid
const uid = getCurrentInstance()?.uid;

// route
const localePath = useLocalePath();

// api
const { data } = useApiCardList(uid, {
  cardStatCd: "20",
});

// computed
const count = computed(() => {
  if (data.value?.data) {
    return String(data.value.data.length);
  } else {
    return "";
  }
});
</script>

<template>
  <p>
    <NuxtLink
      :to="localePath('/my-page/card')"
      class="next relative block w-full"
    >
      <span class="fs-14 text-gray-700">오렌지카드</span>
      <span class="fs-14 ml-[.4rem] font-bold text-primary md:ml-4"
        >{{ count }}장</span
      >
    </NuxtLink>
  </p>
</template>
