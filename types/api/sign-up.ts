import type {
  SnsCode,
  SnsCodeLower,
  BooleanYN,
  ProfileData,
  ProfileDataCar,
} from "@/types/common";

// 회원가입 - [B2C_NAU_003]
export class SignUpBasicRequestTerms {
  termsCd!: string;
  termsYn!: BooleanYN;
}
export interface SignUpBasicRequest extends ProfileData {
  ciKey: string;
  certMethod: "10" | "20" | "30" | "40" | "50" | "60" | "70" | "90";
  authType: "I" | "H" | "KKO";
  loginId: string;
  loginPw?: string;
  name: string;
  birthday: string;
  foreignFlg?: "0" | "1";
  postLoc?: string;
  campaignNo?: string;
  terms?: SignUpBasicRequestTerms[];
  carInfoList?: ProfileDataCar[];
}
export class SignUpBasicResponse {
  loginId!: string;
}

// SNS 회원가입 - [B2C_NAU_004]
export interface SignUpSnsRequest extends SignUpBasicRequest {
  snsType: SnsCode;
  snsId: string;
}
export class SignUpSnsResponse {
  loginId!: string;
}

// 로그인 아이디 중복체크 - [B2C_NAU_008]
export class SignUpIdCheckRequest {
  loginId!: string;
}

// SNS 로그인 등록여부 체크 - [B2C_NAU_009]
export class SignUpSnsCheckRequest {
  snsType!: SnsCodeLower;
  snsId!: string;
}
export class SignUpSnsCheckResponse {
  loginId!: string;
  customerKey!: string;
}

// 휴대폰 번호인증 SMS 발송 - [B2C_NAU_021]
export class SignUpPhoneCheckCodeRequest {
  cellPhone!: string;
}
export class SignUpPhoneCheckCodeResponse {
  confirmNo!: string;
  message!: string;
  result!: string;
}

// CI 연동계정 여부 체크 - [B2C_NAU_022]
export class SignUpCiCheckRequest {
  ciKey!: string;
}
export class SignUpCiCheckResponseSns {
  snsType!: SnsCode;
  snsId!: string;
}
export class SignUpCiCheckResponseTerms {
  termsCd!: string;
  termsYn!: BooleanYN;
}
export class SignUpCiCheckResponse {
  loginId!: string;
  customerKey!: string;
  snsInfoList?: SignUpCiCheckResponseSns[];
  email?: string | null;
  zipCode?: string | null;
  sido?: string | null;
  gugun?: string | null;
  addr?: string | null;
  addrDtl?: string | null;
  addrJi?: string | null;
  homePhone?: string | null;
  agreeEmail?: BooleanYN | null;
  agreeSms?: BooleanYN | null;
  agreeStandard?: BooleanYN | null;
  agreeBenefit?: BooleanYN | null;
  agreeTalk?: BooleanYN | null;
  terms?: SignUpCiCheckResponseTerms[] | null;
}

// CI값으로 SNS연동 - [B2C_NAU_023]
export class SignUpConnectToCiRequest {
  snsType!: SnsCode;
  snsId!: string;
  ciKey!: string;
}

// 회원가입 약관 목록 조회 - [B2C_NAU_024]
export class SignUpTermsResponseItem {
  agreementId!: string;
  agreementType!: string;
  title!: string;
  required!: BooleanYN;
}
export type SignUpTermsResponse = SignUpTermsResponseItem[];
