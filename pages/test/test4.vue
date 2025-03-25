<script setup lang="ts">
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
  stores.layout.$setPageTitle("레이어 팝업 컴포넌트 예제");
});

// 레이어 관련
const layer1 = useTemplateRef("layer1");
const layer2 = useTemplateRef("layer2");
const layer3 = useTemplateRef("layer3");
const layer4 = useTemplateRef("layer4");
const layer5 = useTemplateRef("layer5");
</script>

<template>
  <div class="inner">
    <div class="mb-16 text-2xl">
      <button
        type="button"
        class="rounded-full bg-black px-4 py-2 font-bold text-white disabled:opacity-30"
        @click="layer1?.open()"
      >
        타이틀 + 컨텐츠 + 버튼 없음 + 바깥영역 클릭시 닫힘
      </button>
      <PopupBase ref="layer1">
        <template #title>타이틀</template>

        <div>컨텐츠</div>
      </PopupBase>
    </div>

    <div class="mb-16 text-2xl">
      <button
        type="button"
        class="rounded-full bg-black px-4 py-2 font-bold text-white disabled:opacity-30"
        @click="layer2?.open()"
      >
        타이틀 + 컨텐츠 + 버튼 1개 + 바깥영역 클릭시 닫힘
      </button>
      <PopupBase
        ref="layer2"
        :buttons="[
          {
            text: '확인',
            callback: (closeFn) => {
              console.log('확인 클릭');
              closeFn(); // 닫기 함수
            },
          },
        ]"
      >
        <template #title>타이틀</template>

        <div>컨텐츠</div>
      </PopupBase>
    </div>

    <div class="mb-16 text-2xl">
      <button
        type="button"
        class="rounded-full bg-black px-4 py-2 font-bold text-white disabled:opacity-30"
        @click="layer3?.open()"
      >
        타이틀 + 컨텐츠 + 버튼 2개 + 바깥영역 클릭시 닫힘
      </button>
      <PopupBase
        ref="layer3"
        :buttons="[
          {
            type: 'cancel',
            text: '확인',
            callback: (closeFn) => {
              console.log('확인 클릭');
              closeFn(); // 닫기 함수
            },
          },
          {
            text: '서비스 바로가기',
            callback: (closeFn) => {
              console.log('서비스 바로가기 클릭');
              closeFn(); // 닫기 함수
            },
          },
        ]"
      >
        <template #title>타이틀</template>

        <div>컨텐츠</div>
      </PopupBase>
    </div>

    <div class="mb-16 text-2xl">
      <button
        type="button"
        class="rounded-full bg-black px-4 py-2 font-bold text-white disabled:opacity-30"
        @click="layer4?.open()"
      >
        타이틀 없음 + 컨텐츠 + 버튼 1개 + 바깥영역 클릭시 닫힘 안함 + X 버튼
        없음
      </button>
      <PopupBase
        ref="layer4"
        :use-close="false"
        :outside-close="false"
        :buttons="[{}]"
      >
        <div>컨텐츠</div>
      </PopupBase>
    </div>

    <div class="mb-16 text-2xl">
      <button
        type="button"
        class="rounded-full bg-black px-4 py-2 font-bold text-white disabled:opacity-30"
        @click="layer5?.open()"
      >
        타이틀 + 컨텐츠 + 버튼 3개 + 바깥영역 클릭시 닫힘 + 모바일만 풀 팝업
      </button>
      <PopupBase
        ref="layer5"
        variant="mobile-full"
        :buttons="[
          {
            type: 'cancel',
            callback: (closeFn) => {
              console.log('닫기 클릭');
              closeFn(); // 닫기 함수
            },
          },
          {
            text: '서비스 바로가기',
            callback: (closeFn) => {
              console.log('서비스 바로가기 클릭');
              closeFn(); // 닫기 함수
            },
          },
          {},
        ]"
      >
        <template #title>타이틀</template>

        <div>컨텐츠</div>
      </PopupBase>
    </div>
  </div>
</template>
