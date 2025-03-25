<script setup lang="ts">
import { plainToClass } from "class-transformer";
import {
  type AlertDialogContentEmits,
  type AlertDialogContentProps,
  useForwardPropsEmits,
} from "radix-vue";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import type { PopupBaseButtons } from "@/types/components/popup/Base";
import { PopupBaseButtonsItem } from "@/types/components/popup/Base";

interface Props
  extends /* @vue-ignore */ Omit<AlertDialogContentProps, "as" | "asChild"> {
  class?: HTMLAttributes["class"];
  useClose?: boolean;
  outsideClose?: boolean;
  variant?: "default" | "mobile-full" | "main-notice";
  buttons?: PopupBaseButtons;
}

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// defaultButtonsOptions
const defaultButtonsOptions = plainToClass(PopupBaseButtonsItem, {});

// button component
const buttonComponent: {
  [key: string]: unknown;
  action: typeof AlertDialogAction;
  cancel: typeof AlertDialogCancel;
} = {
  action: AlertDialogAction,
  cancel: AlertDialogCancel,
};

// props
const props = withDefaults(defineProps<Props>(), {
  class: "",
  useClose: true,
  outsideClose: true,
  variant: "default",
  buttons: () => [],
});

// emit
const emit = defineEmits<AlertDialogContentEmits>();

// state
const isOpened = ref(false);
const buttonList = ref<PopupBaseButtons>(props.buttons);
const callbackCloseAutoFocus = ref<
  PopupBaseButtonsItem["closeAutoFocus"] | null
>(null);

// computed
const delegatedProps = computed(() => {
  const { useClose, outsideClose, buttons, ...delegated } = props;
  return delegated;
});

// forwarded props
const forwarded = useForwardPropsEmits(delegatedProps, emit);

// open
const open = () => {
  isOpened.value = true;
};

// close
const close = () => {
  isOpened.value = false;
};

// interactOutside
const interactOutside = () => {
  if (props.outsideClose) {
    close();
  }
};

// init button options
const initButtonOptions = () => {
  const oButtons = [];
  for (let i = 0; i < props.buttons.length; i++) {
    oButtons[i] = Object.assign({}, defaultButtonsOptions, props.buttons[i]);
  }
  buttonList.value = oButtons;
};

// button click
const buttonClick = (item: PopupBaseButtonsItem) => {
  isOpened.value = true;

  if (typeof item.closeAutoFocus === "function") {
    callbackCloseAutoFocus.value = item.closeAutoFocus;
  }
  if (typeof item.callback === "function") {
    item.callback(close);
  }
};

// closeAutoFocus
const closeAutoFocus = (e: Event) => {
  if (callbackCloseAutoFocus.value) {
    callbackCloseAutoFocus.value(e);
    callbackCloseAutoFocus.value = null;
  }
};

// watch
watch(
  () => props.buttons,
  () => {
    initButtonOptions();
  },
  {
    deep: true,
  },
);

// setup
initButtonOptions();

// expose
defineExpose<{
  open: () => void;
  close: () => void;
}>({
  open,
  close,
});
</script>

<template>
  <AlertDialog v-model:open="isOpened">
    <AlertDialogContent
      v-bind="forwarded"
      :class="
        cn([
          {
            'mobile:flex mobile:size-full mobile:flex-col mobile:rounded-none':
              props.variant === 'mobile-full',
            'main-notice-popup': props.variant === 'main-notice',
          },
          props.class,
        ])
      "
      @interact-outside="interactOutside"
      @close-auto-focus="closeAutoFocus"
    >
      <AlertDialogHeader class="relative">
        <AlertDialogTitle
          v-if="$slots.title"
          :class="{
            'mobile:fs-20 mobile:h-[5.6rem] mobile:px-8 mobile:text-left':
              props.variant === 'mobile-full',
          }"
        >
          <slot name="title" />
        </AlertDialogTitle>
        <AlertDialogTitle
          v-else
          class="absolute size-px overflow-hidden whitespace-nowrap text-transparent opacity-0"
        >
          안내
        </AlertDialogTitle>

        <AlertDialogDescription
          class="absolute size-px overflow-hidden whitespace-nowrap !p-0 text-transparent opacity-0"
        />

        <a
          v-if="useClose"
          :class="[
            'absolute right-[1.2rem] top-4 size-[3.2rem] bg-close-button bg-contain bg-center bg-no-repeat text-zero md:right-8 md:top-[1.8rem] md:size-16',
            {
              'mobile:size-[3.6rem]': props.variant === 'mobile-full',
            },
          ]"
          @click="close"
        >
          Alert close
        </a>
      </AlertDialogHeader>

      <div
        v-if="$slots.default"
        :class="[
          'popup-data',
          {
            'mobile:flex mobile:min-h-0 mobile:flex-1 mobile:flex-row':
              props.variant === 'mobile-full',
          },
        ]"
      >
        <div
          :class="{
            'mobile:!max-h-none mobile:min-h-0 mobile:flex-1 mobile:!py-[2.8rem]':
              props.variant === 'mobile-full',
            '!max-h-none !overflow-visible !p-0 md:!max-h-none md:!p-0':
              props.variant === 'main-notice',
          }"
        >
          <slot />
        </div>
      </div>

      <AlertDialogFooter v-if="buttonList.length" class="px-8 pb-8">
        <template v-for="(item, i) in buttonList" :key="i">
          <component
            :is="buttonComponent[item.type]"
            v-if="item.type"
            @click="buttonClick(item)"
          >
            {{
              item.text ||
              (item.type === "action"
                ? $t("alertButton.001")
                : $t("alertButton.002"))
            }}
          </component>
        </template>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
