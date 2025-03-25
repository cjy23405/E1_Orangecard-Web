// 1:1 문의 등록 - [B2C_VOC_001]
export class ContactAddRequest {
  srType!: string;
  title!: string;
  contents!: string;
  uniqueId!: string;
}

// 1:1 문의 목록 조회 - [B2C_VOC_002]
export class ContactListResponseItem {
  seq!: number;
  srId!: string;
  title!: string;
  contents!: string;
  srType!: string;
  statusCd!: "Open" | "Trans" | "Closed";
  statusNm!: "접수" | "이관" | "완료";
  openedDateTime!: string;
  replyContents!: string | null;
}
export type ContactListResponse = ContactListResponseItem[];
