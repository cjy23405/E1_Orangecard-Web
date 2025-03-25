import { useQuery, useMutation } from "@tanstack/vue-query";
import type {
  SurveyCheckRequest,
  SurveyQuestionRequest,
  SurveyQuestionResponse,
  SurveyAnswerRequest,
} from "@/types/api";

// 설문조사 상태 조회 (정상이면 참여 가능)
export const useApiSurveyCheck = (key: number | string = "") => {
  const endpoint = useApiEndpoint("surveyCheck");

  return useMutation({
    mutationKey: ["surveyCheck", key],
    mutationFn: (data: SurveyCheckRequest) => {
      return $api<SurveyCheckRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 설문조사 상세 조회
export const useApiSurveyQuestion = (data: SurveyQuestionRequest) => {
  const endpoint = useApiEndpoint("surveyQuestion");

  return useQuery({
    queryKey: ["surveyQuestion"],
    queryFn: () => {
      return $api<SurveyQuestionRequest, SurveyQuestionResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 설문조사 답변 저장
export const useApiSurveyAnswer = (key: number | string = "") => {
  const endpoint = useApiEndpoint("surveyAnswer");

  return useMutation({
    mutationKey: ["surveyAnswer", key],
    mutationFn: (data: SurveyAnswerRequest) => {
      return $api<SurveyAnswerRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};
