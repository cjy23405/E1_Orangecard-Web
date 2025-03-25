<script setup lang="ts">
import type { LoginSetup } from "@/types/api";
import type { KakaoAuthData } from "@/types/hooks";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// api
const { isPending, mutate } = useApiAuthSnsLogin(uid);

// ref
const signUpRaw = useTemplateRef("signUpRaw");

// 카카오 로그인
const kakaoLogin = (
  kakaoData: KakaoAuthData,
  callback?: LoginSetup["callback"],
) => {
  if (isPending.value) return;

  mutate(
    {
      snsType: "kakao",
      snsId: String(kakaoData.user.id),
    },
    {
      onSuccess: (data) => {
        if (!data.data) return;

        useHookKakaoLogin(kakaoData.token.refresh_token);
        useApiAuthLoginSetup({
          type: "KAKAO",
          data: data.data,
          callback,
        });
      },
      onError: (err) => {
        if (err.data.header?.code === "B0004") {
          signUpRaw.value?.kakaoCheck(kakaoData, true);
        } else {
          alertOpen({
            message: useApiGetErrorMessage(err.data),
          });
        }
      },
    },
  );
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// expose
defineExpose({
  kakaoLogin,
});
</script>

<template>
  <div class="!hidden">
    <CommonAlert ref="alertLayer" />
    <ContentsSignUpVerificationKakaoRaw ref="signUpRaw" />
  </div>
</template>
