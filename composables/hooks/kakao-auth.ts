import type {
  KakaoAuthData,
  KakaoAuthToken,
  KakaoAuthUser,
  KakaoAuthAgree,
} from "@/types/hooks";

// 카카오 인증 setup
export const useHookKakaoAuthSetup = () => {
  if (!window.Kakao) return;

  // 상수
  const { $constants } = useNuxtApp();
  const keys = $constants.kakaoKeys();

  // 카카오 관련
  window.Kakao.init(keys.script);

  const state = window.location.search || "";

  if (window.Kakao.isInitialized()) {
    window.Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/auth/kakao/callback`,
      prompt: "login",
      scope:
        "account_email, name, birthday, birthyear, phone_number, account_ci",
      serviceTerms:
        "agree_use, agree_private, agree_private_opt, agree_email, agree_sms, agree_benefit, agree_talk",
      state,
    });
  }
};

// 카카오 인증 callback
export const useHookKakaoAuthCallback = async (isSelf: boolean = false) => {
  // 토큰 발급
  const tokenData = await getToken();

  if (!tokenData) return;

  // 유저 정보
  const userData = await getUser(tokenData.access_token);

  if (!userData) return;

  // 동의 정보
  const agreeData = await getAgree(tokenData.access_token);

  if (!agreeData) return;

  // 값 전달
  const authData = {
    token: tokenData,
    user: userData,
    agree: agreeData,
  };

  if (isSelf) {
    window.postMessage(
      {
        action: "onAuthKakaoResult",
        params: [authData],
      },
      window.location.origin,
    );
  } else {
    window.opener.postMessage(
      {
        action: "onAuthKakaoResult",
        params: [authData],
      },
      window.location.origin,
    );

    $kakaotalkClose();
  }
};

// 카카오 토큰 발급
const getToken = (
  type: "authorization_code" | "refresh_token" = "authorization_code",
) => {
  if (!window) return;

  // 상수
  const { $constants } = useNuxtApp();
  const keys = $constants.kakaoKeys();

  // 스토어
  const stores = {
    auth: useStoreAuth(),
  };

  // route
  const route = useRoute();

  // 카카오 관련
  const params: {
    grant_type: string;
    client_id: string;
    redirect_uri?: string;
    code?: string;
    refresh_token?: string;
  } = {
    grant_type: type,
    client_id: keys.api,
  };

  if (type === "authorization_code") {
    params.redirect_uri = `${window.location.origin}/auth/kakao/callback`;
    params.code = typeof route.query.code === "string" ? route.query.code : "";
  } else if (type === "refresh_token") {
    params.refresh_token = stores.auth.kakaoRefreshToken;
  }

  const paramsString = new URLSearchParams(params).toString();

  return $fetch<KakaoAuthToken>(
    `https://kauth.kakao.com/oauth/token?${paramsString}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    },
  );
};

// 카카오 내정보 조회
const getUser = (token: string) => {
  if (!window) return;

  return $fetch<KakaoAuthUser>("https://kapi.kakao.com/v2/user/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
};

// 카카오 동의 내역 조회
const getAgree = (token: string) => {
  if (!window) return;

  return $fetch<KakaoAuthAgree>(
    "https://kapi.kakao.com/v2/user/service_terms",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

// 카카오 연결 끊기
export const useHookKakaoUnlink = (
  token: string,
): Promise<unknown> | undefined => {
  if (!window.Kakao) return;

  // 상수
  const { $constants } = useNuxtApp();
  const keys = $constants.kakaoKeys();

  // 카카오 관련
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(keys.script);
  }

  if (window.Kakao.isInitialized()) {
    window.Kakao.Auth.setAccessToken(token);

    return window.Kakao.API.request({
      url: "/v1/user/unlink",
    });
  }
};

// 카카오 토큰 저장
export const useHookKakaoLogin = (refreshToken: string) => {
  // 스토어
  const stores = {
    auth: useStoreAuth(),
  };

  stores.auth.$setKakaoRefreshToken(refreshToken);
};

// 카카오 토큰 갱신 및 연결 끊기
export const useHookKakaoRefreshTokenUnlink = () => {
  // 스토어
  const stores = {
    auth: useStoreAuth(),
  };

  if (!stores.auth.kakaoRefreshToken) return;

  // setup
  getToken("refresh_token")
    ?.then((data) => {
      useHookKakaoUnlink(data.access_token)
        ?.then(() => {
          stores.auth.$setKakaoRefreshToken("");
        })
        .catch(() => {});
    })
    .catch(() => {});
};

// 카카오 인증
export const useHookKakaoAuth = (name: string) => {
  const endpoint = useHookEndpoint("kakaoAuth", true);

  if (!endpoint || !window) return null;

  const origin = window.location.origin;
  const query = window.location.search || "";
  const path = `${endpoint}${query}`;

  return useHookPopupSet<KakaoAuthData>({
    path,
    name,
    eventOrigin: origin,
    eventAction: "onAuthKakaoResult",
  });
};
