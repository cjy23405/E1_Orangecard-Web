import type { BooleanYN } from "@/types/common";
import type {
  NaverAuthData,
  KakaoAuthData,
  PhoneAuthData,
  IpinAuthData,
  KakaoAuthUser,
  KakaoAuthAgree,
  KakaoAuthToken,
} from "@/types/hooks";
import type {
  SignUpCiCheckResponse,
  SignUpSnsCheckResponse,
} from "@/types/api";

// 비밀번호 확인 세션 카카오
export class SessionPasswordKakao {
  type!: "KAKAO";
  data!: KakaoAuthData;
}

// 비밀번호 확인 세션 네이버
export class SessionPasswordNaver {
  type!: "NAVER";
  data!: NaverAuthData;
}

// 비밀번호 확인 세션 패스워드
export class SessionPasswordPassword {
  type!: "PASSWORD";
}

// 비밀번호 확인 세션
export type SessionPassword =
  | SessionPasswordKakao
  | SessionPasswordNaver
  | SessionPasswordPassword;

// 본인인증 세션 휴대폰
export class SessionAuthPhone {
  type!: "PHONE";
  data!: PhoneAuthData;
}

// 본인인증 세션 아이핀
export class SessionAuthIpin {
  type!: "IPIN";
  data!: IpinAuthData;
}

// 본인인증 세션
export type SessionAuth = SessionAuthPhone | SessionAuthIpin;

// 회원 가입 세션 동의
export class SessionSignUpAgree {
  [key: string]: BooleanYN;
  B4!: BooleanYN;
  email!: BooleanYN;
  sms!: BooleanYN;
  appPush!: BooleanYN;
  talk!: BooleanYN;
}

// 회원 가입 세션 카카오 데이터
export class SessionSignUpKakaoData {
  token!: KakaoAuthToken;
  user!: KakaoAuthUser;
  agree?: KakaoAuthAgree;
  ciCheck?: SignUpCiCheckResponse;
  snsCheck?: SignUpSnsCheckResponse;
}

// 회원 가입 세션 네이버 데이터
export class SessionSignUpNaverData {
  snsId!: string;
  auth!: PhoneAuthData;
}

// 회원 가입 세션 휴대폰
export class SessionSignUpPhone {
  type!: "PHONE";
  data!: PhoneAuthData;
  agree?: SessionSignUpAgree;
  completeId?: string;
}

// 회원 가입 세션 아이핀
export class SessionSignUpIpin {
  type!: "IPIN";
  data!: IpinAuthData;
  agree?: SessionSignUpAgree;
  completeId?: string;
}

// 회원 가입 세션 카카오
export class SessionSignUpKakao {
  type!: "KAKAO";
  data!: SessionSignUpKakaoData;
  enterId?: string;
  completeId?: string;
  fromLogin?: boolean;
  fromEnterId?: boolean;
  fromVerifyPhone?: boolean;
}

// 회원 가입 세션 네이버
export class SessionSignUpNaver {
  type!: "NAVER";
  data?: SessionSignUpNaverData;
  agree?: SessionSignUpAgree;
  completeId?: string;
  loginId?: string;
}

// 회원 가입 세션
export type SessionSignUp =
  | SessionSignUpPhone
  | SessionSignUpIpin
  | SessionSignUpKakao
  | SessionSignUpNaver;

// 아이디, 비밀번호찾기 세션
export class SessionForgot {
  loginId!: string;
}

// 카드분실신고 세션
export class SessionCardLost {
  cardNum!: string;
}
