<script setup lang="ts">
import type {
  SurveyQuery,
  SurveySession,
} from "@/types/components/contents/survey";

// props
const props = withDefaults(
  defineProps<{
    id: number;
    query?: SurveyQuery | null;
  }>(),
  {
    id: 0,
    query: null,
  },
);

// session
const surveySession = useSessionStorage<string | null>("survey", null);

// route
const localePath = useLocalePath();
const router = useRouter();

// api
const { data, suspense } = useApiSurveyQuestion({
  surveyId: props.id,
});

// api ssr
await suspense();

// state
const initLoad = ref<boolean>(false);
const statusCode = ref<string>();
const sessionData = ref<SurveySession>();

// computed
const questionData = computed(() => {
  return data.value?.data || null;
});

// init
const init = () => {
  if (surveySession.value) {
    sessionData.value = JSON.parse(surveySession.value);
  }
  initLoad.value = true;
};

// 상태 체크
const statusSuccess = (code: string, data: SurveySession) => {
  if (
    surveySession.value &&
    sessionData.value &&
    sessionData.value.id === props.id
  ) {
    router.push(localePath(`/survey/questionnaire?id=${props.id}&no=0`));
    return;
  }

  statusCode.value = code;
  sessionData.value = data;
};
const statusError = (code: string, data?: SurveySession) => {
  statusCode.value = code;

  if (/^(B0090|B0091)$/.test(code)) {
    surveySession.value = null;
  } else {
    sessionData.value = data;
  }
};

// 시작 클릭
const startClick = () => {
  if (sessionData.value) {
    surveySession.value = JSON.stringify(sessionData.value);
    router.push(localePath(`/survey/questionnaire?id=${props.id}&no=0`));
  }
};

// life cycle
onMounted(() => {
  init();
});
</script>

<template>
  <ContentsSurveyCheckStatus
    v-if="initLoad"
    :id="id"
    :query="query"
    :session-data="sessionData"
    @on-success="statusSuccess"
    @on-error="statusError"
  />
  <div
    v-if="questionData"
    id="surveyPage"
    class="flex min-h-[60vh] flex-1 flex-col px-8 pb-16 text-center"
  >
    <template v-if="statusCode">
      <div class="flex flex-1 flex-col justify-center pb-10">
        <p
          v-if="questionData?.surveyInfo.surveyTitle"
          class="fs-16 pt-40 font-bold text-primary"
          :class="{
            status0: statusCode === 'C0010' || statusCode === '_',
            status1: statusCode === 'B0090',
            status2: statusCode === 'B0091',
          }"
        >
          {{ questionData.surveyInfo.surveyTitle }}
        </p>

        <template v-if="statusCode === 'C0010' || statusCode === '_'">
          <p class="fs-16 mt-[1.6rem]">
            오렌지카드에 소중한 의견을 남겨주세요.
          </p>
          <p class="fs-14 mt-[1.6rem] text-gray-600">
            오카패밀리 여러분의<br />
            목소리에 항상 귀기울이겠습니다.
          </p>
        </template>

        <p v-else-if="statusCode === 'B0090'" class="fs-16 mt-[1.6rem]">
          설문 참여기간이 아닙니다.
        </p>

        <p v-else-if="statusCode === 'B0091'" class="fs-16 mt-[1.6rem]">
          참여 완료한 설문입니다.
        </p>
      </div>

      <div class="btn-wrap">
        <a
          v-if="(statusCode === 'C0010' || statusCode === '_') && sessionData"
          role="button"
          tabindex="0"
          class="btn-txt primary md:small"
          @click="startClick"
          @keypress.enter.space="startClick"
        >
          설문 참여
        </a>

        <NuxtLink v-else to="/" class="btn-txt primary md:small">
          오렌지카드 홈으로
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<style lang="css" scoped>
.status0 {
  background: url("@/assets/img/survey/img-survey0.png") no-repeat center top /
    8.4rem auto;
}
.status1 {
  background: url("@/assets/img/survey/img-survey1.png") no-repeat center top /
    8.4rem auto;
}
.status2 {
  background: url("@/assets/img/survey/img-survey2.png") no-repeat center top /
    8.4rem auto;
}
</style>
