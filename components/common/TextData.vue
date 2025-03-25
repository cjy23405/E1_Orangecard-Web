<script setup lang="ts">
// props
const props = withDefaults(
  defineProps<{
    contents?: string;
  }>(),
  {
    contents: "",
  },
);

// computed
const textData = computed(() => props.contents.split(/\n/));
</script>

<template>
  <article class="break-all">
    <template v-for="(item, i) in textData" :key="i">
      <br v-if="i > 0" />
      {{ item }}
    </template>
  </article>
</template>
