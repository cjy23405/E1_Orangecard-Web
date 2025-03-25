import type { BooleanYN, ProfileDataCar } from "@/types/common";
import type { AddressData } from "@/types/components/form/Address";

// props
export type PropsType = "add" | "edit";
export type PropsAuthType = "PHONE" | "IPIN" | "KAKAO" | "NAVER";

// form
export interface ProfileFormCar extends ProfileDataCar {
  certifyYn?: BooleanYN;
}
export class ProfileForm {
  loginId: string = "";
  loginPw: string = "";
  loginPwCheck: string = "";
  name: string = "";
  cellPhone: string = "";
  cellPhoneCheck: boolean = false;
  birthday: string = "";
  email: string = "";
  gender: "F" | "M" | "" = "";
  address: AddressData | null = null;
  homePhone: string = "";
  marriedDt: string = "";
  carList: ProfileFormCar[] = [];
  agreePrivateOpt: BooleanYN = "N";
  agreeEmail: BooleanYN = "N";
  agreeSms: BooleanYN = "N";
  agreeBenefit: BooleanYN = "N";
  agreeTalk: BooleanYN = "N";
  agreeB8: BooleanYN | "" = "";
}

// marketing agree
export class MarketingAgree {
  B4!: boolean;
  email!: boolean;
  sms!: boolean;
  appPush!: boolean;
  talk!: boolean;
}
