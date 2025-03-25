<script setup lang="ts">
import type { AssociationServiceListResponseItem } from "@/types/api";

// props
withDefaults(
  defineProps<{
    data?: AssociationServiceListResponseItem | null;
  }>(),
  {
    data: null,
  },
);

// ref
const layer = useTemplateRef("layer");

// open
const open = () => {
  layer.value?.open();
};

// close
const close = () => {
  layer.value?.close();
};

// 서비스바로가기
const go = (url?: string) => {
  if (url) {
    window.open(url);
  }
};

// expose
defineExpose<{
  open: () => void;
  close: () => void;
}>({
  open,
  close,
});
</script>

<template>
  <PopupBase
    ref="layer"
    :buttons="
      data?.linkUrlDetail
        ? [
            {
              type: 'cancel',
              text: '확인',
            },
            {
              text: '서비스 바로가기',
              callback: () => {
                go(data?.linkUrlDetail);
              },
            },
          ]
        : [
            {
              type: 'cancel',
              text: '확인',
            },
          ]
    "
  >
    <template #title>{{ data?.serviceName }}</template>

    <div class="text-lg">
      <CommonTextData :contents="data?.content || ''" />
    </div>
  </PopupBase>
</template>
