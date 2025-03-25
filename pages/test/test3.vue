<script setup lang="ts">
// 레이아웃 선택
definePageMeta({
  layout: "sub",
});

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("검색바 컴포넌트 예제");
});

// 검색바 관련
const value = ref("");
const submit = (v?: string) => {
  alert(v);
};
</script>

<template>
  <div class="inner">
    <div class="mb-16 text-2xl">
      <FormSearchbar
        v-model="value"
        title="검색"
        placeholder="검색"
        disabled
        @submit="submit"
      />
      <FormSearchbar
        v-model="value"
        title="검색"
        placeholder="검색"
        @submit="submit"
      />
      <pre>{{ value }}</pre>
    </div>
  </div>
</template>
