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
  <PopupBase ref="layer" :buttons="[{}]">
    <template #title>포인트 추가 적립 방법</template>

    <div class="text-lg">
      <p class="font-bold">[오렌지카드 신규가입, 등록 후 첫 충전 시]</p>
      <p class="mb-[1.6rem] font-bold text-primary">500P</p>
      <p class="font-bold">[오렌지카드 APP 신규 설치 후 익일 첫 충전 시]</p>
      <p class="mb-[1.6rem] font-bold text-primary">500P (충전 다음날 적립)</p>
      <p class="font-bold">[본인생일, 결혼기념일 전/후 3일 내 충전 시]</p>
      <p class="mb-[1.6rem] font-bold text-primary">200P (1회)</p>
      <p>다양한 제휴카드, 제휴가맹점 이용으로 더 많은 적립 가능</p>
    </div>
  </PopupBase>
</template>
