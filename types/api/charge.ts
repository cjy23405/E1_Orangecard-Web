import type { FuelCode } from "@/types/common";

// 충전 내역 조회 - [B2C_MBR_021]
export class ChargeHistoryListRequest {
  fuelType?: FuelCode;
  searchPeriodMonths?: number;
  startDt?: string;
  endDt?: string;
}
export class ChargeHistoryListResponseItem {
  franchiseNm!: string;
  chargingPrice!: number;
  chargingQuantity!: number;
  transactionDt!: string;
  transactionTypeCd!: string;
  transactionTypeNm!: string;
  fuelType!: FuelCode;
  points!: number;
  tranDate!: string;
  tranSeq!: string;
  hasReceipt!: boolean;
}
export class ChargeHistoryListResponse {
  totalUsePnt!: number;
  totalSavePnt!: number;
  totalChargingQuantity!: number;
  totalChargingPrice!: number;
  chargingList!: ChargeHistoryListResponseItem[];
}
