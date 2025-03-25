import type { BooleanYN } from "@/types/common";

// 카드 데이터
export class CardData {
  cardType!: "10" | "20" | "30";
  cardNum!: string;
  cardNm!: string;
  cprtCardCd!: "HC" | "IBK" | "KB" | "LC" | "WOORI" | null;
  cprtCardCdNm!: string;
  cprtCardItemCd!: "1" | "2" | null;
  cprtCardItemCdNm!: string | null;
  cprtCardYn!: BooleanYN;
  cardPwdYn!: BooleanYN;
  repCardYn!: BooleanYN | null;
  cardLoseDt!: string;
  cardRegDt!: string;
}

// 회원 보유 카드 목록 - [B2C_MBR_010]
export class CardListRequest {
  cardStatCd?: "10" | "20" | "30" | "40";
}
export type CardListResponse = CardData[];

// 회원 카드 비밀번호 변경 - [B2C_MBR_011]
export class CardResetPasswordRequest {
  cardPwOld?: string;
  cardPwNew!: string;
  changeCd!: "1" | "2";
}

// 회원 카드 등록 - [B2C_MBR_012]
export class CardAddRequest {
  cardNum!: string;
  cardType!: "10" | "20" | "30";
  cardPw?: string;
  registChannel!: "21" | "26" | "41" | "51";
  partnerCorporation!: string;
}

// 회원 카드 분실 신고 - [B2C_MBR_013]
export class CardLostRequest {
  cardNum!: string;
}

// 대표카드 설정 - [B2C_MBR_023]
export class CardRepRequest {
  cardNum!: string;
}

// 회원카드 비밀번호 유무 체크 - [B2C_MBR_025]
export class CardCheckPasswordResponse {
  pwState!: boolean;
}
