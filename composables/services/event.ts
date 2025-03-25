import { useInfiniteQuery, useQuery, useMutation } from "@tanstack/vue-query";
import type {
  EventListRequest,
  EventListResponse,
  EventDetailRequest,
  EventDetailResponse,
  EventAnnouncementListResponse,
  EventAnnouncementDetailRequest,
  EventAnnouncementDetailResponse,
  EventCampaignEntryPermaLinkRequest,
  EventEntryPermaLinkRequest,
} from "@/types/api";

// 이벤트 목록 조회
export const useApiEventList = (
  data: EventListRequest,
  key: number | string = "",
) => {
  const endpoint = useApiEndpoint("eventList");

  return useInfiniteQuery({
    queryKey: ["eventList", key],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 0 }) => {
      const res = await $api<EventListRequest, EventListResponse>(endpoint, {
        body: {
          data,
          page: {
            pageNum: pageParam,
            pageSize: 10,
          },
        },
      });

      return res;
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

// 이벤트 상세 조회
export const useApiEventDetail = (data: EventDetailRequest) => {
  const endpoint = useApiEndpoint("eventDetail");

  return useQuery({
    queryKey: ["eventDetail", data.postingNo],
    queryFn: () => {
      return $api<EventDetailRequest, EventDetailResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 이벤트 당첨자 목록 조회
export const useApiEventAnnouncementList = () => {
  const endpoint = useApiEndpoint("eventAnnouncementList");

  return useInfiniteQuery({
    queryKey: ["eventAnnouncementList"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 0 }) => {
      const res = await $api<unknown, EventAnnouncementListResponse>(endpoint, {
        body: {
          data: {},
          page: {
            pageNum: pageParam,
            pageSize: 10,
          },
        },
      });

      return res;
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

// 이벤트 당첨자 상세 조회
export const useApiEventAnnouncementDetail = (
  data: EventAnnouncementDetailRequest,
) => {
  const endpoint = useApiEndpoint("eventAnnouncementDetail");

  return useQuery({
    queryKey: ["eventAnnouncementDetail", data.postingNo],
    queryFn: () => {
      return $api<
        EventAnnouncementDetailRequest,
        EventAnnouncementDetailResponse
      >(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 이벤트 배너 조회
export const useApiEventBannerList = () => {
  const endpoint = useApiEndpoint("eventList");

  return useQuery({
    queryKey: ["eventList", "banner"],
    queryFn: () => {
      return $api<EventListRequest, EventListResponse>(endpoint, {
        body: {
          data: {
            ongoingEvent: true,
          },
          page: {
            pageNum: 1,
            pageSize: 0,
          },
        },
      });
    },
  });
};

// PermaLink 캠페인 참여
export const useApiEventCampaignEntryPermaLink = (
  key: number | string = "",
) => {
  const endpoint = useApiEndpoint("entryPermaLinkCampaign");

  return useMutation({
    mutationKey: ["entryPermaLinkCampaign", key],
    mutationFn: (data: EventCampaignEntryPermaLinkRequest) => {
      return $api<EventCampaignEntryPermaLinkRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// PermaLink 이벤트 참여
export const useApiEventEntryPermaLink = (key: number | string = "") => {
  const endpoint = useApiEndpoint("entryPermaLinkEvent");

  return useMutation({
    mutationKey: ["entryPermaLinkEvent", key],
    mutationFn: (data: EventEntryPermaLinkRequest) => {
      return $api<EventEntryPermaLinkRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};
