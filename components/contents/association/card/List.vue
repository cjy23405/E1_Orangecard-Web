<script setup lang="ts">
import type {
  AssociationCategoryListResponse,
  AssociationCardListResponse,
} from "@/types/api";
import type {
  AssociationCardQuery,
  AssociationCardList,
  AssociationCardListGroup,
} from "@/types/components/contents/association/card";

// 카드 타입
const cardType = ["신용", "체크"];

// props
const props = withDefaults(
  defineProps<{
    query?: AssociationCardQuery;
  }>(),
  {
    query: () => ({}),
  },
);

// emit
const emit = defineEmits<{
  changeQuery: [AssociationCardQuery];
}>();

// api
const apiCategory = useApiAssociationCardCategoryList();
const apiList = useApiAssociationCardList();

// api ssr
await apiCategory.suspense();
await apiList.suspense();

// state
const tab = ref(props.query.category ? String(props.query.category) : "0");

// computed
const category = computed((): AssociationCategoryListResponse => {
  return apiCategory.data.value?.data || [];
});
const list = computed((): AssociationCardList => {
  const l: AssociationCardListResponse = apiList.data.value?.data || [];
  const filter: AssociationCardList = [];

  l.forEach((item) => {
    const c = category.value.find(
      (cData) =>
        cData.partnershipCategoryId === Number(item.partnershipCategoryId),
    );

    if (c) {
      filter.push({
        ...item,
        informationArray: item.information.length
          ? item.information.split("\n")
          : [],
      });
    }
  });

  return filter;
});
const listGroup = computed((): AssociationCardListGroup => {
  const g: AssociationCardListGroup = [];

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

// 자세히보기
const go = (url?: string) => {
  if (url) {
    window.open(url);
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
          <template v-for="item in group.list" :key="item.partnershipCardId">
            <BoardItem
              v-if="item.postFlag === '1'"
              class="box-item min-h-[43.2rem] md:relative md:mb-8 md:inline-block md:h-[63.2rem] md:px-16"
              :is-small="true"
            >
              <div>
                <p class="flex flex-row">
                  <span class="ellipsis fs-16 flex-1 font-bold">
                    {{ item.cardName }}
                  </span>
                  <span>
                    <!-- DD : 카드 타입을 현재 카테고리로 사용중이여서 일단 숨김
                    <BoardBadge type="gray">{{ item.categoryName }}</BoardBadge>
                    -->
                    <BoardBadge type="gray" class="ml-[.4rem]">
                      {{ cardType[Number(item.cardType)] }}
                    </BoardBadge>
                  </span>
                </p>
              </div>
              <div class="mt-10 py-[2.2rem] text-center md:mt-0 md:py-[3.7rem]">
                <p
                  class="relative mx-auto h-[8.7rem] w-52 before:absolute before:left-1/2 before:top-1/2 before:size-48 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray-200 before:content-[''] md:h-[14.2rem] md:w-[21.6rem] md:before:size-80 md:before:h-80"
                >
                  <span class="card-shadow"></span>
                  <img
                    class="z-1 relative w-full"
                    :src="item.imageUrl"
                    :alt="item.cardName"
                  />
                </p>
              </div>
              <p class="mt-[.6rem] text-center md:mt-[1.2rem]">
                <a
                  role="button"
                  tabindex="0"
                  class="blue-link"
                  @click="go(item.linkUrlWeb)"
                  @keypress.enter.space="go(item.linkUrlWeb)"
                >
                  자세히보기
                </a>
              </p>
              <div
                class="flex h-[17rem] flex-col !items-center justify-center md:h-[23rem]"
              >
                <div class="flex flex-row justify-center">
                  <ul class="list-dot small fs-12 md:!fs-14 mx-auto !w-auto">
                    <li
                      v-for="(info, j) in item.informationArray"
                      :key="j"
                      class="block w-auto text-center"
                    >
                      {{ info }}
                    </li>
                  </ul>
                </div>
                <p
                  class="bar bar-gray mt-[1.2rem] text-center md:mt-[1.6rem] md:w-full"
                >
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
              <p class="btn-wrap">
                <a
                  :href="`tel:${usePhoneNumber(item.telephone)}`"
                  class="btn-txt gray md:!hidden"
                >
                  전화걸기
                </a>
                <a
                  :href="`tel:${
                    item.telephone.length < 10
                      ? useArsNumber(item.telephone)
                      : usePhoneNumber(item.telephone)
                  }`"
                  class="btn-txt gray !hidden md:!ml-0 md:!block"
                >
                  {{
                    item.telephone.length < 10
                      ? useArsNumber(item.telephone)
                      : usePhoneNumber(item.telephone)
                  }}
                </a>
              </p>
            </BoardItem>
          </template>
        </BoardList>
      </TabsContent>
    </Tabs>
  </div>
</template>

<style lang="css" scoped>
.card-shadow {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  display: block;
  padding-top: 63.060748%;
  border-radius: 3.5%/5.6%;
  margin-top: 0.24rem;
  transform: translate(-50%, -50%);
  filter: blur(0.48rem);
  background-color: rgba(0, 0, 0, 0.16);
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
