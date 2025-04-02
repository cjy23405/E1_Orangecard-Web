import CryptoJS from "crypto-js";
import { DateTime } from "luxon";
import jsonStableStringify from "json-stable-stringify";
import type { LocationQueryValue } from "vue-router";
import type { BooleanYN, FuelCode, FuelList } from "@/types/common";
import type { KakaoAuthData } from "@/types/hooks";
import type { SessionSignUpKakaoData } from "@/types/stores";

// ########################################
// ################ actions ###############
// ########################################

// replace home
export const $replaceHome = () => {
  const router = useRouter();
  const localePath = useLocalePath();

  router.replace({
    path: localePath("/main"),
  });
};

// replace login
export const $replaceLogin = () => {
  const route = useRoute();
  const router = useRouter();
  const localePath = useLocalePath();

  router.replace({
    path: localePath(useEtcRoute("/login")),
    query: {
      returnurl: route.fullPath,
    },
  });
};

// replace 법인 택시 login
export const $replaceCorpTaxiLogin = () => {
  const route = useRoute();
  const router = useRouter();
  const localePath = useLocalePath();

  router.replace({
    path: localePath("/etc/corporate-taxi/login"),
    query: {
      returnurl: route.fullPath,
    },
  });
};

// element focus
export const $elFocus = (el: HTMLElement | null) => {
  if (!el) return;

  const focusTags =
    "a, button, input, area, audio, embed, iframe, object, select, video";

  if (!el.matches(focusTags) && !el.getAttribute("tabindex")) {
    el.setAttribute("tabindex", "-1");
  }

  if (el.matches('button[role="combobox"] ~ select')) {
    el.parentNode
      ?.querySelector<HTMLButtonElement>('button[role="combobox"]')
      ?.focus();
  } else if (!(!el.offsetWidth && !el.offsetHeight)) {
    el.focus();
  }
};

// clear sign up session store
export const $clearSignUpSession = () => {
  const stores = {
    session: useStoreSession(),
  };
  const locale = useLocale();
  const reg = new RegExp(`(^|^/${locale})(/etc)*/sign-up`);
  const route = useRoute();

  if (!reg.test(route.fullPath) && stores.session.signUp) {
    stores.session.$setSignUp(null);
  }
};

// clear forgot session store
export const $clearForgotSession = () => {
  const stores = {
    session: useStoreSession(),
  };
  const locale = useLocale();
  const reg = new RegExp(
    `(^|^/${locale})(/etc)*(/login/forgot-id|/login/forgot-pw)`,
  );
  const route = useRoute();

  if (!reg.test(route.fullPath) && stores.session.forgot) {
    stores.session.$setForgot(null);
  }
};

// clear titiTalk session
export const $clearTitiTalkSession = () => {
  const titiTalkAuth = useSessionStorage<string | null>("titiTalkAuth", null);
  const titiTalkLogin = useSessionStorage<string | null>("titiTalkLogin", null);
  const locale = useLocale();
  const reg = new RegExp(`(^|^/${locale})(/titi-talk|/auth)`);
  const route = useRoute();

  if (!reg.test(route.fullPath)) {
    if (titiTalkAuth.value) {
      titiTalkAuth.value = null;
    }
    if (titiTalkLogin.value) {
      titiTalkLogin.value = null;
    }
  }
};

// clear etc session
export const $clearEtcSession = () => {
  const etcInflow = useSessionStorage<string | null>("etcInflow", null);
  const locale = useLocale();
  const reg = new RegExp(
    `(^|^/${locale})(/etc|/survey|/m/join/kakao/permalink|/auth/kakao)`,
  );
  const route = useRoute();

  if (!reg.test(route.fullPath) && etcInflow.value) {
    etcInflow.value = null;
  }
};

// download
export const $download = (url: string) => {
  if (!window) return;

  const name = useFileName(url);

  fetch(url, { mode: "cors" })
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch(() => {
      window.open(url);
    });
};

// set seo
export const $setSEO = ({
  boardTitle,
  location,
  description,
  image,
}: {
  boardTitle?: string;
  location?: string[];
  description?: string;
  image?: string;
}) => {
  const { $constants } = useNuxtApp();
  const rootURL = $constants.rootURL();
  const route = useRoute();
  const title =
    Array.isArray(location) && location.length
      ? (boardTitle ? `${boardTitle} | ` : "") +
        location
          .map((item) => {
            return item.replace(/&#mBr#&/g, " ");
          })
          .join(" < ") +
        ` < ${useT("location.000")}`
      : useT("head.title");
  const metaDescription = description || useT("head.description");
  const metaImage = image || `${rootURL}/assets/images/og_graph_image.png`;

  useHead({
    title: title || useT("head.title"),
    meta: [
      { name: "title", content: title },
      { name: "description", content: metaDescription },
      { name: "robots", content: "index,nofollow" },

      // og
      { property: "og:url", content: rootURL + route.fullPath },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      {
        property: "og:description",
        content: metaDescription,
      },
      { property: "og:image", content: metaImage },

      // twitter
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      {
        name: "twitter:description",
        content: metaDescription,
      },
      { name: "twitter:image", content: metaImage },
    ],
  });
};

// kakaotalk window close
export const $kakaotalkClose = () => {
  if (!window) return;

  const userAgent = window.navigator.userAgent;
  const isIos = Boolean(userAgent.match(/iPod|iPhone|iPad/));
  const isAndroid = Boolean(userAgent.match(/Android/));

  if (isIos) {
    window.location.href = "kakaotalk://inappbrowser/close";
  } else if (isAndroid) {
    window.location.href = "kakaoweb://closeBrowser";
  }

  window.close();
};

// ########################################
// ################ getter ################
// ########################################

// GNB Menus
type Gnb = {
  id: string;
  text: string;
  path: string;
  depth?: {
    id: string;
    text: string;
    path: string;
  }[];
}[];
export const useGnbList = (): Gnb => {
  const gnb: Gnb = [
    {
      id: "001",
      text: useT("location.001"),
      path: "/about/point-card",
      depth: [
        {
          id: "001001",
          text: useT("location.001001"),
          path: "/about/point-card",
        },
        {
          id: "001002",
          text: useT("location.001002"),
          path: "/about/titi",
        },
      ],
    },
    {
      id: "002",
      text: useT("location.002"),
      path: "/association/card",
      depth: [
        {
          id: "002001",
          text: useT("location.002001"),
          path: "/association/card",
        },
        {
          id: "002002",
          text: useT("location.002002"),
          path: "/association/service",
        },
      ],
    },
    {
      id: "003",
      text: useT("location.003"),
      path: "/event",
      depth: [
        {
          id: "003001",
          text: useT("location.003001"),
          path: "/event",
        },
        {
          id: "003002",
          text: useT("location.003002"),
          path: "/event/end",
        },
        {
          id: "003003",
          text: useT("location.003003"),
          path: "/event/announcement",
        },
      ],
    },
    {
      id: "004",
      text: useT("location.004"),
      path: "/customer/notice",
      depth: [
        {
          id: "004001",
          text: useT("location.004001"),
          path: "/customer/notice",
        },
        {
          id: "004002",
          text: useT("location.004002"),
          path: "/customer/faq",
        },
        {
          id: "004003",
          text: useT("location.004003"),
          path: "/customer/contact",
        },
        {
          id: "004004",
          text: useT("location.004004"),
          path: "/customer/agreement",
        },
      ],
    },
  ];

  // id: "100" = 법인택시(/etc/corporate-taxi)에서 이용중

  return gnb;
};

// 1뎁스 GNB Active
export const useGnbCheckActive = (id: string): boolean => {
  const stores = {
    layout: useStoreLayout(),
  };

  const active: string = stores.layout.gnbActive;
  const reg = new RegExp(`^${id}\\d{0,3}$`);

  return reg.test(active);
};

// 2뎁스 GNB Active
export const useGnbDepthCheckActive = (id: string): boolean => {
  const stores = {
    layout: useStoreLayout(),
  };

  const active: string = stores.layout.gnbActive;
  const reg = new RegExp(`^${id}$`);

  return reg.test(active);
};

// 페이지 타이틀 가공
export const usePageTitle = (title: string) => {
  return title
    .replace(/&#logo#&/g, "<span class='e1-logo'>E1</span>")
    .replace(/&#mBr#&/g, "<br class='m-only-br' />");
};

// html 컨텐츠 가공
export const useMakeContentsHtml = (html: string) => {
  const { $constants } = useNuxtApp();
  const isDev = $constants.isDev();
  const result = isDev
    ? html.replace(
        /src="(\/Upload\/|\/UpLoad\/)/g,
        'src="https://www.e1orangecard.com$1',
      )
    : html;
  return result;
};

// 날짜 포멧터 적용
export const useFormattedDate = (date: string = "", format: string = "") => {
  return DateTime.fromSQL(date).toFormat(format);
};

// Object Filter
export const useObjectFilter = (
  obj: { [index: string | number]: unknown },
  predicate: (el: unknown, key: string | number) => boolean,
) => {
  return Object.keys(obj)
    .filter((key) => predicate(obj[key], key))
    .reduce(
      (res: { [index: string | number]: unknown }, key) => (
        (res[key] = obj[key]), res
      ),
      {},
    );
};

// replace SHA256
export const useSha256 = (
  string: string,
  type: "default" | "card" | "captcha" = "default",
): string => {
  switch (type) {
    case "card":
      return CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(string)).toString();
    case "captcha":
      return useSha256(string.toUpperCase());
    default:
      return CryptoJS.SHA256(CryptoJS.enc.Utf16LE.parse(string)).toString();
  }
};

// replace hmac
export const useHmac = (
  keyString: string,
  string: string,
): {
  key: string;
  text: string;
} => {
  const key: string = useSha256(keyString);
  const text: string = CryptoJS.HmacSHA256(string, key).toString();

  return {
    key,
    text,
  };
};

// get sig string
export const useSigString = <T>(data: T): string => {
  return jsonStableStringify(data) || "";
};

// id reg
export const useIdReg = () => {
  return /^[A-Za-z][A-Za-z\d]{5,15}$/;
};

// password reg
export const usePasswordReg = () => {
  const symbols = "~!@#$%^&*()_+";
  const reg = new RegExp(
    `^(?=(?:.*[A-Za-z])(?:.*[\\d${symbols}])|(?:.*\\d)(?:.*[A-Za-z${symbols}])|(?:.*[${symbols}])(?:.*[A-Za-z\\d]))[A-Za-z\\d${symbols}]{10,16}$`,
  );

  return reg;
};

// email reg
export const useEmailReg = () => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
};

// phone reg
export const usePhoneReg = () => {
  return /^(\d{3})(\d{3,4})(\d{4})$/;
};

// tell reg
export const useTelReg = () => {
  return /^(\d{2,3})(\d{3,4})(\d{4})$/;
};

// ars reg
export const useArsReg = () => {
  return /^(\d{4})(\d{4})$/;
};

// card reg
export const useCardReg = () => {
  return /^(\d{4})(\d{4})(\d{4})(\d{4})$/;
};

// card password reg
export const useCardPasswordRegNumber = () => {
  return /^\d{4}$/;
};
export const useCardPasswordRegRepeat = () => {
  return /(\d)\1+/;
};
export const useCardPasswordRegContinuous = () => {
  return /(?:012|123|234|345|456|567|678|789)+/;
};
export const useCardPasswordRegContinuousReverse = () => {
  return /(?:987|876|765|654|543|432|321|210)+/;
};

// password check
export const usePasswordCheck = (text: string, id: string): string | null => {
  const reg = usePasswordReg();

  if (text.length < 10) {
    return useT("formMessage.025", [10]);
  } else if (16 < text.length) {
    return useT("formMessage.026", [16]);
  } else if (/[가-힣]/.test(text)) {
    return useT("formMessage.027");
  } else if (/\s/.test(text)) {
    return useT("formMessage.028");
  } else if (/[^A-Za-z\d~!@#$%^&*()_+]/.test(text)) {
    return useT("formMessage.029");
  } else if (!reg.test(text)) {
    return useT("formMessage.012");
  } else if (id && text === id) {
    return useT("formMessage.013");
  } else {
    return null;
  }
};

// card password check
export const useCardPasswordCheck = (
  text: string,
  id: string,
): string | null => {
  const regNumber = useCardPasswordRegNumber();
  const regRepeat = useCardPasswordRegRepeat();
  const regContinuous = useCardPasswordRegContinuous();
  const regContinuousReverse = useCardPasswordRegContinuousReverse();

  if (!regNumber.test(text)) {
    return useT("formMessage.022");
  } else if (regContinuous.test(text) || regContinuousReverse.test(text)) {
    return useT("formMessage.023");
  } else if (regRepeat.test(text)) {
    return useT("formMessage.024");
  } else if (id && text === id) {
    return useT("formMessage.013");
  } else {
    return null;
  }
};

// replace phone number
export const usePhoneNumber = (text: string) => {
  return text.replace(usePhoneReg(), `$1-$2-$3`);
};

// replace tel number
export const useTelNumber = (text: string) => {
  return text.replace(useTelReg(), `$1-$2-$3`);
};

// replace ars number
export const useArsNumber = (text: string) => {
  return text.replace(useArsReg(), `$1-$2`);
};

// replace card number
export const useCardNumber = (text: string) => {
  return text.replace(useCardReg(), `$1-$2-$3-$4`);
};

// get query array
export const useGetQueryArray = (
  q?: LocationQueryValue | LocationQueryValue[] | string | number,
): string[] => {
  if (q) {
    if (Array.isArray(q)) {
      return q as string[];
    } else {
      return [q as string];
    }
  } else {
    return [];
  }
};

// utf16 byte
export const useGetUtf16Byte = (text: string) => {
  return CryptoJS.enc.Utf16.parse(text).sigBytes;
};

// validate error element
export const useGetValidateErrorEl = (
  errorsId: string[],
): HTMLElement | null => {
  const selector = errorsId.reduce(
    (pV, cV) => pV + (pV.length ? ", " : "") + "#" + cV,
    "",
  );
  const el = document.querySelectorAll<HTMLElement>(selector)[0];

  return el || null;
};

// fuel list
export const useFuelList = (): FuelList => {
  return [
    {
      code: "L",
      name: "LPG",
    },
    {
      code: "H",
      name: "수소",
    },
    // DD : EV 예정
    // {
    //   code: "E",
    //   name: "EV",
    // },
  ];
};

// get fuel name
export const useFuelName = (code: FuelCode) => {
  switch (code) {
    case "L":
      return "LPG";
    case "H":
      return "H2수소";
    case "E":
      return "EV전기";
    default:
      return "";
  }
};

// fuel unit
export const useFuelUnit = (code: FuelCode) => {
  switch (code) {
    case "L":
      return "L";
    case "H":
      return "Kg";
    case "E":
      return "kWh";
    default:
      return "";
  }
};

// fuel reg
export const useFuelReg = () => {
  return /^(L|E|H)$/;
};

// age check
export const useAgeCheck = (
  birthDate: string,
  checkAge: number = 14,
  format: string = "yyyyMMdd",
): boolean => {
  const today = DateTime.now();
  const userBirthDate = DateTime.fromFormat(birthDate, format);
  const age = today.diff(userBirthDate, "years").years;

  return age >= checkAge;
};

// check back path
export const useCheckBackPath = (path: string): boolean => {
  const locale = useLocale();
  const router = useRouter();
  const reg = new RegExp(`(^|^/${locale})${path}($|/$)`);

  return typeof router.options.history.state.back === "string"
    ? reg.test(router.options.history.state.back)
    : false;
};

// 동의 값 찾기
export const useFindAgree = (
  data: SessionSignUpKakaoData | KakaoAuthData,
  tag: string,
): boolean => {
  return data.agree
    ? data.agree.service_terms.findIndex(
        (item) => item.tag === tag && item.agreed,
      ) > -1
    : false;
};

// boolean to Y or N
export const useReturnYN = (val: boolean): BooleanYN => {
  return val ? "Y" : "N";
};

// Google Play
export const useGooglePlay = () => {
  return "https://play.google.com/store/apps/details?id=kr.co.e1.orangecard";
};

// App Store
export const useAppStore = () => {
  return "https://apps.apple.com/kr/app/e1%EC%98%A4%EB%A0%8C%EC%A7%80%EC%B9%B4%EB%93%9C/id433209601";
};

// etc route
export const useEtcRoute = (path: string) => {
  const locale = useLocale();
  const reg = new RegExp(`(^|^/${locale})/etc/`);
  const route = useRoute();
  const etcInflow = window ? window.sessionStorage.getItem("etcInflow") : null;

  if (!!etcInflow || reg.test(route.path)) {
    return `/etc${path}`;
  } else {
    return path;
  }
};

// file name
export const useFileName = (url: string) => {
  const match = url.match(/[^/?&#]*\.[^/?&#]*/g);
  const name = match ? match[match.length - 1] : "fileName";

  return name;
};

// i18n t
export const useT = (key: string | number, list?: unknown[]) => {
  const { $i18n } = useNuxtApp();
  return list ? $i18n.t(key, list) : $i18n.t(key);
};

// i18n locale
export const useLocale = () => {
  const { $i18n } = useNuxtApp();
  const locale = $i18n.getBrowserLocale();
  return locale;
};

// get html contents description
export const useDescription = (html: string) => {
  const { $sanitize } = useNuxtApp();
  const text = $sanitize(html, {
    USE_PROFILES: { html: false },
  })
    .replace(/\n/g, " ")
    .replace(/^\s+/, "")
    .replace(/\s+/g, " ");

  return text.slice(0, text.length > 120 ? 120 : text.length);
};

// 카카오톡 브라우저 여부
export const useIsKakaoTalk = () => {
  if (!window) return false;

  const userAgent = window.navigator.userAgent;

  return Boolean(userAgent.match("KAKAOTALK"));
};
