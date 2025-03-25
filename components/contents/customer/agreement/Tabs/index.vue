<script setup lang="ts">
import type { AgreementQuery } from "@/types/components/contents/customer/agreement";
import { tabs } from "./initTabs";

// props
const props = withDefaults(
  defineProps<{
    tab?: number;
    query?: AgreementQuery;
  }>(),
  {
    tab: 0,
    query: () => ({}),
  },
);

// emit
const emit = defineEmits<{
  changeTab: [number];
  changeQuery: [AgreementQuery];
}>();

// state
const activeTab = ref(props.tab);
const initContent = ref<boolean[]>(
  ((): boolean[] => {
    const arr = [];
    arr[props.tab] = true;
    return arr;
  })(),
);

// 탭 변경
const tabChange = () => {
  emit("changeTab", activeTab.value);
};

// id 변경
const selectedId = (id: string) => {
  emit("changeQuery", {
    id,
  });
};

// watch
watch(
  () => props.tab,
  () => {
    if (activeTab.value !== props.tab) {
      activeTab.value = props.tab;
    }
  },
);
watch(activeTab, () => {
  if (!initContent.value[activeTab.value]) {
    initContent.value[activeTab.value] = true;
  }
});
</script>

<template>
  <div>
    <Tabs
      v-model="activeTab"
      class="inner mt-[1.6rem] w-full md:mt-16"
      @update:model-value="tabChange"
    >
      <div class="w-full overflow-auto">
        <TabsList class="justify-start">
          <TabsTrigger v-for="(item, i) in tabs" :key="i" :value="i">
            {{ useT(item.name) }}
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        v-for="(item, i) in tabs"
        :key="i"
        :value="i"
        class="tabinner"
        :force-mount="true"
      >
        <ContentsCustomerAgreementTabsContent
          v-if="initContent[i]"
          :id="query.id ? String(query.id) : ''"
          :active-tab="tabs[activeTab].code"
          :code="item.code"
          @selected-id="selectedId"
        />
      </TabsContent>
    </Tabs>
  </div>
</template>

<style lang="css" scoped>
@media (min-width: 768px) {
  .tabinner {
    padding-left: 0;
    padding-right: 0;
    width: 98rem;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
