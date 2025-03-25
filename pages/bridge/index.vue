<script setup lang="ts">
// 레이아웃 선택
definePageMeta({
  layout: "etc",
});

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// route
const route = useRoute();

// 앱 스토어 이동
const goStore = () => {
  if (!window || route.query.type !== "event") return;

  const userAgent = window.navigator.userAgent;
  const isIos = Boolean(userAgent.match(/iPod|iPhone|iPad/));
  const isAndroid = Boolean(userAgent.match(/Android/));

  if (isIos) {
    window.location.href = useAppStore();
  } else if (isAndroid) {
    window.location.href = useGooglePlay();
  }
};

// 앱 체크
const checkApp = (url: string) => {
  if (!window && !document) return;

  const userAgent = window.navigator.userAgent;
  const isIos = Boolean(userAgent.match(/iPod|iPhone|iPad/));
  const isAndroid = Boolean(userAgent.match(/Android/));

  const timer = setTimeout(() => {
    goStore();
  }, 3000);

  window.addEventListener(
    "blur",
    () => {
      clearTimeout(timer);
      window.close();
    },
    {
      once: true,
    },
  );

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.visibilityState === "hidden") {
        clearTimeout(timer);

        if (isIos) {
          window.location.href = "kakaotalk://inappbrowser/close";
        } else if (isAndroid) {
          window.location.href = "kakaoweb://closeBrowser";
        }

        window.close();
      }
    },
    {
      once: true,
    },
  );

  window.location.href = url;
};

// 루트
const root = () => {
  if (route.query.type) return;
  checkApp("e1orangecard://e1orangecard.com");
};

// 이벤트
const event = () => {
  if (route.query.type !== "event") return;
  checkApp(`e1orangecard://e1orangecard.com/event/${route.query.id}`);
};

// EV 결제
const evpay = () => {
  if (route.query.type !== "ev-pay") return;
  checkApp(`e1orangecard://e1orangecard.com/ev-pay/${route.query.id}`);
};

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setPageTitle("");
  stores.layout.$setUseFooter(false);
  stores.layout.$setUseHeaderLine(true);
});
onMounted(() => {
  root();
  event();
  evpay();
});
</script>

<template>
  <ContentsBridgeView />
</template>
