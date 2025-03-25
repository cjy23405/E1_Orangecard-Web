import type { HTMLAttributes, InputHTMLAttributes } from "vue";

export interface Props
  extends /* @vue-ignore */ Omit<
    InputHTMLAttributes,
    "class" | "disabled" | "readonly"
  > {
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
  inputClass?: HTMLAttributes["class"];
  clearButtonAttrs?: HTMLAttributes;
  useClear?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  useError?: boolean;
}
