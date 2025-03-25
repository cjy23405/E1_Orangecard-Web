<script setup lang="ts">
// session
const titiTalkAuth = useSessionStorage<string | null>("titiTalkAuth", null);

// ref
const titiTalk = useTemplateRef("titiTalk");

// callback
const callback = useDebounceFn(() => {
  if (titiTalk.value) {
    useHookKakaoAuthCallback(!!titiTalkAuth.value);
  }
}, 1000);

// init
const init = () => {
  callback();
};

// watch
watch(titiTalk, (titiTalk) => {
  if (titiTalk) {
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
    <ContentsTitiTalkAuthSendForm ref="titiTalk" />
  </ClientOnly>
</template>
