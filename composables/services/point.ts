import type {
  PointHistoryListRequest,
  PointHistoryListResponse,
  PointChargeStationListResponse,
  PointStationHistoryListRequest,
  PointStationHistoryListResponse,
} from "@/types/api";
import { useQuery, useInfiniteQuery } from "@tanstack/vue-query";

// 포인트 이용 내역 조회
export const useApiPointHistoryList = (
  key: number | string = "",
  {
    searchType = undefined,
    searchPeriodMonths = undefined,
    startDt = undefined,
    endDt = undefined,
  }: {
    searchType?: Ref<PointHistoryListRequest["searchType"]>;
    searchPeriodMonths?: Ref<PointHistoryListRequest["searchPeriodMonths"]>;
    startDt?: Ref<PointHistoryListRequest["startDt"]>;
    endDt?: Ref<PointHistoryListRequest["endDt"]>;
  },
  isCorpTaxi: boolean = false,
) => {
  const keyName = isCorpTaxi ? "corpTaxiPointHistoryList" : "pointHistoryList";
  const endpoint = useApiEndpoint(keyName);

  return useInfiniteQuery({
    queryKey: [keyName, key],
    enabled: false,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 0 }) => {
      const data = await $api<
        PointHistoryListRequest,
        PointHistoryListResponse
      >(endpoint, {
        body: {
          data: {
            searchType: searchType?.value,
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

// 충전소 목록 조회
export const useApiPointChargeStationList = () => {
  const endpoint = useApiEndpoint("chargeStationList");

  return useQuery({
    queryKey: ["chargeStationList"],
    queryFn: () => {
      return $api<unknown, PointChargeStationListResponse>(endpoint, {
        body: {
          data: {},
        },
      });
    },
    staleTime: 0,
  });
};

// 충전소별 포인트 내역 조회
export const useApiPointStationPointHistoryList = (
  key: number | string = "",
  {
    searchType = undefined,
    stationId = undefined,
    startDt = undefined,
    endDt = undefined,
  }: {
    searchType?: Ref<PointStationHistoryListRequest["searchType"]>;
    stationId?: Ref<PointStationHistoryListRequest["stationId"]>;
    startDt?: Ref<PointStationHistoryListRequest["startDt"]>;
    endDt?: Ref<PointStationHistoryListRequest["endDt"]>;
  },
) => {
  const endpoint = useApiEndpoint("stationPointHistoryList");

  return useInfiniteQuery({
    queryKey: ["stationPointHistoryList", key],
    enabled: false,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 0 }) => {
      const data = await $api<
        PointStationHistoryListRequest,
        PointStationHistoryListResponse
      >(endpoint, {
        body: {
          data: {
            searchType: searchType?.value,
            stationId: stationId?.value,
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
