<script setup lang="ts">
// session
const kakaoSelfLogin = useSessionStorage<string | null>("kakaoSelfLogin", null);
const titiTalkAuth = useSessionStorage<string | null>("titiTalkAuth", null);

// ref
const selfLogin = useTemplateRef("selfLogin");
const titiTalk = useTemplateRef("titiTalk");

// callback
const callback = useDebounceFn(() => {
  if (titiTalk.value && selfLogin.value) {
    useHookKakaoAuthCallback(!!titiTalkAuth.value || !!kakaoSelfLogin.value);
  }
}, 1000);

// init
const init = () => {
  callback();
};

// watch
watch([titiTalk, selfLogin], () => {
  if (titiTalk.value && selfLogin.value) {
    init();
  }
});

// life cycle
onMounted(() => {
  init();

  document.addEventListener("kakaoSDKLoaded", init);
});

onBeforeUnmount(() => {
  document.removeEventListener("kakaoSDKLoaded", init);
});
</script>

<template>
  <ClientOnly>
    <ContentsAuthKakaoSelfLogin ref="selfLogin" />
    <ContentsTitiTalkAuthSendForm ref="titiTalk" />
  </ClientOnly>
</template>
