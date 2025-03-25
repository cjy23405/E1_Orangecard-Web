<template>
  <div>
    <ul class="list-box">
      <slot />
    </ul>
    <p v-if="props.showMore" class="btn-wrap mt-8 md:mt-[6.6rem]">
      <NuxtLink
        class="btn-more"
        :class="{ small: props.smallButton }"
        @click="handleShowMore"
        >더보기</NuxtLink
      >
    </p>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
const props = withDefaults(
  defineProps<{
    showMore?: boolean;
    smallButton?: boolean;
  }>(),
  {
    showMore: false,
    smallButton: false,
  },
);

const emit = defineEmits<{
  (e: "showMore"): void;
}>();

const handleShowMore = () => {
  emit("showMore");
};
</script>
