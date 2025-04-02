import type { Response, LoginResponse } from "@/types/api";

export default defineEventHandler(() => {
  const body: Response<LoginResponse> = {
    header: {
      success: true,
      message: "정상",
      code: "C0010",
      result: null,
    },
    data: {
      accessToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzeXN0ZW1UeXBlIjoiYjJjIiwibWVtYmVySWQiOiJjankyMzQwNSIsImN1c3RvbWVyS2V5IjoiMjAwMDE3ODciLCJuYW1lIjoi7LaU7KCV7JewIiwibWVtRGl2Q2QiOiJQIiwicHdTdGF0ZSI6InRydWUiLCJodGllck5tIjoi7J2867CYIiwiZXRpZXJDZCI6Ik5PUiIsImh0aWVyQ2QiOiJOT1IiLCJsdGllckNkIjoiTk9SIiwiZXRpZXJObSI6IuydvOuwmCIsImx0aWVyTm0iOiLsnbzrsJgiLCJpYXQiOjE3MzcwOTA5NTQsImV4cCI6MTczNzA5Mjc1NH0.QjiO9_5S2-TU7BtXG5lAN97y7BrmYqG5_eMd-D0joco",
      refreshToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzeXN0ZW1UeXBlIjoiYjJjIiwibWVtYmVySWQiOiJjankyMzQwNSIsImN1c3RvbWVyS2V5IjoiMjAwMDE3ODciLCJuYW1lIjoi7LaU7KCV7JewIiwibWVtRGl2Q2QiOiJQIiwicHdTdGF0ZSI6InRydWUiLCJodGllck5tIjoi7J2867CYIiwiZXRpZXJDZCI6Ik5PUiIsImh0aWVyQ2QiOiJOT1IiLCJsdGllckNkIjoiTk9SIiwiZXRpZXJObSI6IuydvOuwmCIsImx0aWVyTm0iOiLsnbzrsJgiLCJpYXQiOjE3MzcwOTA5NTQsImV4cCI6MTczNzE3NzM1NH0.LL7BjZBuOegxEmQa8bgLhB6Q3cmvpjuqyn4NvDrR3RM",
      customerKey: "20001787",
      name: "추정연",
      mbrTypeCd: "10",
      memDivCd: "P",
      memDivEvtCd: null,
      memDivFcevCd: null,
      tierCd: "NOR",
      tierNm: "일반",
      repFuelType: "L",
      repFuelTypeNm: "LPG",
      hTierNm: "일반",
      eTierCd: "NOR",
      hTierCd: "NOR",
      lTierCd: "NOR",
      eTierNm: "일반",
      lTierNm: "일반",
      pwdChangeReq: false,
    },
  };

  return body;
});
