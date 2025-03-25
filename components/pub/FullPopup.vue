<template>
  <div>
    <alert-item
      v-if="isBigScreen"
      :show="props.isOpen"
      :alert-title="props.title"
      :class="{ open: props.isOpen, close: close }"
      @update:is-dialog-open="closePopup"
    >
      <slot />
    </alert-item>
    <sheet-item
      v-else
      :show="props.isOpen"
      :title="props.title"
      @update:is-dialog-open="closePopup"
    >
      <slot
    /></sheet-item>
  </div>
</template>
<script setup lang="ts">
import AlertItem from "@/components/pub/AlertItem.vue";
import SheetItem from "@/components/pub/SheetItem.vue";
import { defineEmits, defineProps } from "vue";
const props = withDefaults(
  defineProps<{
    title: string;
    isOpen: boolean;
  }>(),
  {
    title: "",
    isOpen: false,
  },
);
const close = ref(false);

const emit = defineEmits<{
  (e: "close"): void;
}>();

const closePopup = () => {
  close.value = true;
  setTimeout(() => {
    close.value = false;
    emit("close");
  }, 200);
};

const isBigScreen = ref(false);
const handleResize = () => {
  if (window.innerWidth > 768) {
    isBigScreen.value = true;
  } else {
    isBigScreen.value = false;
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
