<template>
  <section class="inner">
    <div>
      <p class="fs-18 pt-24 text-center md:pt-40">
        오렌지회원 가입하시고
        <span class="fs-18 block align-baseline md:inline-block"
          >특별한 혜택을 누려보세요.</span
        >
      </p>
      <div
        class="py-24 text-center md:flex md:w-full md:flex-row md:items-center md:px-40 md:pb-64 md:pt-40"
      >
        <div class="benefit1 pt-[17.4rem] md:flex-1 md:pt-[29.4rem]">
          <p class="fs-18">차별화된 서비스</p>
        </div>
        <div
          class="benefit2 mt-16 pt-[17.4rem] md:ml-40 md:mt-0 md:flex-1 md:pt-[29.4rem]"
        >
          <p class="fs-18">편리한 one card</p>
        </div>
        <div
          class="benefit3 mt-16 pt-[17.4rem] md:ml-40 md:mt-0 md:flex-1 md:pt-[29.4rem]"
        >
          <p class="fs-18">다양한 제휴처</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.benefit1 {
  background: url("@/assets/img/introduction/benefit1.png") no-repeat top
    center / 15rem auto;
}
.benefit2 {
  background: url("@/assets/img/introduction/benefit2.png") no-repeat top
    center / 15rem auto;
}
.benefit3 {
  background: url("@/assets/img/introduction/benefit3.png") no-repeat top
    center / 15rem auto;
}
@media (min-width: 768px) {
  .benefit1,
  .benefit2,
  .benefit3 {
    background-size: 25.4rem auto;
  }
}
</style>
