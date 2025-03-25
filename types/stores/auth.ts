import type { LoginType } from "@/types/common";
import type { CorpTaxiLoginAuth, LoginInfo } from "@/types/api";

// 법인 택시 아이디
export type CorpTaxiId = [string, string, string, string] | null;

// 로컬 스토리지 저장 하는 스토어
export class AuthLocalStorageStores {
  id?: string;
  corpTaxiId?: CorpTaxiId;
}

// 쿠키 저장 하는 스토어
export class AuthCookiesStores {
  accessToken?: string;
  refreshToken?: string;
  timestamp?: number;
  loginInfo?: LoginInfo | null;
  loginType?: LoginType | null;
  kakaoRefreshToken?: string;
  corpTaxi?: CorpTaxiLoginAuth | null;
  corpTaxiTimestamp?: number;
}
