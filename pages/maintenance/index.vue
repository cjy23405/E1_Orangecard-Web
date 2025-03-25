<script setup lang="ts">
import { DateTime } from "luxon";
import type { MaintenanceData, MaintenanceDataItem } from "@/types/common";

// 상수
const { $constants } = useNuxtApp();
const downloadURL = $constants.downloadURL();

// state
const data = ref<MaintenanceDataItem | null>(null);

// init
const init = async () => {
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
          data.value = item;
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
  <div
    v-if="data"
    class="inner relative flex min-h-[80vh] flex-col justify-center text-center md:min-h-[70vh] md:!pt-0"
  >
    <p
      class="fs-16 check font-bold text-gray-700 before:mb-[1.6rem] before:block before:h-[8.4rem] before:w-full before:bg-contain before:bg-center before:bg-no-repeat before:content-[''] md:before:h-60"
    >
      {{ data.inspectionName }}
    </p>

    <CommonTextData
      class="fs-14 mt-[1.6rem] text-gray-600"
      :contents="data.inspectionContent"
    />

    <p class="border-top fs-14 mt-8 block pt-8 font-bold text-primary">
      {{
        useFormattedDate(data.inspectionStartDateTime, "yyyy년 MM월 dd일 hh:mm")
      }}
      ~
      {{
        useFormattedDate(data.inspectionEndDateTime, "yyyy년 MM월 dd일 hh:mm")
      }}
    </p>
  </div>
</template>

<style lang="css" scoped>
.check:before {
  background-image: url("@/assets/img/check.png");
}
</style>
