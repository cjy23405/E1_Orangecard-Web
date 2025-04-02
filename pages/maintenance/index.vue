<script setup lang="ts">
import { DateTime } from "luxon";
import type { MaintenanceData, MaintenanceDataItem } from "@/types/common";

// 상수
const { $constants } = useNuxtApp();
const downloadURL = $constants.downloadURL();

// route
const router = useRouter();

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

  if (!data.value) {
    router.replace("/");
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
    id="maintenance"
    class="inner relative flex min-h-[30rem] flex-1 flex-col justify-center px-8 text-center md:min-h-[40rem] md:items-center md:!pt-0"
  >
    <p
      class="fs-16 check font-bold text-gray-700 before:mb-[1.6rem] before:block before:h-[8.4rem] before:w-full before:bg-contain before:bg-center before:bg-no-repeat before:content-[''] md:before:h-60"
    >
      {{ data.inspectionName }}
    </p>

    <CommonTextData
      class="fs-14 border-bottom mt-[1.6rem] pb-8 text-gray-600"
      :contents="data.inspectionContent"
    />

    <p class="border-top fs-14 mt-[-0.1rem] block pt-8 font-bold text-primary">
      <span class="inline-block"
        >{{
          useFormattedDate(
            data.inspectionStartDateTime,
            "yyyy년 MM월 dd일 HH:mm",
          )
        }}
        ~&nbsp;</span
      >
      <span class="inline-block">{{
        useFormattedDate(data.inspectionEndDateTime, "yyyy년 MM월 dd일 HH:mm")
      }}</span>
    </p>
  </div>
</template>

<style lang="css" scoped>
.check:before {
  background-image: url("@/assets/img/check.png");
}
</style>
