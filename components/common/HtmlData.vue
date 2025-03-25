<script setup lang="ts">
// props
const props = withDefaults(
  defineProps<{
    contents?: string;
  }>(),
  {
    contents: "",
  },
);

// sanitize
const { $sanitize } = useNuxtApp();

// computed
const htmlData = computed(() =>
  useMakeContentsHtml(
    $sanitize(props.contents, {
      FORBID_TAGS: ["script", "style"],
      FORCE_BODY: true,
    }),
  ),
);

// ref
const wrap = useTemplateRef("wrap");
const iframe = useTemplateRef("iframe");

// update
const updateRaw = () => {
  if (
    !wrap.value ||
    !iframe.value ||
    (!wrap.value.offsetWidth && !wrap.value.offsetHeight)
  )
    return;

  iframe.value.style.height = "0";

  const contH = iframe.value.contentDocument?.body?.scrollHeight || 0;

  wrap.value.style.height = `${contH}px`;
  iframe.value.style.height = `${contH}px`;
};
const update = useDebounceFn(updateRaw, 300);

// iframe load
let loadedTimer1: ReturnType<typeof setTimeout>;
let loadedTimer2: ReturnType<typeof setTimeout>;
let loadedTimer3: ReturnType<typeof setTimeout>;
const iframeLoaded = useDebounceFn((event: MessageEvent<string>) => {
  if (event.data === "iframeFullyLoaded") {
    clearTimeout(loadedTimer1);
    clearTimeout(loadedTimer2);
    clearTimeout(loadedTimer3);

    updateRaw();

    loadedTimer1 = setTimeout(updateRaw, 1000);
    loadedTimer2 = setTimeout(updateRaw, 2000);
    loadedTimer3 = setTimeout(updateRaw, 3000);
  }
}, 100);

// init
const init = useDebounceFn(() => {
  const doc =
    iframe.value?.contentDocument || iframe.value?.contentWindow?.document;

  if (!doc) return;

  const jquery = document.createElement("script");
  jquery.src = "/lib/jquery/jquery-3.7.1.min.js";

  const loaded = document.createElement("script");
  loaded.text = `
    window.addEventListener("load", function () {
      parent.postMessage("iframeFullyLoaded", "*");
    });
  `;

  let html = `
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <base target="_parent" />
        <meta charset="utf-8" />
        <title>상세 내용</title>
        <link rel="stylesheet" href="/assets/fonts/style.css" />
        <link rel="stylesheet" href="/assets/css/html-contents.css" />
        <style type="text/css">
          [data-contents-wrap]::before,
          [data-contents-wrap]::after {
            content: "";
            display: table;
          }
        </style>
        ${jquery.outerHTML}
        ${loaded.outerHTML}
      </head>
      <body style="margin: 0;">
        <article data-contents-wrap>
          ${useMakeContentsHtml(props.contents)}
        </article>
      </body>
    </html>
  `;

  html = html.replace(/("|')_self("|')/g, "$1_parent$2");

  doc.write(html);
  doc.close();

  update();

  doc.querySelectorAll("img").forEach((el) => {
    el.addEventListener("load", update);
  });

  doc.querySelectorAll("a, button, input, area").forEach((el) => {
    el.addEventListener("click", update);
  });
}, 300);

// watch
watchOnce(iframe, (iframe) => {
  if (iframe) {
    init();
  }
});
watch(
  () => props.contents,
  () => {
    init();
  },
);

// life cycle
onMounted(() => {
  if (window) {
    updateRaw();
    window.addEventListener("message", iframeLoaded);
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
  }
});
onBeforeUnmount(() => {
  if (window) {
    window.removeEventListener("message", iframeLoaded);
    window.removeEventListener("resize", update);
    window.visualViewport?.removeEventListener("resize", update);
  }
});

// expose
defineExpose({
  update: updateRaw,
});
</script>

<template>
  <div ref="wrap">
    <!-- SEO 용 -->
    <!-- eslint-disable vue/no-v-html -->
    <article class="hidden" v-html="htmlData"></article>

    <!-- view 용 -->
    <ClientOnly>
      <iframe
        ref="iframe"
        src="about:blank"
        class="block h-[1000px] w-full overflow-hidden border-0"
        frameborder="0"
        scrolling="no"
        @load="update"
      ></iframe>
    </ClientOnly>
  </div>
</template>
