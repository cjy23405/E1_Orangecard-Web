<script setup lang="ts">
import { DateTime } from "luxon";

// route
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();

// init
const init = async () => {
  if (/\/maintenance$/.test(route.path)) return;

  // 상수
  const { $remoteConfig } = useNuxtApp();
  const remoteConfig = $remoteConfig ? await $remoteConfig() : null;

  // set
  const now = DateTime.now().toMillis();

  if (remoteConfig) {
    const list = remoteConfig.inspection || [];

    list.forEach((item) => {
      if (item.postYn === "Y") {
        const start = DateTime.fromSQL(item.inspectionStartDateTime).toMillis();
        const end = DateTime.fromSQL(item.inspectionEndDateTime).toMillis();

        if (start <= now && now <= end) {
          router.replace(localePath("/maintenance"));
        }
      }
    });
  }
};

// life cycle
onMounted(async () => {
  await init();
});
</script>

<template>
  <slot />
</template>
