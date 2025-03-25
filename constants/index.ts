// dev 여부
const isDev = (): boolean => {
  const IS_DEV = useRuntimeConfig().public.IS_DEV;
  return (typeof IS_DEV === "boolean" && IS_DEV === true) || IS_DEV === "true";
};

// APP 버전
const version = (): string => {
  return useRuntimeConfig().public.APP_VERSION || "";
};

// API Base URL
const apiBaseURL = (): string => {
  return useRuntimeConfig().public.API_BASE_URL || "";
};

// download URL
const downloadURL = (): string => {
  return useRuntimeConfig().public.DOWNLOAD_URL || "";
};

// root URL
const rootURL = (): string => {
  return useRuntimeConfig().public.ROOT_URL || "";
};

// Hook Base URL
const hookBaseURL = (): string => {
  return useRuntimeConfig().public.API_BASE_URL || "";
};

// naver keys
const naverClientID = (): string => {
  return useRuntimeConfig().public.NAVER_CLIENTID || "";
};

// kakao keys
const kakaoKeys = (): {
  api: string;
  script: string;
} => {
  return {
    api: useRuntimeConfig().public.KAKAO_API_KEY || "",
    script: useRuntimeConfig().public.KAKAO_SCRIPT_KEY || "",
  };
};

// export
export default {
  isDev,
  version,
  apiBaseURL,
  downloadURL,
  rootURL,
  hookBaseURL,
  naverClientID,
  kakaoKeys,
};
