import { useQuery } from "@tanstack/vue-query";
import type {
  FaqCategoryListResponse,
  FaqListRequest,
  FaqListResponse,
} from "@/types/api";

// FAQ 카테고리 목록 조회
export const useApiFaqCategoryList = () => {
  const endpoint = useApiEndpoint("faqCategoryList");

  return useQuery({
    queryKey: ["faqCategoryList"],
    queryFn: () => {
      return $api<unknown, FaqCategoryListResponse>(endpoint, {
        body: {
          data: {},
        },
      });
    },
  });
};

// FAQ 목록 조회
export const useApiFaqList = () => {
  const endpoint = useApiEndpoint("faqList");

  return useQuery({
    queryKey: ["faqList"],
    queryFn: () => {
      return $api<FaqListRequest, FaqListResponse>(endpoint, {
        body: {
          data: {},
          page: {
            pageNum: 1,
            pageSize: 0,
          },
        },
      });
    },
  });
};
