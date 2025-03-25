<script setup lang="ts">
import { TitiTalkAuthQuery } from "@/types/components/contents/titi-talk/auth";

// queryKeys
const queryKeys = Object.keys(new TitiTalkAuthQuery());

// route
const route = useRoute();

// session
const titiTalkAuth = useSessionStorage<string | null>("titiTalkAuth", null);

// computed
const query = computed<TitiTalkAuthQuery | null>(() => {
  let is = true;

  queryKeys.forEach((item) => {
    if (typeof route.query[item] !== "string") {
      is = false;
    }
  });

  if (is) {
    return {
      sbsc_channel: route.query.sbsc_channel,
      simple_sbsc_type: route.query.simple_sbsc_type,
      auth_type: route.query.auth_type,
      service_type: route.query.service_type,
      callback_url: route.query.callback_url,
    } as TitiTalkAuthQuery;
  } else {
    return null;
  }
});

// hook
const hookPhoneAuth = useHookPhoneAuth(
  "_self",
  `channel=CHAT&sbsc_channel=${query.value?.sbsc_channel}&callback_url=${encodeURIComponent(query.value?.callback_url || "")}`,
);
const hookKakaoAuth = useHookKakaoAuth("_self");
const hookNaverAuth = useHookNaverAuth("_self", true);

// init
const init = () => {
  if (query.value) {
    titiTalkAuth.value = JSON.stringify(query.value);

    switch (query.value.auth_type) {
      case "H":
        hookPhoneAuth?.open();
        break;
      case "KAKAO":
        hookKakaoAuth?.open();
        break;
      case "NAVER":
        hookNaverAuth?.open();
        break;
      default:
        break;
    }
  }
};

// life cycle
onMounted(() => {
  init();
});
</script>

<template>
  <div></div>
</template>
