<script setup lang="ts">
import { useQueryClient } from "@tanstack/vue-query";
import type { AlertOptions } from "@/types/components/common/Alert";
import type { SearchAddressData } from "@/types/components/popup/SearchAddress";

// uid
const uid = getCurrentInstance()?.uid;

// props
const props = withDefaults(
  defineProps<{
    modelValue?: SearchAddressData;
  }>(),
  {
    modelValue: () => ({
      addr: "",
      addrJi: "",
      zipCode: "",
      sido: "",
      gugun: "",
    }),
  },
);

// emit
const emit = defineEmits<{
  "update:modelValue": [v?: SearchAddressData];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);

// state
const isInit = ref(false);
const keyword = ref("");
const keywordIn = ref("");

// ref
const layer = useTemplateRef("layer");

// api
const queryClient = useQueryClient();
const {
  data,
  error,
  hasNextPage,
  isFetchingNextPage,
  isError,
  fetchNextPage,
  refetch,
} = useApiAddressSearch(uid, keywordIn);

// reset
const reset = () => {
  isInit.value = false;
  keyword.value = "";
  keywordIn.value = "";
  queryClient.resetQueries({ queryKey: ["addressSearch", uid] });
};

// open
const open = () => {
  layer.value?.open();
  reset();
};

// close
const close = () => {
  layer.value?.close();
  reset();
};

// search
const search = useDebounceFn(() => {
  keywordIn.value = keyword.value;
  queryClient.resetQueries({ queryKey: ["addressSearch", uid] });
  refetch({
    throwOnError: true,
  })
    .then(() => {
      if (!isInit.value) {
        isInit.value = true;
      }
    })
    .catch(() => {
      alertOpen({
        message: useApiGetErrorMessage(error.value?.data || {}),
      });
    });
}, 300);

// submit
const submit = () => {
  if (2 > keyword.value.length) {
    alertOpen({
      message: useT("alertMessage.001"),
    });
  } else {
    search();
  }
};

// select
const select = (item: SearchAddressData) => {
  modelValue.value = item;
  close();
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// expose
defineExpose<{
  open: () => void;
  close: () => void;
}>({
  open,
  close,
});
</script>

<template>
  <PopupBase ref="layer" variant="mobile-full">
    <template #title>우편번호 찾기</template>

    <!-- 검색영역 -->
    <div class="border-bottom mb-[2.8rem] pb-[2.8rem]">
      <p class="text-lg text-gray-700">
        도로명, 지번 구분 없이 검색 할 수 있습니다.
      </p>
      <FormSearchbar
        v-model="keyword"
        class="mt-[1.2rem] !px-0"
        title="검색"
        placeholder="도로명, 지번, 동명 등으로 입력"
        @submit="submit"
      />
      <p class="mt-[.8rem] text-base text-gray-600">
        예) 서울특별시 강남구 삼성1동 봉은사로 524
      </p>
    </div>

    <!-- 검색전  -->
    <div v-if="!isInit" class="rounded-lg bg-gray-100 p-[1.6rem]">
      <p class="text-lg text-gray-600">주소 검색 예시</p>
      <ul
        class="list-dash small mt-[1.6rem] text-lg leading-[2.2rem] text-gray-900"
      >
        <li>도로명 + 건물번호 예) 봉은사로 524</li>
        <li>건물명 예) 아셈타워</li>
        <li>읍/면/동/리 + 지번 예) 삼성동 159</li>
      </ul>
    </div>

    <!-- 검색결과 없음 -->
    <div
      v-else-if="
        isError ||
        !data ||
        !(data && data.pages.length && data.pages[0].data?.length)
      "
      class="nodata !min-h-[30vh]"
    >
      <p>조회 결과가 없습니다.</p>
    </div>

    <!-- 검색결과 -->
    <div v-else class="pb-16 md:pb-0">
      <p class="mb-[1.2rem] text-base text-gray-900">
        <strong class="align-baseline text-base font-bold text-primary">{{
          data.pages[0].page?.totalCount
        }}</strong
        >건
      </p>
      <BoardList
        class="md:overflow-hidden"
        :use-more="hasNextPage"
        :disabled="!hasNextPage || isFetchingNextPage"
        :small-button="true"
        @more="fetchNextPage"
      >
        <template v-for="(group, i) in data.pages" :key="i">
          <li
            v-for="(item, j) in group.data"
            :key="j"
            class="round-box mb-[.8rem] p-[1.6rem] pt-8"
            @click="select(item)"
            @keyup.enter.space="select(item)"
          >
            <a role="button" tabindex="0">
              <p class="mb-[.4rem] text-base font-bold leading-8 text-gray-600">
                {{ item.zipCode }}
              </p>
              <p class="mb-[.4rem] text-lg leading-[2.2rem]">
                {{ item.addr }}
              </p>
              <p class="text-lg leading-[2.2rem]">[지번] {{ item.addrJi }}</p>
            </a>
          </li>
        </template>
      </BoardList>
    </div>
  </PopupBase>

  <CommonAlert ref="alertLayer" />
</template>
