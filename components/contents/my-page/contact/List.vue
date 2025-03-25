<script setup lang="ts">
import type { ContactListResponseItem } from "~/types/api";

// api
const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
  useApiContactList();

// more
const more = () => {
  fetchNextPage();
};

// 더보기 클릭
const moreClick = () => {
  if (isFetchingNextPage.value) return;

  more();
};

// set badge type
const setBadgeType = (code: ContactListResponseItem["statusCd"]) => {
  if (code === "Closed") {
    return "gray";
  } else {
    return;
  }
};
</script>

<template>
  <div
    v-if="data && data.pages.length && data.pages[0].data?.length"
    class="inner border-top mt-[2.8rem] md:mt-0 md:!border-none"
  >
    <Accordion type="multiple" class="w-full md:px-40" collapsible>
      <template v-for="(group, i) in data.pages" :key="i">
        <AccordionItem
          v-for="item in group.data"
          :key="item.srId"
          :value="String(item.srId)"
        >
          <AccordionTrigger class="relative md:pl-[13.7rem] md:pr-96">
            <p
              class="mb-[.6rem] md:absolute md:left-16 md:mb-0 md:inline-block md:w-44 md:text-left"
            >
              <BoardBadge :is-mini="true" :type="setBadgeType(item.statusCd)">
                {{ item.statusNm }}
              </BoardBadge>
            </p>
            <p class="ellipsis2">
              {{ item.title }}
            </p>
            <span
              class="fs-14 date-text absolute right-[11.2rem] top-[3.3rem] hidden font-normal text-gray-600 md:inline-block"
              >{{ useFormattedDate(item.openedDateTime, "yyyy-MM-dd") }}</span
            >
          </AccordionTrigger>
          <AccordionContent class="md:pl-[13.7rem]">
            <div class="relative block pl-[2.6rem]">
              <strong class="fs-18 absolute left-0 top-[-.2rem] font-bold"
                >Q.</strong
              >
              <CommonTextData :contents="item.contents" />
            </div>

            <div
              v-if="item.statusCd === 'Closed'"
              class="relative mt-8 block pl-[2.6rem]"
            >
              <strong
                class="fs-18 absolute left-0 top-[-.2rem] font-bold text-primary"
                >A.</strong
              >
              <CommonTextData
                v-if="item.replyContents"
                :contents="item.replyContents"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </template>
    </Accordion>

    <p v-if="hasNextPage" class="btn-wrap mt-8 md:mt-24">
      <a
        role="button"
        tabindex="0"
        :aria-disabled="isFetchingNextPage"
        class="btn-more"
        @click="moreClick"
        @keypress.enter.space="moreClick"
      >
        더보기
      </a>
    </p>
  </div>

  <div v-else-if="!isPending" class="nodata">
    <p>1:1문의 내역이 없습니다.</p>
  </div>
</template>
