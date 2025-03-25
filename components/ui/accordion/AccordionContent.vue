<script setup lang="ts">
import { cn } from "@/lib/utils";
import { AccordionContent, type AccordionContentProps } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  AccordionContentProps & {
    wrapClass?: HTMLAttributes["class"];
    class?: HTMLAttributes["class"];
  }
>();

const delegatedProps = computed(() => {
  const { wrapClass: __, class: _, ...delegated } = props;

  return delegated;
});

const init = ref(false);

onMounted(() => {
  setTimeout(() => {
    init.value = true;
  }, 300);
});
</script>

<template>
  <AccordionContent
    v-bind="delegatedProps"
    :class="
      cn(
        [
          'overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down forwards',
          {
            'before-init': !init,
          },
        ],
        props.wrapClass,
      )
    "
  >
    <div
      :class="
        cn(
          'border-top text-gray-900 p-8 fs-14 md:py-16 md:pl-64 md:pr-16',
          props.class,
        )
      "
    >
      <slot />
    </div>
  </AccordionContent>
</template>

<style lang="css" scoped>
.before-init {
  animation-duration: 0s;
}
.forwards[data-state="closed"] {
  animation-fill-mode: forwards;
}
</style>
