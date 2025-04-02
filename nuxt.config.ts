import { resolve } from "path";
import type { NuxtPage } from "@nuxt/schema";
import pkg from "./package.json";
import {
  getAssociationServiceList,
  getEventList,
  getEventAnnouncementList,
  getNoticeList,
} from "./utils/nitro-prerender";
import { tabs as agreementTabs } from "./components/contents/customer/agreement/Tabs/initTabs";
import type { LocaleObject } from "@nuxtjs/i18n";

const locales: LocaleObject<string>[] = [
  { code: "ko", language: "ko-KR" },
  { code: "en", language: "en-US" },
];

const IS_DEV =
  process.env.IS_DEV || String(process.env.NODE_ENV === "development");

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/assets/favicon.ico",
        },
        {
          rel: "stylesheet",
          href: "/assets/fonts/style.css",
        },
      ],
      script: [
        {
          src: "/lib/kakao/kakao.min.js",
          onload: "document.dispatchEvent(new Event('kakaoSDKLoaded'));",
        },
        {
          src: "/lib/naver/naveridlogin_js_sdk_2.0.2.js",
          onload: "document.dispatchEvent(new Event('naverSDKLoaded'));",
        },
      ],
    },
  },
  compatibilityDate: "2024-04-03",
  css: ["@/assets/css/common.css"],
  devServer: {
    https: {
      key: "./.https/STAR.e1orangecard.com_key.pem",
      cert: "./.https/STAR.e1orangecard.com_cert.pem",
    },
    port: 443,
  },
  devtools: { enabled: true },
  eslint: {
    checker: {
      fix: true,
    },
  },
  gtag: {
    enabled: IS_DEV !== "true",
    id: process.env.GTAG_ID,
  },
  hooks: {
    // 확장 path 추가
    "pages:extend"(pages: NuxtPage[]) {
      pages.push({
        name: "kakaoPermalink",
        path: "/m/join/kakao/permalink",
        file: resolve(__dirname, "pages/etc/kakao-permalink/index.vue"),
      });
      pages.push({
        name: "kakaoPermalinkEvent",
        path: "/m/event/:id",
        file: resolve(__dirname, "pages/etc/kakao-permalink/event/index.vue"),
      });
    },

    // prerender 동적 경로 생성 (SEO 를 위해..)
    "prerender:routes": async ({ routes }) => {
      // 라우트 추가
      const add = (path: string) => {
        routes.add(path);

        locales.forEach((item) => {
          routes.add(`/${item.code}${path}`);
        });
      };

      // 카카오 퍼머링크
      routes.add("/m/join/kakao/permalink");
      routes.add("/m/event/869");

      // 제휴혜택 > 제휴서비스
      const associationServiceList = await getAssociationServiceList();
      associationServiceList?.data?.forEach((item) => {
        if (item.displayType === "1") {
          add(`/association/service/${item.partnershipServiceId}`);
        }
      });

      // 이벤트 > 진행이벤트
      const eventList = await getEventList({
        ongoingEvent: true,
      });
      eventList?.data?.forEach((item) => {
        add(`/event/${item.postingNo}`);
      });

      // 이벤트 > 종료이벤트
      const eventEndList = await getEventList({
        ongoingEvent: false,
      });
      eventEndList?.data?.forEach((item) => {
        add(`/event/end/${item.postingNo}`);
      });

      // 이벤트 > 당첨자발표
      const eventAnnouncementList = await getEventAnnouncementList();
      eventAnnouncementList?.data?.forEach((item) => {
        add(`/event/announcement/${item.postingNo}`);
      });

      // 고객센터 > 공지사항
      const noticeList = await getNoticeList();
      noticeList?.data?.forEach((item) => {
        add(`/customer/notice/${item.postingNo}`);
      });

      // 고객센터 > 서비스약관
      agreementTabs.forEach((item, i) => {
        add(`/customer/agreement/${i}`);
      });
    },
  },
  i18n: {
    defaultLocale: "ko",
    strategy: "prefix_and_default",
    locales,
  },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "shadcn-nuxt",
    "nuxt-gtag",
  ],
  nitro: {
    preset: "nitro-prerender",
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
    hooks: {
      "prerender:generate": (ctx) => {
        // crawlLinks 중 404는 무시처리
        if (ctx.error) {
          if (ctx.error.statusCode === 404) {
            console.warn(`⚠️ [WARN] Ignoring 404 error: ${ctx.route}`);
            return false;
          } else {
            throw ctx.error;
          }
        }

        // 운영 build 시 pub, test 화면들은 제외
        if (IS_DEV !== "true") {
          const reg = new RegExp(`^/(pub|test)`);

          if (reg.test(ctx.route)) {
            ctx.skip = true;
          }

          locales.forEach((locale) => {
            const localeReg = new RegExp(`^/${locale.code}/(pub|test)`);

            if (localeReg.test(ctx.route)) {
              ctx.skip = true;
            }
          });
        }
      },
    },
  },
  runtimeConfig: {
    public: {
      IS_DEV,

      APP_VERSION: pkg.version,

      API_BASE_URL: process.env.API_BASE_URL,
      DOWNLOAD_URL: process.env.DOWNLOAD_URL,
      ROOT_URL: process.env.ROOT_URL,

      NAVER_CLIENTID: process.env.NAVER_CLIENTID,

      KAKAO_API_KEY: process.env.KAKAO_API_KEY,
      KAKAO_SCRIPT_KEY: process.env.KAKAO_SCRIPT_KEY,

      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
  typescript: {
    typeCheck: true,
  },
  vite: {
    resolve: {
      alias: {
        "class-transformer": "class-transformer/cjs",
      },
    },
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          if (
            warning.message.includes("lottie-web") &&
            (warning.code === "SOURCEMAP_ERROR" || warning.code === "EVAL")
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
  },
});
