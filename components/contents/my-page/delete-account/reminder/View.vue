<script setup lang="ts">
import type { MyDeleteAccountInfoResponse } from "@/types/api";

// route
const localePath = useLocalePath();

// api
const { data: body, suspense } = useApiMyDeleteAccountInfo();

// ssr
await suspense();

// computed
const data = computed((): MyDeleteAccountInfoResponse | null => {
  return body.value?.data || null;
});
</script>

<template>
  <CommonCheckPasswordSession
    check-path="/my-page/delete-account"
    denied-path="/my-page/delete-account"
  >
    <div class="inner">
      <div class="md:px-16">
        <p
          class="fs-22 mb-16 mt-[1.2rem] text-center font-bold md:mb-24 md:mt-0"
        >
          회원 탈퇴 신청 전
          <span class="block md:inline">아래 내용을 확인해 주세요</span>
        </p>

        <div>
          <p class="font-bold text-gray-500">현재 보유한 E1 오렌지카드 혜택</p>
          <div
            v-if="data?.totalPnt || data?.chargeOnlyPnt"
            class="round-box mt-[.8rem] p-8 md:px-16 md:py-12"
          >
            <ul class="list-point">
              <li class="flex flex-row">
                <p class="fs-16 flex-1">잔여 오렌지 포인트</p>
                <p class="fs-18 font-bold text-primary">
                  {{ data.totalPnt.toLocaleString() }}P
                </p>
              </li>
              <li class="mt-[.8rem] flex flex-row md:mt-8">
                <p class="fs-16 flex-1">잔여 충전소 포인트</p>
                <p class="fs-18 font-bold text-primary">
                  {{ data.chargeOnlyPnt.toLocaleString() }}P
                </p>
              </li>
            </ul>
          </div>
          <div v-else class="round-box mt-[.8rem] p-8 md:px-16 md:py-12">
            <p class="text-center text-lg text-gray-700 md:text-xl">
              보유한 오렌지 포인트 및
              <span class="inline-block">충전소 포인트가 없습니다.</span>
            </p>
          </div>
          <p class="mt-[.8rem] text-gray-600">
            ※ 탈퇴 시 보유하고 계신 포인트는 즉시 자동 소멸됩니다.
          </p>
        </div>

        <div v-if="data?.e1WashMemberYn === 'Y'" class="mt-8 md:mt-16">
          <p class="font-bold text-gray-500">현재 보유한 티티워시 세차권</p>
          <div
            v-if="data?.e1WashSubscribeTickets || data?.e1WashSingleTickets"
            class="round-box mt-[.8rem] p-8 md:px-16 md:py-12"
          >
            <ul class="list-point">
              <li class="flex flex-row">
                <p class="fs-16 flex-1">보유 세차 정기권</p>
                <p class="fs-18 font-bold text-primary">
                  {{ data.e1WashSubscribeTickets.toLocaleString() }}장
                </p>
              </li>
              <li class="mt-[.8rem] flex flex-row md:mt-8">
                <p class="fs-16 flex-1">보유 세차 1회권</p>
                <p class="fs-18 font-bold text-primary">
                  {{ data.e1WashSingleTickets.toLocaleString() }}장
                </p>
              </li>
            </ul>
          </div>
          <div v-else class="round-box mt-[.8rem] p-8 md:px-16 md:py-12">
            <p class="text-center text-lg text-gray-700 md:text-xl">
              보유한 세차권이 없습니다.
            </p>
          </div>
          <p class="mt-[.8rem] text-gray-600">
            ※ 탈퇴 시 보유하고 계신 세차권은 전액 환불처리됩니다.
          </p>
        </div>

        <!-- DD : EV 예정 -->
        <!-- <div v-if="" class="mt-8 md:mt-16">
          <p class="font-bold text-gray-500">구독 서비스</p>
          <div class="round-box mt-[.8rem] p-8 md:px-16 md:py-12">
            <ul class="list-point">
              <li class="flex flex-row">
                <p class="fs-16 flex-1">보유 세차 정기권</p>
                <p class="fs-18 font-bold text-primary">5장</p>
              </li>
              <li class="mt-[.8rem] flex flex-row md:mt-8">
                <p class="fs-16 flex-1">보유 세차 1회권</p>
                <p class="fs-18 font-bold text-primary">1장</p>
              </li>
            </ul>
          </div>
        </div> -->

        <div class="mt-16 md:mt-24">
          <p>
            <span
              class="relative font-bold after:absolute after:bottom-0 after:left-0 after:h-[.6rem] after:w-full after:bg-primary after:opacity-20 after:content-['']"
              >회원탈퇴 전 꼭 읽어주세요!</span
            >
          </p>
          <p class="fs-18 my-[.8rem]">회원탈퇴 시 유의사항</p>
          <div class="gray-box">
            <ul class="list-dot text-gray-600">
              <li>
                E1 오렌지카드 서비스 회원 탈퇴 시 보유하셨던 오렌지 포인트는
                즉시 자동 소멸되며, 보관중인 충전소 포인트도 즉시 소멸됩니다.
              </li>
              <li>
                E1오렌지카드 회원 탈퇴 시, 티티워시 회원에서도 탈퇴가 되며
                구매하신 세차권은 전액 환불처리 됩니다. (환불은 탈퇴일 익일까지
                처리)
              </li>
              <li>
                기타 탈퇴와 관련된 모든 정책은 오렌지카드 서비스 회원가입 시
                동의하신 서비스이용약관과 개인정보처리방침 내용에 따릅니다.
              </li>
            </ul>
          </div>
        </div>

        <p class="fs-16 my-16 text-center font-bold md:my-24">
          위 유의 및 안내사항을 모두 확인하였으며,
          <span class="block md:inline">E1 오렌지카드 탈퇴에 동의합니다.</span>
        </p>

        <div class="md:btn-wrap block">
          <NuxtLink :to="localePath('/my-page')" class="btn-txt gray">
            취소
          </NuxtLink>
          <NuxtLink
            :to="localePath('/my-page/delete-account/confirm')"
            class="btn-txt primary mt-[.8rem] md:mt-0"
          >
            본인인증 후 회원 탈퇴
          </NuxtLink>
        </div>
      </div>
    </div>
  </CommonCheckPasswordSession>
</template>
