import { useInfiniteQuery, useQuery } from "@tanstack/vue-query";
import type {
  NoticeListRequest,
  NoticeListResponse,
  NoticeDetailRequest,
  NoticeDetailResponse,
} from "@/types/api";

// 공지사항 목록 조회
export const useApiNoticeList = () => {
  const endpoint = useApiEndpoint("noticeList");

  return useInfiniteQuery({
    queryKey: ["noticeList"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 0 }) => {
      const data = await $api<NoticeListRequest, NoticeListResponse>(endpoint, {
        body: {
          data: {},
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
  });
};

// 공지사항 상세 조회
export const useApiNoticeDetail = (data: NoticeDetailRequest) => {
  const endpoint = useApiEndpoint("noticeDetail");

  return useQuery({
    queryKey: ["noticeDetail", data.postingNo],
    queryFn: () => {
      return $api<NoticeDetailRequest, NoticeDetailResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};
