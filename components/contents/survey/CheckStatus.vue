<script setup lang="ts">
import type { AlertOptions } from "@/types/components/common/Alert";
import type {
  SurveyQuery,
  SurveySession,
} from "@/types/components/contents/survey";

// uid
const uid = getCurrentInstance()?.uid;

// props
const props = withDefaults(
  defineProps<{
    id: number;
    query?: SurveyQuery | null;
    sessionData?: SurveySession;
  }>(),
  {
    id: 0,
    query: null,
    sessionData: undefined,
  },
);

// emit
const emit = defineEmits<{
  onSuccess: [code: string, data: SurveySession];
  onError: [code: string, data?: SurveySession];
}>();

// 스토어
const stores = {
  auth: useStoreAuth(),
};

// api
const { mutateAsync } = useApiSurveyCheck(uid);

// computed
const isAuthenticated = computed(() => {
  return stores.auth.isAuthenticated;
});

// 상태 체크
const statusCheck = async () => {
  const encryptedCustomerKey = (() => {
    if (
      props.sessionData &&
      props.sessionData.status === 2 &&
      props.sessionData.query?.P1 &&
      props.sessionData.query?.P2
    ) {
      return String(props.sessionData.query.P1);
    } else if (
      props.sessionData &&
      props.sessionData.status === 1 &&
      props.sessionData.query?.c
    ) {
      return String(props.sessionData.query.c);
    } else {
      if (props.query?.P1 && props.query?.P2) {
        return String(props.query.P1);
      } else if (props.query?.c) {
        return String(props.query.c);
      } else {
        return;
      }
    }
  })();
  const stationId = (() => {
    if (
      props.sessionData &&
      props.sessionData.status === 2 &&
      props.sessionData.query?.P1 &&
      props.sessionData.query?.P2
    ) {
      return Number(props.sessionData.query.P2);
    } else {
      if (props.query?.P1 && props.query?.P2) {
        return Number(props.query.P2);
      } else {
        return;
      }
    }
  })();
  const customerKey = (() => {
    if (!encryptedCustomerKey && isAuthenticated) {
      return stores.auth.loginInfo?.customerKey;
    } else {
      return;
    }
  })();

  if (encryptedCustomerKey || customerKey) {
    await mutateAsync(
      {
        surveyId: props.id,
        customerKey,
        encryptedCustomerKey,
        stationId,
      },
      {
        onSuccess: (data) => {
          if (data.header) {
            emit("onSuccess", data.header.code, {
              id: props.id,
              status: stationId ? 2 : encryptedCustomerKey ? 1 : 0,
              query: stationId
                ? {
                    P1: encryptedCustomerKey,
                    P2: stationId,
                  }
                : encryptedCustomerKey
                  ? {
                      c: encryptedCustomerKey,
                    }
                  : undefined,
            });
          }
        },
        onError: (err) => {
          if (
            err.data.header?.code &&
            /^(B0090|B0091)$/.test(err.data.header.code)
          ) {
            emit("onError", err.data.header.code || "");
          } else if (err.data) {
            alertOpen({
              message: useApiGetErrorMessage(err.data),
            });
          }
        },
      },
    ).catch(() => {});
  } else {
    emit("onError", "_", {
      id: props.id,
      status: 0,
    });
  }
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// life cycle
onMounted(() => {
  statusCheck();
});
</script>

<template>
  <CommonAlert ref="alertLayer" />
</template>
