<script setup lang="ts">
import { plainToClass } from "class-transformer";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  AlertOptions,
  AlertButtonsOptions,
} from "@/types/components/common/Alert";

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// defaultOptions
const defaultOptions = plainToClass(AlertOptions, {});

// defaultButtonsOptions
const defaultButtonsOptions = plainToClass(AlertButtonsOptions, {});

// button component
const buttonComponent: {
  [key: string]: unknown;
  action: typeof AlertDialogAction;
  cancel: typeof AlertDialogCancel;
} = {
  action: AlertDialogAction,
  cancel: AlertDialogCancel,
};

// state
const isOpened = ref(false);
const outsideClose = ref(defaultOptions.outsideClose || false);
const useClose = ref(defaultOptions.useClose || false);
const title = ref(defaultOptions.title || "");
const message = ref(defaultOptions.message || "");
const buttons = ref<AlertButtonsOptions[]>([defaultButtonsOptions]);
const callbackCloseAutoFocus = ref<
  AlertButtonsOptions["closeAutoFocus"] | null
>(null);
const callbackOpenAutoFocus = ref<AlertOptions["openAutoFocus"] | null>(null);

// open
const open = (customOptions: AlertOptions = {}) => {
  const options = Object.assign({}, defaultOptions, customOptions);
  const oUseClose = options.useClose || false;
  const oTitle = options.title || "";
  const oMessage = options.message || "";
  const oButtons = options.buttons || [];
  const oOutsideClose = options.outsideClose || false;

  for (let i = 0; i < oButtons.length; i++) {
    oButtons[i] = Object.assign({}, defaultButtonsOptions, oButtons[i]);
  }

  if (typeof options.openAutoFocus === "function") {
    callbackOpenAutoFocus.value = options.openAutoFocus;
  }

  useClose.value = oUseClose;
  title.value = oTitle;
  message.value = oMessage.replace(/\n/g, "<br />");
  buttons.value = oButtons;
  outsideClose.value = oOutsideClose;

  isOpened.value = true;
};

// close
const close = () => {
  isOpened.value = false;
};

// button click
const buttonClick = (item: AlertButtonsOptions) => {
  isOpened.value = true;

  if (typeof item.closeAutoFocus === "function") {
    callbackCloseAutoFocus.value = item.closeAutoFocus;
  }
  if (typeof item.callback === "function") {
    item.callback(close);
  }
};

// interactOutside
const interactOutside = () => {
  if (outsideClose.value) {
    close();
  }
};

// openAutoFocus
const openAutoFocus = (e: Event) => {
  if (callbackOpenAutoFocus.value) {
    callbackOpenAutoFocus.value(e);
    callbackOpenAutoFocus.value = null;
  }
};

// closeAutoFocus
const closeAutoFocus = (e: Event) => {
  if (callbackCloseAutoFocus.value) {
    callbackCloseAutoFocus.value(e);
    callbackCloseAutoFocus.value = null;
  }
};

// expose
defineExpose<{
  open: (customOptions: AlertOptions) => void;
  close: () => void;
}>({
  open,
  close,
});
</script>

<template>
  <AlertDialog v-model:open="isOpened">
    <AlertDialogContent
      @interact-outside="interactOutside"
      @open-auto-focus="openAutoFocus"
      @close-auto-focus="closeAutoFocus"
    >
      <AlertDialogHeader class="relative">
        <AlertDialogTitle v-if="title">{{ title }}</AlertDialogTitle>
        <AlertDialogTitle
          v-else
          class="absolute size-px overflow-hidden whitespace-nowrap text-transparent opacity-0"
        >
          안내
        </AlertDialogTitle>

        <AlertDialogDescription v-if="message" as-child>
          <!-- eslint-disable vue/no-v-html -->
          <p v-html="message"></p>
        </AlertDialogDescription>
        <AlertDialogDescription
          v-else
          class="absolute size-px overflow-hidden whitespace-nowrap text-transparent opacity-0"
        >
        </AlertDialogDescription>

        <a
          v-if="useClose"
          class="absolute right-[1.2rem] top-4 size-[3.2rem] bg-close-button bg-contain bg-center bg-no-repeat text-zero md:right-8 md:top-[1.8rem] md:size-16"
          @click="close"
        >
          Alert close
        </a>
      </AlertDialogHeader>

      <AlertDialogFooter v-if="buttons.length" class="px-8 pb-8">
        <template v-for="(item, i) in buttons" :key="i">
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
