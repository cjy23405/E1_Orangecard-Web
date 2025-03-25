<template>
  <div>
    <div class="round-box">
      <div class="border-bottom p-8 pb-6 md:flex md:flex-row md:p-12">
        <p class="fs-16 font-bold text-gray-900 md:w-full">
          {{ boardData.title }}
        </p>
        <p
          class="fs-14 date-text mt-[.6rem] text-gray-600 md:w-48 md:text-right"
        >
          {{ boardData.date }}
        </p>
      </div>
      <div class="md:min-h-[43rem]; min-h-[30rem] p-8 md:p-16">
        <slot />
      </div>
      <div
        v-if="isFile"
        class="round-box m-8 p-8 md:m-16 md:mt-8 md:flex md:flex-row md:px-16 md:py-[3.3rem]"
      >
        <p
          class="file-title fs-14 inline-block pr-[2.2rem] font-bold text-gray-900 md:block md:w-32"
        >
          다운로드
        </p>
        <NuxtLink
          class="btn-down ellipsis mt-[.8rem] md:ml-16 md:mt-0 md:w-full"
          >{{ boardData.file }}</NuxtLink
        >
      </div>
    </div>
    <p class="btn-wrap mt-8 md:mt-24">
      <NuxtLink class="btn-txt gray" @click="goBack">목록</NuxtLink>
    </p>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface BoardItem {
  title: string;
  date: string;
  file?: string;
}

const props = defineProps<{
  boardData: BoardItem;
}>();
const isFile = props.boardData.file != null;

const emit = defineEmits<{
  (e: "goBack"): void;
}>();

const goBack = () => {
  emit("goBack");
};
</script>
<style lang="css" scoped>
.file-title {
  background: url("@/assets/img/icon/icon-download.png") no-repeat right top;
  background-size: auto 1.8rem;
}
</style>
