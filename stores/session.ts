import { defineStore } from "pinia";
import type {
  SessionPassword,
  SessionAuth,
  SessionSignUp,
  SessionForgot,
  SessionCardLost,
} from "@/types/stores/session";

export const useStoreSession = defineStore("session", () => {
  // state
  const password = ref<SessionPassword | null>(null);
  const auth = ref<SessionAuth | null>(null);
  const signUp = ref<SessionSignUp | null>(null);
  const forgot = ref<SessionForgot | null>(null);
  const cardLost = ref<SessionCardLost | null>(null);

  // getters
  // const foo = computed(() => "ex : " + bar.value);

  // actions
  function $setPassword(v: SessionPassword | null) {
    password.value = v;
  }
  function $setAuth(v: SessionAuth | null) {
    auth.value = v;
  }
  function $setSignUp(v: SessionSignUp | null) {
    signUp.value = v;
  }
  function $setForgot(v: SessionForgot | null) {
    forgot.value = v;
  }
  function $setCardLost(v: SessionCardLost | null) {
    cardLost.value = v;
  }

  return {
    // state
    password,
    auth,
    signUp,
    forgot,
    cardLost,

    // getters
    // foo,

    // actions
    $setPassword,
    $setAuth,
    $setSignUp,
    $setForgot,
    $setCardLost,
  };
});
