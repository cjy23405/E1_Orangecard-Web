import type { AddressSearchRequest, AddressSearchResponse } from "@/types/api";
import { useInfiniteQuery } from "@tanstack/vue-query";

// 주소검색
export const useApiAddressSearch = (
  key: number | string = "",
  keyword: Ref<string>,
) => {
  const endpoint = useApiEndpoint("addressSearch");

  return useInfiniteQuery({
    queryKey: ["addressSearch", key],
    enabled: false,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 0 }) => {
      const data = await $api<AddressSearchRequest, AddressSearchResponse>(
        endpoint,
        {
          body: {
            data: {
              keyword: keyword.value,
            },
            page: {
              pageNum: pageParam,
              pageSize: 5,
            },
          },
        },
      );

      return data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.page) {
        const total = Math.ceil((lastPage.page.totalCount || 0) / 5);
        const length = pages.length;
        return total === length ? null : length + 1;
      } else {
        return null;
      }
    },
  });
};
