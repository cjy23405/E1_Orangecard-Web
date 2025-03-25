<template>
  <div id="surveyPageForm" class="pb-16">
    <div class="inner px-8">
      <ul class="list-survey">
        <li
          v-for="(item, index) in surveyList"
          :key="index"
          :class="{ off: item.disabled }"
        >
          <span>{{ item.title }}</span>
          <radio-survey
            v-if="item.type === 'radio'"
            :item="item"
          ></radio-survey>
          <check-survey
            v-if="item.type === 'check'"
            :item="item"
          ></check-survey>
          <input-item
            v-if="item.type === 'input'"
            :id="item.id"
            :disabled="item.disabled"
            class="-ml-14 mt-[1.8rem]"
          ></input-item>
        </li>
      </ul>
    </div>
    <div class="btn-wrap border-top inner px-8 pt-8">
      <NuxtLink class="btn-txt gray md:small">이전</NuxtLink>
      <NuxtLink class="btn-txt primary md:small">다음</NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import RadioSurvey from "@/components/pub/Survey/RadioSurvey.vue";
import CheckSurvey from "@/components/pub/Survey/CheckSurvey.vue";
import InputItem from "@/components/pub/InputItem.vue";
interface surveyItem {
  title: string;
  type: string;
  twoline: boolean;
  answerList: answerItem[];
  disabled?: boolean;
  id?: string;
}
interface answerItem {
  id: string;
  label: string;
  useInput?: boolean;
  imgsrc?: string;
}
// 스토어
const stores = {
  layout: useStoreLayout(),
};
// 레이아웃 선택
definePageMeta({
  layout: "etc",
});

onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setUseFooter(false);
  stores.layout.$setUseHeaderLine(true);
});

const surveyList: surveyItem[] = [
  {
    title:
      "E1 캐릭터 티티굿즈를 사용해보셨나요?E1 캐릭터 티티굿즈를 사용해보셨나요?E1 캐릭터 티티굿즈를 사용해보셨나요?",
    type: "radio",
    twoline: true,
    answerList: [
      { id: "rd01-1", label: "예" },
      { id: "rd01-2", label: "아니오" },
    ],
  },
  {
    title: "티티 굿즈는 어떤 것을 사용해보셨나요?",
    type: "radio",
    twoline: true,
    answerList: [
      { id: "rd02-1", label: "방향제" },
      { id: "rd02-2", label: "담요" },
      { id: "rd02-3", label: "인형" },
      { id: "rd02-4", label: "골프공" },
      { id: "rd02-5", label: "기타", useInput: true },
    ],
    disabled: true,
  },
  {
    title: "티티 굿즈를 사용하지 않으셨다면, 그 이유는 무엇인가요?",
    type: "radio",
    twoline: true,
    answerList: [
      { id: "rd03-1", label: "파는곳을 모름" },
      { id: "rd03-2", label: "필요하지 않음" },
      { id: "rd03-3", label: "취향에 맞지 않음" },
      { id: "rd03-4", label: "비쌈" },
      { id: "rd03-5", label: "기타", useInput: true },
    ],
    disabled: true,
  },
  {
    title: "질문(단일선택형 – 1열/이미지없음)",
    type: "radio",
    twoline: false,
    answerList: [
      { id: "rd03-1", label: "답변1" },
      { id: "rd03-2", label: "답변2" },
    ],
  },
  {
    title: "질문(단일선택형 – 2열/이미지없음)",
    type: "radio",
    twoline: true,
    answerList: [
      { id: "rd04-1", label: "답변1" },
      { id: "rd04-2", label: "답변2" },
      { id: "rd04-3", label: "답변3" },
      { id: "rd04-4", label: "기타", useInput: true },
    ],
  },
  {
    title: "질문(단일선택형 – 1열/이미지있음)",
    type: "radio",
    twoline: false,
    answerList: [
      {
        id: "rd05-1",
        label: "답변1",
        imgsrc: "https://www.e1.co.kr/images/subpage/company_intro_img01.jpg",
      },
      {
        id: "rd05-2",
        label: "답변2",
        imgsrc: "https://www.e1.co.kr/images/subpage/company_intro_img01.jpg",
      },
      {
        id: "rd05-3",
        label: "기타",
        useInput: true,
      },
    ],
  },
  {
    title: "질문(단일선택형 – 2열/이미지있음)",
    type: "radio",
    twoline: true,
    answerList: [
      {
        id: "rd06-1",
        label: "답변1",
        imgsrc: "https://www.e1.co.kr/images/subpage/company_intro_img01.jpg",
      },
      {
        id: "rd06-2",
        label: "답변2",
        imgsrc: "https://www.e1.co.kr/images/subpage/company_intro_img01.jpg",
      },
      {
        id: "rd06-3",
        label: "답변3",
        imgsrc: "https://www.e1.co.kr/images/subpage/company_intro_img01.jpg",
      },
      {
        id: "rd06-4",
        label: "답변4",
        imgsrc: "https://www.e1.co.kr/images/subpage/company_intro_img01.jpg",
      },
      {
        id: "rd06-5",
        label: "기타",
        useInput: true,
      },
    ],
  },
  {
    title: "질문(다중선택형 – 1열/이미지없음)",
    type: "check",
    twoline: false,
    answerList: [
      { id: "chk07-1", label: "답변1" },
      { id: "chk07-2", label: "답변2" },
    ],
  },
  {
    title: "질문(다중선택형 – 2열/이미지없음)",
    type: "check",
    twoline: true,
    answerList: [
      { id: "chk08-1", label: "답변1" },
      { id: "chk08-2", label: "답변2" },
      { id: "chk08-3", label: "답변2" },
      { id: "chk08-4", label: "기타", useInput: true },
    ],
  },
  {
    title: "질문(주관식형)",
    type: "input",
    twoline: false,
    id: "ipt09",
    answerList: [],
  },
];
</script>
