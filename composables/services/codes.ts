import { useQuery } from "@tanstack/vue-query";
import type { CodeListRequest, CodeListResponse } from "@/types/api";

// 공통코드 조회
export const useApiCodeList = (data: CodeListRequest) => {
  const endpoint = useApiEndpoint("codeList");

  return useQuery({
    queryKey: ["codeList"],
    queryFn: () => {
      return $api<CodeListRequest, CodeListResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};
