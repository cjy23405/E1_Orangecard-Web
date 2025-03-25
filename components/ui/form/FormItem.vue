<script setup lang="ts">
import { useId } from "radix-vue";
import { provide } from "vue";
import { FORM_ITEM_INJECTION_KEY } from "./injectionKeys";

const id = useId();
provide(FORM_ITEM_INJECTION_KEY, id);
</script>

<template>
  <slot />
</template>
