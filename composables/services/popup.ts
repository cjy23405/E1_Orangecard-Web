import { useQuery } from "@tanstack/vue-query";
import type { PopupListRequest, PopupListResponse } from "@/types/api";

// 팝업 컨텐츠 목록 조회
export const useApiPopupList = (data: PopupListRequest) => {
  const endpoint = useApiEndpoint("popupList");

  return useQuery({
    queryKey: ["popupList"],
    queryFn: () => {
      return $api<PopupListRequest, PopupListResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};
