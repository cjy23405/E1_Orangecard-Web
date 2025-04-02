<script setup lang="ts">
// route
const route = useRoute();

// SEO
$setSEO({});

// init
const init = () => {
  // 상수
  const { $constants } = useNuxtApp();
  const isDev = $constants.isDev();

  // path
  const locale = useLocale();
  const reg = new RegExp(`(^|^/${locale})/(pub|test)`);

  // 운영에서 pub, test 접근시 404 로
  clearError();
  if (!isDev && reg.test(route.fullPath)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    });
  }

  // set
  $updateLogin();
  $clearSignUpSession();
  $clearForgotSession();
  $clearTitiTalkSession();
  $clearEtcSession();
};

// setup
init();

// watch
watch(
  () => route.fullPath,
  () => {
    init();
  },
);
</script>

<template>
  <CommonCheckMaintenance />
  <CommonLoading />
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
