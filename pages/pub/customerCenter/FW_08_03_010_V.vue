<template>
  <div class="inner md:!px-40">
    <div class="md:flex md:flex-row">
      <Label for="contactType" class="md:w-[4.4rem] md:pt-[1.7rem]">구분</Label>
      <Select id="contactType">
        <SelectTrigger>
          <SelectValue placeholder="선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="contactType1">오렌지카드</SelectItem>
          <SelectItem value="contactType2">충전소</SelectItem>
          <SelectItem value="contactType3">오렌지 포인트</SelectItem>
          <SelectItem value="contactType4">홈페이지문의</SelectItem>
          <SelectItem value="contactType5">E1 LPG 전용앱</SelectItem>
          <SelectItem value="contactType6">이벤트</SelectItem>
          <SelectItem value="contactType7">제휴카드</SelectItem>
          <SelectItem value="contactType8">제휴처</SelectItem>
          <SelectItem value="contactType9">회원문의</SelectItem>
          <SelectItem value="contactType10">기타</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div class="md:mt-mt-[3.2rem] mt-[2.8rem] md:flex md:flex-row">
      <Label for="contactTitle" class="md:w-[4.4rem] md:pt-[1.7rem]"
        >제목</Label
      >
      <input-item
        id="contactTitle"
        class="md:w-full"
        :placeholder="'제목을 입력하세요 (5자 ~ 50자)'"
      ></input-item>
    </div>
    <div class="mt-[2.8rem] md:mt-[3.2rem] md:flex md:flex-row">
      <Label id="contactContent" class="md:w-[4.4rem] md:pt-[1.7rem]"
        >내용</Label
      >
      <textarea
        id="contactContent"
        placeholder="내용을 입력하세요 (최대 400자)"
      ></textarea>
    </div>
    <p class="btn-wrap mt-8 md:mt-24">
      <NuxtLink class="btn-txt gray">취소</NuxtLink>
      <NuxtLink class="btn-txt primary">등록</NuxtLink>
    </p>
  </div>
</template>
<script setup lang="ts">
import { Label } from "@/components/ui/label";
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
  stores.layout.$setGnbActive("004003");
  stores.layout.$setPageTitle("1:1문의");
});
</script>
