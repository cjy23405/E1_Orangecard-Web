// 약관 상세 목록 조회 - [B2C_NAU_012]
export class AgreementListRequest {
  agreementType!: string;
}
export class AgreementListResponseItem {
  agreementId!: number;
  agreementType!: string;
  title!: string;
  revisionDate!: string;
  isLatest!: 0 | 1;
}
export type AgreementListResponse = AgreementListResponseItem[];

// 약관 상세 조회(단건) - [B2C_NAU_013]
export class AgreementDetailRequest {
  agreementId?: number;
  agreementType?: string;
}
export class AgreementDetailResponse {
  agreementId!: number;
  agreementType!: string;
  title!: string;
  revisionDate!: string;
  contents!: string;
  postYn!: 0 | 1;
  edpDateTime!: string;
  edpUserId!: string | null;
  chContents!: string;
  editUserId!: string | null;
  editDateTime!: string | null;
  chImageFileId!: string;
  clcContents!: string;
  clsContents!: string;
  psContents!: string;
  maContents!: string;
  clsmContents!: string | null;
  contentsMobile!: string;
  isLatest!: 0 | 1;
}
