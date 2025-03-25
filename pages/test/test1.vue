<script setup lang="ts">
import type { SearchAddressData } from "@/types/components/popup/SearchAddress";

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
  stores.layout.$setPageTitle("우편번호 찾기 컴포넌트 예제");
});

// 주소 1
const address1 = ref<SearchAddressData>({
  addr: "서울특별시 중구 세종대로 110 (태평로1가)",
  addrJi: "서울특별시 중구 태평로1가 31 서울특별시청",
  zipCode: "04524",
  sido: "서울특별시",
  gugun: "중구",
});
const addressLayer1 = useTemplateRef("addressLayer1");
const addressLayerOpen1 = () => {
  const layer = addressLayer1.value;

  if (layer) {
    layer.open();
  }
};

// 주소 2
const address2 = ref<SearchAddressData>({});
const addressLayer2 = useTemplateRef("addressLayer2");
const addressLayerOpen2 = () => {
  const layer = addressLayer2.value;

  if (layer) {
    layer.open();
  }
};
</script>

<template>
  <div class="inner">
    <div class="mb-16 text-2xl">
      <div>
        <button
          type="button"
          class="rounded-full bg-black px-4 py-2 font-bold text-white disabled:opacity-30"
          @click="addressLayerOpen1"
        >
          우편번호찾기1
        </button>
      </div>
      <div>
        우편번호1
        <Input type="text" readonly :value="address1.zipCode" />
      </div>
      <div>
        주소1
        <Input type="text" readonly :value="address1.addr" />
      </div>
      <div>
        {{ address1 }}
      </div>
      <PopupSearchAddress ref="addressLayer1" v-model="address1" />
    </div>

    <div class="mb-3 text-2xl">
      <div>
        <button
          type="button"
          class="rounded-full bg-black px-4 py-2 font-bold text-white disabled:opacity-30"
          @click="addressLayerOpen2"
        >
          우편번호찾기2
        </button>
      </div>
      <div>
        우편번호2
        <Input type="text" readonly :value="address2.zipCode" />
      </div>
      <div>
        주소2
        <Input type="text" readonly :value="address2.addr" />
      </div>
      <div>
        {{ address2 }}
      </div>
      <PopupSearchAddress ref="addressLayer2" v-model="address2" />
    </div>
  </div>
</template>
