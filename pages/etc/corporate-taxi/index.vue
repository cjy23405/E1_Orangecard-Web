<script setup lang="ts">
// 스토어
const stores = {
  auth: useStoreAuth(),
};

// route
const localePath = useLocalePath();
const router = useRouter();

// life cycle
onBeforeMount(() => {
  if (stores.auth.isCorpTaxiAuthenticated) {
    // 로그인상태면 포인트조회로
    router.push(localePath("/etc/corporate-taxi/point"));
  } else {
    // 아니면 로그인으로
    router.push(localePath("/etc/corporate-taxi/login"));
  }
});
</script>

<template>
  <CommonPageBridge />
</template>
