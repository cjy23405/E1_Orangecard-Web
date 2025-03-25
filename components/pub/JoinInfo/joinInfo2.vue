<template>
  <div class="border-top py-[2.8rem] md:p-16">
    <div
      v-if="showTermsText === false"
      class="border-bottom mb-[2.8rem] pb-[2.8rem]"
    >
      <div class="ipt-line">
        <div class="ipt-item relative pr-[2.8rem] md:!w-auto">
          <checkbox id="chk01" class="ipt-check"></checkbox>
          <label for="chk01"
            >맞춤형 서비스 제공을 위한 마케팅 수집이용 동의(선택)</label
          >
          <NuxtLink class="next absolute right-0 top-[.6rem]"
            >이용동의 상세보기</NuxtLink
          >
        </div>
      </div>
      <div class="mt-[1.2rem] pl-[3.6rem]">
        <ul class="list-dot text-gray-600">
          <li>고객님께서는 동의를 거부할 수 있습니다.</li>
          <li>
            거부 시 이벤트 소식 및 혜택/서비스 제공에 대한 서비스 이용에 대해
            제한될 수 있습니다.
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="border-bottom mb-[2.8rem] pb-[2.8rem]">
      <p class="fs-16 font-bold text-gray-700">
        맞춤형 서비스 제공을 위한 마케팅 수집이용 동의<strong
          class="fs-16 ml-[.2rem] align-baseline font-bold text-gray-600"
          >(선택)</strong
        >
      </p>
      <div
        class="round-box my-[.8rem] h-72 overflow-y-auto md:my-[1.6rem] md:h-[21.4rem]"
      >
        <div id="divContentes" class="terms-box data-terms"></div>
      </div>
      <div class="pr-[.8rem] text-right">
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
    <p class="fs-18 mb-[1.2rem] font-bold md:mb-16">차량정보</p>
    <div class="lb-small md:px-16">
      <car-item :disabled="props.typeIpin" :label-text="'차량번호'"></car-item>
      <div class="md:pl-[11.7rem]">
        <radio-group class="mt-[2.8rem] md:mt-[3.2rem]">
          <BoxList>
            <BoxListItem
              v-for="(car, index) in carList"
              :key="index"
              class="flex flex-row items-center"
              :class="{ 'list-dis': props.typeIpin }"
            >
              <div class="ipt-item flex-1">
                <radio-group-item
                  id="rdCar1"
                  :disabled="props.typeIpin"
                ></radio-group-item>
                <label for="rdCar1">
                  <span
                    class="fs-14 md:fs-16 mb-4 block leading-[2.4rem] md:mb-[1.8rem]"
                    >대표차량</span
                  >
                  <span class="bar bar-big md:no-bar">
                    <span
                      class="font-bold md:flex md:flex-row"
                      :class="{
                        'text-primary': car.type === 'LPG',
                        'text-e1h2blue': car.type === 'H2수소',
                        'text-e1evgreen': car.type === 'EV전기',
                      }"
                      ><em class="hidden md:block md:w-[9.6rem]">연료종</em
                      >{{ car.type }}</span
                    >
                    <span
                      class="md:mt-[1.6rem] md:flex md:flex-row md:font-bold"
                      ><em class="hidden md:block md:w-[9.6rem]">차량번호</em
                      >{{ car.number }}</span
                    >
                  </span>
                </label>
              </div>
              <NuxtLink class="btn-delete" :disabled="props.typeIpin"
                >삭제</NuxtLink
              >
            </BoxListItem>
          </BoxList>
        </radio-group>
        <div>
          <ul class="list-dot mt-[.6rem] text-gray-600 md:mt-[2.4rem]">
            <li>각 연료종별로 한대씩 등록할 수 있습니다.</li>
            <li>
              본인 명의가 아니거나 LPG/EV/수소 연료종이 아닌 차량의 경우 차량
              등록 서비스가 제한될 수 있습니다.
            </li>
            <li>
              법인, 렌트 차량등은 고객센터를 통해 등록하여 주십시오. (1688-2121)
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CarItem from "@/components/pub/CarItem.vue";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import BoxList from "@/components/pub/BoxList/BoxList.vue";
import BoxListItem from "@/components/pub/BoxList/BoxListItem.vue";
const carList = [
  {
    type: "LPG",
    number: "12서울 바0001",
  },
  {
    type: "LPG",
    number: "12서울 바0001",
  },
];
const props = withDefaults(
  defineProps<{
    typeIpin?: boolean;
    showTermsText?: boolean;
  }>(),
  {
    typeIpin: false,
    showTermsText: false,
  },
);
</script>
<style lang="css" scoped>
.list-dis {
  background: #f8f8f8;
  border-color: #e8ecef;
}
.list-dis * {
  color: #858e96 !important;
}
.bar > * {
  font-size: 1.6rem;
  line-height: 2.2rem;
}
</style>
