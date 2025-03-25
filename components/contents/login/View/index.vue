<script setup lang="ts">
import type { LoginSetup } from "@/types/api";

// props
defineProps<{
  callback?: LoginSetup["callback"];
}>();

// 스토어
const stores = {
  auth: useStoreAuth(),
};

// route
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();

// session
const etcInflow = useSessionStorage<string | null>("etcInflow", null);

// computed
const isAuthenticated = computed(() => {
  return stores.auth.isAuthenticated;
});

// check login
const checkLogin = () => {
  if (isAuthenticated.value) {
    if (etcInflow.value) {
      router.replace(etcInflow.value);
    } else if (typeof route.query.returnurl === "string") {
      router.replace(route.query.returnurl);
    } else {
      $replaceHome();
    }
  }
};

// watch
watch(isAuthenticated, () => {
  checkLogin();
});

// life cycle
onBeforeMount(() => {
  checkLogin();
});
</script>

<template>
  <div
    class="border-top border-bottom inner mt-[2.8rem] !py-16 md:mt-24 md:!py-24"
  >
    <div class="md:px-[29rem]">
      <ContentsLoginViewBasic :callback="callback" />

      <div class="bar bar-gray bar-lg text-center">
        <NuxtLink
          :to="localePath(useEtcRoute('/sign-up'))"
          class="fs-14 inline-block text-gray-600"
        >
          회원가입
        </NuxtLink>
        <NuxtLink
          :to="localePath(useEtcRoute('/login/forgot-id'))"
          class="fs-14 inline-block text-gray-600"
        >
          아이디 찾기
        </NuxtLink>
        <NuxtLink
          :to="localePath(useEtcRoute('/login/forgot-pw'))"
          class="fs-14 inline-block text-gray-600"
        >
          비밀번호 재설정
        </NuxtLink>
      </div>

      <ContentsLoginViewKakao :callback="callback" />

      <ContentsLoginViewNaver :callback="callback" />

      <div class="gray-box mt-[.8rem]">
        <ul class="list-dot text-gray-600">
          <li>
            고객님의 정보 보호를 위해 30분 이상 미이용하신 경우 자동으로
            로그아웃 됩니다.
          </li>
          <li>애플 ID로 로그인하시려면 E1오렌지카드 앱을 이용해주세요.</li>
        </ul>
      </div>
    </div>

    <CommonAlert ref="alertLayer" />
  </div>
</template>

<style lang="css" scoped>
@media (min-width: 768px) {
  .bar > *:not(.icon-type) {
    font-size: 1.8rem;
    line-height: 2.4rem;
  }
}
</style>
