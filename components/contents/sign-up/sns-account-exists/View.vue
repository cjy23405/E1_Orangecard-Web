<script setup lang="ts">
// 스토어
const stores = {
  session: useStoreSession(),
};

// route
const localePath = useLocalePath();

// computed
const session = computed(() => {
  return stores.session.signUp?.type === "NAVER" ? stores.session.signUp : null;
});

// state
const id = ref("");

// init
const init = () => {
  id.value = session.value?.loginId || "";
  stores.session.$setSignUp(null);
};
</script>

<template>
  <ContentsSignUpCheckSession
    :check-path="useEtcRoute('/sign-up')"
    :denied-path="useEtcRoute('/sign-up')"
    @clear="init"
  >
    <div>
      <div
        class="border-top border-bottom inner mt-[2.8rem] px-8 md:mt-24 md:px-16"
      >
        <div class="titi fs-16 pt-[19.4rem] text-center md:pt-[22.6rem]">
          <p>
            이미 가입하신 SNS계정입니다.<br />
            선택하신 SNS 계정으로 로그인 해주세요.
          </p>
        </div>
        <div
          class="fs-16 mt-8 rounded-lg bg-primary-foreground p-12 text-center md:mx-auto md:flex md:w-[60rem] md:flex-row md:justify-center md:p-16"
        >
          <p class="font-bold text-primary md:ml-[.4rem]">
            {{ id }}
          </p>
        </div>

        <div class="btn-wrap mb-[9.4rem] mt-16 md:my-24">
          <NuxtLink
            :to="localePath(useEtcRoute('/login'))"
            class="btn-txt primary font-bold md:!max-w-full"
          >
            로그인
          </NuxtLink>
        </div>
      </div>
    </div>
  </ContentsSignUpCheckSession>
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
    width: 60rem;
    margin-left: auto;
    margin-right: auto;
  }
  .btn-wrap .btn-txt {
    max-width: 100%;
  }
}
</style>
