<template>
  <div class="md:inner mt-[2.8rem] md:mt-0">
    <div class="md:round-box">
      <div
        class="border-y border-solid border-gray-300 p-8 pb-6 md:border-none md:px-16 md:py-[2.8rem]"
      >
        <p class="overflow-hidden">
          <span
            v-if="item.types.length > 2"
            class="fs-12 font-bold text-gray-600 md:!text-lg"
          >
            전체
          </span>
          <span
            v-for="(type, index) in item.types"
            v-else
            :key="index"
            class="fs-12 font-bold md:!text-lg"
            :class="{
              'text-primary': type === 'LPG',
              'text-e1h2blue': type === 'H2수소',
              'text-e1evgreen': type === 'EV전기',
            }"
            >{{ type }}</span
          >
          <span class="bar fs-14 float-end text-gray-600">
            <span>당첨자발표</span>
            <span>{{ item.announcement }}</span>
          </span>
        </p>

        <div class="md:mt-4 md:flex md:flex-row">
          <p
            class="fs-16 md:fs-18 md:ellipsis my-[.6rem] font-bold md:my-0 md:flex-1"
          >
            {{ item.title }}
          </p>
          <p class="fs-14 text-gray-600">
            {{ item.startDate }}~{{ item.endDate }}
          </p>
        </div>
      </div>
      <!-- html load : event -->
      <div class="md:border-top">
        <!-- 이벤트 내용이 로드될 위치 -->
        <div>
          <!-- 카카오 공유 버튼  -->
          <div class="px-8 py-16 md:px-0 md:py-[4.8rem] md:text-center">
            <button type="button" class="btn-share">
              <i class="ico-kakako">카카오톡 아이콘</i>
              앱 접속 링크 카카오톡으로 공유하기
            </button>
          </div>
          <!-- 앱다운로드 -->
          <div
            class="bg-gray-400 px-8 pb-[4.4rem] pt-[3.6rem] text-center md:px-0"
          >
            <p class="font-bold">E1 오렌지 카드 앱</p>
            <p>설치하시고 이벤트에 참여해보세요!</p>
            <div class="mt-[1.6rem] flex flex-row md:mx-auto md:w-[53.6rem]">
              <button class="btn-download" type="button">
                <i class="ico-google"></i>
                Google Play
              </button>
              <button class="btn-download ml-[.8rem] md:ml-8" type="button">
                <i class="ico-apple"></i>
                App Store
              </button>
            </div>
          </div>
        </div>
        <!-- s. 25.02.11 -->
        <div class="p-8 md:p-16">
          <div class="rounded-lg bg-gray-100 p-[1.6rem]">
            <ul class="list-dot fs-14 text-gray-600">
              <li>상품은 발표일 기준 익일 오전 10시에 지급됩니다.</li>
              <li>
                지급된 오렌지 포인트는 제휴가맹점 및 전국 E1충전소 등에서
                사용하실 수 있습니다.
              </li>
            </ul>
          </div>
        </div>
        <!-- e. 25.02.11 -->
      </div>
    </div>
    <p class="btn-wrap border-top p-8 pb-0 md:mt-20 md:!border-none md:pt-0">
      <NuxtLink class="btn-txt gray">목록</NuxtLink>
    </p>
  </div>
</template>
<script setup lang="ts">
// 스토어
const stores = {
  layout: useStoreLayout(),
};

// 레이아웃 선택
definePageMeta({
  layout: "sub",
});

onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("003001");
  stores.layout.$setPageTitle("진행이벤트");
});

interface Item {
  types: string[];
  title: string;
  startDate: string;
  endDate: string;
  announcement: string;
}

const item: Item = {
  types: ["LPG", "H2수소", "EV전기"],
  title: "티티송 뮤직비디오 퀴즈 맞추고 티티 방향제 받자",
  startDate: "2024-12-01",
  endDate: "2024-12-30",
  announcement: "2024-10-30",
};
</script>
<style lang="css" scoped>
.btn-share {
  width: 100%;
  height: 5.6rem;
  border-radius: 1.2rem;
  box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.16);
  background-color: #fde000;
  font-size: 1.6rem;
  line-height: 5.6rem;
  font-weight: bold;
  text-align: center;
  color: #1d2023;
}
.ico-kakako {
  display: inline-block;
  width: 2.4rem;
  height: 5.6rem;
  font-size: 0;
  text-indent: -9999px;
  margin: -0.5rem 0.6rem 0;
  background: url("@/assets/img/event/kakao.png") no-repeat center center;
  background-size: 100% auto;
}
.btn-download {
  display: block;
  width: 100%;
  height: 5.6rem;
  border-radius: 1.2rem;
  box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-size: 1.6rem;
  font-weight: bold;
  color: #1d2023;
}
.btn-download i {
  width: 2.4rem;
  height: 2.5rem;
  display: inline-block;
  margin-right: 0.6rem;
}
.btn-download i.ico-google {
  background: url("@/assets/img/event/google.png") no-repeat center center;
  background-size: 100% auto;
}
.btn-download i.ico-apple {
  background: url("@/assets/img/event/apple.png") no-repeat center center;
  background-size: 100% auto;
}

@media (min-width: 768px) {
  .btn-share {
    width: 53.6rem;
    height: 9.8rem;
    font-size: 2.4rem;
  }
  .ico-kakako {
    width: 2.8rem;
    height: 9.8rem;
  }
  .btn-download {
    height: 9.8rem;
    font-size: 2.4rem;
  }
  .btn-download i {
    width: 2.8rem;
    height: 9.8rem;
  }
}
</style>
