import constants from "@/constants";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      constants,
    },
  };
});
