import { defineStore } from "pinia";

export const useStoreLayout = defineStore("layout", () => {
  // state
  const gnbActive = ref("");
  const pageTitle = ref("");
  const useFooter = ref(true);
  const useHeaderLine = ref(false);
  const useLoading = ref(true);

  // getters
  // const foo = computed(() => "ex : " + bar.value);

  // actions
  function $setGnbActive(v: string) {
    gnbActive.value = v;
  }
  function $setPageTitle(v: string) {
    pageTitle.value = v;
  }
  function $setUseFooter(v: boolean) {
    useFooter.value = v;
  }
  function $setUseHeaderLine(v: boolean) {
    useHeaderLine.value = v;
  }
  function $setUseLoading(v: boolean) {
    useLoading.value = v;
  }

  return {
    // state
    gnbActive,
    pageTitle,
    useFooter,
    useHeaderLine,
    useLoading,

    // getters
    // foo,

    // actions
    $setGnbActive,
    $setPageTitle,
    $setUseFooter,
    $setUseHeaderLine,
    $setUseLoading,
  };
});
