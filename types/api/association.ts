import type { FuelCode } from "@/types/common";

// 제휴 카테고리 목록 조회 - [B2C_NAU_028]
export class AssociationCategoryListRequest {
  categoryType!: 0 | 1; // 0: 카드, 1: 서비스
}
export class AssociationCategoryListResponseItem {
  partnershipCategoryId!: number;
  categoryName!: string;
  sortNo!: number;
}
export type AssociationCategoryListResponse =
  AssociationCategoryListResponseItem[];

// 제휴 카드 조회 - [B2C_NAU_020]
export class AssociationCardListRequest {
  categoryId?: number;
}
export class AssociationCardListResponseItem {
  partnershipCardId!: string;
  entryUserID!: string;
  entryDateTime!: string;
  editUserID!: string;
  editDateTime!: string;
  cardName!: string;
  cardType!: string;
  fuelTypeList!: FuelCode[];
  imageUrl!: string;
  telephone!: string;
  linkUrlApp!: string;
  linkUrlWeb!: string;
  information!: string;
  postFlag!: string;
  sortNo!: string;
  partnershipCategoryId!: string;
  categoryName!: string;
}
export type AssociationCardListResponse = AssociationCardListResponseItem[];

// 제휴 서비스 목록 조회 - [B2C_NAU_029]
export class AssociationServiceListRequest {
  categoryId?: number;
}
export class AssociationServiceListResponseItem {
  partnershipServiceId!: string;
  serviceName!: string;
  fuelCode!: number;
  fuelTypeList!: FuelCode[];
  summary!: string;
  linkUrlList!: string;
  imageUrl!: string;
  displayType!: "0" | "1";
  content!: string;
  linkUrlDetail!: string;
  sortNo!: string;
  partnershipCategoryId!: string;
  categoryName!: string;
}
export type AssociationServiceListResponse =
  AssociationServiceListResponseItem[];

// 제휴 서비스 상세 조회 - [B2C_NAU_035]
export class AssociationServiceDetailRequest {
  partnershipServiceId!: string;
}
export class AssociationServiceDetailResponse {
  serviceName!: string;
  displayType!: "0" | "1";
  content!: string;
}
