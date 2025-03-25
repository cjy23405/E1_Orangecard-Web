import type { SnsCode } from "@/types/common";
import type { KakaoAuthData, NaverAuthData } from "@/types/hooks";

// query
export class TitiTalkAuthQuery {
  sbsc_channel: "WCB" | "ACB" | "KCB" = "WCB";
  simple_sbsc_type: "CHATBOT" | "KAKAO" | "NAVER" = "CHATBOT";
  auth_type: "H" | "KAKAO" | "NAVER" = "H";
  service_type: string = "join";
  callback_url: string = "";
}

// hdnJsonData
export class TitiTalkAuthHdnJsonData {
  Result_Cd!: "S" | "F";
  Result_Message?: string;
  Member_Channel?: TitiTalkAuthQuery["sbsc_channel"] | "";
  Member_Channel_Detail?: "KAKAO" | "NAVER" | "";
  Member_Name?: string;
  Cellular_Phone?: string;
  Cellular_Phone_Mask?: string;
  Member_CI_Key?: string;
  BirthDay?: string;
  Foreign_Flg?: string;
  Sex_MF?: string;
  Ipin_Certification_Method?: "30" | "70" | "";
  SnsContType?: SnsCode | "";
  SNS_ID?: string;
}

// 인증 데이터 카카오
export class TitiTalkAuthDataKakao {
  type!: "KAKAO";
  data!: KakaoAuthData;
}

// 인증 데이터 네이버
export class TitiTalkAuthDataNaver {
  type!: "NAVER";
  data!: NaverAuthData;
}

// 인증 데이터 세션
export type TitiTalkAuthData = TitiTalkAuthDataKakao | TitiTalkAuthDataNaver;
