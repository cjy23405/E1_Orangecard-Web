// 카카오 토큰 데이터
export class KakaoAuthToken {
  access_token!: string;
  expires_in!: number;
  refresh_token!: string;
  refresh_token_expires_in!: number;
  scope!: string;
  token_type!: string;
}

// 카카오 계정 데이터
export class KakaoAuthAccount {
  birthday!: string;
  birthday_needs_agreement!: boolean;
  birthday_type!: string;
  birthyear!: string;
  birthyear_needs_agreement!: boolean;
  ci!: string;
  ci_authenticated_at!: string;
  ci_needs_agreement!: boolean;
  email!: string;
  email_needs_agreement!: boolean;
  gender!: string;
  gender_needs_agreement!: boolean;
  has_birthday!: boolean;
  has_birthyear!: boolean;
  has_ci!: boolean;
  has_email!: boolean;
  has_gender!: boolean;
  has_phone_number!: boolean;
  is_email_valid!: boolean;
  is_email_verified!: boolean;
  is_leap_month!: boolean;
  name!: string;
  name_needs_agreement!: boolean;
  phone_number!: string;
  phone_number_needs_agreement!: boolean;
}

// 카카오 유저 데이터
export class KakaoAuthUser {
  connected_at!: string;
  id!: number;
  kakao_account!: KakaoAuthAccount;
  synched_at!: string;
}

// 카카오 동의 데이터
export class KakaoAuthAgreeItem {
  tag!: string;
  required!: boolean;
  agreed!: boolean;
  revocable!: boolean;
  agreed_at!: string;
  agreed_by!: string;
}
export class KakaoAuthAgree {
  id!: number;
  service_terms!: KakaoAuthAgreeItem[];
}

// 카카오 인증 데이터
export class KakaoAuthData {
  token!: KakaoAuthToken;
  user!: KakaoAuthUser;
  agree!: KakaoAuthAgree;
}
