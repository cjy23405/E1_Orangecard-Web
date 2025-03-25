<script setup lang="ts">
import type { HookSelfGetDataEvent, KakaoAuthData } from "@/types/hooks";
import type { LoginSetup } from "@/types/api";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// 스토어
const stores = {
  auth: useStoreAuth(),
};

// api
const apiEvent = useApiEventEntryPermaLink(uid);
const apiCampaign = useApiEventCampaignEntryPermaLink(uid);

// session
const etcInflow = useSessionStorage<string | null>("etcInflow", null);

// route
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();

// ref
const raw = useTemplateRef("raw");

// computed
const isAuthenticated = computed(() => {
  return stores.auth.isAuthenticated;
});

// check query
const checkQuery = (key: string) => {
  if (typeof route.query[key] === "string") {
    return route.query[key];
  } else {
    return null;
  }
};

// init
const init = () => {
  if (!window) return;

  const code = checkQuery("code");
  const reurl = checkQuery("reurl");
  const event = checkQuery("event");
  const eventAuto = checkQuery("event-auto");
  const cam = checkQuery("cam");
  const query = checkQuery("query");

  if (reurl) {
    if (/^\//.test(reurl)) {
      router.replace(localePath(reurl));
    } else {
      window.location.replace(reurl);
    }
  } else if (event) {
    router.replace(localePath(`/event/${event}`));
  } else if (eventAuto) {
    if (!code && isAuthenticated.value) {
      eventCallback();
    } else {
      beforeCallback.value = eventBeforeCallback;
      afterCallback.value = eventCallback;
      useHookKakaoAuthCallback(true);
    }
  } else if (cam) {
    if (!code && isAuthenticated.value) {
      campaignCallback();
    } else {
      beforeCallback.value = campaignBeforeCallback;
      afterCallback.value = campaignCallback;
      useHookKakaoAuthCallback(true);
    }
  } else if (query && query === "oca-add") {
    beforeCallback.value = cardCallback;
    useHookKakaoAuthCallback(true);
  }
};

// kakao login
const beforeCallback = ref<() => void>();
const afterCallback = ref<LoginSetup["callback"]>();
const kakaoLogin = useDebounceFn((event: HookSelfGetDataEvent) => {
  if (event.data.action === "onAuthKakaoResult") {
    const kakaoData = event.data.params[0] as KakaoAuthData;

    if (typeof beforeCallback.value === "function") {
      beforeCallback.value();
    }

    raw.value?.kakaoLogin(kakaoData, afterCallback.value);
  }
}, 300);

// hookMessage
const hookMessage = (e: HookSelfGetDataEvent) => {
  useHookSelfGetData(e, kakaoLogin);
};

// card callback
const cardCallback = () => {
  etcInflow.value = localePath("/etc/kakao-permalink/card");
};

// event callback
const eventBeforeCallback = () => {
  const eventAuto = checkQuery("event-auto");

  if (!eventAuto) return;

  etcInflow.value = localePath(`/etc/kakao-permalink?event-auto=${eventAuto}`);
};
const eventCallback = () => {
  const eventAuto = checkQuery("event-auto");

  if (!eventAuto) return;

  apiEvent.mutate(
    {
      postingNo: Number(eventAuto),
    },
    {
      onSuccess: () => {
        alertOpen({
          message: useT("alertMessage.036"),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
                router.replace("/");
              },
            },
          ],
        });
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
                router.replace("/");
              },
            },
          ],
        });
      },
    },
  );
};

// campaign callback
const campaignBeforeCallback = () => {
  const cam = checkQuery("cam");

  if (!cam) return;

  etcInflow.value = localePath(`/etc/kakao-permalink?cam=${cam}`);
};
const campaignCallback = () => {
  const cam = checkQuery("cam");

  if (!cam) return;

  apiCampaign.mutate(
    {
      campaignId: cam,
    },
    {
      onSuccess: () => {
        alertOpen({
          message: useT("alertMessage.037"),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
                router.replace("/");
              },
            },
          ],
        });
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
                router.replace("/");
              },
            },
          ],
        });
      },
    },
  );
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// life cycle
onMounted(() => {
  init();

  document.addEventListener("kakaoSDKLoaded", init);
  window.addEventListener("message", hookMessage);
});

onBeforeUnmount(() => {
  document.removeEventListener("kakaoSDKLoaded", init);
  window.removeEventListener("message", hookMessage);
});
</script>

<template>
  <div>
    <CommonPageBridge />
    <ContentsLoginViewKakaoRaw ref="raw" />
    <CommonAlert ref="alertLayer" />
  </div>
</template>
