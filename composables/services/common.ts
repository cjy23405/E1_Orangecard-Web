import { plainToClass } from "class-transformer";
import { ApiError } from "@/types/api";
import type { Request, Response, ResponseError } from "@/types/api";
import { ApiEndpoint, getEndpoint } from "./_endpoints";

// API Endpoint
export const useApiEndpoint = (key: string) => {
  return getEndpoint(key);
};

// API Error Message
export const useApiGetErrorMessage = (err: ResponseError) => {
  if (!err.header || !err.header.code || !/^B/.test(err.header.code)) {
    return useT("apiErrorMessage.005");
  } else {
    return err.header.message;
  }
};

// API Fetch
export const $api = async <TReq = unknown, TRes = unknown>(
  endpoint: ApiEndpoint | null,
  options?: {
    body?: Request<TReq>;
  } & Parameters<typeof $fetch<Response<TRes>>>[1],
) => {
  $updateLogin(); // 로그인 유지 시간 갱신

  const { $constants } = useNuxtApp();

  // 엔드포인트 없으면 에러
  if (!endpoint) {
    const error = new ApiError(useT("apiErrorMessage.001"), {
      header: {
        message: "API Error",
      },
    });

    throw error;
  }

  const { apiNo, path, useAuthorization, useCorpTaxiAuthorization, useMockup } =
    plainToClass(ApiEndpoint, endpoint);
  const apiBaseURL = $constants.apiBaseURL();
  const appVer = $constants.version();
  const route = useRoute();
  const pageNm = route.fullPath;

  // 목업을 안쓸건데 API URL 세팅도 안되어 있으면 에러
  if (!useMockup && !apiBaseURL) {
    const error = new ApiError(useT("apiErrorMessage.002"), {
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
    const stores = {
      auth: useStoreAuth(),
    };
    const {
      $getIsAuthenticated,
      accessToken,
      $getIsCorpTaxiAuthenticated,
      corpTaxi,
    } = stores.auth;
    const useToken = useCorpTaxiAuthorization || useAuthorization;
    const isAuthenticated = useCorpTaxiAuthorization
      ? $getIsCorpTaxiAuthenticated()
      : $getIsAuthenticated();
    const token = useCorpTaxiAuthorization
      ? corpTaxi?.accessToken || ""
      : accessToken;
    const authorization =
      useToken && isAuthenticated && token ? `Bearer ${token}` : ""; // 로그인 되어있고 accessToken 사용해야한다면 Authorization 값 세팅 (법인 택시는 법인 택시용 토큰으로 세팅)

    return $fetch.raw<Response<TRes>>(requestURL, {
      method: "POST",
      ignoreResponseError: true,
      ...options,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: authorization,
        ...options?.headers,
      },
      body: {
        header: {
          appVer,
          apiNo,
          osType: "W",
          pageNm,
          ...options?.body?.header,
        },
        data: options?.body?.data,
        page: options?.body?.page,
      },
    });
  };

  let res = await apiFetch();

  // accessToken 이 잘못 되었으면 토큰 갱신 후 재요청 (법인 택시는 안함)
  if (res._data?.header?.code === "C0038") {
    let refreshTokenSuccess = false;

    if (!useCorpTaxiAuthorization) {
      await useApiAuthRefreshToken({
        onSuccess: () => {
          refreshTokenSuccess = true;
        },
        onError: () => {
          // 토큰 갱신 실패시 로그인 페이지로
          $replaceLogin();

          const error = new ApiError(useT("apiErrorMessage.004"), {
            header: {
              message: "API Error",
            },
          });

          throw error;
        },
      });
    }

    if (refreshTokenSuccess) {
      res = await apiFetch();
    }
  }

  const data = res._data || {};

  // api 에서 내려주는 에러 처리
  if (data?.header?.success === false) {
    const error = new ApiError<Response<TRes>>(
      `[${data?.header?.code}] ${data?.header?.message}`,
      data,
    );

    throw error;
  }

  // api 가 내려주지 않은 에러 처리
  if (!res.ok) {
    const error = new ApiError(useT("apiErrorMessage.003"), {
      header: {
        message: "API Error",
      },
    });

    throw error;
  }

  // 정상 처리 된 데이터 반환
  return data;
};
