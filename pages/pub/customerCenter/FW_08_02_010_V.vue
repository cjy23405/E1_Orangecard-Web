<template>
  <div>
    <div class="inner md:!px-40">
      <search-item
        class="subinner mt-[3.2rem] md:mt-32"
        :placeholder="'궁금하신 것을 입력해주세요. (예: 카드 등록)'"
      ></search-item>
    </div>
    <Tabs default-value="all" class="inner mt-[1.6rem] w-full md:mt-16">
      <div class="w-full overflow-auto">
        <TabsList class="justify-start">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="top10">TOP 10</TabsTrigger>
          <TabsTrigger value="orangecard">오렌지카드</TabsTrigger>
          <TabsTrigger value="point">포인트</TabsTrigger>
          <TabsTrigger value="station">충전소</TabsTrigger>
          <TabsTrigger value="user">회원</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent class="tabinner" value="all">
        <Accordion
          v-model="defaultValue"
          type="multiple"
          class="w-full"
          collapsible
        >
          <AccordionItem
            v-for="item in accordionItems"
            :key="item.value"
            :value="item.value"
          >
            <AccordionTrigger
              ><p class="mb-[.6rem] md:mr-16 md:inline-block">
                <badge>{{ item.type }}</badge>
              </p>
              {{ item.title }}</AccordionTrigger
            >
            <AccordionContent>
              {{ item.content }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <p class="btn-wrap mt-8 md:mt-24">
          <NuxtLink class="btn-more">더보기</NuxtLink>
        </p>
      </TabsContent>
      <TabsContent class="tabinner" value="top10">top10</TabsContent>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Badge from "@/components/pub/Badge.vue";
import SearchItem from "@/components/pub/SearchItem.vue";

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
  stores.layout.$setGnbActive("004002");
  stores.layout.$setPageTitle("FAQ");
});

const defaultValue = ref(["item-1"]);

const accordionItems = [
  {
    value: "item-1",
    type: "충전소",
    title:
      "Is it accessible?Is it accessible?Is it accessible?Is it accessible?Is it accessible?Is it accessible?Is it accessible?Is it accessible?Is it accessible?",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    value: "item-2",
    type: "회원관리",
    title: "Is it unstyled?",
    content:
      "Yes. It's unstyled by default, giving you freedom over the look and feel.",
  },
  {
    value: "item-3",
    type: "포인트",
    title: "Can it be animated?",
    content: "Yes! You can use the transition prop to configure the animation.",
  },
];
</script>

<style lang="css" scoped>
.badge {
  width: auto !important;
  min-width: 6rem !important;
  padding: 0 1.4rem !important;
}
@media (min-width: 768px) {
  .badge {
    min-width: 7rem !important;
    padding: 0 1.6rem !important;
  }
}
</style>
