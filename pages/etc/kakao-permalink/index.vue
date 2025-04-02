<script setup lang="ts">
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// 스토어
const stores = {
  auth: useStoreAuth(),
};

// hook
const hookKakaoAuth = useHookKakaoAuth("_self");

// api
const apiEvent = useApiEventEntryPermaLink(uid);
const apiCampaign = useApiEventCampaignEntryPermaLink(uid);

// session
const kakaoSelfLogin = useSessionStorage<string | null>("kakaoSelfLogin", null);
const etcInflow = useSessionStorage<string | null>("etcInflow", null);
const campaignNo = useSessionStorage<string | null>("campaignNo", null);

// route
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();

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

// 카카오 인증
const kakaoAuth = () => {
  kakaoSelfLogin.value = "permalink";
  hookKakaoAuth?.open();
};

// init
const init = () => {
  if (!window) return;

  const cn = checkQuery("CN");
  const reurl = checkQuery("reurl");
  const event = checkQuery("event");
  const eventAuto = checkQuery("event-auto");
  const cam = checkQuery("cam");
  const query = checkQuery("query");

  if (cn) {
    campaignNo.value = cn;
  }

  if (reurl) {
    if (isAuthenticated.value) {
      reurlCallback();
    } else {
      etcInflow.value = localePath(`/etc/kakao-permalink?reurl=${reurl}`);
      kakaoAuth();
    }
  } else if (event) {
    if (isAuthenticated.value) {
      router.replace(localePath(`/event/${event}`));
    } else {
      etcInflow.value = localePath(`/event/${event}`);
      kakaoAuth();
    }
  } else if (eventAuto) {
    if (isAuthenticated.value) {
      eventAutoCallback();
    } else {
      etcInflow.value = localePath(
        `/etc/kakao-permalink?event-auto=${eventAuto}`,
      );
      kakaoAuth();
    }
  } else if (cam) {
    if (isAuthenticated.value) {
      campaignCallback();
    } else {
      etcInflow.value = localePath(`/etc/kakao-permalink?cam=${cam}`);
      kakaoAuth();
    }
  } else if (query && query === "oca-add") {
    if (isAuthenticated.value) {
      router.replace(localePath("/etc/kakao-permalink/card"));
    } else {
      etcInflow.value = localePath("/etc/kakao-permalink/card");
      kakaoAuth();
    }
  }
};

// reurl callback
const reurlCallback = () => {
  const reurl = checkQuery("reurl");

  if (!reurl) return;

  if (/^\//.test(reurl)) {
    router.replace(localePath(reurl));
  } else {
    window.location.replace(reurl);
  }
};

// event callback
const eventAutoCallback = () => {
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
});
</script>

<template>
  <div>
    <CommonPageBridge />
    <CommonAlert ref="alertLayer" />
  </div>
</template>
