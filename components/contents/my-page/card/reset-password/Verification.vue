<script setup lang="ts">
// route
const localePath = useLocalePath();
const router = useRouter();

// authenticated
const authenticated = () => {
  router.push(localePath("/my-page/card/reset-password/edit"));
};
</script>

<template>
  <CommonCheckAuth @authenticated="authenticated" />
</template>
