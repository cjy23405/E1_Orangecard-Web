<script setup lang="ts">
import { ref } from "vue";
import AlertItem from "@/components/pub/AlertItem.vue";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// 레이아웃 선택
definePageMeta({
  layout: "pub-guide",
});
const isDialogOpen = ref(false);
const isDialogOpen2 = ref(false);
const isDialogOpen3 = ref(false);
const isDialogOpen4 = ref(false);
const isDialogOpen5 = ref(false);
</script>
<template>
  <div>
    <p class="btn-wrap">
      <NuxtLink class="btn-txt primary small" @click="isDialogOpen = true">
        alert
      </NuxtLink>
      <NuxtLink class="btn-txt primary small" @click="isDialogOpen2 = true">
        alert + text
      </NuxtLink>
    </p>
    <p class="btn-wrap">
      <NuxtLink class="btn-txt primary small" @click="isDialogOpen3 = true">
        Notice
      </NuxtLink>
      <NuxtLink class="btn-txt primary small" @click="isDialogOpen4 = true">
        Info
      </NuxtLink>
    </p>
    <p class="btn-wrap">
      <NuxtLink class="btn-txt primary small" @click="isDialogOpen5 = true">
        Sheet
      </NuxtLink>
    </p>
    <alert-item
      :show="isDialogOpen"
      ondialogch
      :alert-title="'titleText'"
      :alert-text="'subtext'"
      :cancel="'취소'"
      :ok="'확인'"
      @update:is-dialog-open="isDialogOpen = false"
    >
    </alert-item>

    <alert-item
      :show="isDialogOpen2"
      :alert-title="'titleText'"
      :ok="'확인'"
      @update:is-dialog-open="isDialogOpen2 = false"
    >
      <div>
        <p class="font-bold">[포인트 사용]</p>
        <p>①실물 오렌지카드 제시</p>
        <p>②비밀번호 입력</p>
        <p>③오렌지 포인트로 결제 금액 설정</p>
        <p class="font-bold">[포인트 적립]</p>
        <p>①실물 오렌지카드 제시</p>
        <p>②결제금액의 1% 적립</p>
        <p class="font-bold">[유의사항]</p>
        <p>①적립 불가 상품: 담배 및 주류</p>
        <p>
          ②사용 불가 상품: 비식품면세상품(공중전화카드, 종량제 봉투, 복권 등),
          업무대행서비스(로또, 스포츠토토 등)
        </p>
        <p>[포인트 사용]</p>
        <p>①실물 오렌지카드 제시</p>
        <p>②비밀번호 입력</p>
        <p>③오렌지 포인트로 결제 금액 설정</p>
        <p>[포인트 적립]</p>
        <p>①실물 오렌지카드 제시</p>
        <p>②결제금액의 1% 적립</p>
        <p>[유의사항]</p>
        <p>①적립 불가 상품: 담배 및 주류</p>
        <p>
          ②사용 불가 상품: 비식품면세상품(공중전화카드, 종량제 봉투, 복권 등),
          업무대행서비스(로또, 스포츠토토 등)
        </p>
        <p>[포인트 사용]</p>
        <p>①실물 오렌지카드 제시</p>
        <p>②비밀번호 입력</p>
        <p>③오렌지 포인트로 결제 금액 설정</p>
        <p>[포인트 적립]</p>
        <p>①실물 오렌지카드 제시</p>
        <p>②결제금액의 1% 적립</p>
        <p>[유의사항]</p>
        <p>①적립 불가 상품: 담배 및 주류</p>
        <p>
          ②사용 불가 상품: 비식품면세상품(공중전화카드, 종량제 봉투, 복권 등),
          업무대행서비스(로또, 스포츠토토 등)
        </p>
        <p>[포인트 사용]</p>
        <p>①실물 오렌지카드 제시</p>
        <p>②비밀번호 입력</p>
        <p>③오렌지 포인트로 결제 금액 설정</p>
        <p>[포인트 적립]</p>
        <p>①실물 오렌지카드 제시</p>
        <p>②결제금액의 1% 적립</p>
        <p>[유의사항]</p>
        <p>①적립 불가 상품: 담배 및 주류</p>
        <p>
          ②사용 불가 상품: 비식품면세상품(공중전화카드, 종량제 봉투, 복권 등),
          업무대행서비스(로또, 스포츠토토 등)
        </p>
      </div>
    </alert-item>
    <alert-item
      :show="isDialogOpen3"
      :alert-title="'공지성 팝업 타이틀'"
      :cancel="'닫기'"
      @update:is-dialog-open="isDialogOpen3 = false"
    >
      <div class="!mb-0 !p-0">
        <div>
          <img
            src="@/assets/img/test/popup-notice.png"
            alt="오렌지 포인트로 차량정비 하세요!"
          />
          <div class="fs-14 px-8 py-[1.6rem] md:px-[2.8rem] md:py-[2.4rem]">
            평우복지정비센터, 빵빵 용달 정비센터에서 특별한 혜택을 드립니다!
            TEXT
          </div>
          <div class="fs-14 px-8 py-[1.6rem] md:px-[2.8rem] md:py-[2.4rem]">
            HTML영역
          </div>
        </div>
      </div>
      <div class="fs-14 p-[1.6rem] md:px-[2.8rem] md:py-[2.4rem]">
        <div class="ipt-line">
          <div class="ipt-item">
            <checkbox id="chk01" class="ipt-check"></checkbox>
            <label for="chk01">오늘 하루 그만 보기</label>
          </div>
        </div>
      </div>
    </alert-item>
    <alert-item
      :show="isDialogOpen4"
      :cancel="'닫기'"
      @update:is-dialog-open="isDialogOpen4 = false"
    >
      <div class="!mb-0 !p-0">
        <div>
          <img
            src="@/assets/img/test/popup-notice.png"
            alt="오렌지 포인트로 차량정비 하세요!"
            class="overflow-hidden rounded-se-lg rounded-ss-lg"
          />
          <div class="fs-14 px-8 py-[1.6rem] md:px-[2.8rem] md:py-[2.4rem]">
            평우복지정비센터, 빵빵 용달 정비센터에서 특별한 혜택을 드립니다!
            TEXT
          </div>
          <div class="fs-14 px-8 py-[1.6rem] md:px-[2.8rem] md:py-[2.4rem]">
            HTML영역
          </div>
        </div>
      </div>
      <div class="fs-14 p-[1.6rem] md:px-[2.8rem] md:py-[2.4rem]">
        <div class="ipt-line">
          <div class="ipt-item">
            <checkbox id="chk01" class="ipt-check"></checkbox>
            <label for="chk01">오늘 하루 그만 보기</label>
          </div>
        </div>
      </div>
    </alert-item>

    <Sheet>
      <SheetTrigger as-child>
        <Button variant="outline"> Open </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right"> Name </Label>
            <Input id="name" default-value="Pedro Duarte" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="username" class="text-right"> Username </Label>
            <Input id="username" default-value="@peduarte" class="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose as-child>
            <Button type="submit"> Save changes </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>

<style lang="css" scoped></style>
