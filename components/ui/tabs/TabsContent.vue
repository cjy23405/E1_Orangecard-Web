<script setup lang="ts">
import { cn } from "@/lib/utils";
import { TabsContent, type TabsContentProps } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  TabsContentProps & {
    class?: HTMLAttributes["class"];
    wrapClass?: HTMLAttributes["class"];
  }
>();

const delegatedProps = computed(() => {
  const { wrapClass: __, class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <TabsContent
    :class="
      cn(
        'tab-contents block ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ',
        props.wrapClass,
      )
    "
    v-bind="delegatedProps"
  >
    <div :class="cn('mt-2', props.class)">
      <slot />
    </div>
  </TabsContent>
</template>

<style lang="css" scoped>
.tab-contents[data-state="inactive"] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  height: 0;
}
</style>
