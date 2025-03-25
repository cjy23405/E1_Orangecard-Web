import { useMutation } from "@tanstack/vue-query";
import type { CarSearchRequest, CarSearchResponse } from "@/types/api";

// 차량 조회
export const useApiCarSearch = (key: number | string = "") => {
  const endpoint = useApiEndpoint("carSearch");

  return useMutation({
    mutationKey: ["carSearch", key],
    mutationFn: (data: CarSearchRequest) => {
      return $api<CarSearchRequest, CarSearchResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};
