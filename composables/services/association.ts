import { useQuery } from "@tanstack/vue-query";
import type {
  AssociationCategoryListRequest,
  AssociationCategoryListResponse,
  AssociationCardListRequest,
  AssociationCardListResponse,
  AssociationServiceListRequest,
  AssociationServiceListResponse,
  AssociationServiceDetailRequest,
  AssociationServiceDetailResponse,
} from "@/types/api";

// 제휴 카드 카테고리 목록 조회
export const useApiAssociationCardCategoryList = () => {
  const endpoint = useApiEndpoint("associationCategoryList");

  return useQuery({
    queryKey: ["associationCardCategoryList"],
    queryFn: () => {
      return $api<
        AssociationCategoryListRequest,
        AssociationCategoryListResponse
      >(endpoint, {
        body: {
          data: {
            categoryType: 0,
          },
        },
      });
    },
  });
};

// 제휴 서비스 카테고리 목록 조회
export const useApiAssociationServiceCategoryList = () => {
  const endpoint = useApiEndpoint("associationCategoryList");

  return useQuery({
    queryKey: ["associationServiceCategoryList"],
    queryFn: () => {
      return $api<
        AssociationCategoryListRequest,
        AssociationCategoryListResponse
      >(endpoint, {
        body: {
          data: {
            categoryType: 1,
          },
        },
      });
    },
  });
};

// 제휴 카드 조회
export const useApiAssociationCardList = () => {
  const endpoint = useApiEndpoint("associationCardList");

  return useQuery({
    queryKey: ["associationCardList"],
    queryFn: () => {
      return $api<AssociationCardListRequest, AssociationCardListResponse>(
        endpoint,
        {
          body: {
            data: {},
          },
        },
      );
    },
  });
};

// 제휴 서비스 목록 조회
export const useApiAssociationServiceList = () => {
  const endpoint = useApiEndpoint("associationServiceList");

  return useQuery({
    queryKey: ["associationServiceList"],
    queryFn: () => {
      return $api<
        AssociationServiceListRequest,
        AssociationServiceListResponse
      >(endpoint, {
        body: {
          data: {},
        },
      });
    },
  });
};

// 제휴 서비스 상세 조회
export const useApiAssociationServiceDetail = (
  data: AssociationServiceDetailRequest,
) => {
  const endpoint = useApiEndpoint("associationServiceDetail");

  return useQuery({
    queryKey: ["associationServiceDetail", data.partnershipServiceId],
    queryFn: () => {
      return $api<
        AssociationServiceDetailRequest,
        AssociationServiceDetailResponse
      >(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};
