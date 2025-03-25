import type {
  HookPopupMessageAction,
  HookSelfGetDataEvent,
} from "@/types/hooks";
import { getEndpoint } from "./_endpoints";

// Hook Endpoint
export const useHookEndpoint = (key: string, self: boolean = false) => {
  const { $constants } = useNuxtApp();
  const hookBaseURL = $constants.hookBaseURL();
  const endpoint = getEndpoint(key);

  if (!hookBaseURL || !endpoint) {
    return null;
  } else {
    if (self) {
      return endpoint;
    } else {
      return hookBaseURL + endpoint;
    }
  }
};

// Hook popup set
export const useHookPopupSet = <T = unknown>({
  path,
  name = "",
  features = "width=400, height=630, resizable=1, scrollbars=no, status=0, titlebar=0, toolbar=0, left=1, top=1",
  eventOrigin,
  eventAction,
}: {
  path: string;
  name?: string;
  features?: string;
  eventOrigin: string;
  eventAction: HookPopupMessageAction;
}) => {
  if (!window) return null;

  // 데이터 및 상태 값
  const data = ref<T | null>(null);

  // 인증 수신
  let setData: (
    event: MessageEvent<{
      action: HookPopupMessageAction;
      params: T[];
    }>,
  ) => void = () => {};
  let timer: ReturnType<typeof setInterval>;
  let clearTimer: ReturnType<typeof setTimeout>;

  // 인증창 열기
  const open = () => {
    clear();
    clearTimeout(clearTimer);

    data.value = null;

    return new Promise<T>((resolve, reject) => {
      const win = window.open(
        path,
        name,
        `${name === "_self" ? "" : "popup=true, "}${features}`,
      );

      if (win) {
        setData = (event) => {
          if (
            win === event.source &&
            event.origin === eventOrigin &&
            event.data.action === eventAction &&
            Array.isArray(event.data.params) &&
            event.data.params[0]
          ) {
            data.value = event.data.params[0];
            resolve(event.data.params[0]);
          }
        };

        window.addEventListener("message", setData);

        timer = setInterval(function () {
          if (win.closed) {
            clearTimer = setTimeout(() => {
              clear();

              if (!data.value) {
                reject();
              }
            }, 800);
          }
        }, 1000);
      } else {
        reject();
      }
    });
  };

  // 이벤트 삭제
  const clear = () => {
    window.removeEventListener("message", setData);
    clearInterval(timer);
  };

  return { data, open, clear };
};

// self get data
export const useHookSelfGetData = (
  event: HookSelfGetDataEvent,
  callback: (e: HookSelfGetDataEvent) => void,
) => {
  if (!window) return;

  const origin = window.location.origin;

  if (
    event.origin === origin &&
    /onAuthKakaoResult|onAuthNaverResult|onAuthPhoneResult|onAuthIpinResult/.test(
      event.data.action,
    ) &&
    Array.isArray(event.data.params) &&
    event.data.params[0]
  ) {
    callback(event);
  }
};
