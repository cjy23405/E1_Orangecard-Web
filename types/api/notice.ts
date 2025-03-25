import type { FuelCode, BooleanYN } from "@/types/common";

// 공지사항 목록 조회 - [B2C_NAU_015]
export class NoticeListRequest {
  fuelType?: FuelCode;
}
export class NoticeListResponseItem {
  rnum!: number;
  postingNo!: number;
  title!: string;
  entryDateTime!: string;
  pinYn!: BooleanYN;
}
export type NoticeListResponse = NoticeListResponseItem[];

// 공지사항 상세 조회 - [B2C_NAU_016]
export class NoticeDetailRequest {
  postingNo!: number;
}
export class NoticeDetailResponse {
  postingNo!: number;
  title!: string;
  contents!: string;
  fileName!: string;
  file!: string;
  attFileSize!: string | null;
  entryDateTime!: string;
}
