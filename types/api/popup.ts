import type { FuelCode } from "@/types/common";

// 팝업 컨텐츠 목록 조회 - [B2C_NAU_033]
export class PopupListRequest {
  fuelType?: FuelCode;
  customerKey?: string;
  memberGrade?: string;
  memberType?: string;
}
export class PopupListResponseItem {
  popupId!: number;
  popupType!: 1 | 2;
  popupTitle!: string;
  linkUrl!: string;
  linkTarget!: 0 | 1;
  imageUrl!: string;
  content!: string;
  sortNo!: number;
}
export type PopupListResponse = PopupListResponseItem[];
