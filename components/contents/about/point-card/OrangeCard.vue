<template>
  <section>
    <div class="inner relative px-8 md:px-0">
      <img
        src="@/assets/img/introduction/titi-card.png"
        class="absolute -top-8 right-8 z-10 w-64 md:-top-24 md:right-14 md:w-[24.8rem]"
      />
      <div class="gra-line-top relative py-24 md:pb-64">
        <p class="bottom flex flex-row">
          <strong class="fs-26 flex-1 font-bold md:block"
            >카드 <br />발급 방법</strong
          >
        </p>

        <div class="mt-4 md:mt-16 md:flex md:flex-row">
          <div class="opacity-box">
            <p class="text-center"><span class="underbar">오렌지카드</span></p>
            <img
              src="@/assets/img/introduction/card-oc.png"
              alt="오렌지카드 이미지"
            />
            <ul class="list-howto">
              <li>
                가까운 E1충전소에서 발급 가능(발급 시점부터 포인트 적립이 가능)
              </li>
              <li>
                카드 발급 후, 3개월 내 오렌지카드 고객센터(1688-2121) 또는
                오렌지카드 WEB/APP을 통해 회원가입 및 카드등록 필요
                (www.e1orangecard.com)
              </li>
              <li>카드 등록 후 즉시 적립 포인트 사용 가능</li>
            </ul>
          </div>
          <div class="opacity-box">
            <p class="text-center"><span class="underbar">모바일카드</span></p>
            <img
              src="@/assets/img/introduction/card-mo.png"
              alt="오렌지카드 이미지"
            />
            <ul class="list-howto">
              <li>구글플레이 또는 APP스토어에서 오렌지카드 모바일앱 설치</li>
              <li>앱 회원가입 및 로그인 시 모바일카드 자동 발급</li>
              <li>발급 시점부터 포인트 적립, 사용 가능</li>
            </ul>
            <p class="btn-wrap mt-[4.4rem]">
              <a
                :href="useGooglePlay()"
                target="_blank"
                class="btn-txt gray mini google before:mb-[-.8rem] before:inline-block before:size-[2.4rem] before:!bg-contain before:content-[''] md:before:mb-[-1.3rem] md:before:size-[3.6rem]"
              >
                Google Play
              </a>
              <a
                :href="useAppStore()"
                target="_blank"
                class="btn-txt gray mini apple before:mb-[-.8rem] before:inline-block before:size-[2.4rem] before:!bg-contain before:content-[''] md:before:mb-[-1.3rem] md:before:size-[3.6rem]"
              >
                App Store
              </a>
            </p>
          </div>
          <div class="opacity-box">
            <p class="text-center"><span class="underbar">원카드</span></p>
            <img
              src="@/assets/img/introduction/card-one.png"
              alt="오렌지카드 이미지"
            />
            <ul class="list-howto">
              <li>
                오렌지카드 APP/WEB에서 사용중인 신용카드 번호를 오렌지카드로
                등록
              </li>
              <li>등록한 신용카드로 결제 시 자동으로 포인트적립 가능</li>
            </ul>
          </div>
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
  .opacity-box {
    @apply h-[60.5rem] rounded-lg px-[3rem] pt-[6rem] pb-[4.4rem] border-solid border border-white relative md:flex-1;
    background: rgba(255, 255, 255, 0.7);
  }
  .opacity-box + .opacity-box {
    @apply mt-[1.6rem] md:mt-0 md:ml-[1.6rem];
  }
  .underbar {
    @apply inline-block mt-[.8rem] font-bold text-3xl leading-[3rem] relative before:content-[''] before:bottom-0 before:left-0 before:w-full before:bg-primary before:opacity-20 before:h-[1rem] before:absolute;
  }
  .underbar span {
    @apply text-lg leading-[2.2rem] md:text-xl md:leading-[2.4rem] font-normal align-baseline;
  }
  .opacity-box img {
    @apply my-[4.4rem] mx-auto w-[15.4rem];
  }
  .list-howto {
    border-top: 1px solid #e8ecef;
    counter-reset: list-counter;
    @apply pt-[4.4rem] px-[2rem];
  }
  .list-howto li {
    counter-increment: list-counter;
    @apply text-base leading-[2rem] relative pl-[1.4rem];
  }
  .list-howto li + li {
    @apply mt-[1.6rem];
  }
  .list-howto li::before {
    content: counter(list-counter) ".";
    @apply absolute left-0;
  }
  .btn-txt.google:before {
    background: url("@/assets/img/main/google.png") no-repeat center center;
  }
  .btn-txt.apple:before {
    background: url("@/assets/img/main/apple.png") no-repeat center center;
  }
}
@media (min-width: 768px) {
}
</style>
