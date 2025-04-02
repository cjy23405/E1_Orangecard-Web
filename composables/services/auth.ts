import { useMutation } from "@tanstack/vue-query";
import { DateTime } from "luxon";
import type {
  TokenRequest,
  TokenResponse,
  LoginRequest,
  LoginResponse,
  SnsLoginRequest,
  SnsLoginResponse,
  LogoutRequest,
  CheckPasswordRequest,
  CheckPasswordResponse,
  LoginInfo,
  CaptchaCodeResponse,
  LoginSetup,
  CorpTaxiLoginRequest,
  CorpTaxiLoginResponse,
  CorpTaxiLoginAuth,
  LoginFailCountRequest,
  LoginFailCountResponse,
} from "@/types/api";

// 로그인
export const useApiAuthLogin = (key: number | string = "") => {
  const endpoint = useApiEndpoint("login");

  return useMutation({
    mutationKey: ["login", key],
    mutationFn: (data: LoginRequest) => {
      return $api<LoginRequest, LoginResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// SNS 로그인
export const useApiAuthSnsLogin = (key: number | string = "") => {
  const endpoint = useApiEndpoint("snsLogin");

  return useMutation({
    mutationKey: ["snsLogin", key],
    mutationFn: (data: SnsLoginRequest) => {
      return $api<SnsLoginRequest, SnsLoginResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 로그아웃
export const useApiAuthLogout = () => {
  const endpoint = useApiEndpoint("logout");

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: (data: LogoutRequest) => {
      return $api<LogoutRequest>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 토큰 갱신
export const useApiAuthToken = () => {
  const endpoint = useApiEndpoint("token");

  return useMutation({
    mutationKey: ["token"],
    mutationFn: (data: TokenRequest) => {
      return $api<TokenRequest, TokenResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 토큰 Refresh
export const useApiAuthRefreshToken = async ({
  onSuccess = () => {},
  onError = () => {},
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const { $apiToken } = useNuxtApp();

  if (!$apiToken) return;

  const stores = {
    auth: useStoreAuth(),
  };
  const { refreshToken, $getIsAuthenticated } = stores.auth;
  const isAuthenticated = $getIsAuthenticated();
  const apiToken = $apiToken();

  if (isAuthenticated && refreshToken) {
    await apiToken.mutateAsync(
      {
        refreshToken,
      },
      {
        onSuccess: (data) => {
          const accessToken = data.data?.accessToken || "";
          const refreshToken = data.data?.refreshToken || "";
          const timestamp = DateTime.now().toMillis();

          stores.auth.$setAccessToken(accessToken);
          stores.auth.$setRefreshToken(refreshToken);
          stores.auth.$setTimestamp(timestamp);

          onSuccess();
        },
        onError: () => {
          $logout();
          onError();
        },
      },
    );
  } else {
    $logout();
    onError();
  }
};

// 세션 로그아웃
export const $logout = () => {
  const { $apiLogout } = useNuxtApp();
  const apiLogout = $apiLogout();
  const stores = {
    auth: useStoreAuth(),
  };
  const { accessToken } = stores.auth;

  stores.auth.$setAccessToken("");
  stores.auth.$setRefreshToken("");
  stores.auth.$setTimestamp(0);
  stores.auth.$setLoginInfo(null);
  stores.auth.$setLoginType(null);
  stores.auth.$setKakaoRefreshToken("");

  if (!$apiLogout || !accessToken || apiLogout.isPending.value) return;

  apiLogout.mutate({
    accessToken,
  });
};

// 로그인 갱신
export const $updateLogin = () => {
  const { $apiToken } = useNuxtApp();

  if (!$apiToken) return;

  const stores = {
    auth: useStoreAuth(),
  };

  const isAuthenticated = stores.auth.$getIsAuthenticated();
  const timestamp = DateTime.now().toMillis();

  if (isAuthenticated) {
    stores.auth.$setTimestamp(timestamp);
  } else {
    $logout();
  }
};

// 회원 비밀번호 유효성 체크
export const useApiAuthCheckPassword = (key: number | string = "") => {
  const endpoint = useApiEndpoint("checkPassword");

  return useMutation({
    mutationKey: ["checkPassword", key],
    mutationFn: (data: CheckPasswordRequest) => {
      return $api<CheckPasswordRequest, CheckPasswordResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 로그인 Setup
export const useApiAuthLoginSetup = ({ type, data, callback }: LoginSetup) => {
  // 스토어
  const stores = {
    auth: useStoreAuth(),
  };

  // session
  const kakaoSelfLogin = useSessionStorage<string | null>(
    "kakaoSelfLogin",
    null,
  );
  const titiTalkLogin = useSessionStorage<string | null>("titiTalkLogin", null);
  const etcInflow = useSessionStorage<string | null>("etcInflow", null);

  // route
  const localePath = useLocalePath();
  const router = useRouter();
  const route = useRoute();

  // set
  const accessToken = data.accessToken || "";
  const refreshToken = data.refreshToken || "";
  const timestamp = DateTime.now().toMillis();
  const loginInfo = (
    data
      ? (() => {
          const notKeys = ["accessToken", "refreshToken"];
          return useObjectFilter({ ...data }, (el, key) => {
            return notKeys.indexOf(String(key)) === -1;
          });
        })()
      : null
  ) as LoginInfo;
  const { returnurl } = route.query;

  stores.auth.$setAccessToken(accessToken);
  stores.auth.$setRefreshToken(refreshToken);
  stores.auth.$setTimestamp(timestamp);
  stores.auth.$setLoginInfo(loginInfo);
  stores.auth.$setLoginType(type);

  if (
    !titiTalkLogin.value &&
    !kakaoSelfLogin.value &&
    loginInfo?.pwdChangeReq
  ) {
    router.replace({
      path: localePath(useEtcRoute("/login/change-pw")),
      query: {
        returnurl: typeof returnurl === "string" ? returnurl : undefined,
      },
    });
  } else if (callback) {
    callback(type, data);
  } else if (etcInflow.value) {
    router.replace(etcInflow.value);
  } else {
    if (typeof returnurl === "string") {
      router.replace(returnurl);
    } else {
      $replaceHome();
    }
  }
};

// 캡차정보조회
export const useApiAuthCaptchaCode = (key: number | string = "") => {
  const endpoint = useApiEndpoint("captchaCode");

  return useMutation({
    mutationKey: ["captchaCode", key],
    mutationFn: (data: unknown = {}) => {
      return $api<unknown, CaptchaCodeResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 법인 회원 로그인
export const useApiAuthCorpTaxiLogin = (key: number | string = "") => {
  const endpoint = useApiEndpoint("corpTaxiLogin");

  return useMutation({
    mutationKey: ["corpTaxiLogin", key],
    mutationFn: (data: CorpTaxiLoginRequest) => {
      return $api<CorpTaxiLoginRequest, CorpTaxiLoginResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};

// 법인 회원 로그아웃
export const $corpTaxiLogout = () => {
  const { $apiLogout } = useNuxtApp();
  const apiLogout = $apiLogout();
  const stores = {
    auth: useStoreAuth(),
  };
  const accessToken = stores.auth.corpTaxi?.accessToken;

  stores.auth.$setCorpTaxi(null);
  stores.auth.$setCorpTaxiTimestamp(0);

  if (!$apiLogout || !accessToken || apiLogout.isPending.value) return;

  apiLogout.mutate({
    accessToken,
  });
};

// 법인 회원 로그인 Setup
export const useApiAuthCorpTaxLoginSetup = (data: CorpTaxiLoginAuth) => {
  if (!data) return;

  // 스토어
  const stores = {
    auth: useStoreAuth(),
  };

  // route
  const localePath = useLocalePath();
  const router = useRouter();
  const route = useRoute();

  // set
  const timestamp = DateTime.now().toMillis();
  const { returnurl } = route.query;

  stores.auth.$setCorpTaxi(data);
  stores.auth.$setCorpTaxiTimestamp(timestamp);

  if (typeof returnurl === "string") {
    router.replace(returnurl);
  } else {
    router.replace(localePath("/etc/corporate-taxi/point"));
  }
};

// 로그인 실패 횟수 조회
export const useApiAuthLoginFailCount = (key: number | string = "") => {
  const endpoint = useApiEndpoint("loginFailCount");

  return useMutation({
    mutationKey: ["loginFailCount", key],
    mutationFn: (data: LoginFailCountRequest) => {
      return $api<LoginFailCountRequest, LoginFailCountResponse>(endpoint, {
        body: {
          data,
        },
      });
    },
  });
};
