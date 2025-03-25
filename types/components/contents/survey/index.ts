import type { LocationQueryValue } from "vue-router";
import type { SurveyAnswerRequestItem } from "@/types/api";

// query
export class SurveyQuery {
  id?: LocationQueryValue | LocationQueryValue[] | string | number;
  no?: LocationQueryValue | LocationQueryValue[] | string | number;
  c?: LocationQueryValue | LocationQueryValue[] | string | number;
  P1?: LocationQueryValue | LocationQueryValue[] | string | number;
  P2?: LocationQueryValue | LocationQueryValue[] | string | number;
}

// session
export class SurveySessionAnswer {
  questionId!: number;
  list!: SurveyAnswerRequestItem[];
}
export class SurveySessionSection {
  sectionId!: number;
  list!: SurveySessionAnswer[];
}
export class SurveySession {
  id!: number;
  status!: 0 | 1 | 2;
  // 0 : 로그인 필요 설문
  // 1 : query c 값 (암호화 고객키) 사용 설문
  // 2 : query P1, P2 값 (암호화 고객키, 충전소 번호) 사용 설문
  query?: SurveyQuery;
  answer?: SurveySessionSection[];
}

// 기타 v-model
export interface SurveyEtc {
  [id: number | string]: string;
}

// 답변 v-model
export interface SurveyAnswer {
  [questionId: number | string]: SurveyAnswerRequestItem[];
}

// 선행 질문 체크
export interface SurveyPrecedeCheck {
  [id: number | string]: boolean;
}
