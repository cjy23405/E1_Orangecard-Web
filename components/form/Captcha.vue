<script setup lang="ts">
import type { CaptchaCodeResponse } from "@/types/api";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// props
const props = defineProps<{
  modelValue?: string;
  check?: boolean;
}>();

// emit
const emit = defineEmits<{
  "update:modelValue": [v?: string];
  "update:check": [v?: boolean];
}>();

// v-model
const modelValue = useVModel(props, "modelValue", emit);
const check = useVModel(props, "check", emit);

// api
const { isPending, mutate } = useApiAuthCaptchaCode(uid);

// state
const captcha = ref<CaptchaCodeResponse>();

// 캡챠 get
const setCaptcha = async () => {
  mutate(
    {},
    {
      onSuccess: (data) => {
        if (!data.data) return;
        captcha.value = data.data;
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      },
    },
  );
};

// 캡챠 새로고침
const captchaRefresh = useDebounceFn(() => {
  if (isPending.value) return;
  modelValue.value = "";
  setCaptcha();
}, 300);

// update
const update = () => {
  nextTick(() => {
    if (captcha.value && modelValue.value) {
      check.value =
        captcha.value.hashedCaptcha === useSha256(modelValue.value, "captcha");
    } else {
      check.value = false;
    }
  });
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// watch
watch(captcha, () => {
  update();
});

// life cycle
onMounted(() => {
  setCaptcha();
});

// expose
defineExpose({
  captchaRefresh,
});
</script>

<template>
  <div class="mt-[.8rem]">
    <div class="line-box relative flex h-28 justify-center !p-0 md:h-[11.2rem]">
      <img
        v-if="captcha?.base64Image"
        :src="`data:image/png;base64,${captcha.base64Image}`"
        class="h-full"
      />
      <a
        role="button"
        tabindex="0"
        class="btn-refresh absolute right-[.4rem] top-[.4rem] size-[2.4rem] bg-contain bg-center bg-no-repeat text-zero md:right-[.8rem] md:top-[.8rem]"
        :aria-disabled="isPending"
        @click="captchaRefresh"
        @keypress.enter.space="captchaRefresh"
      >
        보안문자 새로고침
      </a>
    </div>

    <FormField name="captcha">
      <FormItem>
        <FormValidation class="my-[.8rem]">
          <FormControl>
            <FormBasicInput
              id="captcha"
              v-model="modelValue"
              type="text"
              title="보안문자"
              placeholder="보안문자를 입력해주세요."
              required
              @update:model-value="update"
            />
          </FormControl>
        </FormValidation>
      </FormItem>
    </FormField>

    <div class="gray-box">
      <ul class="list-dot text-gray-600">
        <li>보안문자는 대·소문자를 구분하지 않습니다.</li>
      </ul>
    </div>

    <CommonAlert ref="alertLayer" />
  </div>
</template>

<style lang="css" scoped>
.btn-refresh {
  background-image: url("@/assets/img/login/btn-refresh.png");
}
</style>
