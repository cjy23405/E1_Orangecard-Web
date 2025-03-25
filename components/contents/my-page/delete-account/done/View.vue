<script setup lang="ts">
// 스토어
const stores = {
  session: useStoreSession(),
};

// init
const init = () => {
  $logout();
  stores.session.$setPassword(null);
  stores.session.$setAuth(null);
};
</script>

<template>
  <CommonCheckPasswordSession
    check-path="/my-page/delete-account/confirm"
    denied-path="/"
    @clear="init"
  >
    <div>
      <div class="inner mt-[2.8rem] px-8 md:mt-24 md:px-16">
        <div class="titi fs-16 pt-[16.3rem] text-center md:pt-[16.6rem]">
          <p>
            그동안 E1 오렌지카드서비스를<br />
            이용해주셔서 진심으로 감사합니다.
          </p>
          <p class="mt-[1.6rem]">
            앞으로 더욱 좋은 모습으로 <br />
            다시 만나 뵙길 희망합니다.
          </p>
        </div>
        <div class="btn-wrap mb-0 mt-[11.2rem] md:mb-16 md:mt-24">
          <NuxtLink to="/" class="btn-txt primary">메인으로</NuxtLink>
        </div>
      </div>
    </div>
  </CommonCheckPasswordSession>
</template>

<style lang="css" scoped>
.titi {
  background: url("@/assets/img/mypage/img-withdrawal.png") no-repeat center
    5.3rem / 9.4rem auto;
}
@media (min-width: 768px) {
  .titi {
    background: url("@/assets/img/mypage/img-withdrawal.png") no-repeat center
      0rem / 15rem auto;
  }
  .btn-wrap {
    width: 40rem;
    margin-left: auto;
    margin-right: auto;
  }
  .btn-wrap .btn-txt {
    max-width: 100%;
  }
}
</style>
