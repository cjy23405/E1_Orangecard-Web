import { useQuery } from "@tanstack/vue-query";
import type {
  AgreementListRequest,
  AgreementListResponse,
  AgreementDetailRequest,
  AgreementDetailResponse,
} from "@/types/api";

// 약관 상세 목록 조회
export const useApiAgreementList = (data: AgreementListRequest) => {
  const endpoint = useApiEndpoint("agreementList");

  return useQuery({
    queryKey: ["agreementList", data.agreementType],
    queryFn: () => {
      return $api<AgreementListRequest, AgreementListResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 약관 상세 조회(단건)
export const useApiAgreementDetail = (data: AgreementDetailRequest) => {
  const endpoint = useApiEndpoint("agreementDetail");

  return useQuery({
    queryKey: ["agreementDetail", data.agreementId || data.agreementType],
    queryFn: () => {
      return $api<AgreementDetailRequest, AgreementDetailResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};
