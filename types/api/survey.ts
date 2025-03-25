import type { BooleanYN } from "@/types/common";

// 설문조사 상태 조회 - [B2C_NAU_039]
export class SurveyCheckRequest {
  surveyId!: number;
  customerKey?: string;
  encryptedCustomerKey?: string;
  stationId?: number;
}

// 설문조사 상세 조회 - [B2C_NAU_040]
export class SurveyQuestionRequest {
  surveyId!: number;
}
export class SurveyQuestionResponseInfo {
  surveyId!: number;
  surveyTitle!: string;
  surveyStartDateTime!: string;
  surveyEndDateTime!: string;
  surveyInfoDetail!: string;
}
export class SurveyQuestionResponseSection {
  sectionId!: number;
  sectionSeq!: number;
  sectionTitle!: string;
  sectionImage!: string;
  sectionEtc!: string;
  questionList!: SurveyQuestionResponseQuestion[];
  conditionList!: SurveyQuestionResponsePrecede[];
}
export class SurveyQuestionResponseQuestion {
  questionId!: number;
  sectionId!: number;
  questionSeq!: number;
  questionTypeCode!: 1 | 2;
  questionContents!: string;
  isAnswerCheckYN!: BooleanYN;
  isPluralAnserYN!: BooleanYN;
  answerMaxCnt!: number;
  answerMinCnt!: number;
  displayAnswerColumn!: number;
  targetQuestionSeq!: number;
  targetQuestionContents!: string;
  targetCaseContent!: string;
  caseList!: SurveyQuestionResponseAnswer[];
}
export class SurveyQuestionResponseAnswer {
  caseId!: number;
  caseSeq!: number;
  questionId!: number;
  caseContent!: string;
  caseImage!: string;
}
export class SurveyQuestionResponsePrecede {
  conditionId!: number;
  questionId!: number;
  targetCaseId!: number;
  targetQuestionId!: number;
  questionSeq!: number;
  targetCaseSeq!: number;
  targetQuestionSeq!: number;
}
export class SurveyQuestionResponse {
  surveyInfo!: SurveyQuestionResponseInfo;
  sectionList!: SurveyQuestionResponseSection[];
}

// 설문조사 답변 저장 - [B2C_NAU_041]
export class SurveyAnswerRequestItem {
  questionId!: number;
  caseId?: number;
  answerSeq?: number;
  subjectiveAnswer?: string;
  answerStatus?: number;
}
export class SurveyAnswerRequest {
  surveyId!: number;
  customerKey?: string;
  encryptedCustomerKey?: string;
  stationId?: number;
  answerList!: SurveyAnswerRequestItem[];
}
