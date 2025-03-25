<script setup lang="ts">
import type {
  SurveyQuestionResponseQuestion,
  SurveyQuestionResponseAnswer,
} from "@/types/api";
import type { AlertOptions } from "@/types/components/common/Alert";
import type { SurveyEtc } from "@/types/components/contents/survey";

// props
const props = withDefaults(
  defineProps<{
    data: SurveyQuestionResponseQuestion;
    modelValue?: SurveyQuestionResponseAnswer[];
    etc?: SurveyEtc;
    disabled?: boolean;
  }>(),
  {
    data: undefined,
    modelValue: () => [],
    etc: () => ({}),
    disabled: false,
  },
);

// emit
const emit = defineEmits<{
  "update:modelValue": [v?: SurveyQuestionResponseAnswer[]];
  "update:etc": [v?: SurveyEtc];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);
const etc = useVModel(props, "etc", emit);

// state
const val = ref<boolean[]>(props.data.caseList.map(() => false));
const etcVal = ref<SurveyEtc>({});

// computed
const row = computed(() => {
  return props.data.displayAnswerColumn;
});
const list = computed(() => {
  return props.data.caseList;
});
const length = computed(() => {
  return list.value.length;
});

// 인덱스 계산
const getIndex = (g: number, i: number) => {
  return (
    Math.ceil((length.value / row.value) * (g - 1)) +
    (Math.ceil((length.value / row.value) * g) -
      (Math.ceil((length.value / row.value) * g) - (i - 1)))
  );
};

// update
const update = (i: number) => {
  const v = val.value.filter((item) => item);

  if (v.length > props.data.answerMaxCnt) {
    val.value[i] = false;
    alertOpen({
      message: useT("alertMessage.032", [
        props.data.answerMinCnt,
        props.data.answerMaxCnt,
      ]),
    });
  }

  const d = list.value.filter((item, j) => val.value[j]);
  modelValue.value = d.length ? d : [];
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// watch
watch(
  modelValue,
  () => {
    const mV = props.data.caseList.map(
      (item) =>
        modelValue.value.findIndex((mitem) => mitem.caseId === item.caseId) >
        -1,
    );

    if (JSON.stringify(mV) !== JSON.stringify(val.value)) {
      val.value = mV;
    }
  },
  {
    deep: true,
  },
);
watch(
  etc,
  () => {
    if (JSON.stringify(etc.value) !== JSON.stringify(etcVal.value)) {
      etcVal.value = { ...etc.value };
    }
  },
  {
    deep: true,
  },
);
watch(
  etcVal,
  () => {
    if (JSON.stringify(etcVal.value) !== JSON.stringify(etc.value)) {
      etc.value = { ...etcVal.value };
    }
  },
  {
    deep: true,
  },
);

// life cycle
onBeforeMount(() => {
  const mV = props.data.caseList.map(
    (item) =>
      modelValue.value.findIndex((mitem) => mitem.caseId === item.caseId) > -1,
  );
  val.value = mV;
  etcVal.value = { ...etc.value };
});
</script>

<template>
  <div class="answer">
    <template v-for="g in row" :key="g">
      <div class="answer-row">
        <template v-for="i in Math.ceil((length / row) * g)" :key="i">
          <div v-if="list[getIndex(g, i)]" class="answer-item">
            <div class="answer-button">
              <Checkbox
                :id="`${String(data.questionId)}_${String(list[getIndex(g, i)].caseId)}`"
                v-model:checked="val[getIndex(g, i)]"
                class="ipt-check"
                :disabled="disabled"
                @update:checked="update(getIndex(g, i))"
              ></Checkbox>
              <label
                :for="`${String(data.questionId)}_${String(list[getIndex(g, i)].caseId)}`"
              >
                {{ list[getIndex(g, i)].caseContent }}
              </label>
            </div>
            <div v-if="list[getIndex(g, i)].caseImage" class="answer-img">
              <img :src="list[getIndex(g, i)].caseImage" />
            </div>
            <div
              v-if="list[getIndex(g, i)].caseContent === '기타'"
              class="answer-input"
            >
              <FormBasicInput
                v-model="etcVal[list[getIndex(g, i)].caseId]"
                type="text"
                title="기타"
                :disabled="disabled || !val[getIndex(g, i)]"
              />
            </div>
          </div>
        </template>
      </div>
    </template>

    <CommonAlert ref="alertLayer" />
  </div>
</template>
