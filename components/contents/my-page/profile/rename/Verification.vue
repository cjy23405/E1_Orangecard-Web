<script setup lang="ts">
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// 스토어
const stores = {
  auth: useStoreAuth(),
  session: useStoreSession(),
};

// api
const { isPending, mutate } = useApiMyRename(uid);

// route
const localePath = useLocalePath();
const router = useRouter();

// 회원명 변경
const rename = () => {
  if (!stores.session.auth) return;

  mutate(
    {
      ciKey: stores.session.auth.data.ciKey,
      newName: stores.session.auth.data.name,
    },
    {
      onSuccess: () => {
        alertOpen({
          message: useT("alertMessage.030"),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
                if (stores.auth.loginInfo && stores.session.auth?.data.name) {
                  stores.auth.$setLoginInfo({
                    ...stores.auth.loginInfo,
                    name: stores.session.auth.data.name,
                  });
                }
                stores.session.$setAuth(null);
                router.replace(localePath("/my-page"));
              },
            },
          ],
        });
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
const authenticated = () => {
  if (!isPending.value) {
    rename();
  }
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};
</script>

<template>
  <CommonCheckAuth @authenticated="authenticated" />
  <CommonAlert ref="alertLayer" />
</template>
