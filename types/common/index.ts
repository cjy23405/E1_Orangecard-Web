// fuel code
export type FuelCode = "L" | "E" | "H" | undefined;

// fuel list
export class FuelListData {
  code!: FuelCode;
  name!: string;
}
export type FuelList = FuelListData[];

// sns code
export type SnsCode = "KAKAO" | "NAVER" | "APPLE";
export type SnsCodeLower = "kakao" | "naver" | "apple";

// Y or N
export type BooleanYN = "Y" | "N";

// 로그인 방식
export type LoginType = SnsCode | "PASSWORD" | null;

// 차량등록경로
export type CarRegLoc = "OP" | "OH" | "CB" | "CS";

// 서비스 점검 안내
export class MaintenanceDataItem {
  inspectionName!: string;
  inspectionContent!: string;
  inspectionStartDateTime!: string;
  inspectionEndDateTime!: string;
  postYn!: BooleanYN;
  edpDateTime!: string;
  userID!: string;
}
export type MaintenanceData = MaintenanceDataItem[];

// 회원정보 입력/수정
export class ProfileData {
  cellPhone?: string;
  email?: string;
  gender?: "F" | "M";
  zipCode?: string;
  sido?: string;
  gugun?: string;
  addr?: string;
  addrJi?: string;
  addrDtl?: string;
  homePhone?: string;
  marriedDt?: string;

  agreeEmail?: BooleanYN;
  agreeSms?: BooleanYN;
  agreeStandard?: BooleanYN;
  agreeBenefit?: BooleanYN;
  agreeTalk?: BooleanYN;
}
export class ProfileDataCar {
  crudType: "C" | "U" | "D" | "" = "C";
  carRegServiceType: "JOIN" | "" = "";
  carRepCarYn: BooleanYN = "N";
  carRegLoc: CarRegLoc = "OH";

  carNum: string = "";
  carFuelType: FuelCode = "L";
  carGbn: string = "";
  carMakr: string = "";
  carMkngYy: string = "";
  carModel: string = "";
  distinctNumber?: string = "";

  carRid?: string;
  connectorType?: string;
}
