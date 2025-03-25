<template>
  <div class="section-bg -mb-16 md:mb-0">
    <section1></section1>
    <section2></section2>
    <section3></section3>
    <section4></section4>
    <alert-item
      :show="isDialogOpen"
      ondialogch
      :alert-title="'포인트 추가 적립 방법'"
      :ok="'확인'"
      @update:is-dialog-open="isDialogOpen = false"
    >
      <div class="fs-16">
        <p class="font-bold">[오렌지카드 신규가입, 등록 후 첫 충전 시]</p>
        <p class="mb-[1.6rem] font-bold text-primary">500P</p>
        <p class="font-bold">[오렌지카드 APP 신규 설치 후 익일 첫 충전 시]</p>
        <p class="mb-[1.6rem] font-bold text-primary">
          500P (충전 다음날 적립)
        </p>
        <p class="font-bold">[본인생일, 결혼기념일 전/후 3일 내 충전 시]</p>
        <p class="mb-[1.6rem] font-bold text-primary">200P (1회)</p>
        <p>다양한 제휴카드, 제휴가맹점 이용으로 더 많은 적립 가능</p>
      </div>
    </alert-item>
    <alert-item
      :show="isDialogOpen2"
      ondialogch
      :alert-title="'안내사항'"
      :ok="'확인'"
      @update:is-dialog-open="isDialogOpen2 = false"
    >
      <div class="fs-16">
        <p class="mb-[1.6rem]">
          오렌지카드의 회원 등급은 매달 1일 직전 1개월 충전 실적에 따라
          변경됩니다.
        </p>
        <p class="mb-[1.6rem]">
          고객등급은 매달 1일에 산정되며, 바뀐달 1일 등급이 갱신되기 이전에는
          직전 월 고객등급이 적용됩니다.
        </p>
        <p class="mb-[1.6rem]">
          개인택시 우대가맹점은 E1과 E1 충전소 간 가맹계약에 의해 지정되며,
          개인택시 고객이 개인택시 우대가맹점에서 추가 포인트 적립 혜택을 누리기
          위해서는 개인택시 회원등록이 필요합니다.<br />(차량 내 비치된
          택시운전자격증명 사본 제출)
        </p>
        <p class="mb-[1.6rem]">
          화물 충전소는 E1과 E1 충전소 간 가맹계약에 의해 지정되며, 화물 고객이
          화물 충전소에서 추가 포인트 적립 혜택을 누리기 위해서는 화물
          회원등록이 필요합니다.<br />(자동차등록증 사본 제출 필수)
        </p>
        <p>※ 주의사항</p>
        <ul class="list-dot small">
          <li>
            모든 적립한도는 1,000원 단위/소수점 이하 절사한 수치로 적용됩니다.
          </li>
          <li>
            제휴카드의 경우 포인트 적립시기는 충전일 익일~3일 사이에 적립이
            확인됩니다.
          </li>
          <li>한 충전소에서 6시간 이내에 1회 포인트 적립만 가능합니다.</li>
        </ul>
      </div>
    </alert-item>
  </div>
</template>

<script setup lang="ts">
import section1 from "@/components/pub/Introduction/card/section1.vue";
import section2 from "@/components/pub/Introduction/card/section2.vue";
import section3 from "@/components/pub/Introduction/card/section3.vue";
import section4 from "@/components/pub/Introduction/card/section4.vue";
import AlertItem from "@/components/pub/AlertItem.vue";

const isDialogOpen = ref(true);
const isDialogOpen2 = ref(false);

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// 레이아웃 선택
definePageMeta({
  layout: "sub",
});

onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("001001");
  stores.layout.$setPageTitle("오렌지카드/포인트");
});
</script>
<style lang="css" scoped>
.section-bg {
  background: #fff url("@/assets/img/introduction/bg-m-introduce-oca.png")
    no-repeat 0 50% / 100% 100%;
}
@media (min-width: 768px) {
  .section-bg {
    background: #fff url("@/assets/img/introduction/bg-introduce-oca.png")
      no-repeat 0 50% / 100% 2990px;
  }
}
</style>
