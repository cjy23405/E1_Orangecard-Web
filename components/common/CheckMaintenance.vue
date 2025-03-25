<script setup lang="ts">
import { DateTime } from "luxon";
import type { MaintenanceData } from "@/types/common";

// 상수
const { $constants } = useNuxtApp();
const downloadURL = $constants.downloadURL();

// route
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();

// init
const init = async () => {
  if (/\/maintenance$/.test(route.path)) return;

  const now = DateTime.now().toMillis();
  const res = await $fetch
    .raw<MaintenanceData>(
      `${downloadURL}/upload/Inspection/inspection_data.json?now=${now}`,
      {
        ignoreResponseError: true,
      },
    )
    .catch(() => {});

  if (res && res.ok && res._data) {
    const list = res._data;

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
