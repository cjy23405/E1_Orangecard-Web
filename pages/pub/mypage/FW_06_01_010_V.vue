<template>
  <div>
    <div class="inner mt-[2.8rem] md:mt-24">
      <div
        class="border-top border-bottom relative px-8 py-[2.8rem] md:px-16 md:py-[1.6rem]"
      >
        <Select v-model="fuelType">
          <SelectTrigger class="block md:inline-block md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lpg">LPG</SelectItem>
            <SelectItem value="h2">수소</SelectItem>
            <SelectItem value="ev">EV</SelectItem>
          </SelectContent>
        </Select>
        <p
          class="fs-16 relative mt-[2.2rem] pl-[4.5rem] md:mx-16 md:mt-0 md:inline-block md:py-[1.4rem] md:pl-[6.5rem]"
          :class="{ 'pr-16': !isGeneralUser }"
        >
          <Badge :type="'gray'" class="absolute left-0 top-0 md:top-[1.4rem]"
            >일반</Badge
          >
          홍길동님 이달의 등급은
          <strong class="fs-16 align-baseline font-bold">일반회원</strong
          >입니다.
        </p>
        <p v-if="isGeneralUser" class="mt-[1.6rem] md:mt-0 md:inline-block">
          <NuxtLink class="btn-small" @click="isOpenBenefitPopup = true"
            >등급 혜택</NuxtLink
          >
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <NuxtLink
              class="btn-more-menu absolute bottom-[2.8rem] right-8 size-[2.8rem] text-zero md:bottom-[2.3rem] md:right-[2.4rem] md:size-16"
              >더보기</NuxtLink
            >
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <span>회원 정보 수정</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>간편 로그인 설정</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>회원 탈퇴</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div class="px-8 pt-8 md:px-16">
        <div
          class="bg-e1 rounded-lg bg-primary-foreground/60 px-8 py-12 md:px-16"
        >
          <p>
            <NuxtLink class="next relative block w-full">
              <span class="fs-14 text-gray-700">오렌지카드</span>
              <span class="fs-14 ml-[.4rem] font-bold text-primary md:ml-4"
                >3장</span
              >
            </NuxtLink>
          </p>
          <p class="mt-[.8rem] md:mt-[1.2rem]">
            <NuxtLink class="next relative block w-full">
              <span class="fs-14 text-gray-700">대표 차량</span>
              <span class="fs-14 ml-[.4rem] font-bold text-primary md:ml-4"
                >서울12바1234</span
              >
            </NuxtLink>
          </p>
          <p class="mt-[.8rem] md:mt-[1.2rem]">
            <NuxtLink class="next relative block w-full">
              <span class="fs-14 text-gray-700">주거래 충전소</span>
              <span class="fs-14 ml-[.4rem] font-bold text-primary md:ml-4"
                >주식회사과천엘피지충전소</span
              >
            </NuxtLink>
          </p>
        </div>
        <div class="md:mt-8 md:flex md:flex-row">
          <div
            class="round-box mt-[.8rem] p-8 md:mt-0 md:min-h-[13.5rem] md:flex-1 md:p-12"
          >
            <NuxtLink class="next fs-16 relative block w-full"
              >오렌지 포인트</NuxtLink
            >
            <p class="fs-16 mt-[.8rem] text-primary md:mt-[1.6rem]">
              <strong
                class="fs-20 mr-[.4rem] align-baseline font-bold text-primary"
                >1,000,000</strong
              >P
            </p>
            <p class="bar md:fs-14 mt-[.8rem] text-gray-600 md:mt-[1.6rem]">
              <span
                >충전전용
                <strong class="align-baseline text-gray-700"
                  >25,000P</strong
                ></span
              >
              <span
                >소멸예정
                <strong class="align-baseline text-gray-700"
                  >25,000P</strong
                ></span
              >
              <span class="mt-[.8rem] block md:mt-0 md:inline">
                <NuxtLink
                  class="btn-morepoint relative inline-block pr-8 align-baseline after:absolute after:right-0 after:top-1/2 after:size-[1.6rem] after:-translate-y-1/2 after:content-['']"
                  >충전소포인트
                  <strong
                    class="inline-block w-auto align-baseline text-gray-700"
                    >25,000P</strong
                  ></NuxtLink
                ></span
              >
            </p>
          </div>
          <div
            class="round-box mt-[.8rem] p-8 md:ml-8 md:mt-0 md:min-h-[13.5rem] md:flex-1 md:p-12"
          >
            <NuxtLink class="next fs-16 relative block w-full"
              >이번 달 충전량</NuxtLink
            >
            <p class="fs-16 mt-[.8rem] text-primary md:mt-[1.6rem]">
              <strong
                class="fs-20 mr-[.4rem] align-baseline font-bold text-primary"
                >123.45</strong
              >L
            </p>
            <p
              v-if="fuelType === 'lpg'"
              class="bar mt-[.8rem] text-gray-600 md:mt-[1.6rem]"
            >
              <span
                ><strong class="align-baseline text-gray-700">26.55 L</strong>
                더 충전하시면 우수회원 혜택을 누리실 수 있어요.</span
              >
            </p>
          </div>
        </div>

        <div
          class="fs-14 md:fs-18 mt-16 text-center md:mt-[5.8rem] md:overflow-hidden"
        >
          <div class="flew-row flex md:float-start md:w-1/2">
            <NuxtLink class="add flex-1 pt-[4.4rem] md:pt-[8.8rem]"
              >카드 등록</NuxtLink
            >
            <NuxtLink class="lost flex-1 pt-[4.4rem] md:pt-[8.8rem]"
              >카드 분실 신고</NuxtLink
            >
            <NuxtLink class="password flex-1 pt-[4.4rem] md:pt-[8.8rem]"
              >카드 비밀번호 변경</NuxtLink
            >
          </div>
          <div
            class="flew-row mt-[1.6rem] flex md:float-start md:mt-0 md:w-1/2"
          >
            <NuxtLink class="inquiry flex-1 pt-[4.4rem] md:pt-[8.8rem]"
              >1:1문의 내역</NuxtLink
            >
            <NuxtLink class="login flex-1 pt-[4.4rem] md:pt-[8.8rem]"
              >간편로그인설정</NuxtLink
            >
            <NuxtLink class="info flex-1 pt-[4.4rem] md:pt-[8.8rem]"
              >회원정보수정</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
    <alert-item :show="isOpenBenefitPopup" :alert-title="'등급 혜택 안내'">
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
    </alert-item>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Badge from "@/components/pub/Badge.vue";
import AlertItem from "@/components/pub/AlertItem.vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  stores.layout.$setPageTitle("마이페이지");
});

const isGeneralUser = ref(true);
const fuelType = ref<string>("lpg");
const isOpenBenefitPopup = ref(false);
</script>
<style lang="css" scoped>
.btn-more-menu {
  background: url("@/assets/img/mypage/btn-car-more.png") no-repeat center
    center/100% auto;
}
.next.w-full {
  width: 100%;
}
.next.w-full:after {
  position: absolute;
  right: 0;
  top: 0.4rem;
  background: url("@/assets/img/mypage/ic-agree-arrow.png") no-repeat center
    center/1.6rem auto;
}
.round-box .next.w-full:after {
  top: 0.6rem;
  background: url("@/assets/img/mypage/icon-arrow-down-pc.png") no-repeat center
    center/2.4rem auto;
}
.bar > * + *.block {
  margin-left: 0.6rem;
}
.btn-morepoint:after {
  background: url("@/assets/img/mypage/btn-point.png") no-repeat center
    center/100% auto;
}
.add {
  background: url("@/assets/img/mypage/ic-menu-card.png") no-repeat top
    center/4rem auto;
}
.lost {
  background: url("@/assets/img/mypage/ic-menu-report.png") no-repeat top
    center/4rem auto;
}
.password {
  background: url("@/assets/img/mypage/ic-menu-password.png") no-repeat top
    center/4rem auto;
}
.inquiry {
  background: url("@/assets/img/mypage/ic-menu-inquiry.png") no-repeat top
    center/4rem auto;
}
.login {
  background: url("@/assets/img/mypage/ic-menu-login.png") no-repeat top
    center/4rem auto;
}
.info {
  background: url("@/assets/img/mypage/ic-menu-info.png") no-repeat top
    center/4rem auto;
}

.bar > * {
  font-size: 1.2rem;
}
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
@media (min-width: 768px) {
  .bar > * {
    font-size: 1.6rem;
  }
  .bg-e1 {
    background-image: url("@/assets/img/mypage/bg-mypage.png");
    background-repeat: no-repeat;
    background-size: 34.8rem auto;
    background-position: right 4rem bottom;
  }
  .next.w-full {
    width: auto;
    padding-right: 2.8rem;
  }
  .next.w-full:after {
    top: 0.6rem;
  }
  .round-box .next.w-full:after {
    top: 0.8rem;
  }
  .add,
  .lost,
  .password,
  .inquiry,
  .login,
  .info {
    background-size: 8rem auto;
  }
  .bar > * + *.block {
    margin-left: 1.3rem;
  }
}
</style>
