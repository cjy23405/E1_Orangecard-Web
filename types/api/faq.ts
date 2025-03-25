// FAQ 카테고리 목록 조회 - [B2C_NAU_027]
export class FaqCategoryListResponseItem {
  seqNo!: number;
  typeName!: string;
  seqSort!: number;
  postFlag!: 0 | 1;
  activeCount!: number;
}
export type FaqCategoryListResponse = FaqCategoryListResponseItem[];

// FAQ 목록 조회 - [B2C_NAU_014]
export class FaqListRequest {
  faqTypeSeqNo?: number;
}
export class FaqListResponseItem {
  rnum!: string;
  faqSeqNo!: string;
  faqTypeSeqNo!: string;
  title!: string;
  contents!: string;
  typeName!: string;
}
export type FaqListResponse = FaqListResponseItem[];
