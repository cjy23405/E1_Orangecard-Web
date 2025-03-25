<template>
  <section>
    <div class="inner relative px-8 md:px-0">
      <img
        src="@/assets/img/introduction/coin1.png"
        class="left-3/4 top-[-5.8rem] z-20 w-40 md:left-[85%] md:top-[-11.9rem] md:w-80"
      />
      <img
        src="@/assets/img/introduction/coin2.png"
        class="right-[25vw] top-[1.1rem] w-[8.1rem] md:right-80 md:top-0 md:w-[18.4rem]"
      />
      <img
        src="@/assets/img/introduction/coin4.png"
        class="z-9 hidden md:bottom-[17.9rem] md:left-[-10.7rem] md:block md:w-[19.2rem]"
      />
      <div class="gra-line-top relative z-10 py-24 md:py-64 md:pt-24">
        <p class="bottom flex flex-row md:block md:overflow-hidden">
          <strong class="fs-26 flex-1 font-bold md:block"
            >회원 유형별 <br />혜택 안내</strong
          >
          <NuxtLink class="next fs-16 self-end md:float-end md:mr-[3.6rem]"
            >내 등급 확인하기</NuxtLink
          >
        </p>

        <div class="mt-[.8rem] md:mt-[1.6rem] md:flex md:flex-row">
          <div class="opacity-box">
            <p class="icon-type lpg">LPG</p>
            <p class="underbar">일반고객</p>
            <ul class="list-benefit">
              <li>
                <p>일반회원<br />1,000원당 <strong>3P</strong></p>
              </li>
              <li>
                <p>우수회원<br />1,000원당 <strong>6P</strong></p>
                <span>(직전 1개월 충전실적150L 이상)</span>
              </li>
              <li>
                <p>매월 LPG 구매기준<br /><strong>70만원</strong> 한도</p>
              </li>
            </ul>
          </div>
          <div class="opacity-box">
            <p class="icon-type lpg">LPG</p>
            <p class="underbar">개인택시</p>
            <ul class="list-benefit">
              <li>
                <p>비우대 가맹점<br />1,000원당 <strong>5P</strong></p>
              </li>
              <li>
                <p>우대 가맹점<br />1,000원당 <strong>10P</strong></p>
              </li>
              <li>
                <p>매월 LPG 구매기준<br /><strong>120만원</strong> 한도</p>
              </li>
            </ul>
          </div>
          <div class="opacity-box">
            <p class="icon-type lpg">LPG</p>
            <p class="underbar">화물<span>(티티트럭)</span></p>
            <ul class="list-benefit">
              <li>
                <p>비우대 가맹점<br />1,000원당 <strong>5P</strong></p>
              </li>
              <li>
                <p>우대 가맹점<br />1,000원당 <strong>10P</strong></p>
              </li>
              <li>
                <p>매월 LPG 구매기준<br /><strong>70만원</strong> 한도</p>
              </li>
            </ul>
          </div>
          <div class="opacity-box bg-coin">
            <p class="icon-type h2">H2수소</p>
            <p class="underbar">충전고객</p>
            <ul class="list-benefit">
              <li>
                <p>1KG <strong>44P</strong></p>
              </li>
              <li>
                <p>매월 LPG 구매기준<br /><strong>60만원</strong> 한도</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="btn-wrap mt-[2.6rem] md:mt-16">
          <NuxtLink class="btn-txt small white">안내사항</NuxtLink>
          <NuxtLink class="btn-txt small white">포인트 추가 적립 방법</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
@tailwind components;
@layer components {
  .gra-line-top::before {
    @apply content-[''] top-0 left-0 w-full h-[2px] absolute;
    background: linear-gradient(
      to right,
      hsl(var(--primary)),
      rgba(233, 99, 32, 0)
    );
  }
  .inner > img {
    @apply absolute;
  }
  .opacity-box {
    @apply h-[56.7rem] rounded-lg px-[5rem] pb-[6rem] border-solid border border-white relative md:flex-1 pt-[5.8rem];
    background: rgba(255, 255, 255, 0.7);
  }
  .bg-coin:after {
    @apply w-[17.9rem] h-[16.4rem] absolute content-[''] right-[4rem] bottom-[4rem];
    background: url("@/assets/img/introduction/coin5.png") no-repeat center
      center/100% auto;
  }
  .opacity-box + .opacity-box {
    @apply mt-[1.6rem] md:mt-0 md:ml-[1.6rem];
  }
  .icon-type {
    @apply block;
  }
  .underbar {
    @apply inline-block mt-[.8rem] font-bold text-3xl leading-[3rem] relative before:content-[''] before:bottom-0 before:left-0 before:w-full before:bg-primary before:opacity-20 before:h-[1rem] before:absolute;
  }
  .underbar span {
    @apply text-lg leading-[2.2rem] md:text-xl md:leading-[2.4rem] font-normal align-baseline;
  }
  .list-benefit {
    counter-reset: list-counter;
    @apply mt-[1.6rem];
  }
  .list-benefit li {
    border-top: 1px solid #e8ecef;
    counter-increment: list-counter;
    @apply py-[1.6rem] text-xl leading-[2.4rem];
  }
  .list-benefit li::before {
    content: "0" counter(list-counter);
    @apply block mb-[1.6rem];
  }
  .list-benefit li p {
    @apply font-bold;
  }
  .list-benefit li p strong {
    @apply font-bold text-primary align-baseline;
  }
  .list-benefit li span {
    @apply mt-[.4rem] text-base leading-[2rem] text-gray-800;
  }
  .btn-txt.white {
    @apply bg-white/50 md:w-[23.4rem];
  }
}
@media (min-width: 768px) {
  .gra-line-top {
    overflow: visible;
    position: relative;
    /* background: url("@/assets/img/introduction/coin3.png") no-repeat calc(100% + 4rem)
      9.5rem/18.6rem auto; */
  }
  .gra-line-top::after {
    content: "";
    position: absolute;
    right: -12.6rem;
    top: 11.5rem;
    width: 18.6rem;
    height: 17.4rem;
    background: url("@/assets/img/introduction/coin3.png") no-repeat center
      center / 100% auto;
  }
}
</style>
