import type { NaverAuthData } from "@/types/hooks";

// 네이버 인증 setup
export const useHookNaverAuthSetup = (useAgree: boolean = false) => {
  if (!window.naver) return;

  // 상수
  const { $constants } = useNuxtApp();
  const clientId = $constants.naverClientID();

  // 네이버 관련
  const naverLogin = new window.naver.LoginWithNaverId({
    clientId,
    callbackUrl: `${window.location.origin}/auth/naver/callback`,
    callbackHandle: true,
    isPopup: true,
  });

  naverLogin.init();

  // 네이버 강제 로그아웃
  const win = window.open(
    "https://nid.naver.com/nidlogin.logout",
    "_blank",
    "popup=true, width=1, height=1, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=999999, top=999999",
  );

  // 로그아웃 후 로그인창 열기
  setTimeout(() => {
    win?.close();

    if (useAgree) {
      // 동의창 강제 띄우기
      naverLogin.reprompt();
    } else {
      naverLogin.authorize();
    }
  }, 1000);
};

// 네이버 인증 callback
export const useHookNaverAuthCallback = (isSelf: boolean = false) => {
  if (!window.naver) return;

  // 상수
  const { $constants } = useNuxtApp();
  const clientId = $constants.naverClientID();

  // 네이버 관련
  const naverLogin = new window.naver.LoginWithNaverId({
    clientId,
  });
  naverLogin.init();
  naverLogin.getLoginStatus((status: boolean) => {
    if (status) {
      const authData = {
        id: naverLogin.user.id,
        accessToken: naverLogin.accessToken.accessToken,
      };

      if (isSelf) {
        window.postMessage(
          {
            action: "onAuthNaverResult",
            params: [authData],
          },
          window.location.origin,
        );
      } else {
        window.opener.postMessage(
          {
            action: "onAuthNaverResult",
            params: [authData],
          },
          window.location.origin,
        );

        window.close();
      }
    }
  });
};

// 네이버 인증
export const useHookNaverAuth = (name: string, useAgree: boolean = false) => {
  const endpoint = useHookEndpoint("naverAuth", true);

  if (!endpoint || !window) return null;

  const origin = window.location.origin;
  const path = `${endpoint}?useagree=${useAgree}`;

  return useHookPopupSet<NaverAuthData>({
    path,
    name,
    eventOrigin: origin,
    eventAction: "onAuthNaverResult",
  });
};
