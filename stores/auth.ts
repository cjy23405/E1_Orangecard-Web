import { defineStore } from "pinia";
import { DateTime } from "luxon";
import jsonStableStringify from "json-stable-stringify";
import type { LoginType } from "@/types/common";
import type { LoginInfo, CorpTaxiLoginAuth } from "@/types/api";
import type {
  CorpTaxiId,
  AuthLocalStorageStores,
  AuthCookiesStores,
} from "@/types/stores";

export const useStoreAuth = defineStore(
  "auth",
  () => {
    // state
    const id = ref("");
    const accessToken = ref("");
    const refreshToken = ref("");
    const timestamp = ref<number>(0);
    const loginInfo = ref<LoginInfo>(null);
    const loginType = ref<LoginType>(null);
    const kakaoRefreshToken = ref("");
    const corpTaxiId = ref<CorpTaxiId>(null);
    const corpTaxi = ref<CorpTaxiLoginAuth>(null);
    const corpTaxiTimestamp = ref<number>(0);

    // getters
    const isAuthenticated = computed(() => {
      return $getIsAuthenticated();
    });
    const isCorpTaxiAuthenticated = computed(() => {
      return $getIsCorpTaxiAuthenticated();
    });

    // actions
    function $setLocalStorageStores() {
      if (!window) return;

      const storage = localStorage.getItem("auth");

      if (!storage) return;

      const local: AuthLocalStorageStores = JSON.parse(storage);

      if (id.value !== local.id) {
        id.value = local.id || "";
      }

      if (
        JSON.stringify(corpTaxiId.value) !== JSON.stringify(local.corpTaxiId)
      ) {
        corpTaxiId.value = local.corpTaxiId || null;
      }
    }
    function $setCookiesStores() {
      if (!window) return;

      const cookie = useCookie<AuthCookiesStores>("auth");

      if (!cookie.value) {
        accessToken.value = "";
        refreshToken.value = "";
        timestamp.value = 0;
        loginInfo.value = null;
        loginType.value = null;
        kakaoRefreshToken.value = "";
        corpTaxi.value = null;
        corpTaxiTimestamp.value = 0;

        return;
      }

      if (accessToken.value !== cookie.value.accessToken) {
        accessToken.value = cookie.value.accessToken || "";
      }

      if (refreshToken.value !== cookie.value.refreshToken) {
        refreshToken.value = cookie.value.refreshToken || "";
      }

      if (timestamp.value !== cookie.value.timestamp) {
        timestamp.value = cookie.value.timestamp || 0;
      }

      if (
        jsonStableStringify(loginInfo.value) !==
        jsonStableStringify(cookie.value.loginInfo || null)
      ) {
        loginInfo.value = cookie.value.loginInfo || null;
      }

      if (loginType.value !== (cookie.value.loginType || null)) {
        loginType.value = cookie.value.loginType || null;
      }

      if (kakaoRefreshToken.value !== cookie.value.kakaoRefreshToken) {
        kakaoRefreshToken.value = cookie.value.kakaoRefreshToken || "";
      }

      if (
        jsonStableStringify(corpTaxi.value) !==
        jsonStableStringify(cookie.value.corpTaxi || null)
      ) {
        corpTaxi.value = cookie.value.corpTaxi || null;
      }

      if (corpTaxiTimestamp.value !== cookie.value.corpTaxiTimestamp) {
        corpTaxiTimestamp.value = cookie.value.corpTaxiTimestamp || 0;
      }
    }
    function $getIsAuthenticated() {
      $setLocalStorageStores();
      $setCookiesStores();

      if (!timestamp.value) return false;

      const minute = 30;

      const limit = timestamp.value
        ? DateTime.fromMillis(timestamp.value).plus({ minute }).toMillis()
        : 0;

      return limit ? DateTime.fromMillis(limit) > DateTime.now() : false;
    }
    function $setId(v: string) {
      id.value = v;
    }
    function $setAccessToken(v: string) {
      accessToken.value = v;
    }
    function $setRefreshToken(v: string) {
      refreshToken.value = v;
    }
    function $setTimestamp(v: number) {
      timestamp.value = v;
    }
    function $setLoginInfo(v: LoginInfo) {
      loginInfo.value = v;
    }
    function $setLoginType(v: LoginType) {
      loginType.value = v;
    }
    function $setKakaoRefreshToken(v: string) {
      kakaoRefreshToken.value = v;
    }
    function $getIsCorpTaxiAuthenticated() {
      $setLocalStorageStores();
      $setCookiesStores();

      if (!corpTaxiTimestamp.value) return false;

      const minute = 30;

      const limit = corpTaxiTimestamp.value
        ? DateTime.fromMillis(corpTaxiTimestamp.value)
            .plus({ minute })
            .toMillis()
        : 0;

      return limit ? DateTime.fromMillis(limit) > DateTime.now() : false;
    }
    function $setCorpTaxiId(v: CorpTaxiId) {
      corpTaxiId.value = v;
    }
    function $setCorpTaxi(v: CorpTaxiLoginAuth) {
      corpTaxi.value = v;
    }
    function $setCorpTaxiTimestamp(v: number) {
      corpTaxiTimestamp.value = v;
    }

    return {
      // state
      id,
      accessToken,
      refreshToken,
      timestamp,
      loginInfo,
      loginType,
      kakaoRefreshToken,
      corpTaxiId,
      corpTaxi,
      corpTaxiTimestamp,

      // getters
      isAuthenticated,
      isCorpTaxiAuthenticated,

      // actions
      $setLocalStorageStores,
      $setCookiesStores,
      $getIsAuthenticated,
      $setId,
      $setAccessToken,
      $setRefreshToken,
      $setTimestamp,
      $setLoginInfo,
      $setLoginType,
      $setKakaoRefreshToken,
      $getIsCorpTaxiAuthenticated,
      $setCorpTaxiId,
      $setCorpTaxi,
      $setCorpTaxiTimestamp,
    };
  },
  {
    persist: [
      {
        pick: ["id", "corpTaxiId"],
        storage: piniaPluginPersistedstate.localStorage(),
      },
      {
        pick: [
          "accessToken",
          "refreshToken",
          "timestamp",
          "loginInfo",
          "loginType",
          "kakaoRefreshToken",
          "corpTaxi",
          "corpTaxiTimestamp",
        ],
        storage: piniaPluginPersistedstate.cookies({
          secure: true,
        }),
      },
    ],
  },
);
