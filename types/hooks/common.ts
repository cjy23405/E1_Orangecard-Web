import type {
  IpinAuthData,
  KakaoAuthData,
  NaverAuthData,
  PhoneAuthData,
} from "@/types/hooks";

// action
export type HookPopupMessageAction =
  | "onAuthPhoneResult"
  | "onAuthIpinResult"
  | "onAuthKakaoResult"
  | "onAuthNaverResult";

// self event
export type HookSelfGetDataEvent = MessageEvent<{
  action: HookPopupMessageAction;
  params: KakaoAuthData[] | NaverAuthData[] | PhoneAuthData[] | IpinAuthData[];
}>;
