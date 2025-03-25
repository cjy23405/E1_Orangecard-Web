<template>
  <div class="inner border-top mt-[2.8rem] md:mt-0 md:!border-none">
    <Accordion
      v-model="defaultValue"
      type="multiple"
      class="w-full md:px-40"
      collapsible
    >
      <AccordionItem
        v-for="(item, index) in accordionItems"
        :key="index"
        :value="item.value"
      >
        <AccordionTrigger class="relative md:pl-[13.7rem] md:pr-96">
          <p
            class="mb-[.6rem] md:absolute md:left-16 md:mb-0 md:inline-block md:w-44 md:text-left"
          >
            <badge :is-mini="true" :class="{ gray: item.status === '완료' }">{{
              item.status
            }}</badge>
          </p>
          <p class="ellipsis2">
            {{ item.title }}
          </p>
          <span
            class="fs-14 date-text absolute right-[11.2rem] top-[3.3rem] hidden font-normal text-gray-600 md:inline-block"
            >{{ item.date }}</span
          ></AccordionTrigger
        >
        <AccordionContent class="md:pl-[13.7rem]">
          <p class="relative block pl-[2.6rem]">
            <strong class="fs-18 absolute left-0 top-[-.2rem] font-bold"
              >Q.</strong
            >
            {{ item.content }}
          </p>
          <p v-if="item.answer" class="relative mt-8 block pl-[2.6rem]">
            <strong
              class="fs-18 absolute left-0 top-[-.2rem] font-bold text-primary"
              >A.</strong
            >
            {{ item.answer }}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <p class="btn-wrap mt-8 md:mt-24">
      <NuxtLink class="btn-more">더보기</NuxtLink>
    </p>
  </div>
</template>
<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Badge from "@/components/pub/Badge.vue";

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
  stores.layout.$setPageTitle("1:1문의 내역");
});

const defaultValue = ref(["item-1"]);

const accordionItems = [
  {
    value: "item-1",
    status: "접수",
    title:
      "문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목문의 제목",
    date: "2024-12-27",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
    answer: "",
  },
  {
    value: "item-2",
    status: "완료",
    title: "문의 제목",
    date: "2024-12-27",
    content:
      "Yes. It's unstyled by default, giving you freedom over the look and feel.",
    answer:
      "Yes. It's unstyled by default, giving you freedom over the look and feel.",
  },
  {
    value: "item-3",
    status: "접수",
    title: "문의 제목",
    date: "2024-12-27",
    content: "Yes! You can use the transition prop to configure the animation.",
    answer: "",
  },
];
</script>

<style lang="css" scoped></style>
