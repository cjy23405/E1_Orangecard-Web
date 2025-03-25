<script setup lang="ts">
import type { EventListResponseItem } from "@/types/api";

// uid
const uid = getCurrentInstance()?.uid;

// props
const props = withDefaults(
  defineProps<{
    ongoingEvent?: boolean;
  }>(),
  {
    ongoingEvent: true,
  },
);

// route
const localePath = useLocalePath();
const router = useRouter();

// api
const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
  useApiEventList(
    {
      ongoingEvent: props.ongoingEvent,
    },
    uid,
  );

// more
const more = () => {
  fetchNextPage();
};

// link click
const linkClick = (data: EventListResponseItem) => {
  if (data.popupUrl) {
    if (/^\//.test(data.popupUrl)) {
      router.push(localePath(data.popupUrl));
    } else {
      window.open(data.popupUrl, "_blank");
    }
  } else {
    router.push(
      localePath(`/event${props.ongoingEvent ? "" : "/end"}/${data.postingNo}`),
    );
  }
};
</script>

<template>
  <div
    v-if="data && data.pages.length && data.pages[0].data?.length"
    class="inner"
  >
    <BoardList
      :use-more="hasNextPage"
      :disabled="isFetchingNextPage"
      @more="more"
    >
      <template v-for="(group, i) in data.pages" :key="i">
        <BoardItem
          v-for="item in group.data"
          :key="item.postingNo"
          :is-big-margin="true"
          class="box-item !p-0 md:!mb-8 md:inline-block"
        >
          <a
            role="button"
            tabindex="0"
            class="block"
            @click="linkClick(item)"
            @keypress.enter.space="linkClick(item)"
          >
            <div class="flex flex-row px-8 py-[1.3rem] md:px-12 md:py-[2.1rem]">
              <p class="bar bar-gray flex-1">
                <span
                  v-if="item.fuelTypeList.length >= 3"
                  class="fs-12 font-bold text-gray-600 md:!text-lg"
                >
                  전체
                </span>
                <template v-else>
                  <span
                    v-for="type in item.fuelTypeList"
                    :key="type"
                    :class="[
                      'fs-12 font-bold md:!text-lg',
                      {
                        'text-primary': type === 'L',
                        'text-e1h2blue': type === 'H',
                        'text-e1evgreen': type === 'E',
                      },
                    ]"
                    >{{ useFuelName(type) }}</span
                  >
                </template>
              </p>
              <p class="fs-12 md:fs-14 date-text text-gray-600">
                {{ useFormattedDate(item.eventStartDt, "yyyy-MM-dd") }}
                <span class="mx-[.3rem]">~</span>
                {{ useFormattedDate(item.eventEndDt, "yyyy-MM-dd") }}
              </p>
            </div>
            <div
              class="w-full overflow-hidden rounded-ee-lg rounded-es-lg"
              :style="{
                background: `url('${item.thumbnailImage}') no-repeat 50% 50% / cover`,
              }"
              :aria-label="item.eventTitle"
            >
              <div class="pt-[52.083333%]"></div>
            </div>
          </a>
        </BoardItem>
      </template>
    </BoardList>
  </div>

  <div v-else-if="!isPending" class="nodata">
    <p>{{ ongoingEvent ? "진행" : "종료" }}이벤트가 없습니다.</p>
  </div>
</template>

<style lang="css" scoped>
@media (min-width: 768px) {
  .box-item {
    width: calc(50% - 1rem);
  }
  .box-item:nth-child(2n-1) {
    margin-right: 2rem;
  }
}
</style>
