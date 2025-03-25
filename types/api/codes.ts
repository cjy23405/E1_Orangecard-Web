// 공통코드 조회 - [B2C_NAU_034]
export class CodeListRequest {
  codeGroup!: string;
}
export class CodeListResponseItem {
  code!: string;
  codeNm!: string;
}
export type CodeListResponse = CodeListResponseItem[];
