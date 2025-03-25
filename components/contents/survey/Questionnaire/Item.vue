<script setup lang="ts">
import type {
  SurveyQuestionResponseQuestion,
  SurveyQuestionResponseAnswer,
  SurveyAnswerRequestItem,
} from "@/types/api";
import type { SurveyEtc } from "@/types/components/contents/survey";

// props
const props = withDefaults(
  defineProps<{
    data: SurveyQuestionResponseQuestion;
    modelValue?: SurveyAnswerRequestItem[];
    disabled?: boolean;
  }>(),
  {
    data: undefined,
    modelValue: () => [],
    disabled: false,
  },
);

// emit
const emit = defineEmits<{
  "update:modelValue": [v?: SurveyAnswerRequestItem[]];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);

// state
const checkVal = ref<SurveyQuestionResponseAnswer[]>([]);
const checkEtcVal = ref<SurveyEtc>({});
const radioVal = ref<SurveyQuestionResponseAnswer | null>(null);
const radioEtcVal = ref<SurveyEtc>({});
const textVal = ref<string>();

// computed
const isCheck = computed(() => {
  return (
    props.data.questionTypeCode === 1 && props.data.isPluralAnserYN === "Y"
  );
});
const isRadio = computed(() => {
  return (
    props.data.questionTypeCode === 1 && props.data.isPluralAnserYN === "N"
  );
});
const isText = computed(() => {
  return props.data.questionTypeCode === 2;
});

// check update
const checkUpdate = () => {
  if (checkVal.value.length) {
    modelValue.value = checkVal.value.map((item) => ({
      questionId: props.data.questionId,
      caseId: item.caseId,
      answerSeq: item.caseSeq,
      subjectiveAnswer:
        item.caseContent === "기타"
          ? checkEtcVal.value[item.caseId] || ""
          : undefined,
      answerStatus: 1,
    }));
  } else {
    modelValue.value = [
      {
        questionId: props.data.questionId,
        answerStatus: 0,
      },
    ];
  }
};

// radio update
const radioUpdate = () => {
  modelValue.value = [
    {
      questionId: props.data.questionId,
      caseId: radioVal.value ? radioVal.value.caseId : undefined,
      answerSeq: radioVal.value ? radioVal.value.caseSeq : undefined,
      subjectiveAnswer:
        radioVal.value && radioVal.value.caseContent === "기타"
          ? radioEtcVal.value[radioVal.value.caseId] || ""
          : undefined,
      answerStatus: !radioVal.value ? 0 : 1,
    },
  ];
};

// text update
const textUpdate = () => {
  modelValue.value = [
    {
      questionId: props.data.questionId,
      subjectiveAnswer:
        typeof textVal.value === "string" && textVal.value.length
          ? textVal.value
          : undefined,
      answerStatus: !textVal.value ? 0 : 1,
    },
  ];
};

// watch
watch(
  modelValue,
  () => {
    if (isCheck.value) {
      const mV = props.data.caseList.filter(
        (item) =>
          modelValue.value.findIndex((mItem) => mItem.caseId === item.caseId) >
          -1,
      );

      if (JSON.stringify(mV) !== JSON.stringify(checkVal.value)) {
        checkVal.value = mV;

        const eV: SurveyEtc = {};

        modelValue.value.forEach((item) => {
          if (item.caseId && item.subjectiveAnswer) {
            eV[item.caseId] = item.subjectiveAnswer;
          }
        });

        checkEtcVal.value = eV;

        checkUpdate();
      }
    } else if (isRadio.value) {
      if (
        modelValue.value[0] &&
        !modelValue.value[0].caseId &&
        radioVal.value
      ) {
        radioVal.value = null;

        radioUpdate();
      } else if (
        modelValue.value[0] &&
        modelValue.value[0].caseId &&
        modelValue.value[0].caseId !== radioVal.value?.caseId
      ) {
        radioVal.value =
          props.data.caseList.find(
            (item) => item.caseId === modelValue.value[0].caseId,
          ) || null;

        if (modelValue.value[0].subjectiveAnswer) {
          radioEtcVal.value = {
            [modelValue.value[0].caseId]: modelValue.value[0].subjectiveAnswer,
          };
        }

        radioUpdate();
      }
    } else if (isText.value) {
      if (
        modelValue.value[0] &&
        modelValue.value[0].subjectiveAnswer !== textVal.value
      ) {
        textVal.value = modelValue.value[0].subjectiveAnswer;

        textUpdate();
      }
    }
  },
  {
    deep: true,
  },
);

// life cycle
onBeforeMount(() => {
  if (modelValue.value.length) {
    if (isCheck.value) {
      const mV = props.data.caseList.filter(
        (item) =>
          modelValue.value.findIndex((mItem) => mItem.caseId === item.caseId) >
          -1,
      );
      checkVal.value = mV;

      const eV: SurveyEtc = {};

      modelValue.value.forEach((item) => {
        if (item.caseId && item.subjectiveAnswer) {
          eV[item.caseId] = item.subjectiveAnswer;
        }
      });

      checkEtcVal.value = eV;
    } else if (isRadio.value) {
      radioVal.value =
        props.data.caseList.find(
          (item) => item.caseId === modelValue.value[0].caseId,
        ) || null;

      if (modelValue.value[0].caseId && modelValue.value[0].subjectiveAnswer) {
        radioEtcVal.value = {
          [modelValue.value[0].caseId]: modelValue.value[0].subjectiveAnswer,
        };
      }
    } else if (isText.value) {
      textVal.value = modelValue.value[0].subjectiveAnswer;
    }
  }

  if (isCheck.value) {
    checkUpdate();
  } else if (isRadio.value) {
    radioUpdate();
  } else if (isText.value) {
    textUpdate();
  }
});
</script>

<template>
  <li :class="{ off: disabled }">
    <span>{{ data.questionContents }}</span>

    <ContentsSurveyQuestionnaireCheckList
      v-if="isCheck"
      v-model="checkVal"
      v-model:etc="checkEtcVal"
      :data="data"
      :disabled="disabled"
      @update:model-value="checkUpdate"
      @update:etc="checkUpdate"
    />

    <ContentsSurveyQuestionnaireRadioList
      v-else-if="isRadio"
      v-model="radioVal"
      v-model:etc="radioEtcVal"
      :data="data"
      :disabled="disabled"
      @update:model-value="radioUpdate"
      @update:etc="radioUpdate"
    />

    <FormBasicInput
      v-else-if="isText"
      v-model="textVal"
      type="text"
      :title="data.questionContents"
      class="-ml-14 mt-[1.8rem]"
      :disabled="disabled"
      @update:model-value="textUpdate"
    />
  </li>
</template>
