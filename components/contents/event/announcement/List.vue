<script setup lang="ts">
// route
const localePath = useLocalePath();

// api
const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
  useApiEventAnnouncementList();

// more
const more = () => {
  fetchNextPage();
};

// 게시물 번호
const getPostNum = (totalCount: number = 0, num: number = 0) => {
  return String(totalCount - num).padStart(3, "0");
};
</script>

<template>
  <div
    v-if="data && data.pages.length && data.pages[0].data?.length"
    class="inner"
  >
    <BoardList
      class="md:px-40"
      :use-more="hasNextPage"
      :disabled="isFetchingNextPage"
      @more="more"
    >
      <template v-for="(group, i) in data.pages" :key="i">
        <BoardItem
          v-for="(item, j) in group.data"
          :key="item.postingNo"
          class="box-item"
        >
          <NuxtLink
            :to="localePath(`/event/announcement/${item.postingNo}`)"
            class="block md:flex md:flex-row md:items-center md:justify-start md:text-zero"
          >
            <span
              class="hidden text-center text-2xl text-gray-900 md:w-32 md:first:block"
              >{{ getPostNum(group.page?.totalCount, i * 10 + j) }}</span
            >
            <span
              class="notice-title ellipsis2 block text-lg font-normal text-gray-900 md:ml-16 md:!block md:w-full md:truncate md:text-2xl"
              >{{ item.title }}</span
            >
            <span
              class="date-text mt-[.6rem] block text-right text-base text-gray-600 md:ml-16 md:mt-0 md:w-52 md:text-lg"
              >{{ useFormattedDate(item.entryDt, "yyyy-MM-dd") }}</span
            >
          </NuxtLink>
        </BoardItem>
      </template>
    </BoardList>
  </div>

  <div v-else-if="!isPending" class="nodata">
    <p>당첨자발표가 없습니다.</p>
  </div>
</template>
