<script setup lang="ts">
import type { AlertOptions } from "@/types/components/common/Alert";

// 레이아웃 선택
definePageMeta({
  layout: "sub",
});

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("얼럿 컴포넌트 예제");
});

// 얼럿 관련
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};
</script>

<template>
  <div class="inner">
    <CommonAlert ref="alertLayer" />

    <div class="mb-16 text-2xl">
      <button
        type="button"
        class="rounded-full bg-black px-4 py-2 font-bold text-white disabled:opacity-30"
        @click="
          alertOpen({
            title: '타이틀',
            message:
              '타이틀 + 메세지 + 확인\n줄바꿈은 \\n 을 이용하시면 됩니다.',
          })
        "
      >
        타이틀 + 메세지 + 확인
      </button>
    </div>

    <div class="mb-16 text-2xl">
      <button
        type="button"
        class="rounded-full bg-black px-4 py-2 font-bold text-white disabled:opacity-30"
        @click="
          alertOpen({
            useClose: true,
            title: '타이틀',
            message:
              '타이틀 + 메세지 + 닫기/확인 + X 버튼\n줄바꿈은 \\n 을 이용하시면 됩니다.',
            buttons: [
              {
                type: 'cancel',
                callback: (closeFn) => {
                  console.log('닫기 클릭');
                  closeFn(); // 닫기 함수
                },
              },
              {
                callback: (closeFn) => {
                  console.log('확인 클릭');
                  closeFn(); // 닫기 함수
                },
              },
            ],
          })
        "
      >
        타이틀 + 메세지 + 닫기/확인 + X 버튼
      </button>
    </div>

    <div class="mb-16 text-2xl">
      <button
        type="button"
        class="rounded-full bg-black px-4 py-2 font-bold text-white disabled:opacity-30"
        @click="
          alertOpen({
            message:
              '타이틀 없음 + 메세지 + 닫기/확인\n줄바꿈은 \\n 을 이용하시면 됩니다.',
            buttons: [
              {
                type: 'cancel',
                callback: (closeFn) => {
                  console.log('닫기 클릭');
                  closeFn(); // 닫기 함수
                },
              },
              {
                callback: (closeFn) => {
                  console.log('확인 클릭');
                  closeFn(); // 닫기 함수
                },
              },
            ],
          })
        "
      >
        타이틀 없음 + 메세지 + 닫기/확인
      </button>
    </div>

    <div class="mb-16 text-2xl">
      <button
        type="button"
        class="rounded-full bg-black px-4 py-2 font-bold text-white disabled:opacity-30"
        @click="
          alertOpen({
            message:
              '타이틀 없음 + 메세지 + 버튼 없음 + 바깥영역 클릭시 닫힘\n줄바꿈은 \\n 을 이용하시면 됩니다.',
            buttons: [],
            outsideClose: true,
          })
        "
      >
        타이틀 없음 + 메세지 + 버튼 없음 + 바깥영역 클릭시 닫힘
      </button>
    </div>
  </div>
</template>
