<script setup lang="ts">
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// api
const apiCampaign = useApiEventCampaignEntryPermaLink(uid);

// route
const route = useRoute();
const router = useRouter();

// check query
const checkQuery = (key: string) => {
  if (typeof route.query[key] === "string") {
    return route.query[key];
  } else {
    return null;
  }
};

// init
const init = () => {
  const id = checkQuery("id");

  if (id) {
    campaignCallback();
  }
};

// campaign callback
const campaignCallback = () => {
  const id = checkQuery("id");

  if (!id) return;

  apiCampaign.mutate(
    {
      campaignId: id,
    },
    {
      onSuccess: () => {
        alertOpen({
          message: useT("alertMessage.037"),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
                router.replace("/");
              },
            },
          ],
        });
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
                router.replace("/");
              },
            },
          ],
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

// life cycle
onMounted(() => {
  init();
});
</script>

<template>
  <div>
    <CommonPageBridge />
    <CommonAlert ref="alertLayer" />
  </div>
</template>
