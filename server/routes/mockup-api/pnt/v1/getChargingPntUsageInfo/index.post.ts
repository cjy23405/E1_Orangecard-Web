import type {
  Request,
  Response,
  PointStationHistoryListRequest,
  PointStationHistoryListResponse,
} from "@/types/api";

export default defineEventHandler(async (e) => {
  const request = await readBody<Request<PointStationHistoryListRequest>>(e);
  const body: Response<PointStationHistoryListResponse> = {
    header: {
      success: true,
      message: "정상",
      code: "C0010",
      result: null,
    },
    data: {
      totalUsePnt: 15463,
      totalSavePnt: 788714,
      chargingStationPnt: 6541,
      chargingPntUsageList: [
        {
          stationNm: "충전소 이름",
          transactionDt: "2024-12-23 00:00:00",
          transactionTypeCd: "P",
          transactionTypeNm: "포인트적립",
          points: 1500,
        },
        {
          stationNm: "충전소 이름",
          transactionDt: "2024-12-23 00:00:00",
          transactionTypeCd: "C",
          transactionTypeNm: "포인트적립취소",
          points: 1500,
        },
        {
          stationNm: "충전소 이름",
          transactionDt: "2024-12-23 00:00:00",
          transactionTypeCd: "M",
          transactionTypeNm: "포인트사용",
          points: 1500,
        },
        {
          stationNm: "충전소 이름",
          transactionDt: "2024-12-23 00:00:00",
          transactionTypeCd: "C",
          transactionTypeNm: "포인트사용취소",
          points: 1500,
        },
        {
          stationNm: "충전소 이름",
          transactionDt: "2024-12-23 00:00:00",
          transactionTypeCd: "P",
          transactionTypeNm: "포인트적립",
          points: 1500,
        },
        {
          stationNm: "충전소 이름",
          transactionDt: "2024-12-23 00:00:00",
          transactionTypeCd: "P",
          transactionTypeNm: "포인트적립",
          points: 1500,
        },
        {
          stationNm: "충전소 이름",
          transactionDt: "2024-12-23 00:00:00",
          transactionTypeCd: "C",
          transactionTypeNm: "포인트적립취소",
          points: 1500,
        },
        {
          stationNm: "충전소 이름",
          transactionDt: "2024-12-23 00:00:00",
          transactionTypeCd: "M",
          transactionTypeNm: "포인트사용",
          points: 1500,
        },
        {
          stationNm: "충전소 이름",
          transactionDt: "2024-12-23 00:00:00",
          transactionTypeCd: "C",
          transactionTypeNm: "포인트사용취소",
          points: 1500,
        },
        {
          stationNm: "충전소 이름",
          transactionDt: "2024-12-23 00:00:00",
          transactionTypeCd: "P",
          transactionTypeNm: "포인트적립",
          points: 1500,
        },
      ],
    },
    page: {
      pageNum: request.page?.pageNum ? request.page.pageNum + 1 : 1,
      pageSize: 10,
      sort: null,
      totalCount: 20,
    },
  };

  return body;
});
