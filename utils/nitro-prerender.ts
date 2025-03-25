import { plainToClass } from "class-transformer";
import t from "../i18n/locales/ko.json";
import pkg from "../package.json";
import { ApiEndpoint, getEndpoint } from "../composables/services/_endpoints";
import { ApiError } from "../types/api";
import type {
  Request,
  Response,
  NoticeListRequest,
  NoticeListResponse,
  AssociationServiceListRequest,
  AssociationServiceListResponse,
  EventListRequest,
  EventListResponse,
  EventAnnouncementListResponse,
} from "../types/api";

// is dev
const isDev =
  (process.env.IS_DEV || String(process.env.NODE_ENV === "development")) ===
  "true";

// API Fetch
export const callApi = async <TReq = unknown, TRes = unknown>(
  endpoint: ApiEndpoint | null,
  options?: {
    body?: Request<TReq>;
  } & Omit<RequestInit, "body">,
) => {
  // 엔드포인트 없으면 에러
  if (!endpoint) {
    const error = new ApiError(t.apiErrorMessage["001"], {
      header: {
        message: "API Error",
      },
    });

    throw error;
  }

  const { apiNo, path, useMockup } = plainToClass(ApiEndpoint, endpoint);
  const apiBaseURL = process.env.API_BASE_URL;
  const appVer = pkg.version;
  const pageNm = isDev ? "Dev Build" : "Release Build";

  // 목업을 안쓸건데 API URL 세팅도 안되어 있으면 에러
  if (!useMockup && !apiBaseURL) {
    const error = new ApiError(t.apiErrorMessage["002"], {
      header: {
        message: "API Error",
      },
    });

    throw error;
  }

  // 목업 쓸거면 목업 url 아니면 실 api url
  const requestURL = useMockup ? `/mockup-api${path}` : apiBaseURL + path;

  // fetch
  const apiFetch = () => {
    return fetch(requestURL, {
      method: "POST",
      ...options,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        ...options?.headers,
      },
      body: JSON.stringify({
        header: {
          appVer,
          apiNo,
          osType: "W",
          pageNm,
          ...options?.body?.header,
        },
        data: options?.body?.data,
        page: options?.body?.page,
      }),
    });
  };

  const res = await apiFetch().catch(() => {
    console.log(`error from prerendering: ${requestURL}`);
  });
  const data: Response<TRes> = await res?.json().catch(() => {
    console.log(`error from json parsing: ${requestURL}`);
  });

  // api 에서 내려주는 에러 처리
  if (data?.header?.success === false) {
    const error = new ApiError<Response<TRes>>(
      `[${data?.header?.code}] ${data?.header?.message}`,
      data,
    );

    throw error;
  }

  // api 가 내려주지 않은 에러 처리
  if (data && res && !res.ok) {
    const error = new ApiError(t.apiErrorMessage["003"], {
      header: {
        message: "API Error",
      },
    });

    throw error;
  }

  // 정상 처리 된 데이터 반환
  return data;
};

// 제휴 서비스 목록 조회
export const getAssociationServiceList = () => {
  const endpoint = getEndpoint("associationServiceList");
  return callApi<AssociationServiceListRequest, AssociationServiceListResponse>(
    endpoint,
    {
      body: {
        data: {},
      },
    },
  );
};

// 이벤트 목록 조회
export const getEventList = (data: EventListRequest) => {
  const endpoint = getEndpoint("eventList");
  return callApi<EventListRequest, EventListResponse>(endpoint, {
    body: {
      data,
      page: {
        pageNum: 1,
        pageSize: 0,
      },
    },
  });
};

// 이벤트 당첨자 목록 조회
export const getEventAnnouncementList = () => {
  const endpoint = getEndpoint("eventAnnouncementList");
  return callApi<unknown, EventAnnouncementListResponse>(endpoint, {
    body: {
      data: {},
      page: {
        pageNum: 1,
        pageSize: 0,
      },
    },
  });
};

// 공지사항 목록 조회
export const getNoticeList = () => {
  const endpoint = getEndpoint("noticeList");
  return callApi<NoticeListRequest, NoticeListResponse>(endpoint, {
    body: {
      data: {},
      page: {
        pageNum: 1,
        pageSize: 0,
      },
    },
  });
};
