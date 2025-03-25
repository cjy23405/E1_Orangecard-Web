import type {
  FuelCode,
  SnsCode,
  SnsCodeLower,
  BooleanYN,
  ProfileData,
  ProfileDataCar,
  CarRegLoc,
} from "@/types/common";

// 회원 정보 조회 - [B2C_MBR_001]
export class MyProfileResponse {
  customerKey!: string;
  ciKey!: string;
  loginId!: string;
  name!: string;
  mbrTypeCd!: string;
  memDivCd!: string;
  birthDay!: string;
  mainStnFuelType!: FuelCode;
  mainStnId!: string;
  mainStnNm!: string;
  pwStatus!: boolean;
  pntUsePw!: string | null;
  cardPwLockYn!: BooleanYN;
  mobileCardNo!: string | null;
  tierCd!: string;
  tierNm!: string;
  tierBaseLiter!: string;
  repFuelType!: FuelCode;
  repFuelTypeNm!: string;
  ocaPaySendTgtYn!: BooleanYN;
  selfChargingYn!: BooleanYN;
  appDownlYn!: BooleanYN;
  appDownlDt!: string | null;
  lTierCd!: string;
  lTierNm!: string;
  hTierCd!: string;
  hTierNm!: string;
  eTierCd!: string;
  eTierNm!: string;

  cellPhone!: string;
  email!: string;
  gender!: "F" | "M" | null;
  zipCode!: string | null;
  sido!: string | null;
  gugun!: string | null;
  addr!: string | null;
  addrJi!: string | null;
  addrDtl!: string | null;
  homePhone!: string;
  marriedDt!: string | null;

  agreeEmail!: BooleanYN;
  agreeEmailDt!: string | null;
  agreeSms!: BooleanYN;
  agreeSmsDt!: string | null;
  agreeStandard!: BooleanYN;
  agreeStandardDt!: string | null;
  agreeBenefit!: BooleanYN;
  agreeBenefitDt!: string | null;
  agreeTalk!: BooleanYN;
  agreeTalkDt!: string | null;
  agreePrivateOpt!: BooleanYN;
  agreePrivateOptDt!: string | null;
  agreeUseterms!: BooleanYN;
  agreeUsetermsDt!: string | null;
  agreePrivate!: BooleanYN;
  agreePrivateDt!: string | null;
  agreeMktDt!: string | null;
  agreeMyInfoDev!: BooleanYN;
  agreeMyInfoDevDt!: string | null;
  agreeAutoRdm!: BooleanYN;
  agreeAutoRdmDt!: string | null;
  agreeLocation!: BooleanYN;
  agreeIparkInfoPrv!: BooleanYN;
  agreeIparkInfoPrvDt!: string | null;
}

// 회원 정보 수정 - [B2C_MBR_004]
export interface MyProfileEditRequest extends ProfileData {
  agreePrivateOpt?: BooleanYN;
  password?: string;
  carList?: ProfileDataCar[];
}
export class MyProfileEditResponse {
  marketingStatusMsg?: string;
}

// 회원명 변경 - [B2C_MBR_005]
export class MyRenameRequest {
  ciKey!: string;
  newName!: string;
}

// 비밀번호 변경 - [B2C_MBR_002]
export class MyNewPasswordRequest {
  password!: string;
}

// SNS 연결 설정 - [B2C_MBR_006]
export class MySnsLinkRequest {
  snsType!: SnsCode;
  snsId!: string;
  snsStat!: BooleanYN;
  withdrawMbrYn!: BooleanYN;
  accessToken?: string;
}

// 회원 탈퇴 정보 조회 - [B2C_MBR_007]
export class MyDeleteAccountInfoResponse {
  mainStation!: string | null;
  stationPnt!: number;
  totalPnt!: number;
  chargeOnlyPnt!: number;
  e1WashSubscribeTickets!: number;
  e1WashSingleTickets!: number;
  e1WashMemberYn!: BooleanYN;
}

// 회원 탈퇴 - [B2C_MBR_008]
export class MyDeleteAccountRequest {
  ciKey!: string;
}

// 회원 SNS 연결정보 목록 - [B2C_MBR_009]
export class MySnsListResponseItem {
  snsType!: SnsCodeLower;
  snsId!: string;
  editDateTime!: string;
}
export type MySnsListResponse = MySnsListResponseItem[];

// 차량 등록, 수정, 삭제 - [B2C_MBR_018]
export type MyCarEditRequest = Partial<ProfileDataCar>;

// 차량목록 조회 - [B2C_MBR_020]
export class MyCarListResponseItem {
  carRid!: string;
  carRegLoc!: CarRegLoc;
  carFuelType!: FuelCode;
  carFuelTypeNm!: string;
  carNum!: string;
  carGbn!: string;
  carMakr!: string;
  carMakrNm!: string;
  carModel!: string;
  carMkngYy!: string;
  carRepCarYn!: BooleanYN;
  evtConnector!: string;
  evtConnectorNm!: string;
  certifyYn!: BooleanYN;
  distinctNumber!: string;
}
export type MyCarListResponse = MyCarListResponseItem[];

// 회원 비밀번호 유무 체크 - [B2C_MBR_024]
export class MyPasswordStateResponse {
  pwState!: boolean;
}

// 주유 이벤트 정보 - [B2C_EVT_015]
export class MyChargeInfoRequest {
  fuelType!: FuelCode | "A";
}
export class MyChargeInfoResponseItem {
  month!: string;
  monthAccLiter!: number;
  fuelType!: FuelCode;
  fuelTypeNm!: string;
  excTierQty!: string;
  tierCd!: string;
  tierNm!: string;
}
export type MyChargeInfoResponse = MyChargeInfoResponseItem[];

// 회원 포인트 정보 조회 - [B2C_PNT_001]
export class MyPointInfoResponse {
  totalPnt!: number;
  chargeOnlyPnt!: number;
  expiringPnt!: number;
  stationPoint!: number;
}

// 설정 정보 저장 - [B2C_SET_002]
export class MyAgreeEditRequest {
  agreeStandard?: BooleanYN;
  agreeBenefit?: BooleanYN;
  agreeSms?: BooleanYN;
  agreeEmail?: BooleanYN;
  agreeTalk?: BooleanYN;
  agreeLocation?: BooleanYN;
  agreePrivateOpt?: BooleanYN;
}
export class MyAgreeEditResponse {
  marketingStatusMsg!: string;
}

// 티티톡 정보 암호화 처리 - [B2C_MBR_032]
export class MyEncodeCustomerKeyResponse {
  mem_id!: string;
}
