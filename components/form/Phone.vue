<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { AlertOptions } from "@/types/components/common/Alert";
import type { Props as InputProps } from "@/types/components/form/BasicInput";

// uid
const uid = getCurrentInstance()?.uid;

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// props
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    type?: "add" | "edit";
    check?: boolean | null;
    phoneAttrs?: InputProps;
    codeAttrs?: InputProps;
    disabled?: boolean;
  }>(),
  {
    modelValue: "",
    type: "add",
    check: null,
    phoneAttrs: () => ({}),
    codeAttrs: () => ({}),
    disabled: false,
  },
);

// emit
const emit = defineEmits<{
  "update:modelValue": [v?: string];
  "update:check": [v?: boolean | null];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);
const check = useVModel(props, "check", emit);

// api
const apiPhoneCheckCode = useApiSignUpPhoneCheckCode(uid);

// state
const phone = ref("");
const code = ref("");
const confirm = ref<string | null>(null);
const confirmTime = ref("");
const confirmCheck = ref(false);
const editing = ref(false);
const isFocus = ref(false);
const initVal = ref(modelValue.value);

// computed
const bindPhoneAttrs = computed(() => {
  const notKeys = ["class", "disabled", "readonly", "maxlength"];
  const attr = useObjectFilter({ ...props.phoneAttrs }, (el, key) => {
    return notKeys.indexOf(String(key)) === -1;
  });

  return attr;
});
const bindCodeAttrs = computed(() => {
  const notKeys = ["class", "disabled", "readonly"];
  const attr = useObjectFilter({ ...props.codeAttrs }, (el, key) => {
    return notKeys.indexOf(String(key)) === -1;
  });

  return attr;
});
const phoneCheck = computed(() => {
  const reg = usePhoneReg();
  return reg.test(modelValue.value);
});
const submitDisabled = computed(() => {
  return props.disabled || check.value === true;
});
const confirmDisabled = computed(() => {
  return props.disabled || confirmCheck.value;
});

// 번호 변환
const replaceNumberFromPhone = () => {
  phone.value = usePhoneNumber(phone.value.replace(/[^\d]/g, ""));
  modelValue.value = phone.value.replace(/[^\d]/g, "");
};
const replaceNumberFromModel = () => {
  const val = modelValue.value.replace(/[^\d]/g, "");
  if (val !== modelValue.value) {
    modelValue.value = val;
  }
  phone.value = usePhoneNumber(val);
};

// 발송 클릭
const getCodeClick = () => {
  if (submitDisabled.value) return;

  if (phoneCheck.value) {
    submitCode();
  } else {
    alertOpen({
      message: useT("alertMessage.011", ["휴대폰번호"]),
    });
  }
};

// 인증번호 발송
const submitCode = useDebounceFn(() => {
  initVal.value = "";
  check.value = false;
  confirmCheck.value = false;
  code.value = "";

  apiPhoneCheckCode.mutate(
    {
      cellPhone: modelValue.value,
    },
    {
      onSuccess: (data) => {
        confirm.value = data.data?.confirmNo || "";
        setTimer();
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data || {}),
        });
      },
    },
  );
}, 300);

// 3분 카운트다운
let timer: ReturnType<typeof setInterval>;
let min = 0;
let sec = 0;

const setTimer = () => {
  clearInterval(timer);

  min = 3;
  sec = 0;
  confirmTime.value = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

  timer = setInterval(() => {
    if (min === 0 && sec === 0) {
      clearInterval(timer);
      confirm.value = "";
    } else if (sec === 0) {
      min -= 1;
      sec = 59;
    } else {
      sec -= 1;
    }
    confirmTime.value = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }, 1000);
};

const clearTimer = () => {
  clearInterval(timer);
};

// 시간연장 클릭
const extendClick = useDebounceFn(() => {
  if (confirmDisabled.value) return;

  if (confirm.value?.length) {
    setTimer();
  } else {
    alertOpen({
      message: useT("alertMessage.012"),
    });
  }
}, 300);

// 확인 클릭
const confirmClick = useDebounceFn(() => {
  if (confirmDisabled.value || confirm.value === null) return;

  if (!confirm.value.length) {
    alertOpen({
      message: useT("alertMessage.012"),
    });
  } else if (confirm.value === useSha256(code.value)) {
    check.value = true;
    confirmCheck.value = true;
    clearTimer();
    alertOpen({
      message: useT("alertMessage.013"),
    });
  } else {
    alertOpen({
      message: useT("alertMessage.014"),
    });
  }
}, 300);

// 휴대폰번호 focus
const numFocus = () => {
  isFocus.value = true;
  phone.value = phone.value.replace(/[^\d]/g, "");
};
const numBlur = () => {
  isFocus.value = false;
  replaceNumberFromPhone();
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// setup
replaceNumberFromModel();

// watch
watch(phone, () => {
  const initPhone = usePhoneNumber(initVal.value.replace(/[^\d]/g, ""));
  if (phone.value === initVal.value || phone.value === initPhone) {
    check.value = true;
    editing.value = false;
  } else {
    check.value = false;
    editing.value = true;
  }
});
watch(modelValue, () => {
  if (
    modelValue.value.replace(/[^\d]/g, "") !== phone.value.replace(/[^\d]/g, "")
  ) {
    replaceNumberFromModel();
  }
});
</script>

<template>
  <div class="flex flex-row">
    <FormBasicInput
      v-model="phone"
      :type="isFocus ? 'tel' : 'text'"
      pattern="\d*"
      :class="cn('flex-1', phoneAttrs.class)"
      :disabled="disabled"
      title="휴대폰번호"
      :maxlength="isFocus ? 11 : 13"
      v-bind="bindPhoneAttrs"
      @focus="numFocus"
      @blur="numBlur"
    />
    <a
      v-if="type === 'add' || !(type === 'edit' && !editing)"
      role="button"
      tabindex="0"
      class="btn-txt dgray ml-[.8rem]"
      :aria-disabled="submitDisabled"
      @click="getCodeClick"
      @keypress.enter.space="getCodeClick"
    >
      {{ confirm !== null ? "인증번호 재발송" : "인증번호 발송" }}
    </a>
  </div>

  <div v-if="confirm !== null" class="ipt-wrap mt-[.8rem] md:mt-8">
    <div class="flex flex-row">
      <div class="relative flex-1">
        <FormBasicInput
          v-model="code"
          type="text"
          :class="codeAttrs.class"
          input-class="!pr-48 md:!pr-60"
          :disabled="confirmDisabled"
          title="인증번호"
          placeholder="인증번호"
          :use-clear="false"
          v-bind="bindCodeAttrs"
        />
        <p class="absolute right-[.8rem] top-[1.2rem] md:right-8 md:top-6">
          <span
            :class="[
              'fs-14 align-baseline leading-[2.4rem] text-e1error',
              {
                'opacity-30': confirmDisabled,
              },
            ]"
          >
            {{ confirmTime }}
          </span>
          <a
            role="button"
            tabindex="0"
            :class="[
              'btn-mini',
              {
                'opacity-30 hover:!cursor-default hover:!opacity-30 focus:!opacity-30':
                  confirmDisabled,
              },
            ]"
            :aria-disabled="confirmDisabled"
            @click="extendClick"
            @keypress.enter.space="extendClick"
          >
            시간연장
          </a>
        </p>
      </div>
      <a
        role="button"
        tabindex="0"
        class="btn-txt dgray ml-[.8rem]"
        :aria-disabled="confirmDisabled"
        @click="confirmClick"
        @keypress.enter.space="confirmClick"
      >
        확인
      </a>
    </div>
  </div>

  <CommonAlert ref="alertLayer" />
</template>
