import DOMPurify from "dompurify";

export default defineNuxtPlugin(async () => {
  const sanitize = async () => {
    if (import.meta.server) {
      const module = await import("jsdom");
      const window = new module.JSDOM("").window;
      const purify = DOMPurify(window);
      return purify.sanitize;
    }
    return DOMPurify.sanitize;
  };

  return {
    provide: {
      sanitize: await sanitize(),
    },
  };
});
