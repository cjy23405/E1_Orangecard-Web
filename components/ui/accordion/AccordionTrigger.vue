<script setup lang="ts">
import { cn } from "@/lib/utils";
// import { ChevronDown } from "lucide-vue-next";
import {
  AccordionHeader,
  AccordionTrigger,
  type AccordionTriggerProps,
} from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  AccordionTriggerProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      v-bind="delegatedProps"
      :class="
        cn(
          'p-[2rem] pb-[1.6rem] w-full text-left fs-16 font-bold text-gray-900 relative accTrigger after:absolute after:right-[2rem] after:top-[2rem] after:w-[2.4rem] after:h-[2.4rem] md:after:right-[2.4rem] md:after:top-[2.2rem] md:after:w-[4rem] md:after:h-[4rem] md:pr-[8rem] md:flex md:flex-row md:py-[3rem] md:pl-[4rem]',
          props.class,
        )
      "
    >
      <!-- flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 -->
      <slot />
      <slot name="icon">
        <!-- <ChevronDown
          class="h-4 w-4 shrink-0 transition-transform duration-200"
        /> -->
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
<style lang="css" scoped>
.accTrigger:after {
  content: "";
  background: url("@/assets/img/icon/btn-arrow-down-40.png") no-repeat center
    center;
  background-size: 100% auto;
}
.accTrigger[data-state="open"]:after {
  background: url("@/assets/img/icon/btn-arrow-down-40-up.png") no-repeat center
    center;
  background-size: 100% auto;
}
</style>
