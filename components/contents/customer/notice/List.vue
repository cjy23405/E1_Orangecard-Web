<script setup lang="ts">
// route
const localePath = useLocalePath();

// api
const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
  useApiNoticeList();

// more
const more = () => {
  fetchNextPage();
};

// 게시물 번호
const getPostNum = (totalCount: number = 0, num: number = 0) => {
  return String(totalCount - num + 1).padStart(3, "0");
};
</script>

<template>
  <div
    v-if="data && data.pages.length && data.pages[0].data?.length"
    class="inner px-8 pt-[2.8rem] md:!px-40"
  >
    <BoardList
      :use-more="hasNextPage"
      :disabled="isFetchingNextPage"
      @more="more"
    >
      <template v-for="(group, i) in data.pages" :key="i">
        <BoardItem v-for="item in group.data" :key="item.postingNo">
          <NuxtLink
            :to="localePath(`/customer/notice/${item.postingNo}`)"
            class="block md:flex md:flex-row md:items-center md:justify-start md:text-zero"
          >
            <BoardBadge
              v-if="item.pinYn === 'Y'"
              class="mb-[.6rem] md:mb-0"
              :is-notice="item.pinYn === 'Y'"
            >
              공지
            </BoardBadge>
            <span
              v-else
              class="hidden text-center text-2xl text-gray-900 md:w-32 md:first:block"
            >
              {{ getPostNum(group.page?.totalCount, item.rnum) }}
            </span>
            <span
              class="notice-title ellipsis2 block text-lg font-normal text-gray-900 md:ml-16 md:!block md:w-full md:truncate md:text-2xl"
            >
              {{ item.title }}
            </span>
            <span
              class="date-text mt-[.6rem] block text-right text-base text-gray-600 md:ml-16 md:mt-0 md:min-w-40 md:text-lg"
            >
              {{ useFormattedDate(item.entryDateTime, "yyyy-MM-dd") }}
            </span>
          </NuxtLink>
        </BoardItem>
      </template>
    </BoardList>
  </div>

  <div v-else-if="!isPending" class="nodata">
    <p>공지사항이 없습니다.</p>
  </div>
</template>

<style lang="css" scoped>
.badge ~ .notice-title {
  font-weight: bold;
}
</style>
