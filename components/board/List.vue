<script setup lang="ts">
// props
const props = withDefaults(
  defineProps<{
    useMore?: boolean;
    smallButton?: boolean;
    disabled?: boolean;
  }>(),
  {
    useMore: true,
    smallButton: false,
    disabled: false,
  },
);

// emit
const emit = defineEmits<{
  more: [];
}>();

// 더보기 클릭
const moreClick = () => {
  if (props.disabled) return;

  emit("more");
};
</script>

<template>
  <div>
    <ul class="list-box">
      <slot />
    </ul>
    <p v-if="useMore" class="btn-wrap mt-8 md:mt-[6.6rem]">
      <a
        role="button"
        tabindex="0"
        :aria-disabled="disabled"
        :class="[
          'btn-more',
          {
            small: smallButton,
          },
        ]"
        @click="moreClick"
        @keypress.enter.space="moreClick"
      >
        더보기
      </a>
    </p>
  </div>
</template>
