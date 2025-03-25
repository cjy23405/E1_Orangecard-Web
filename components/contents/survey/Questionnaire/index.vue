<script setup lang="ts">
import type {
  SurveyAnswerRequest,
  SurveyQuestionResponseQuestion,
} from "@/types/api";
import type { AlertOptions } from "@/types/components/common/Alert";
import type {
  SurveyAnswer,
  SurveyPrecedeCheck,
  SurveySession,
  SurveySessionSection,
} from "@/types/components/contents/survey";

// uid
const uid = getCurrentInstance()?.uid;

// props
const props = withDefaults(
  defineProps<{
    id: number;
    no: number;
  }>(),
  {
    id: 0,
    no: 0,
  },
);

// session
const surveySession = useSessionStorage<string | null>("survey", null);
const etcInflow = useSessionStorage<string | null>("etcInflow", null);

// 스토어
const stores = {
  auth: useStoreAuth(),
};

// route
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();

// api
const { data, suspense } = useApiSurveyQuestion({
  surveyId: props.id,
});
const { mutate, isPending } = useApiSurveyAnswer(uid);

// api ssr
await suspense();

// state
const initLoad = ref(false);
const sessionData = ref<SurveySession>();
const answerVal = ref<SurveyAnswer>({});

// computed
const questionData = computed(() => {
  return data.value?.data || null;
});
const isAuthenticated = computed(() => {
  return stores.auth.isAuthenticated;
});
const nextValidation = computed(() => {
  let is = false;

  questionData.value?.sectionList[props.no].questionList.forEach((item) => {
    if (checkPrecede(item.questionId)) return;

    if (
      (item.isAnswerCheckYN === "Y" &&
        (!answerVal.value[item.questionId]?.length ||
          answerVal.value[item.questionId][0].answerStatus === 0)) ||
      !!answerVal.value[item.questionId]?.find(
        (item) =>
          typeof item.subjectiveAnswer === "string" &&
          !item.subjectiveAnswer.length,
      )
    ) {
      is = true;
    }
  });

  return !is;
});
const precedeCheck = computed(() => {
  const check: SurveyPrecedeCheck = {};

  questionData.value?.sectionList.forEach((section) => {
    section.conditionList.forEach((condition) => {
      const targetAnswer = answerVal.value[condition.targetQuestionId];
      check[condition.questionId] =
        !!targetAnswer &&
        !!targetAnswer.find((item) => item.caseId === condition.targetCaseId);
    });
  });

  return check;
});

// init
const init = () => {
  if (surveySession.value) {
    sessionData.value = JSON.parse(surveySession.value);
  }

  if (!sessionData.value || sessionData.value.id !== props.id) {
    // 세션 없거나 현재 아이디와 다르면 설문시작 화면으로
    router.replace({
      path: "/survey",
      query: {
        ...sessionData.value?.query,
        id: props.id,
      },
    });
    return;
  } else if (sessionData.value.status === 0 && !isAuthenticated.value) {
    // 로그인 필요한 설문인데 로그인 안되어있으면 로그인 화면으로
    etcInflow.value = route.fullPath;
    router.push(localePath("/etc/login"));
    return;
  }

  // 참여 유효성 체크 완료후 화면 렌더링
  if (!initLoad.value) {
    initLoad.value = true;
  }

  // 세션 불러오기
  if (
    sessionData.value &&
    sessionData.value.answer &&
    sessionData.value.answer[props.no]
  ) {
    const aV: SurveyAnswer = {};

    sessionData.value.answer[props.no].list.forEach((item) => {
      aV[item.questionId] = [...item.list];
    });

    answerVal.value = aV;
  } else {
    answerVal.value = {};
  }
};

// 상태 체크
const statusError = () => {
  router.replace(localePath(`/survey?id=${props.id}`));
};

// 세션데이터 저장
const saveSession = () => {
  if (!sessionData.value || !questionData.value) return;

  const answer = sessionData.value.answer ? [...sessionData.value.answer] : [];
  const id = questionData.value.sectionList[props.no].sectionId;
  const saveData: SurveySessionSection = {
    sectionId: id,
    list: questionData.value.sectionList[props.no].questionList.map((item) => ({
      questionId: item.questionId,
      list: answerVal.value[item.questionId] || [],
    })),
  };

  answer[props.no] = saveData;

  sessionData.value = {
    ...sessionData.value,
    answer,
  };

  surveySession.value = JSON.stringify(sessionData.value);
};

// 스크롤 리셋
const scrollReset = () => {
  if (window) {
    window.scrollTo(0, 0);
  }
};

// 이전 클릭
const prevClick = () => {
  if (isPending.value) return;

  saveSession();
  router.push(
    localePath(`/survey/questionnaire?id=${props.id}&no=${props.no - 1}`),
  );
  scrollReset();
};

// 다음 클릭
const nextClick = () => {
  if (!nextValidation.value) return;

  saveSession();

  const checkQuestionValidation = checkQuestionValidationCheck();

  if (!checkQuestionValidation.valid) {
    alertOpen({
      message: useT("alertMessage.033", [
        checkQuestionValidation.question?.questionContents,
        checkQuestionValidation.question?.answerMinCnt,
        checkQuestionValidation.question?.answerMaxCnt,
      ]),
    });

    return;
  }

  router.push(
    localePath(`/survey/questionnaire?id=${props.id}&no=${props.no + 1}`),
  );
  scrollReset();
};

// 완료 클릭
const submitClick = () => {
  if (isPending.value) return;

  saveSession();

  const submitValidation = submitValidationCheck();

  if (!submitValidation.valid) {
    alertOpen({
      message: useT("alertMessage.034", [
        submitValidation.question?.questionContents,
      ]),
      buttons: [
        {
          callback: (closeFn) => {
            closeFn();
            saveSession();
            router.push(
              localePath(
                `/survey/questionnaire?id=${props.id}&no=${submitValidation.sectionNo}`,
              ),
            );
            scrollReset();
          },
        },
      ],
    });

    return;
  }

  const checkQuestionValidation = checkQuestionValidationCheck();

  if (!checkQuestionValidation.valid) {
    alertOpen({
      message: useT("alertMessage.033", [
        checkQuestionValidation.question?.questionContents,
        checkQuestionValidation.question?.answerMinCnt,
        checkQuestionValidation.question?.answerMaxCnt,
      ]),
      buttons: [
        {
          callback: (closeFn) => {
            closeFn();
            router.push(
              localePath(
                `/survey/questionnaire?id=${props.id}&no=${checkQuestionValidation.sectionNo}`,
              ),
            );
            scrollReset();
          },
        },
      ],
    });

    return;
  }

  submitCall();
};

// 다중 선택 갯수 유효성 체크
const checkQuestionValidationCheck = (): {
  valid: boolean;
  sectionNo: number;
  question: SurveyQuestionResponseQuestion | null;
} => {
  let is = false;
  let sI = 0;
  let q: SurveyQuestionResponseQuestion | null = null;
  const answer = sessionData.value?.answer || [];

  questionData.value?.sectionList.forEach((section, n) => {
    section.questionList.forEach((item, i) => {
      if (checkPrecede(item.questionId)) return;

      if (
        !is &&
        answer[n] &&
        answer[n].list[i].list.length < item.answerMinCnt
      ) {
        is = true;
        sI = n;
        q = item;
      }
    });
  });

  return {
    valid: !is,
    sectionNo: sI,
    question: q,
  };
};

// 유효성 체크
const submitValidationCheck = (): {
  valid: boolean;
  sectionNo: number;
  question: SurveyQuestionResponseQuestion | null;
} => {
  let is = false;
  let sI = 0;
  let q: SurveyQuestionResponseQuestion | null = null;
  const answer = sessionData.value?.answer || [];

  questionData.value?.sectionList.forEach((section, n) => {
    section.questionList.forEach((item, i) => {
      if (checkPrecede(item.questionId)) return;

      if (
        !is &&
        item.isAnswerCheckYN === "Y" &&
        (!answer[n] ||
          !answer[n].list[i].list.length ||
          answer[n].list[i].list[0].answerStatus === 0)
      ) {
        is = true;
        sI = n;
        q = item;
      }
    });
  });

  return {
    valid: !is,
    sectionNo: sI,
    question: q,
  };
};

// 선행질문 여부 확인
const checkPrecede = (id: number) => {
  return typeof precedeCheck.value[id] === "boolean" && !precedeCheck.value[id];
};

// submit call
const submitCall = useDebounceFn(() => {
  if (!sessionData.value) return;

  let req: SurveyAnswerRequest | null = null;

  if (sessionData.value.query?.P1 && sessionData.value.query?.P2) {
    req = {
      surveyId: props.id,
      encryptedCustomerKey: String(sessionData.value.query.P1),
      stationId: Number(sessionData.value.query.P2),
      answerList: [],
    };
  } else if (sessionData.value.query?.c) {
    req = {
      surveyId: props.id,
      encryptedCustomerKey: String(sessionData.value.query?.c),
      answerList: [],
    };
  } else if (
    sessionData.value.status === 0 &&
    isAuthenticated.value &&
    stores.auth.loginInfo?.customerKey
  ) {
    req = {
      surveyId: props.id,
      customerKey: stores.auth.loginInfo.customerKey,
      answerList: [],
    };
  }

  if (req && sessionData.value.answer) {
    sessionData.value.answer.forEach((section) => {
      section.list.forEach((question) => {
        question.list.forEach((item) => {
          req.answerList.push(item);
        });
      });
    });

    mutate(req, {
      onSuccess: () => {
        surveySession.value = null;
        router.push(localePath(`/survey/done?id=${props.id}`));
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      },
    });
  }
}, 300);

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// watch
watch(
  () => props.no,
  () => {
    init();
  },
);
watch(precedeCheck, (n, o) => {
  if (JSON.stringify(n) !== JSON.stringify(o)) {
    const aV: SurveyAnswer = {};

    Object.keys(precedeCheck.value).forEach((key) => {
      if (!precedeCheck.value[key]) {
        aV[key] = [
          {
            questionId: Number(key),
            answerStatus: 0,
          },
        ];
      }
    });

    answerVal.value = {
      ...answerVal.value,
      ...aV,
    };
  }
});

// life cycle
onMounted(() => {
  init();
});
</script>

<template>
  <ContentsSurveyCheckStatus
    v-if="sessionData && initLoad"
    :id="id"
    :query="sessionData.query"
    :session-data="sessionData"
    @on-error="statusError"
  />
  <div
    v-if="
      sessionData && questionData && questionData.sectionList[no] && initLoad
    "
    id="surveyPageForm"
    class="pb-16"
  >
    <div class="inner px-8">
      <ul class="list-survey">
        <ContentsSurveyQuestionnaireItem
          v-for="item in questionData.sectionList[no].questionList"
          :key="item.questionId"
          v-model="answerVal[item.questionId]"
          :disabled="checkPrecede(item.questionId)"
          :data="item"
        />
      </ul>
    </div>

    <div class="btn-wrap border-top inner px-8 pt-8">
      <a
        v-if="no > 0"
        role="button"
        tabindex="0"
        class="btn-txt gray md:small"
        :aria-disabled="isPending"
        @click="prevClick"
        @keypress.enter.space="prevClick"
      >
        이전
      </a>

      <a
        v-if="no < questionData.sectionList.length - 1"
        role="button"
        tabindex="0"
        class="btn-txt primary md:small"
        :aria-disabled="!nextValidation"
        @click="nextClick"
        @keypress.enter.space="nextClick"
      >
        다음
      </a>

      <a
        v-else
        role="button"
        tabindex="0"
        class="btn-txt primary md:small"
        :aria-disabled="!nextValidation || isPending"
        @click="submitClick"
        @keypress.enter.space="submitClick"
      >
        설문 완료
      </a>
    </div>

    <CommonAlert ref="alertLayer" />
  </div>
</template>
