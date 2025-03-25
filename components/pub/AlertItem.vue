<template>
  <div>
    <AlertDialog :open="props.show" @open-change="onDialogChange">
      <AlertDialogContent>
        <AlertDialogHeader class="relative">
          <AlertDialogTitle v-if="alertTitle">{{
            alertTitle
          }}</AlertDialogTitle>
          <AlertDialogDescription v-if="alertText">
            {{ alertText }}
          </AlertDialogDescription>
          <a
            class="absolute right-[1.2rem] top-4 size-[3.2rem] bg-close-button bg-contain bg-center bg-no-repeat text-zero md:right-8 md:top-[1.8rem] md:size-16"
            @click="onCancel"
          >
            Alert close
          </a>
        </AlertDialogHeader>
        <div class="popup-data">
          <slot />
        </div>
        <AlertDialogFooter class="px-8 pb-8">
          <AlertDialogCancel v-if="cancel" @click="onCancel">{{
            cancel
          }}</AlertDialogCancel>
          <AlertDialogAction v-if="ok" @click="handleOk">{{
            ok
          }}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const props = defineProps<{
  show?: boolean;
  alertTitle?: string;
  alertText?: string;
  cancel?: string;
  ok?: string;
}>();

const emit = defineEmits<{
  (e: "update:isDialogOpen", open: boolean): void;
}>();

const isDialogOpen = ref(props.show);
const onDialogChange = (open: boolean) => {
  emit("update:isDialogOpen", open);
  if (open === false) {
    isDialogOpen.value = false; // 다이얼로그가 닫힐 때 상태 업데이트
  } else {
    isDialogOpen.value = true; // 다이얼로그가 열릴 때 상태 업데이트
  }
};

const handleOk = () => {
  onDialogChange(false); // 대화상자를 닫기
};

const onCancel = () => {
  onDialogChange(false); // 대화상자를 닫기
};
</script>
