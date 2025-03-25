<script setup lang="ts">
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// 스토어
const stores = {
  session: useStoreSession(),
};

// api
const { mutate } = useApiMyDeleteAccount(uid);

// route
const localePath = useLocalePath();
const router = useRouter();

// authenticated
const authenticated = () => {
  if (!stores.session.password || !stores.session.auth) return;

  mutate(
    {
      ciKey: stores.session.auth.data.ciKey,
    },
    {
      onSuccess: () => {
        useHookKakaoRefreshTokenUnlink();
        router.push(localePath("/my-page/delete-account/done"));
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      },
    },
  );
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};
</script>

<template>
  <CommonCheckPasswordSession
    check-path="/my-page/delete-account/reminder"
    denied-path="/my-page/delete-account"
  >
    <CommonCheckAuth @authenticated="authenticated" />
  </CommonCheckPasswordSession>

  <CommonAlert ref="alertLayer" />
</template>
