import type { HTMLAttributes, TextareaHTMLAttributes } from "vue";

export interface Props
  extends /* @vue-ignore */ Omit<TextareaHTMLAttributes, "class"> {
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
}
