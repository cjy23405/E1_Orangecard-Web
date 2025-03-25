import type { IpinAuthData } from "@/types/hooks";

// 아이핀 인증
export const useHookIpinAuth = (name: string) => {
  const endpoint = useHookEndpoint("ipinAuth");

  if (!endpoint || !window) return null;

  const { $constants } = useNuxtApp();
  const hookBaseURL = $constants.hookBaseURL();
  const origin = window.location.origin;
  const targetOrigin = encodeURIComponent(origin);
  const path = `${endpoint}?targetOrigin=${targetOrigin}`;

  return useHookPopupSet<IpinAuthData>({
    path,
    name,
    eventOrigin: hookBaseURL,
    eventAction: "onAuthIpinResult",
  });
};
