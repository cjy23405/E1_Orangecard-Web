<script setup lang="ts">
import type { HookSelfGetDataEvent, KakaoAuthData } from "@/types/hooks";

// route
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();

// session
const kakaoSelfLogin = useSessionStorage<string | null>("kakaoSelfLogin", null);
const titiTalkLogin = useSessionStorage<string | null>("titiTalkLogin", null);

// state
const authData = ref<KakaoAuthData>();

// ref
const loginRaw = useTemplateRef("loginRaw");
const signUpRaw = useTemplateRef("signUpRaw");

// setData
const setData = (event: HookSelfGetDataEvent) => {
  if (event.data.action !== "onAuthKakaoResult") return;

  authData.value = event.data.params[0] as KakaoAuthData;

  const action = kakaoSelfLogin.value;

  kakaoSelfLogin.value = null;

  switch (action) {
    case "permalink":
      permalink();
      break;
    case "login":
      login();
      break;
    case "signUp":
      signUp();
      break;
    default:
      $kakaotalkClose();
      break;
  }
};

// permalink
const permalink = () => {
  if (!authData.value) return;
  loginRaw.value?.kakaoLogin(authData.value);
};

// login
const login = () => {
  if (!authData.value) return;

  const query = typeof route.query.state === "string" ? route.query.state : "";

  let callback;

  if (titiTalkLogin.value) {
    callback = () => {
      router.replace(`/titi-talk/login${query}`);
    };
  } else if (query) {
    callback = () => {
      router.replace(localePath(useEtcRoute(`/login${query}`)));
    };
  }

  loginRaw.value?.kakaoLogin(authData.value, callback);
};

// signUp
const signUp = () => {
  if (!authData.value) return;
  signUpRaw.value?.kakaoCheck(authData.value);
};

// life cycle
onMounted(() => {
  window.addEventListener("message", (e: HookSelfGetDataEvent) => {
    useHookSelfGetData(e, setData);
  });
});
</script>

<template>
  <div>
    <CommonPageBridge v-if="kakaoSelfLogin" />
    <ContentsLoginViewKakaoRaw ref="loginRaw" />
    <ContentsSignUpVerificationKakaoRaw ref="signUpRaw" />
  </div>
</template>
