<script setup lang="ts">
// 스토어
const stores = {
  session: useStoreSession(),
};

// route
const localePath = useLocalePath();
const router = useRouter();

// 로그인 클릭
const loginClick = () => {
  stores.session.$setAuth(null);
  stores.session.$setForgot(null);
  router.replace(localePath(useEtcRoute("/login")));
};
</script>

<template>
  <ContentsLoginCheckForgotSession
    :check-path="useEtcRoute('/login/forgot-id')"
    :denied-path="useEtcRoute('/login/forgot-id')"
  >
    <div>
      <div
        class="border-top border-bottom inner mt-[2.8rem] px-8 md:mt-24 md:px-16"
      >
        <div class="titi fs-16 pt-[19.4rem] text-center md:pt-[22.6rem]">
          <p>입력하신 정보로 아이디를 조회한 결과입니다.</p>
        </div>
        <div
          class="fs-16 mt-8 rounded-lg bg-primary-foreground p-12 text-center md:mx-auto md:flex md:w-[60rem] md:flex-row md:justify-center md:p-16"
        >
          <p>오렌지카드 온라인 회원 아이디</p>
          <p class="font-bold text-primary md:ml-[.4rem]">
            {{ stores.session.forgot?.loginId }}
          </p>
        </div>
        <div class="btn-wrap mb-[9.4rem] mt-16 md:my-24">
          <NuxtLink
            :to="localePath(useEtcRoute('/login/forgot-pw/reset'))"
            class="btn-txt gray"
            >비밀번호 찾기</NuxtLink
          >
          <a
            role="button"
            tabindex="0"
            class="btn-txt primary"
            @click="loginClick"
            @keypress.enter.space="loginClick"
          >
            로그인
          </a>
        </div>
      </div>
    </div>
  </ContentsLoginCheckForgotSession>
</template>

<style lang="css" scoped>
.titi {
  background: url("@/assets/img/login/img-car-sucess.png") no-repeat center
    8.4rem / 9.4rem auto;
}
@media (min-width: 768px) {
  .titi {
    background: url("@/assets/img/login/img-car-sucess.png") no-repeat center
      6rem / 15rem auto;
  }
  .btn-wrap {
    width: 82rem;
    margin-left: auto;
    margin-right: auto;
  }
  .btn-wrap .btn-txt {
    max-width: 100%;
  }
}
</style>
