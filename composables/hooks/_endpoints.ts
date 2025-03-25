// Hook Endpoint
export interface HookEndpoints {
  [index: string]: string;
}

// Hook Endpoints
export const endpoints: {
  [index: string]: string;
} = {
  // 휴대폰 인증
  phoneAuth: "/page/selfAuthPhone",

  // 아이핀 인증
  ipinAuth: "/page/selfAuthIpin",

  // 네이버 인증
  naverAuth: "/auth/naver",

  // 카카오 인증
  kakaoAuth: "/auth/kakao",
};

// get endpoint
export const getEndpoint = (key: string) => {
  const endpoint: string | null = endpoints[key] || null;
  return endpoint;
};
