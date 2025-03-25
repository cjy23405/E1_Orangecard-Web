<script setup lang="ts">
import type {
  SurveyQuestionResponseQuestion,
  SurveyQuestionResponseAnswer,
} from "@/types/api";
import type { SurveyEtc } from "@/types/components/contents/survey";

// props
const props = withDefaults(
  defineProps<{
    data: SurveyQuestionResponseQuestion;
    modelValue?: SurveyQuestionResponseAnswer | null;
    etc?: SurveyEtc;
    disabled?: boolean;
  }>(),
  {
    data: undefined,
    modelValue: null,
    etc: () => ({}),
    disabled: false,
  },
);

// emit
const emit = defineEmits<{
  "update:modelValue": [v?: SurveyQuestionResponseAnswer];
  "update:etc": [v?: SurveyEtc];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);
const etc = useVModel(props, "etc", emit);

// state
const val = ref<string>();
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
const update = () => {
  const d = list.value.find((item) => item.caseId === Number(val.value));
  modelValue.value = d ? d : null;
};

// watch
watch(
  modelValue,
  () => {
    if (!modelValue.value && !!val.value) {
      val.value = "";
    } else if (
      modelValue.value &&
      modelValue.value.caseId !== Number(val.value)
    ) {
      val.value = String(modelValue.value.caseId);
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
  if (modelValue.value) {
    val.value = String(modelValue.value.caseId);
  }
  etcVal.value = { ...etc.value };
});
</script>

<template>
  <RadioGroup v-model="val" class="answer" @update:model-value="update">
    <template v-for="g in row" :key="g">
      <div class="answer-row">
        <template v-for="i in Math.ceil((length / row) * g)" :key="i">
          <div v-if="list[getIndex(g, i)]" class="answer-item">
            <div class="answer-button">
              <RadioGroupItem
                :id="`${String(data.questionId)}_${String(list[getIndex(g, i)].caseId)}`"
                :value="String(list[getIndex(g, i)].caseId)"
                :disabled="disabled"
              ></RadioGroupItem>
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
                :disabled="
                  disabled || val !== String(list[getIndex(g, i)].caseId)
                "
              />
            </div>
          </div>
        </template>
      </div>
    </template>
  </RadioGroup>
</template>
