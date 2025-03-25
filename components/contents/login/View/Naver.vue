<script setup lang="ts">
import type { LoginSetup } from "@/types/api";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// props
const props = defineProps<{
  callback?: LoginSetup["callback"];
}>();

// hook
const hookNaverAuth = useHookNaverAuth("loginAuthenticationPopup");

// api
const { isPending, mutate } = useApiAuthSnsLogin(uid);

// 네이버 인증
const naverAuth = () => {
  hookNaverAuth
    ?.open()
    .then((naverData) => {
      mutate(
        {
          snsType: "naver",
          snsId: naverData.id,
        },
        {
          onSuccess: (data) => {
            if (!data.data) return;

            useApiAuthLoginSetup({
              type: "NAVER",
              data: data.data,
              callback: props.callback,
            });
          },
          onError: (err) => {
            alertOpen({
              message: useApiGetErrorMessage(err.data),
            });
          },
        },
      );
    })
    .catch(() => {});
};

// 네이버 인증 클릭
const naverClick = useDebounceFn(() => {
  if (!isPending.value) {
    naverAuth();
  }
}, 300);

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// life cycle
onBeforeUnmount(() => {
  hookNaverAuth?.clear();
});
</script>

<template>
  <div class="btn-wrap">
    <a
      role="button"
      tabindex="0"
      class="btn-txt bg-[#03c75a] font-bold text-white md:!max-w-full"
      @click="naverClick"
      @keypress.enter.space="naverClick"
    >
      <i
        class="naver mr-[.4rem] mt-[-.2rem] inline-block size-[2.8rem] bg-contain bg-center bg-no-repeat"
      ></i
      >네이버 로그인
    </a>

    <CommonAlert ref="alertLayer" />
  </div>
</template>

<style lang="css" scoped>
.naver {
  background-image: url("@/assets/img/login/btn-login-naver.png");
}
</style>
