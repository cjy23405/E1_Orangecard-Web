<script setup lang="ts">
// route
const route = useRoute();

// SEO
$setSEO({});

// setup
$updateLogin();
$clearSignUpSession();
$clearForgotSession();
$clearTitiTalkSession();
$clearEtcSession();

// watch
watch(
  () => route.fullPath,
  () => {
    $updateLogin();
    $clearSignUpSession();
    $clearForgotSession();
    $clearTitiTalkSession();
    $clearEtcSession();
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
