<script setup lang="ts">
// route
const localePath = useLocalePath();
const router = useRouter();

// authenticated
const authenticated = () => {
  router.push(localePath("/my-page/profile/edit"));
};
</script>

<template>
  <CommonCheckPassword @authenticated="authenticated" />
</template>
