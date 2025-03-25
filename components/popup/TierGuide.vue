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
    <template #title>안내사항</template>

    <div class="text-lg">
      <p class="mb-[1.6rem]">
        오렌지카드의 회원 등급은 매달 1일 직전 1개월 충전 실적에 따라
        변경됩니다.
      </p>
      <p class="mb-[1.6rem]">
        고객등급은 매달 1일에 산정되며, 바뀐달 1일 등급이 갱신되기 이전에는 직전
        월 고객등급이 적용됩니다.
      </p>
      <p class="mb-[1.6rem]">
        개인택시 우대가맹점은 E1과 E1 충전소 간 가맹계약에 의해 지정되며,
        개인택시 고객이 개인택시 우대가맹점에서 추가 포인트 적립 혜택을 누리기
        위해서는 개인택시 회원등록이 필요합니다.<br />(차량 내 비치된
        택시운전자격증명 사본 제출)
      </p>
      <p class="mb-[1.6rem]">
        화물 충전소는 E1과 E1 충전소 간 가맹계약에 의해 지정되며, 화물 고객이
        화물 충전소에서 추가 포인트 적립 혜택을 누리기 위해서는 화물 회원등록이
        필요합니다.<br />
        (자동차등록증 사본 제출 필수)
      </p>
      <p>※ 주의사항</p>
      <ul class="list-dot small">
        <li class="before:!top-[1.1rem]">
          모든 적립한도는 1,000원 단위/소수점 이하 절사한 수치로 적용됩니다.
        </li>
        <li class="before:!top-[1.1rem]">
          제휴카드의 경우 포인트 적립시기는 충전일 익일~3일 사이에 적립이
          확인됩니다.
        </li>
        <li class="before:!top-[1.1rem]">
          한 충전소에서 6시간 이내에 1회 포인트 적립만 가능합니다.
        </li>
      </ul>
    </div>
  </PopupBase>
</template>
