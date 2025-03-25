// 티티 월페이퍼 조회 - [B2C_NAU_030]
export class WallpaperListResponseItem {
  wallpaperId!: number;
  wallpaperName!: string;
  imageUrlWeb!: string;
  imageUrlApp!: string;
}
export type WallpaperListResponse = WallpaperListResponseItem[];

// 티티 월페이퍼 다운로드 횟수 증가 - [B2C_NAU_031]
export class WallpaperDownloadCountRequest {
  wallpaperId!: number;
  downloadType!: "WEB" | "APP";
}
