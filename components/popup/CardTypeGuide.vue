<script setup lang="ts">
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
  <PopupBase ref="layer">
    <template #title>오렌지카드/원카드란?</template>

    <div>
      <p class="fs-16 font-bold">오렌지카드</p>
      <p>
        오렌지카드는 전국 E1 충전소에서 별도의 절차 없이 무료로 발급 받으실 수
        있습니다.
      </p>
      <p class="fs-16 mt-4 font-bold">원카드</p>
      <p>
        주로 사용하는 신용카드를 등록하세요. 결제 및 포인트 적립이 카드 한장으로
        가능해요.
      </p>
    </div>
  </PopupBase>
</template>
