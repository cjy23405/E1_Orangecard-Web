<script setup lang="ts">
import type { SessionAuth } from "@/types/stores";
import type { AlertOptions } from "@/types/components/common/Alert";

// 스토어
const stores = {
  auth: useStoreAuth(),
  session: useStoreSession(),
};

// hook
const hookPhoneAuth = useHookPhoneAuth("checkAuthAuthenticationPopup");
const hookIpinAuth = useHookIpinAuth("checkAuthAuthenticationPopup");

// api
const apiMyProfile = useApiMyProfile(false);

// emit
const emit = defineEmits<{
  authenticated: [v?: SessionAuth];
}>();

// state
const ciKey = ref<string>();

// computed
const isAuthenticated = computed(() => {
  return stores.auth.isAuthenticated;
});
const isInit = computed(() => {
  return typeof ciKey.value === "string";
});

// 휴대폰 인증
const phoneAuth = () => {
  if (!isInit.value) return;

  hookPhoneAuth
    ?.open()
    .then((data) => {
      if (
        (isAuthenticated.value && ciKey.value === data.ciKey) ||
        !isAuthenticated.value
      ) {
        stores.session.$setAuth({
          type: "PHONE",
          data,
        });
        if (stores.session.auth) {
          emit("authenticated", stores.session.auth);
        }
      } else {
        alertOpen({
          message: useT("alertMessage.021"),
        });
      }
    })
    .catch(() => {});
};

// 휴대폰 인증 클릭
const phoneClick = useDebounceFn(() => {
  phoneAuth();
}, 300);

// 아이핀 인증
const ipinAuth = () => {
  if (!isInit.value) return;

  hookIpinAuth
    ?.open()
    .then((data) => {
      if (
        (isAuthenticated.value && ciKey.value === data.ciKey) ||
        !isAuthenticated.value
      ) {
        stores.session.$setAuth({
          type: "IPIN",
          data,
        });
        if (stores.session.auth) {
          emit("authenticated", stores.session.auth);
        }
      } else {
        alertOpen({
          message: useT("alertMessage.021"),
        });
      }
    })
    .catch(() => {});
};

// 아이핀 인증 클릭
const ipinClick = useDebounceFn(() => {
  ipinAuth();
}, 300);

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// life cycle
onMounted(() => {
  stores.session.$setAuth(null);

  if (isAuthenticated.value) {
    apiMyProfile
      .refetch()
      .then(() => {
        const data = apiMyProfile.data.value?.data;

        if (data) {
          ciKey.value = data.ciKey;
        } else {
          ciKey.value = "";
        }
      })
      .catch(() => {
        if (apiMyProfile.error.value) {
          alertOpen({
            message: useApiGetErrorMessage(apiMyProfile.error.value.data),
          });
        }
      });
  } else {
    ciKey.value = "";
  }
});
onBeforeUnmount(() => {
  hookPhoneAuth?.clear();
  hookIpinAuth?.clear();
});
</script>

<template>
  <div class="inner md:!pt-40">
    <div class="flex flex-row md:px-[34.2rem]">
      <a
        role="button"
        tabindex="0"
        class="img-phone before:size- fs-14 relative h-[15.6rem] flex-1 rounded-lg border border-solid border-gray-300 pt-[7.7rem] text-center before:absolute before:left-1/2 before:top-[3.7rem] before:ml-[-2.4rem] before:block before:size-[4.8rem] before:bg-contain before:bg-center before:bg-no-repeat before:content-[''] md:h-96 md:pt-44 md:before:top-[5.6rem] md:before:ml-[-4.2rem] md:before:size-[8.4rem]"
        @click="phoneClick"
        @keypress.enter.space="phoneClick"
      >
        <p class="text-lg font-bold">휴대폰 인증</p>
      </a>
      <a
        role="button"
        tabindex="0"
        class="img-ipin fs-14 relative ml-[.8rem] h-[15.6rem] flex-1 rounded-lg border border-solid border-gray-300 pt-[7.7rem] text-center before:absolute before:left-1/2 before:top-[3.7rem] before:ml-[-2.4rem] before:block before:size-[4.8rem] before:bg-contain before:bg-center before:bg-no-repeat before:content-[''] md:h-96 md:pt-44 md:before:top-[5.6rem] md:before:ml-[-4.2rem] md:before:size-[8.4rem]"
        @click="ipinClick"
        @keypress.enter.space="ipinClick"
      >
        <p class="text-lg font-bold">아이핀 인증</p>
      </a>
    </div>
    <div
      class="mt-[1.6rem] rounded-lg bg-gray-100 p-[1.6rem] md:!mx-40 md:mt-[3.2rem]"
    >
      <ul class="list-dot text-gray-600">
        <li>
          오렌지카드는 신용평가기관인 SCI평가정보㈜를 통해 본인인증 서비스를
          제공하고 있으며, 본인인증 수단으로 휴대폰과 아이핀을 제공하고
          있습니다.
        </li>
        <li>
          본인인증에 문제가 있는 경우, SCI평가정보㈜ SIREN24 고객센터
          1577-1006로 문의해 주시기 바랍니다.
        </li>
      </ul>
    </div>

    <CommonAlert ref="alertLayer" />
  </div>
</template>

<style lang="css" scoped>
.img-phone:before {
  background-image: url("@/assets/img/auth-phone.png");
}
.img-ipin:before {
  background-image: url("@/assets/img/auth-ipin.png");
}
</style>
