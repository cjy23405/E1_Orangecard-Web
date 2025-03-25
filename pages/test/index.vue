<script setup lang="ts">
// 레이아웃 선택
definePageMeta({
  layout: "sub",
});

// localePath
const localePath = useLocalePath();

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("개발 공통 컴포넌트 예제");
});
</script>

<template>
  <div class="inner">
    <ul class="text-2xl">
      <li class="list-inside list-disc">
        <NuxtLink :to="localePath('/test/test0')" class="inline align-baseline">
          얼럿
        </NuxtLink>
      </li>
      <li class="list-inside list-disc">
        <NuxtLink :to="localePath('/test/test1')" class="inline align-baseline">
          우편번호 찾기
        </NuxtLink>
      </li>
      <li class="list-inside list-disc">
        <NuxtLink :to="localePath('/test/test2')" class="inline align-baseline">
          폼
        </NuxtLink>
      </li>
      <li class="list-inside list-disc">
        <NuxtLink :to="localePath('/test/test3')" class="inline align-baseline">
          검색바
        </NuxtLink>
      </li>
      <li class="list-inside list-disc">
        <NuxtLink :to="localePath('/test/test4')" class="inline align-baseline">
          레이어 팝업
        </NuxtLink>
      </li>
      <li class="list-inside list-disc">
        <NuxtLink :to="localePath('/test/test5')" class="inline align-baseline">
          필터용 폼
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
