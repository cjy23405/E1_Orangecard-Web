import type { Response, PointChargeStationListResponse } from "@/types/api";

export default defineEventHandler(() => {
  const body: Response<PointChargeStationListResponse> = {
    header: {
      success: true,
      message: "정상",
      code: "C0010",
      result: null,
    },
    data: [
      {
        stationId: "1",
        stationNm: "1 충전소",
      },
      {
        stationId: "2",
        stationNm: "2 충전소",
      },
      {
        stationId: "3",
        stationNm: "3 충전소",
      },
      {
        stationId: "4",
        stationNm: "4 충전소",
      },
      {
        stationId: "5",
        stationNm: "5 충전소",
      },
    ],
  };

  return body;
});
