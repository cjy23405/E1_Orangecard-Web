import { useMutation, useInfiniteQuery } from "@tanstack/vue-query";
import type { ContactAddRequest, ContactListResponse } from "@/types/api";

// 1:1 문의 등록
export const useApiContactAdd = (key: number | string = "") => {
  const endpoint = useApiEndpoint("contactAdd");

  return useMutation({
    mutationKey: ["contactAdd", key],
    mutationFn: (data: ContactAddRequest) => {
      return $api<ContactAddRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 1:1 문의 목록 조회
export const useApiContactList = () => {
  const endpoint = useApiEndpoint("contactList");

  return useInfiniteQuery({
    queryKey: ["contactList"],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 0 }) => {
      const data = await $api<unknown, ContactListResponse>(endpoint, {
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
    staleTime: 0,
  });
};
