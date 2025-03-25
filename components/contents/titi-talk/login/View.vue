<script setup lang="ts">
import type { LoginSetup, MyProfileResponse } from "@/types/api";

class HdnJsonData {
  Result_Cd!: "S" | "F";
  Result_Message?: string;
  CustomerKeyEnc?: string;
  Member_Name?: string;
  Login_Type?: "H" | "KAKAO" | "NAVER" | "";
}

// uid
const uid = getCurrentInstance()?.uid;

// route
const route = useRoute();

// 스토어
const stores = {
  auth: useStoreAuth(),
};

// api
const apiMyProfile = useApiMyProfile(false);
const apiEncodeCustomerKey = useApiMyEncodeCustomerKey(uid);

// state
const my = ref<MyProfileResponse>();
const login = ref<LoginSetup["data"]>();
const customerKey = ref("");
const hdnJsonData = ref("");

// ref
const form = useTemplateRef("form");

// computed
const callback_url = computed(() => {
  return typeof route.query.callback_url === "string"
    ? route.query.callback_url
    : null;
});

// 데이터 가공
const getHdnJsonData = () => {
  const data: HdnJsonData = {
    Result_Cd: "F",
    Result_Message: "로그인 실패",
    CustomerKeyEnc: "",
    Member_Name: "",
    Login_Type: "",
  };

  if (stores.auth.loginType && !/APPLE/.test(stores.auth.loginType)) {
    if (apiEncodeCustomerKey.error.value) {
      data.Result_Message = apiEncodeCustomerKey.error.value.message;
    } else if (my.value) {
      data.Result_Cd = "S";
      data.Result_Message = undefined;
      data.CustomerKeyEnc = customerKey.value || "";
      data.Member_Name = my.value.name;
      data.Login_Type = (
        stores.auth.loginType === "PASSWORD" ? "H" : stores.auth.loginType
      ) as HdnJsonData["Login_Type"];
    } else if (apiMyProfile.error.value) {
      data.Result_Message = apiMyProfile.error.value.message;
    } else if (login.value) {
      data.Result_Cd = "S";
      data.Result_Message = undefined;
      data.CustomerKeyEnc = customerKey.value || "";
      data.Member_Name = login.value.name;
      data.Login_Type = (
        stores.auth.loginType === "PASSWORD" ? "H" : stores.auth.loginType
      ) as HdnJsonData["Login_Type"];
    }
  }

  return JSON.stringify(data);
};

// submit
const submit = () => {
  nextTick(() => {
    if (form.value && callback_url.value) {
      apiEncodeCustomerKey.mutate(
        {},
        {
          onSuccess: (data) => {
            if (data.data) {
              customerKey.value = data.data.mem_id;
              hdnJsonData.value = getHdnJsonData();

              nextTick(() => {
                form.value?.submit();
              });
            }
          },
        },
      );
    }
  });
};

// login callback
const loginCallback: LoginSetup["callback"] = (type, data) => {
  login.value = data;
  submit();
};

// init
const init = () => {
  if (stores.auth.isAuthenticated) {
    apiMyProfile
      .refetch()
      .then(() => {
        if (apiMyProfile.data.value) {
          my.value = apiMyProfile.data.value.data;
          submit();
        }
      })
      .catch(() => {
        submit();
      });
  }
};

// life cycle
onMounted(() => {
  init();
});
</script>

<template>
  <ContentsLoginView :callback="loginCallback" />

  <ClientOnly>
    <form ref="form" method="post" :action="callback_url || ''">
      <input
        id="hdnJsonData"
        v-model="hdnJsonData"
        type="hidden"
        name="hdnJsonData"
      />
    </form>
  </ClientOnly>
</template>
