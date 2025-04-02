import ko from "./locales/ko.json";
import en from "./locales/en.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ko",
  fallbackLocale: "ko",
  messages: {
    ko,
    en,
  },
  ignorePaths: [
    "/bridge",
    "/auth/kakao",
    "/auth/kakao/callback",
    "/auth/naver",
    "/auth/naver/callback",
    "/titi-talk/auth",
    "/titi-talk/login",
    "/m/join/kakao/permalink",
    "/m/event/869",
    "/etc/kakao-permalink",
    "/etc/kakao-permalink/event",
  ],
}));
