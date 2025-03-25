<script setup lang="ts">
import type {
  HookSelfGetDataEvent,
  KakaoAuthData,
  NaverAuthData,
} from "@/types/hooks";
import type {
  TitiTalkAuthData,
  TitiTalkAuthHdnJsonData,
  TitiTalkAuthQuery,
} from "@/types/components/contents/titi-talk/auth";

// session
const titiTalkAuth = useSessionStorage<string | null>("titiTalkAuth", null);

// state
const authData = ref<TitiTalkAuthData>();
const hdnJsonData = ref("");

// ref
const form = useTemplateRef("form");

// computed
const session = computed<TitiTalkAuthQuery | null>(() => {
  return titiTalkAuth.value ? JSON.parse(titiTalkAuth.value) : null;
});
const callback_url = computed(() => {
  return session.value?.callback_url || null;
});

// 데이터 가공
const getHdnJsonData = () => {
  const data: TitiTalkAuthHdnJsonData = {
    Result_Cd: "F",
    Result_Message: "본인인증 실패",
    Member_Channel: "",
    Member_Channel_Detail: "",
    Member_Name: "",
    Cellular_Phone: "",
    Cellular_Phone_Mask: "",
    Member_CI_Key: "",
    BirthDay: "",
    Foreign_Flg: "",
    Sex_MF: "",
    Ipin_Certification_Method: "",
    SnsContType: "",
    SNS_ID: "",
  };

  if (session.value && authData.value) {
    data.Result_Cd = "S";
    data.Result_Message = "";
    data.Member_Channel = session.value.sbsc_channel;
    data.Member_Channel_Detail = authData.value.type;
    data.SnsContType = authData.value.type;

    switch (authData.value.type) {
      case "KAKAO":
        data.Member_Name = authData.value.data.user.kakao_account.name;
        data.Cellular_Phone =
          authData.value.data.user.kakao_account.phone_number
            .replace(/^\+82 /, "0")
            .replace(/-/g, "");
        data.Member_CI_Key = authData.value.data.user.kakao_account.ci;
        data.BirthDay =
          authData.value.data.user.kakao_account.birthyear +
          authData.value.data.user.kakao_account.birthday;
        data.Ipin_Certification_Method = "70";
        data.SNS_ID = String(authData.value.data.user.id);
        break;
      case "NAVER":
        data.SNS_ID = authData.value.data.id;
        break;
      default:
        break;
    }
  }

  return JSON.stringify(data);
};

// submit
const submit = () => {
  nextTick(() => {
    hdnJsonData.value = getHdnJsonData();

    nextTick(() => {
      if (form.value && callback_url.value) {
        form.value.submit();
      }
    });
  });
};

// setData
const setData = (event: HookSelfGetDataEvent) => {
  if (session.value) {
    switch (event.data.action) {
      case "onAuthKakaoResult":
        authData.value = {
          type: "KAKAO",
          data: event.data.params[0] as KakaoAuthData,
        };
        submit();
        break;
      case "onAuthNaverResult":
        authData.value = {
          type: "NAVER",
          data: event.data.params[0] as NaverAuthData,
        };
        submit();
        break;
      default:
        submit();
        break;
    }
  }
};

// life cycle
onMounted(() => {
  window.addEventListener("message", (e: HookSelfGetDataEvent) => {
    useHookSelfGetData(e, setData);
  });
});
</script>

<template>
  <form ref="form" method="post" :action="callback_url || ''">
    <input
      id="hdnJsonData"
      v-model="hdnJsonData"
      type="hidden"
      name="hdnJsonData"
    />
  </form>
</template>
