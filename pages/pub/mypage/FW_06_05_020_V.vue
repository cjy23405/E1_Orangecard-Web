<template>
  <div>
    <div
      class="border-top border-bottom inner mt-[2.8rem] px-8 md:mt-24 md:px-16"
    >
      <div class="py-[2.8rem] md:py-16">
        <p class="fs-18 mb-[1.2rem] font-bold md:mb-16">카드 정보 입력</p>
        <div class="md:px-16">
          <div class="ipt-wrap">
            <label class="relative mb-[.8rem] block font-bold text-gray-800"
              >카드종류
              <NuxtLink class="btn-info ml-[.8rem]" @click="isOpenInfo = true"
                >카드종류란?</NuxtLink
              ></label
            >
            <radio-group class="ipt-line">
              <div class="ipt-item">
                <radio-group-item id="rdTypeOc" checked></radio-group-item>
                <label for="rdTypeOc">오렌지카드</label>
              </div>
              <div class="ipt-item ml-16">
                <radio-group-item id="rdTypeOne"></radio-group-item>
                <label for="rdTypeOne">원카드</label>
              </div>
            </radio-group>
          </div>
          <card-item></card-item>
          <input-item
            :label-text="'카드비밀번호'"
            :type="'password'"
            :placeholder="'숫자 4자리를 입력해 주세요.'"
          ></input-item>
          <input-item
            :label-text="'카드비밀번호 확인'"
            :type="'password'"
            :placeholder="'비밀번호를 다시 입력해주세요.'"
          ></input-item>
        </div>
      </div>
      <div class="border-top pb-16 pt-[2.8rem] md:pt-16">
        <p class="fs-16 font-bold text-gray-700">
          개인정보 수집 및 이용에 대한 안내 동의<strong
            class="fs-16 ml-[.2rem] align-baseline font-bold text-primary"
            >(필수)</strong
          >
        </p>
        <div
          class="round-box my-[.8rem] h-72 overflow-y-auto md:my-[1.6rem] md:h-[21.4rem]"
        >
          <div id="divContentes" class="terms-box data-terms"></div>
        </div>
        <ul class="list-dot text-gray-600">
          <li>
            고객님께서는 동의를 거부할 수 있습니다.
            <span class="block md:inline">
              (단, 동의 거부시에는 오렌지카드 서비스 제공이 제한됩니다.)</span
            >
          </li>
        </ul>
        <div class="mt-[.8rem] pr-[.8rem] text-right md:mt-[1.6rem]">
          <radio-group class="ipt-line">
            <div class="ipt-item">
              <radio-group-item id="rdTerms01Ok" checked></radio-group-item>
              <label for="rdTerms01Ok">동의함</label>
            </div>
            <div class="ipt-item">
              <radio-group-item id="rdTerms01No"></radio-group-item>
              <label for="rdTerms01No">동의하지 않음</label>
            </div>
          </radio-group>
        </div>
      </div>
    </div>
    <div class="btn-wrap p-8 pb-0 md:p-24 md:pb-0">
      <NuxtLink class="btn-txt primary">등록하기</NuxtLink>
    </div>

    <alert-item
      :show="isOpenInfo"
      :alert-title="'오렌지카드/원카드란?'"
      @update:is-dialog-open="isOpenInfo = false"
    >
      <div>
        <p class="fs-16 font-bold">오렌지카드</p>
        <p>
          오렌지카드는 전국 E1 충전소에서 별도의 절차 없이 무료로 발급 받으실 수
          있습니다.
        </p>
        <p class="fs-16 mt-4 font-bold">원카드</p>
        <p>
          주로 사용하는 신용카드를 등록하세요. 결제 및 포인트 적립이 카드
          한장으로 가능해요.
        </p>
      </div>
    </alert-item>
  </div>
</template>
<script setup lang="ts">
import AlertItem from "@/components/pub/AlertItem.vue";
import CardItem from "@/components/pub/CardItem.vue";
import InputItem from "@/components/pub/InputItem.vue";
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
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("오렌지카드 등록");
});
const isOpenInfo = ref(false);
</script>
<style lang="css" scoped>
.ipt-item + .ipt-item.ml-16 {
  margin-left: 4rem;
}
.ipt-wrap + .ipt-wrap {
  margin-top: 2.8rem;
}
@media (min-width: 768px) {
  .ipt-item + .ipt-item.ml-16 {
    margin-left: 6rem;
  }
  .ipt-wrap + .ipt-wrap {
    margin-top: 3.2rem;
  }
}
</style>
