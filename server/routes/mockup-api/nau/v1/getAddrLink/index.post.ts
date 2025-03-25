import type {
  Request,
  Response,
  AddressSearchRequest,
  AddressSearchResponse,
} from "@/types/api";

export default defineEventHandler(async (e) => {
  const request = await readBody<Request<AddressSearchRequest>>(e);
  const body: Response<AddressSearchResponse> = {
    header: {
      success: true,
      message: "정상",
      code: "C0010",
      result: null,
    },
    data: [
      {
        addr: "서울특별시 중구 덕수궁길 15 (서소문동)",
        addrJi: "서울특별시 중구 서소문동 37 서울시청 서소문별관",
        zipCode: "04515",
        sido: "서울특별시",
        gugun: "중구",
      },
      {
        addr: "서울특별시 중구 서소문로11길 24 (서소문동)",
        addrJi: "서울특별시 중구 서소문동 37 서울시청직장어린이집",
        zipCode: "04515",
        sido: "서울특별시",
        gugun: "중구",
      },
      {
        addr: "서울특별시 중구 세종대로 110 (태평로1가)",
        addrJi: "서울특별시 중구 태평로1가 31 서울특별시청",
        zipCode: "04524",
        sido: "서울특별시",
        gugun: "중구",
      },
      {
        addr: "서울특별시 중구 서소문로11길 24 (서소문동)",
        addrJi: "서울특별시 중구 서소문동 37 서울시청직장어린이집",
        zipCode: "04515",
        sido: "서울특별시",
        gugun: "중구",
      },
      {
        addr: "서울특별시 중구 세종대로 110 (태평로1가)",
        addrJi: "서울특별시 중구 태평로1가 31 서울특별시청",
        zipCode: "04524",
        sido: "서울특별시",
        gugun: "중구",
      },
    ],
    page: {
      pageNum: request.page?.pageNum ? request.page.pageNum + 1 : 1,
      pageSize: 5,
      sort: null,
      totalCount: 20,
    },
  };

  return body;
});
