import type { FuelCode } from "@/types/common";

// 차량 조회 - [B2C_NAU_017]
export class CarSearchRequest {
  carNum!: string;
  name!: string;
}
export class CarSearchResponse {
  carNum!: string;
  carFuel!: FuelCode;
  carGbn!: string;
  carVendor!: string;
  carYear!: string;
  carModel!: string;
  distinctNumber!: string;
}
