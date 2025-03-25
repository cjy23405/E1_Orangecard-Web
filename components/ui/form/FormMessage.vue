<script setup lang="ts">
import { ErrorMessage } from "vee-validate";
import { toValue, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { useFormField } from "./useFormField";

const { name, formMessageId } = useFormField();

const props = withDefaults(defineProps<{ class?: HTMLAttributes["class"] }>(), {
  class: "",
});
</script>

<template>
  <ErrorMessage
    :id="formMessageId"
    as="p"
    :name="toValue(name)"
    :class="
      cn(
        'error-txt mt-[.8rem] pl-[.8rem] text-sm text-e1error md:text-base',
        props.class,
      )
    "
  />
</template>
