<script setup lang="ts">
import type { SelectOptions } from "@/types/components/form/Select";

// props
const props = withDefaults(
  defineProps<{
    activeTab?: string;
    code?: string;
    id?: string;
  }>(),
  {
    activeTab: "",
    code: "",
    id: "",
  },
);

// emit
const emit = defineEmits<{
  selectedId: [string];
}>();

// api
const { data, suspense, isSuccess } = useApiAgreementList({
  agreementType: props.code,
});

// api ssr
await suspense();

// state
const selectId = ref("");
const detailId = ref("");

// computed
const options = computed((): SelectOptions => {
  return (
    data.value?.data?.map((item) => {
      return {
        value: String(item.agreementId),
        text: useFormattedDate(item.revisionDate, "yyyy년 M월 d일 개정"),
      };
    }) || []
  );
});

// init
const init = () => {
  selectId.value = props.id || getFirstId();
  detailId.value = props.id || getFirstId();
};

// selected id
const selectedId = () => {
  emit("selectedId", selectId.value);
};

// 첫번째 id
const getFirstId = () => {
  return options.value.length ? options.value[0].value : "";
};

// watch
watch(isSuccess, () => {
  if (isSuccess.value) {
    init();
  }
});
watch(
  () => props.activeTab,
  () => {
    if (selectId.value !== getFirstId()) {
      selectId.value = getFirstId();
    }
  },
);
watch(
  () => props.id,
  () => {
    if (props.activeTab === props.code && props.id !== selectId.value) {
      selectId.value = props.id || getFirstId();
    }
  },
);
watch(selectId, () => {
  detailId.value = "";
  nextTick(() => {
    detailId.value = selectId.value;
  });
});

// setup
init();
</script>

<template>
  <div>
    <div class="md:ml-auto md:w-[36rem]">
      <FormSelect
        v-model="selectId"
        :options="options"
        title="개정 내역"
        @update:model-value="selectedId"
      />
    </div>
    <ContentsCustomerAgreementTabsDetail
      v-if="detailId"
      :id="Number(detailId)"
      :is-active="activeTab === code"
    />
  </div>
</template>
