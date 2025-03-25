<script setup lang="ts">
import type {
  AssociationCategoryListResponse,
  AssociationServiceListResponse,
  AssociationServiceListResponseItem,
} from "@/types/api";
import type {
  AssociationServiceQuery,
  AssociationServiceList,
  AssociationServiceListGroup,
} from "@/types/components/contents/association/service";

// route
const localePath = useLocalePath();
const router = useRouter();

// props
const props = withDefaults(
  defineProps<{
    query?: AssociationServiceQuery;
  }>(),
  {
    query: () => ({}),
  },
);

// emit
const emit = defineEmits<{
  changeQuery: [AssociationServiceQuery];
}>();

// api
const apiCategory = useApiAssociationServiceCategoryList();
const apiList = useApiAssociationServiceList();

// api ssr
await apiCategory.suspense();
await apiList.suspense();

// state
const tab = ref(props.query.category ? String(props.query.category) : "0");

// ref
const details = useTemplateRef("details");

// computed
const category = computed((): AssociationCategoryListResponse => {
  return apiCategory.data.value?.data || [];
});
const list = computed((): AssociationServiceList => {
  const l: AssociationServiceListResponse = apiList.data.value?.data || [];
  const filter: AssociationServiceList = [];

  l.forEach((item) => {
    const c = category.value.find(
      (cData) =>
        cData.partnershipCategoryId === Number(item.partnershipCategoryId),
    );

    if (c) {
      filter.push({
        ...item,
        summaryArray: item.summary.length ? item.summary.split("\n") : [],
      });
    }
  });

  return filter;
});
const listGroup = computed((): AssociationServiceListGroup => {
  const g: AssociationServiceListGroup = [];

  g[0] = {
    category: 0,
    categoryName: "전체",
    list: list.value,
  };

  category.value.forEach((item, i) => {
    g[i + 1] = {
      category: item.partnershipCategoryId,
      categoryName: item.categoryName,
      list: list.value.filter(
        (data) =>
          Number(data.partnershipCategoryId) === item.partnershipCategoryId,
      ),
    };
  });

  return g;
});

// 카테고리 선택
const seletedCategory = () => {
  emit("changeQuery", {
    ...props.query,
    category: tab.value !== "0" ? tab.value : undefined,
  });
};

// 상세 열기
const detailOpen = (i: number) => {
  if (details.value && Array.isArray(details.value) && details.value[i]) {
    details.value[i].open();
  }
};

// 서비스바로가기
const go = (url?: string) => {
  if (url) {
    window.open(url);
  }
};

// 이용방법 클릭
const detailClick = (data: AssociationServiceListResponseItem, i: number) => {
  if (data.linkUrlList) {
    go(data.linkUrlList);
  } else if (data.displayType === "1") {
    router.push(
      localePath(`/association/service/${data.partnershipServiceId}`),
    );
  } else {
    detailOpen(i);
  }
};

// watch
watch(
  () => props.query.category,
  () => {
    if (typeof props.query.category === "string") {
      const q = props.query.category;
      tab.value = q;
    } else {
      tab.value = "0";
    }
  },
);
</script>

<template>
  <div>
    <Tabs
      v-model="tab"
      class="inner mt-[1.6rem] md:mt-16"
      @update:model-value="seletedCategory"
    >
      <TabsList
        class="flex w-full flex-row justify-start overflow-x-auto overflow-y-hidden"
      >
        <TabsTrigger
          v-for="group in listGroup"
          :key="group.category"
          :value="String(group.category)"
        >
          {{ group.categoryName }}
        </TabsTrigger>
      </TabsList>
      <TabsContent
        v-for="group in listGroup"
        :key="group.category"
        :value="String(group.category)"
        class="tabinner md:!px-[9.8rem]"
      >
        <BoardList class="md:overflow-hidden" :use-more="false">
          <template
            v-for="(item, i) in group.list"
            :key="item.partnershipServiceId"
          >
            <BoardItem
              class="box-item h-[43.2rem] md:relative md:mb-8 md:inline-block md:h-[63.2rem] md:px-16 md:pb-[14.6rem]"
              :is-small="true"
            >
              <div>
                <p class="flex flex-row">
                  <span class="ellipsis fs-16 flex-1 font-bold">
                    {{ item.serviceName }}
                  </span>
                  <span>
                    <BoardBadge type="gray">{{ item.categoryName }}</BoardBadge>
                  </span>
                </p>
              </div>
              <div class="mx-auto mt-10 w-48 md:mt-[2.8rem] md:w-80">
                <div class="relative rounded-full bg-gray-200 pt-[100%]">
                  <img
                    :src="item.imageUrl"
                    :alt="item.serviceName"
                    class="absolute left-0 top-0 size-full"
                  />
                </div>
              </div>
              <div
                class="flex h-[19rem] flex-col !items-center justify-center pb-4 md:my-[3.2rem] md:h-[16.6rem]"
              >
                <p
                  v-if="item.summaryArray[0]"
                  class="fs-12 md:!fs-14 text-center"
                >
                  {{ item.summaryArray[0] }}
                </p>
                <div
                  class="mt-[.4rem] flex flex-row justify-center text-center"
                >
                  <ul class="list-dot small fs-12 md:!fs-14 mx-auto !w-auto">
                    <template v-for="(info, j) in item.summaryArray" :key="j">
                      <li v-if="j > 0" class="block w-auto">
                        {{ info }}
                      </li>
                    </template>
                  </ul>
                </div>
                <p class="bar bar-gray mt-[1.2rem] text-center md:w-full">
                  <span
                    v-for="fuel in item.fuelTypeList"
                    :key="fuel"
                    :class="[
                      'fs-12 font-bold md:!text-lg',
                      {
                        'text-primary': fuel === 'L',
                        'text-e1h2blue': fuel === 'H',
                        'text-e1evgreen': fuel === 'E',
                      },
                    ]"
                    >{{ useFuelName(fuel) }}</span
                  >
                </p>
              </div>
              <p class="btn-wrap md:absolute md:bottom-16 md:left-0 md:px-16">
                <a
                  role="button"
                  tabindex="0"
                  class="btn-txt gray"
                  @click="detailClick(item, i)"
                  @keypress.enter.space="detailClick(item, i)"
                >
                  이용방법
                </a>
              </p>

              <!-- SEO 용 -->
              <CommonTextData
                v-if="!item.linkUrlList && item.displayType === '0'"
                class="hidden"
                :contents="item.content"
              />

              <PopupAssociationServiceDetail ref="details" :data="item" />
            </BoardItem>
          </template>
        </BoardList>
      </TabsContent>
    </Tabs>
  </div>
</template>

<style lang="css" scoped>
img {
  mix-blend-mode: multiply;
}
.popup-data strong {
  display: block;
  font-weight: bold;
}
.popup-data * + strong {
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .box-item {
    width: calc(50% - 1rem);
  }
  .box-item:nth-child(2n-1) {
    margin-right: 2rem;
  }
}
</style>
