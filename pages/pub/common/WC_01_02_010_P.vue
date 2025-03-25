<script setup lang="ts">
import { ref } from "vue";
import AlertItem from "@/components/pub/AlertItem.vue";

// 레이아웃 선택
definePageMeta({
  layout: "pub-guide",
});
const isDialogOpen = ref(false);
</script>
<template>
  <div>
    <p class="btn-wrap">
      <NuxtLink class="btn-txt primary small" @click="isDialogOpen = true">
        약관 상세
      </NuxtLink>
    </p>

    <alert-item
      :show="isDialogOpen"
      :alert-title="'약관명'"
      :cancel="'취소'"
      :ok="'동의'"
      @update:is-dialog-open="isDialogOpen = false"
    >
      <div>약관 내용이 추가됩니다.</div>
    </alert-item>
  </div>
</template>

<style lang="css" scoped></style>
