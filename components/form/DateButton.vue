<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

// props
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    text?: string;
    placeholder?: string;
    disabled?: boolean;
  }>(),
  {
    class: "",
    text: "",
    placeholder: "",
    disabled: false,
  },
);

// computed
const isText = ref(false);

// ref
const el = useTemplateRef("el");

// watch
watch(
  () => props.text,
  () => {
    isText.value = !!props.text;
  },
);

// life cycle
onMounted(() => {
  isText.value = !!props.text;
});

// expose
defineExpose({
  el,
});
</script>

<template>
  <Button
    ref="el"
    type="button"
    variant="outline"
    :class="
      cn(
        [
          'ipt-cal block w-full items-start rounded-lg border border-solid border-gray-300 text-left text-lg text-gray-900 placeholder:text-gray-500 hover:bg-gray-100 focus:border-gray-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:!bg-gray-100 disabled:text-gray-600 disabled:opacity-100',
          {
            'text-muted-foreground': !isText,
          },
        ],
        props.class,
      )
    "
    :disabled="disabled"
  >
    <!-- eslint-disable vue/no-v-html -->
    <span
      v-if="isText"
      class="ellipsis block align-baseline leading-none"
      v-html="text"
    />
    <span
      v-else
      class="ellipsis block align-baseline leading-none"
      v-html="placeholder"
    />
  </Button>
</template>

<style lang="css" scoped>
@tailwind components;
@layer components {
  .ipt-cal {
    @apply md:h-[5.6rem] h-[4.8rem] bg-no-repeat text-lg md:text-xl md:py-[1.6rem] md:px-[2rem] py-[1.3rem] px-[1.6rem] bg-white md:pr-[5rem] overflow-hidden bg-none;
  }

  @media (min-width: 768px) {
    .ipt-cal {
      background-image: url(@/assets/img/form/ic-input-calendar.png);
      background-repeat: no-repeat;
      background-position: right 1.6rem center;
      background-size: 2.4rem auto;
    }
    .ipt-cal:disabled {
      background-image: url(@/assets/img/form/ic-input-calendar-dis.png);
      background-size: 2.4rem auto;
    }
  }
}
</style>
