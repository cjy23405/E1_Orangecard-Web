import type { PhoneAuthData } from "@/types/hooks";

// 휴대폰 인증
export const useHookPhoneAuth = (name: string, query: string = "") => {
  const endpoint = useHookEndpoint("phoneAuth");

  if (!endpoint || !window) return null;

  const { $constants } = useNuxtApp();
  const hookBaseURL = $constants.hookBaseURL();
  const origin = window.location.origin;
  const targetOrigin = encodeURIComponent(origin);
  const path = `${endpoint}?targetOrigin=${targetOrigin}${query ? "&" + query : ""}`;

  return useHookPopupSet<PhoneAuthData>({
    path,
    name,
    eventOrigin: hookBaseURL,
    eventAction: "onAuthPhoneResult",
  });
};
