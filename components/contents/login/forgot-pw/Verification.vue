<script setup lang="ts">
import type { SessionAuth } from "@/types/stores";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// 스토어
const stores = {
  session: useStoreSession(),
};

// api
const { isPending, mutate } = useApiForgotId(uid);

// route
const localePath = useLocalePath();
const router = useRouter();

// 가입 여부 체크
const check = (authData?: SessionAuth) => {
  if (!authData?.data) return;

  // ci 체크
  mutate(
    {
      ciKey: authData.data.ciKey,
    },
    {
      onSuccess: (data) => {
        if (!data.data) return;

        stores.session.$setForgot({
          loginId: data.data.loginId,
        });

        router.push(localePath(useEtcRoute("/login/forgot-pw/reset")));
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      },
    },
  );
};

// authenticated
const authenticated = (authData?: SessionAuth) => {
  if (!isPending.value) {
    check(authData);
  }
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// life cycle
onMounted(() => {
  stores.session.$setForgot(null);
});
</script>

<template>
  <CommonCheckAuth @authenticated="authenticated" />
  <CommonAlert ref="alertLayer" />
</template>
