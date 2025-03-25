<script setup lang="ts">
// 스토어
const stores = {
  auth: useStoreAuth(),
};

// props
const props = withDefaults(
  defineProps<{
    pageType?: string;
  }>(),
  {
    pageType: "main",
  },
);

// emit
const emit = defineEmits<{
  close: [];
}>();

// route
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();

// gnb menus
const gnb = useGnbList();

// state
const activeMenu = ref<string | null>(null);

// ref
const sidemenu = useTemplateRef("sidemenu");

// computed
const isAuthenticated = computed(() => {
  return stores.auth.isAuthenticated;
});

// 탭 클릭
const toggleMenu = (menu: string) => {
  // Toggle the active menu
  activeMenu.value = activeMenu.value === menu ? null : menu;
  const element = document.getElementById(menu);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// 로그아웃 클릭
const logout = () => {
  close();
  $logout();
  nextTick(() => {
    router.replace(localePath("/"));
  });
};

// 닫기
const close = () => {
  emit("close");
};

// resize
const resize = useDebounceFn(() => {
  if (sidemenu.value) {
    const style = window.getComputedStyle(sidemenu.value);

    if (style.display === "none") {
      close();
    }
  }
}, 300);

// watch
watch(
  () => route.fullPath,
  () => {
    close();
  },
);

// life cycle
onMounted(() => {
  window.addEventListener("resize", resize);
  window.addEventListener("orientationchange", resize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize);
  window.removeEventListener("orientationchange", resize);
});
</script>

<template>
  <div
    ref="sidemenu"
    :class="[
      'sidemenu fixed left-full top-0 z-50 size-full bg-white md:hidden',
      {
        [`is-${props.pageType}`]: props.pageType,
      },
    ]"
  >
    <div
      class="side-top relative h-[5.6rem] overflow-hidden border-b border-solid border-border pl-8 pr-[6.8rem] pt-[1.8rem]"
    >
      <NuxtLink
        :to="localePath('/')"
        class="inline-block h-8 w-[11.8rem] bg-logo bg-contain bg-center bg-no-repeat text-zero"
        @click="close"
      >
        E1 orange 카드
      </NuxtLink>

      <div class="top-menu float-end mt-[.2rem] text-zero">
        <ClientOnly>
          <template v-if="isAuthenticated">
            <NuxtLink
              :to="localePath('/my-page')"
              class="inline-block text-sm text-gray-900"
              @click="close"
              >마이페이지</NuxtLink
            >
            <a
              role="button"
              tabindex="0"
              class="relative inline-block pl-[1.7rem] text-sm text-gray-900 before:absolute before:left-[.8rem] before:top-1/2 before:mt-[-.4rem] before:h-[.8rem] before:w-[.1rem] before:bg-gray-900 before:content-['']"
              @click="logout"
              @keypress.enter.space="logout"
              >로그아웃</a
            >
          </template>
          <template v-else>
            <NuxtLink
              :to="localePath('/login')"
              class="inline-block text-sm text-gray-900"
              @click="close"
              >로그인</NuxtLink
            >
            <NuxtLink
              :to="localePath('/sign-up')"
              class="relative inline-block pl-[1.7rem] text-sm text-gray-900 before:absolute before:left-[.8rem] before:top-1/2 before:mt-[-.4rem] before:h-[.8rem] before:w-[.1rem] before:bg-gray-900 before:content-['']"
              @click="close"
              >회원가입</NuxtLink
            >
          </template>
        </ClientOnly>
      </div>
      <button
        class="absolute right-[1.2rem] top-4 size-[3.6rem] bg-close-button bg-contain bg-center bg-no-repeat text-zero"
        @click="close"
      >
        sidemenu 닫기
      </button>
    </div>
    <div class="side-btm relative">
      <ul
        class="list-tit h-full w-[15.3rem] border-r border-solid border-border py-[1.2rem]"
      >
        <li
          v-for="item in gnb"
          :key="item.id"
          :class="[
            {
              'is-active': useGnbCheckActive(item.id),
            },
          ]"
        >
          <button
            :class="[
              'h-[4.6rem] w-full px-8 py-[1.2rem] text-left',
              {
                'selected font-bold text-primary': activeMenu === item.id,
              },
            ]"
            @click="toggleMenu(item.id)"
          >
            {{ item.text }}
          </button>
        </li>
      </ul>
      <ul class="list-nav absolute right-0 top-0 h-full overflow-y-auto">
        <template v-for="(item, i) in gnb" :key="item.id">
          <li
            v-if="activeMenu === null || activeMenu === item.id"
            :id="item.id"
            :class="[
              'px-8 py-[2.7rem]',
              {
                'is-active': useGnbCheckActive(item.id),
                'border-t border-solid border-border':
                  activeMenu === null && i > 0,
              },
            ]"
          >
            <p class="sub-tit fs-12 mb-[2.4rem] font-bold text-gray-500">
              {{ item.text }}
            </p>
            <ul v-if="item.depth" class="list-nav-sub">
              <li
                v-for="(depth, j) in item.depth"
                :key="depth.id"
                :class="[
                  {
                    'is-active': useGnbDepthCheckActive(depth.id),
                    'mt-[1.6rem]': j > 0,
                  },
                ]"
              >
                <NuxtLink
                  :to="localePath(depth.path)"
                  class="font-14 text-left text-gray-900 active:text-primary"
                  @click="close"
                  >{{ depth.text }}</NuxtLink
                >
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
.sidemenu.is-main {
  background: #fff !important;
}
.side-btm {
  height: calc(100% - 5.6rem);
}
.list-nav {
  width: calc(100% - 15.4rem);
}
.is-active .sub-tit {
  color: hsl(var(--primary));
}
</style>
