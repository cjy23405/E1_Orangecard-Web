<script setup lang="ts">
// props
withDefaults(
  defineProps<{
    id?: number;
  }>(),
  {
    id: 0,
  },
);
</script>

<template>
  <ContentsEventDetail :id="id" :ongoing-event="false" />
</template>
