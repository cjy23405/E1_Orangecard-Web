// 포인트 이용 내역 조회 - [B2C_PNT_002]
export class PointHistoryListRequest {
  searchType?: number;
  searchPeriodMonths?: number;
  startDt?: string;
  endDt?: string;
}
export class PointHistoryListResponseItem {
  franchiseNm!: string;
  transactionDt!: string;
  transactionTypeCd!: string;
  transactionTypeNm!: string;
  transactionDetail!: string;
  points!: number;
}
export class PointHistoryListResponse {
  totalUsePnt!: number;
  totalSavePnt!: number;
  pntUsageList!: PointHistoryListResponseItem[];
}

// 충전소 목록 조회 - [B2C_PNT_003]
export class PointChargeStationListResponseItem {
  stationId!: string;
  stationNm!: string;
}
export type PointChargeStationListResponse =
  PointChargeStationListResponseItem[];

// 충전소별 포인트 내역 조회 - [B2C_PNT_004]
export class PointStationHistoryListRequest {
  searchType?: number;
  stationId?: string;
  startDt?: string;
  endDt?: string;
}
export class PointStationHistoryListResponseItem {
  stationNm!: string;
  transactionDt!: string;
  transactionTypeCd!: "P" | "M" | "C";
  transactionTypeNm!: string;
  points!: number;
}
export class PointStationHistoryListResponse {
  totalUsePnt!: number;
  totalSavePnt!: number;
  chargingStationPnt!: number;
  chargingPntUsageList!: PointStationHistoryListResponseItem[];
}
