<script setup lang="ts">
// 스토어
const stores = {
  auth: useStoreAuth(),
  layout: useStoreLayout(),
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

// route
const localePath = useLocalePath();
const router = useRouter();

// gnb menus
const gnb = useGnbList();

// state
const showH2 = ref(false);
const isSidemenuOpen = ref(false);
const showMenu = ref(false);
const showBg = ref(false);

// computed
const isAuthenticated = computed(() => {
  return stores.auth.isAuthenticated;
});
const isCorpTaxiAuthenticated = computed(() => {
  return stores.auth.isCorpTaxiAuthenticated;
});
const isCorpTaxi = computed(() => {
  return stores.layout.gnbActive === "100";
});
const isMain = computed(() => {
  return props.pageType === "main";
});
const isEtc = computed(() => {
  return props.pageType === "etc";
});
const pageTitle = computed(() => {
  return usePageTitle(stores.layout.pageTitle);
});

// 메뉴 열기 클릭
const toggleMenu = () => {
  isSidemenuOpen.value = !isSidemenuOpen.value;
};

// 이전 페이지 클릭
const backPage = () => {
  router.back();
};

// 로그아웃 클릭
const logout = () => {
  $logout();
  nextTick(() => {
    router.replace(localePath("/"));
  });
};

// 법인 택시 로그아웃 클릭
const corpTaxiLogout = () => {
  $corpTaxiLogout();
  nextTick(() => {
    router.replace(localePath("/etc/corporate-taxi/login"));
  });
};

// sidemenu 닫기
const closeMenu = () => {
  isSidemenuOpen.value = false;
};

// 스크롤 이벤트 핸들링
const handleScroll = () => {
  showH2.value = window.scrollY > 56;
  showBg.value = window.scrollY > 0;
};

// watch
watch(isSidemenuOpen, (newValue) => {
  document.body.style.overflow = newValue ? "hidden" : "";
});

// life cycle
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    :class="[
      'header sticky top-0 z-10 h-[5.6rem] w-full before:absolute before:left-0 before:top-[5.5rem] before:z-10 before:w-full before:border-b before:border-solid before:border-b-gray-300 md:h-32 md:before:top-32',
      {
        [`is-${props.pageType}`]: props.pageType,
      },
    ]"
    :data-show-h2="showH2"
    :data-show-menu="showMenu"
    :data-show-bg="showBg"
    :data-line="stores.layout.useHeaderLine"
    @mouseleave="showMenu = false"
  >
    <div
      class="wrap absolute left-0 top-0 size-full md:h-auto md:border-b md:border-solid md:border-b-gray-300"
    >
      <div class="inner h-full md:h-auto">
        <div
          :class="[
            'relative size-full flex-row md:mx-auto md:w-[118rem]',
            {
              'hidden md:flex': !isEtc,
              flex: isEtc,
            },
          ]"
        >
          <h1
            :class="{
              'flex-none': !isEtc,
              'min-w-0 flex-1 md:block': isEtc,
            }"
          >
            <span
              v-if="isEtc"
              class="ml-8 block h-[5.6rem] w-[11.8rem] bg-logo bg-contain bg-center bg-no-repeat py-[1.8rem] text-zero md:ml-0 md:h-32 md:w-80"
            >
              E1 orange 카드
            </span>
            <NuxtLink
              v-else
              :to="localePath('/')"
              class="block h-32 w-80 bg-logo bg-contain bg-center bg-no-repeat text-zero"
            >
              E1 orange 카드
            </NuxtLink>
          </h1>
          <nav v-if="!isEtc" class="hidden min-w-0 flex-1 md:block">
            <ul class="list-nav ml-[8.5rem] h-full text-zero">
              <li
                v-for="item in gnb"
                :key="item.id"
                :class="[
                  'inline-block',
                  {
                    'is-active': useGnbCheckActive(item.id),
                  },
                ]"
              >
                <NuxtLink
                  :to="localePath(item.path)"
                  :class="[
                    'h-32 pr-36 text-2xl text-gray-900 hover:cursor-pointer hover:text-gray-600',
                    {
                      '!pr-[10.8rem]': item.id === '003',
                    },
                  ]"
                  @mouseover="showMenu = true"
                  >{{ item.text }}</NuxtLink
                >
                <ul
                  v-if="item.depth && showMenu"
                  class="list-nav-sub h-96 pb-[3.6rem] pt-12"
                >
                  <li
                    v-for="depth in item.depth"
                    :key="depth.id"
                    :class="[
                      'block',
                      {
                        'is-active': useGnbDepthCheckActive(depth.id),
                      },
                    ]"
                  >
                    <NuxtLink
                      :to="localePath(depth.path)"
                      class="block py-4 text-lg text-gray-900 hover:cursor-pointer hover:text-gray-600"
                      >{{ depth.text }}</NuxtLink
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <div
            :class="[
              'top-menu flex-none py-[1.9rem] pr-8 text-right text-zero md:py-[2.9rem] md:pr-0',
              {
                'hidden md:block': !isEtc,
              },
            ]"
          >
            <ClientOnly>
              <div v-if="isCorpTaxi && isCorpTaxiAuthenticated">
                <a
                  role="button"
                  tabindex="0"
                  class="inline-block text-sm text-gray-900 md:text-lg"
                  @click="corpTaxiLogout"
                  @keypress.enter.space="corpTaxiLogout"
                  >로그아웃</a
                >
              </div>
              <div v-else-if="!isEtc && isAuthenticated">
                <NuxtLink
                  :to="localePath('/my-page')"
                  class="inline-block text-sm text-gray-900 md:text-lg"
                  >마이페이지</NuxtLink
                >
                <a
                  role="button"
                  tabindex="0"
                  class="relative inline-block pl-[3.3rem] text-sm text-gray-900 before:absolute before:left-[1.6rem] before:top-1/2 before:mt-[-.6rem] before:h-[1.2rem] before:w-[.1rem] before:bg-gray-900 before:content-[''] md:text-lg"
                  @click="logout"
                  @keypress.enter.space="logout"
                  >로그아웃</a
                >
              </div>
              <div v-else-if="!isEtc">
                <NuxtLink
                  :to="localePath('/login')"
                  class="inline-block text-sm text-gray-900 md:text-lg"
                  >로그인</NuxtLink
                >
                <NuxtLink
                  :to="localePath('/sign-up')"
                  class="relative inline-block pl-[3.3rem] text-sm text-gray-900 before:absolute before:left-[1.6rem] before:top-1/2 before:mt-[-.6rem] before:h-[1.2rem] before:w-[.1rem] before:bg-gray-900 before:content-[''] md:text-lg"
                  >회원가입</NuxtLink
                >
              </div>
            </ClientOnly>
          </div>
        </div>

        <button
          v-if="!isMain && !isEtc"
          class="btn-prev float-start mx-[1.2rem] my-4 block size-[3.6rem] bg-contain bg-center bg-no-repeat indent-[-999rem] text-zero md:hidden"
          @click="backPage"
        >
          이전페이지
        </button>
        <!-- eslint-disable vue/no-v-html -->
        <h2
          v-if="!isMain && !isEtc"
          :class="[
            'mobile-header-title ellipsis absolute left-[6.2rem] top-6 hidden text-left text-xl font-bold text-gray-900',
            {
              'show !block md:!hidden': showH2,
            },
          ]"
          v-html="pageTitle"
        ></h2>
        <button
          v-if="!isEtc"
          class="btn-menu float-end mx-[1.2rem] my-4 size-[3.6rem] bg-contain bg-center bg-no-repeat indent-[-999rem] text-zero md:hidden"
          @click="toggleMenu"
        >
          메뉴 열기
        </button>
        <LayoutMobSidemenu
          :page-type="pageType"
          :class="[
            'mob-menu slide text-left md:hidden',
            {
              'is-opened': isSidemenuOpen,
            },
          ]"
          :aria-hidden="!isSidemenuOpen"
          @close="closeMenu()"
        ></LayoutMobSidemenu>
      </div>
    </div>
  </header>
</template>

<style lang="css" scoped>
.wrap {
  background-color: #fff;
}
.header::before {
  content: none;
}
.header[data-line="true"]::before,
.header[data-show-h2="true"]:not(.is-main)::before {
  content: "";
}
.header.is-main .wrap {
  background-color: transparent;
}
@media (min-width: 768px) {
  .header::before {
    content: "";
  }
  .header.is-main[data-show-menu="true"] .wrap,
  .header.is-main[data-show-bg="true"] .wrap {
    background-color: #fff;
  }
}
/*mobile*/
.btn-prev {
  background-image: url("@/assets/img/head/ic-title-back.png");
}
.btn-menu {
  background-image: url("@/assets/img/head/ic-title-menu.png");
}
.slide {
  transition: transform 0.5s;
  transform: translateX(0%);
}
.slide.is-opened {
  transform: translateX(-100%);
}
.is-active > a {
  color: hsl(var(--primary));
  font-weight: bold;
}
</style>
