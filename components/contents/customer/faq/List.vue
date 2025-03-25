<script setup lang="ts">
import type { FaqCategoryListResponse, FaqListResponse } from "@/types/api";
import type { AlertOptions } from "@/types/components/common/Alert";
import type {
  FaqQuery,
  FaqList,
  FaqListGroup,
} from "@/types/components/contents/customer/faq";

// props
const props = withDefaults(
  defineProps<{
    query?: FaqQuery;
  }>(),
  {
    query: () => ({}),
  },
);

// emit
const emit = defineEmits<{
  changeQuery: [FaqQuery];
}>();

// api
const apiCategory = useApiFaqCategoryList();
const apiList = useApiFaqList();

// api ssr
await apiCategory.suspense();
await apiList.suspense();

// state
const keyword = ref(props.query.keyword ? String(props.query.keyword) : "");
const setKeyword = ref(props.query.keyword ? String(props.query.keyword) : "");
const tab = ref(props.query.category ? String(props.query.category) : "0");
const accordion = ref<{ [key: number]: string[] }>({});
const isInit = ref(false);

// computed
const category = computed((): FaqCategoryListResponse => {
  const c = apiCategory.data.value?.data || [];
  return c.filter((item) => item.postFlag === 1);
});
const list = computed((): FaqList => {
  const l: FaqListResponse = apiList.data.value?.data || [];
  const filter: FaqList = [];

  l.forEach((item) => {
    const c = category.value.find(
      (cData) => cData.seqNo === Number(item.faqTypeSeqNo),
    );
    const reg = new RegExp(`${setKeyword.value}`, "g");

    if (
      c &&
      ((setKeyword.value &&
        (reg.test(item.title) || reg.test(item.contents))) ||
        !setKeyword.value)
    ) {
      filter.push({
        ...item,
        contents: item.contents,
      });
    }
  });

  return filter;
});
const listGroup = computed((): FaqListGroup => {
  const g: FaqListGroup = [];

  g[0] = {
    category: 0,
    categoryName: "전체",
    list: list.value,
  };

  category.value.forEach((item, i) => {
    g[i + 1] = {
      category: item.seqNo,
      categoryName: item.typeName,
      list: list.value.filter(
        (data) => Number(data.faqTypeSeqNo) === item.seqNo,
      ),
    };
  });

  return g;
});

// 카테고리 선택
const seletedCategory = () => {
  accordion.value = {};

  emit("changeQuery", {
    ...props.query,
    category: tab.value !== "0" ? tab.value : undefined,
  });
};

// 검색
const submit = () => {
  if (0 < keyword.value.length && keyword.value.length < 2) {
    alertOpen({
      message: useT("alertMessage.001"),
    });
  } else if (setKeyword.value !== keyword.value) {
    setKeyword.value = keyword.value;
    accordion.value = {};

    emit("changeQuery", {
      ...props.query,
      keyword: keyword.value || undefined,
    });
  }
};

// 키워드 강조
const getMark = (text: string) => {
  if (setKeyword.value) {
    const reg = new RegExp(`(${setKeyword.value})`, "g");
    return text.replace(reg, "<mark class='e1KeywordMark'>$1</mark>");
  } else {
    return text;
  }
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// watch
watch(
  () => props.query.category,
  () => {
    if (typeof props.query.category === "string") {
      const q = props.query.category;
      tab.value = q;
      accordion.value = {};
    } else {
      tab.value = "0";
      accordion.value = {};
    }
  },
);
watch(
  () => props.query.keyword,
  () => {
    if (typeof props.query.keyword === "string") {
      const q = props.query.keyword;
      keyword.value = q;
      setKeyword.value = q;
      accordion.value = {};
    } else {
      keyword.value = "";
      setKeyword.value = "";
      accordion.value = {};
    }
  },
);

// life cycle
onMounted(() => {
  isInit.value = true;
});
</script>

<template>
  <div>
    <div class="inner md:!px-40">
      <FormSearchbar
        v-model="keyword"
        class="subinner mt-[3.2rem] md:mt-32"
        title="검색"
        @submit="submit"
      />
    </div>
    <Tabs
      v-model="tab"
      class="inner mt-[1.6rem] w-full md:mt-16"
      @update:model-value="seletedCategory"
    >
      <div class="w-full overflow-auto">
        <TabsList class="justify-start">
          <TabsTrigger
            v-for="group in listGroup"
            :key="group.category"
            :value="String(group.category)"
          >
            {{ group.categoryName }}
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        v-for="group in listGroup"
        :key="group.category"
        :value="String(group.category)"
        class="tabinner"
        :force-mount="isInit"
      >
        <Accordion
          v-if="group.list.length"
          v-model="accordion[group.category]"
          type="multiple"
          class="w-full"
          collapsible
        >
          <AccordionItem
            v-for="item in group.list"
            :key="`${item.faqSeqNo}_${setKeyword}`"
            :value="`${item.faqSeqNo}_${setKeyword}`"
          >
            <AccordionTrigger>
              <p class="mb-[.6rem] md:mb-0 md:mr-16">
                <BoardBadge
                  class="md:w-[8.5rem] md:overflow-hidden md:text-ellipsis md:text-nowrap"
                  >{{ item.typeName }}</BoardBadge
                >
              </p>
              <!-- eslint-disable vue/no-v-html -->
              <span
                class="block min-w-0 flex-1 break-all"
                v-html="getMark(item.title)"
              ></span>
            </AccordionTrigger>

            <!-- SEO 용 -->
            <!-- eslint-disable vue/no-v-html -->
            <article class="hidden" v-html="getMark(item.contents)"></article>

            <AccordionContent :force-mount="true" class="md:pl-[16.5rem]">
              <CommonHtmlData :contents="getMark(item.contents)" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div v-else class="nodata">
          <p>조회 결과가 없습니다.</p>
        </div>
      </TabsContent>
    </Tabs>

    <CommonAlert ref="alertLayer" />
  </div>
</template>
