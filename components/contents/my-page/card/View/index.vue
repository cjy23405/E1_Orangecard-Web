<script setup lang="ts">
import { useQueryClient } from "@tanstack/vue-query";
import type { CardData } from "@/types/api";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// route
const localePath = useLocalePath();
const router = useRouter();

// api
const queryClient = useQueryClient();
const apiCardList = useApiCardList(`cardList_${uid}`, {
  cardStatCd: "20",
});
const apiLostList = useApiCardList(`lostList_${uid}`, {
  cardStatCd: "30",
});
const apiCardRep = useApiCardRep(uid);

// computed
const cardList = computed(() => {
  return apiCardList.data.value?.data || null;
});
const lostList = computed(() => {
  return apiLostList.data.value?.data || null;
});
const repDisabled = computed(() => {
  return apiCardRep.isPending.value;
});

// refetch
const refetch = () => {
  queryClient.resetQueries({ queryKey: ["cardList", `cardList_${uid}`] });
  apiCardList.refetch();
};

// 대표카드 설정
const setRep = useDebounceFn((data: CardData) => {
  if (repDisabled.value) return;

  apiCardRep.mutate(
    {
      cardNum: data.cardNum,
    },
    {
      onSuccess: () => {
        refetch();
        alertOpen({
          message: useT("alertMessage.022"),
        });
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      },
    },
  );
}, 300);

// 카드 등록 클릭
const addCardClick = () => {
  if (!cardList.value) return;

  if (cardList.value.length >= 5) {
    alertOpen({
      message: useT("alertMessage.023"),
    });
  } else {
    router.push(localePath("/my-page/card/register"));
  }
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};
</script>

<template>
  <div class="border-top inner md:no-border mt-[2.8rem] px-8 md:mt-0 md:px-0">
    <div class="pt-[1.2rem] md:px-40 md:pt-0">
      <div>
        <p class="fs-18 mb-8 font-bold md:mb-16">사용중인 카드</p>

        <template v-if="cardList && cardList.length">
          <ContentsMyPageCardViewItem
            v-for="(item, i) in cardList"
            :key="i"
            :data="item"
            :rep-disabled="repDisabled"
            @set-rep="setRep"
          />
        </template>

        <div v-else-if="cardList" class="nodata">
          <p>사용중인 카드가 없습니다.</p>
        </div>

        <p class="md:btn-wrap mt-16 md:mt-24">
          <NuxtLink
            :to="localePath('/my-page/card/reset-password')"
            class="btn-txt gray"
          >
            카드 비밀번호 변경
          </NuxtLink>
          <a
            role="button"
            tabindex="0"
            class="btn-txt primary mt-[.8rem] md:mt-0"
            @click="addCardClick"
            @keypress.enter.space="addCardClick"
          >
            신규 카드 등록
          </a>
        </p>
      </div>
      <div class="mt-[9.2rem] md:mt-48">
        <p class="fs-18 mb-[1.2rem] font-bold md:mb-16">분실 카드</p>

        <template v-if="lostList && lostList.length">
          <ContentsMyPageCardViewItem
            v-for="(item, i) in lostList"
            :key="i"
            type="lost"
            :data="item"
          />
        </template>

        <div v-else-if="lostList" class="nodata">
          <p>분실 카드가 없습니다.</p>
        </div>
      </div>
    </div>

    <CommonAlert ref="alertLayer" />
  </div>
</template>
