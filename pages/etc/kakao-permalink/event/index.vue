<script setup lang="ts">
// 레이아웃 선택
definePageMeta({
  validate: (route) => {
    return typeof route.params.id === "string" && /^\d+$/.test(route.params.id);
  },
});

// route
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();

// computed
const id = computed(() => {
  return String(route.params.id) || "";
});

// init
const init = () => {
  if (id.value === "869") {
    router.replace(
      localePath(
        "/etc/kakao-permalink?event-auto=869&CN=1B53A114BC071B77FA352E691C4CF494",
      ),
    );
  } else if (id.value) {
    router.replace(localePath(`/etc/kakao-permalink?event-auto=${id.value}`));
  }
};

// life cycle
onBeforeMount(() => {
  init();
});
</script>

<template>
  <CommonPageBridge />
</template>
