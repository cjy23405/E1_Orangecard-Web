<template>
  <div class="border-top lb-small !border-t-2 py-[2.8rem] md:py-16">
    <p class="fs-18 mb-[1.2rem] font-bold md:mb-16 md:px-16">추가입력정보</p>
    <div class="md:px-32">
      <div class="ipt-wrap hidden md:block">
        <label class="relative mb-[.8rem] block font-bold text-gray-800"
          >성별</label
        >
        <div>
          <radio-group class="ipt-line !py-0">
            <div class="ipt-item">
              <radio-group-item id="rdMan" checked></radio-group-item>
              <label for="rdMan">남</label>
            </div>
            <div class="ipt-item !ml-24">
              <radio-group-item id="rdWoman"></radio-group-item>
              <label for="rdWoman">여</label>
            </div>
          </radio-group>
        </div>
      </div>
      <address-item
        :label-text="'주소'"
        :required="true"
        :is-error="true"
      ></address-item>
      <input-item
        :label-text="'전화번호'"
        :placeholder="'- 없이 입력하세요'"
      ></input-item>
      <input-item
        class="hidden md:block"
        :label-text="'결혼기념일'"
        :placeholder="'- 없이 입력하세요'"
      ></input-item>
    </div>
    <div
      class="border-top mb-[1.2rem] mt-[2.8rem] pt-[2.8rem] md:mb-0 md:px-16 md:pt-16"
    >
      <div class="ipt-line">
        <div class="ipt-item">
          <checkbox id="chkAdvertising" class="ipt-check"></checkbox>
          <label for="chkAdvertising">광고성 정보 수신 동의</label>
        </div>
      </div>
      <div class="ipt-line sub">
        <div class="ipt-item">
          <checkbox id="chkEmail" class="ipt-check noline"></checkbox>
          <label for="chkEmail">이메일</label>
        </div>
      </div>
      <div class="ipt-line sub">
        <div class="ipt-item">
          <checkbox id="chkSms" class="ipt-check noline"></checkbox>
          <label for="chkSms">SMS</label>
        </div>
      </div>
      <div class="ipt-line sub">
        <div class="ipt-item">
          <checkbox id="chkPush" class="ipt-check noline"></checkbox>
          <label for="chkPush">App Push</label>
        </div>
      </div>
      <div class="ipt-line sub">
        <div class="ipt-item">
          <checkbox id="chkKakao" class="ipt-check noline"></checkbox>
          <label for="chkKakao">카카오 알림톡/친구톡</label>
        </div>
      </div>
      <div class="mt-8 md:mt-12">
        <ul class="list-dot pl-[3.6rem] text-gray-600">
          <li>
            E1 오렌지카드와 관련한 정보(이벤트, 할인쿠폰, 기념일 등)를
            안내해드립니다.
          </li>
          <li>
            비밀번호 변경 등 일부 안내사항은 수신동의 여부와 상관 없이
            발송됩니다.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import InputItem from "@/components/pub/InputItem.vue";
import AddressItem from "@/components/pub/AddressItem.vue";
</script>

<style lang="css" scoped>
.ipt-wrap + .ipt-wrap {
  margin-top: 2.8rem;
}
@media (min-width: 768px) {
  .ipt-wrap + .ipt-wrap {
    margin-top: 3.2rem;
  }
  .ipt-line.sub {
    margin-top: 3.1rem !important;
    display: inline-block !important;
    padding-left: 6rem !important;
  }
  .ipt-line:not(.sub) + .ipt-line.sub {
    padding-left: 3.6rem !important;
  }
}
</style>
