import { useQuery, useMutation } from "@tanstack/vue-query";
import type {
  WallpaperListResponse,
  WallpaperDownloadCountRequest,
} from "@/types/api";

// 티티 월페이퍼 조회
export const useApiWallpaperList = () => {
  const endpoint = useApiEndpoint("wallpaperList");

  return useQuery({
    queryKey: ["wallpaperList"],
    queryFn: () => {
      return $api<unknown, WallpaperListResponse>(endpoint, {
        body: {
          data: {},
        },
      });
    },
  });
};

// 티티 월페이퍼 다운로드 횟수 증가
export const useApiWallpaperDownloadCount = (key: number | string = "") => {
  const endpoint = useApiEndpoint("wallpaperDownloadCount");

  return useMutation({
    mutationKey: ["wallpaperDownloadCount", key],
    mutationFn: (data: WallpaperDownloadCountRequest) => {
      return $api<WallpaperDownloadCountRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};
