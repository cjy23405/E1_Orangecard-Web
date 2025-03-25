<script setup lang="ts">
import type { CardData } from "@/types/api";

// route
const localePath = useLocalePath();
const router = useRouter();

// 스토어
const stores = {
  session: useStoreSession(),
};

// props
withDefaults(
  defineProps<{
    type?: "default" | "lost";
    data: CardData;
    repDisabled?: boolean;
  }>(),
  {
    type: "default",
    repDisabled: false,
  },
);

// emit
const emit = defineEmits<{
  setRep: [v: CardData];
}>();

// 대표카드 설정 클릭
const repClick = (data: CardData) => {
  emit("setRep", data);
};

// 분실신고 클릭
const lostClick = (data: CardData) => {
  stores.session.$setCardLost({
    cardNum: data.cardNum,
  });
  router.push(localePath("/my-page/card/lost"));
};
</script>

<template>
  <div class="round-box relative mb-[.8rem] p-8 last:mb-0 md:px-16 md:py-12">
    <p class="fs-16 font-bold text-gray-800">
      {{ data.cardNm }}
      <BoardBadge
        v-if="data.repCardYn === 'Y'"
        :is-mini="true"
        class="ml-[1.6rem] md:ml-8"
      >
        대표
      </BoardBadge>
    </p>

    <p class="fs-16 my-[1.6rem] text-gray-800 md:my-[2.8rem]">
      {{ useCardNumber(data.cardNum || "") }}
    </p>

    <p v-if="type === 'lost'" class="fs-16 date-text text-gray-600">
      신고일 : {{ data.cardLoseDt }}
    </p>
    <p v-else class="fs-16 date-text text-gray-600">
      등록일 : {{ data.cardRegDt }}
    </p>

    <div
      v-if="type === 'default'"
      class="btn-wrap mt-[1.6rem] md:absolute md:right-16 md:top-12 md:mt-0 md:!block md:!w-auto"
    >
      <a
        v-if="data.repCardYn !== 'Y'"
        role="button"
        tabindex="0"
        class="btn-txt line small"
        :aria-disabled="repDisabled"
        @click="repClick(data)"
        @keypress.enter.space="repClick(data)"
      >
        대표카드 설정
      </a>
      <a
        role="button"
        tabindex="0"
        class="btn-txt line small"
        @click="lostClick(data)"
        @keypress.enter.space="lostClick(data)"
      >
        분실신고
      </a>
    </div>
  </div>
</template>

<style lang="css" scoped>
.badge {
  min-width: 4.5rem !important;
}
@media (min-width: 768px) {
  .btn-txt.small {
    width: auto !important;
    display: inline-block;
    padding: 0 2rem !important;
  }
  .badge {
    min-width: 5.7rem !important;
  }
}
</style>
