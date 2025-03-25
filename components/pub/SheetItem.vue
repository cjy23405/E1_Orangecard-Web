<template>
  <div>
    <Sheet :open="props.show" class="size-full !p-0">
      <SheetContent :side="'bottom'" class="flex size-full flex-col">
        <SheetHeader class="relative">
          <SheetTitle>{{ title }} </SheetTitle>

          <a
            class="sheet-close absolute right-[1.2rem] top-4 size-[3.6rem]"
            @click="onCancel"
          ></a>
          <SheetDescription class="flex-1 overflow-y-auto px-8 py-[2.8rem]">
            <slot />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const props = defineProps<{
  show?: boolean;
  title?: string;
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

const onCancel = () => {
  onDialogChange(false); // 대화상자를 닫기
};
</script>
<style lang="css" scoped>
.sheet-close {
  background: url("@/assets/img/head/ic-title-close.png") no-repeat center
    center / 3.6rem auto !important;
}
</style>
