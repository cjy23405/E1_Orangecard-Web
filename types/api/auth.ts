import type { FuelCode, LoginType, SnsCodeLower } from "@/types/common";

// 토큰 갱신 - [TOKEN_001]
export class TokenRequest {
  refreshToken!: string;
}
export class TokenResponse {
  accessToken!: string;
  refreshToken!: string;
}

// 로그인 정보
export class LoginInfoData {
  customerKey!: string;
  name!: string;
  mbrTypeCd!: string;
  memDivCd!: string;
  memDivEvtCd!: string | null;
  memDivFcevCd!: string | null;
  tierCd!: string;
  tierNm!: string;
  lTierCd!: string;
  lTierNm!: string;
  hTierCd!: string;
  hTierNm!: string;
  eTierCd!: string;
  eTierNm!: string;
  repFuelType!: FuelCode;
  repFuelTypeNm!: string;
  pwdChangeReq?: boolean;
}
export type LoginInfo = LoginInfoData | null;
export interface LoginResponseCommon extends LoginInfoData {
  accessToken: string;
  refreshToken: string;
}

// 로그인 - [B2C_NAU_001]
export class LoginRequest {
  loginId!: string;
  password!: string;
}
export type LoginResponse = LoginResponseCommon;

// SNS 로그인 - [B2C_NAU_002]
export class SnsLoginRequest {
  snsType!: SnsCodeLower;
  snsId!: string;
}
export type SnsLoginResponse = LoginResponseCommon;

// 로그아웃 - [B2C_NAU_007]
export class LogoutRequest {
  accessToken!: string;
}

// 회원 비밀번호 유효성 체크 - [B2C_MBR_015]
export class CheckPasswordRequest {
  password!: string;
}
export class CheckPasswordResponse {
  password!: string;
}

// 캡차정보조회 - [B2C_NAU_036]
export class CaptchaCodeResponse {
  base64Image!: string;
  hashedCaptcha!: string;
}

// 로그인 셋업
export class LoginSetup {
  type!: LoginType;
  data!: LoginResponse | SnsLoginResponse;
  callback?: (type: LoginType, data: LoginResponse | SnsLoginResponse) => void;
}

// 법인 회원 로그인 - [B2C_NAU_037]
export class CorpTaxiLoginRequest {
  cardNum!: string;
  cardPw!: string;
}
export class CorpTaxiLoginResponse {
  accessToken!: string;
  totalPnt!: number;
}
export type CorpTaxiLoginAuth = CorpTaxiLoginResponse | null;

// 로그인 실패 횟수 조회 - [B2C_NAU_038]
export class LoginFailCountRequest {
  loginId!: string;
}
export class LoginFailCountResponse {
  failCnt!: number;
}
