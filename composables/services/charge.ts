import type {
  ChargeHistoryListRequest,
  ChargeHistoryListResponse,
} from "@/types/api";
import { useInfiniteQuery } from "@tanstack/vue-query";

// 충전 내역 조회
export const useApiChargeHistoryList = (
  key: number | string = "",
  {
    fuelType = undefined,
    searchPeriodMonths = undefined,
    startDt = undefined,
    endDt = undefined,
  }: {
    fuelType?: Ref<ChargeHistoryListRequest["fuelType"]>;
    searchPeriodMonths?: Ref<ChargeHistoryListRequest["searchPeriodMonths"]>;
    startDt?: Ref<ChargeHistoryListRequest["startDt"]>;
    endDt?: Ref<ChargeHistoryListRequest["endDt"]>;
  },
) => {
  const endpoint = useApiEndpoint("chargeHistoryList");

  return useInfiniteQuery({
    queryKey: ["chargeHistoryList", key],
    enabled: false,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 0 }) => {
      const data = await $api<
        ChargeHistoryListRequest,
        ChargeHistoryListResponse
      >(endpoint, {
        body: {
          data: {
            fuelType: fuelType?.value,
            searchPeriodMonths: searchPeriodMonths?.value,
            startDt: startDt?.value,
            endDt: endDt?.value,
          },
          page: {
            pageNum: pageParam,
            pageSize: 10,
          },
        },
      });

      return data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.page) {
        const total = Math.ceil((lastPage.page.totalCount || 0) / 10);
        const length = pages.length;
        return total === length ? null : length + 1;
      } else {
        return null;
      }
    },
    staleTime: 0,
  });
};
