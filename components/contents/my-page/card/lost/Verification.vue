<script setup lang="ts">
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// 스토어
const stores = {
  session: useStoreSession(),
};

// api
const { isPending, mutate } = useApiCardLost(uid);

// route
const localePath = useLocalePath();
const router = useRouter();

// 분실 신고
const lost = () => {
  if (!stores.session.cardLost) return;

  mutate(
    {
      cardNum: stores.session.cardLost.cardNum,
    },
    {
      onSuccess: () => {
        alertOpen({
          message: useT("alertMessage.024"),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
                stores.session.$setAuth(null);
                stores.session.$setCardLost(null);
                router.replace(localePath("/my-page/card"));
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
    lost();
  }
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};
</script>

<template>
  <CommonBeforeunload />
  <ContentsMyPageCardLostCheckLostSession
    check-path="/my-page/card"
    denied-path="/my-page/card"
  />
  <CommonCheckAuth @authenticated="authenticated" />
  <CommonAlert ref="alertLayer" />
</template>
