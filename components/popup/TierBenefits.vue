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
    <template #title>등급 혜택 안내</template>

    <div>
      <div class="fs-14 md:flex md:flex-row">
        <div class="w-full md:flex-1">
          <p class="popbenefit-tit normal">일반회원</p>
          <p class="my-[1.2rem] text-center">가입직후 혜택 제공</p>
          <div class="gray-box">
            <ul class="list-dot small text-gray-600">
              <li>LPG 충전 시 1,000원당 3P 적립</li>
              <li>수소 충전 시 1kg당 44P 적립</li>
              <li>제휴가맹점 오렌지 포인트 사용 및 적립</li>
            </ul>
          </div>
        </div>
        <div class="mt-8 w-full md:ml-8 md:mt-0 md:flex-1">
          <p class="popbenefit-tit crown">우수회원</p>
          <p class="my-[1.2rem] text-center">
            직전 1개월 LPG 충전량 150L 달성 고객
          </p>
          <div class="gray-box">
            <ul class="list-dot small text-gray-600">
              <li>LPG 충전 시 1,000원당 6P 적립</li>
              <li>제휴 가맹점 오렌지 포인트 사용 및 적립</li>
              <li>우수회원 전용이벤트 응모기회</li>
            </ul>
          </div>
        </div>
      </div>
      <p class="info-txt fs-12 mt-[1.2rem] text-gray-600">
        * 개인택시 및 화물 고객은 별도의 회원 등급과 적립률이 적용됩니다.
      </p>
    </div>
  </PopupBase>
</template>

<style lang="css" scoped>
.popbenefit-tit {
  margin: 0 auto;
  display: block;
  width: 10rem;
  height: 10rem;
  border-radius: 5rem;
  background: hsl(var(--primary));
  color: #fff;
  text-align: center;
  font-weight: bold !important;
  font-size: 1.8rem;
  padding-top: 5.8rem;
}
.popbenefit-tit.normal {
  background: hsl(var(--primary))
    url("@/assets/img/mypage/img_person_white.png") no-repeat center 2rem / 3rem
    auto;
}
.popbenefit-tit.crown {
  background: hsl(var(--primary)) url("@/assets/img/mypage/img_crown_white.png")
    no-repeat center 2.5rem / 3rem auto;
}
</style>
