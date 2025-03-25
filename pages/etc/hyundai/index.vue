<script setup lang="ts">
// 스토어
const stores = {
  auth: useStoreAuth(),
};

// route
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();

// session
const etcInflow = useSessionStorage<string | null>("etcInflow", null);

// life cycle
onBeforeMount(() => {
  if (stores.auth.isAuthenticated) {
    // 로그인상태면 다음 페이지
    router.push(localePath("/etc/hyundai/card"));
  } else {
    // 아니면 로그인으로
    etcInflow.value = route.fullPath;
    router.push(localePath("/etc/login"));
  }
});
</script>

<template>
  <CommonPageBridge />
</template>
