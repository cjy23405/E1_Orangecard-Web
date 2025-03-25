<script setup lang="ts">
import { DateTime } from "luxon";
import type { PopupListResponseItem } from "@/types/api";

// route
const localePath = useLocalePath();
const router = useRouter();

// props
const props = defineProps<{
  data: PopupListResponseItem;
}>();

// cookie
const expires = DateTime.now()
  .set({ hour: 0, minute: 0, second: 0 })
  .plus({ day: 1 })
  .toJSDate();
const cookie = useCookie<boolean>(`mainPopup_${props.data.popupId}`, {
  expires,
});

// state
const today = ref(false);

// ref
const layer = useTemplateRef("layer");

// open
const open = () => {
  layer.value?.open();
};

// close
const close = () => {
  layer.value?.close();
};

// link click
const linkClick = () => {
  if (!window || !props.data.linkUrl) return;

  if (/^\//.test(props.data.linkUrl)) {
    router.push(localePath(props.data.linkUrl));
  } else {
    window.open(
      props.data.linkUrl,
      props.data.linkTarget === 0 ? "_self" : "_blank",
    );
  }
};

// 오늘 하루 그만 보기
const todayClose = () => {
  if (!today.value) return;
  cookie.value = true;
};

// 닫기 이벤트
const closeAutoFocus = () => {
  todayClose();
};

// init
const init = () => {
  if (cookie.value) return;
  open();
};

// expose
defineExpose({
  init,
  open,
  close,
});
</script>

<template>
  <!-- 공지성만 자세히보기 노출 -->
  <PopupBase
    ref="layer"
    variant="main-notice"
    :buttons="
      data.popupType === 1 && data.linkUrl
        ? [
            {
              type: 'cancel',
            },
            {
              text: '자세히보기',
              callback: () => {
                linkClick();
              },
            },
          ]
        : [
            {
              type: 'cancel',
            },
          ]
    "
    @close-auto-focus="closeAutoFocus"
  >
    <!-- 공지성만 타이틀 노출 -->
    <template v-if="data.popupType === 1" #title>
      {{ data.popupTitle }}
    </template>

    <div
      :class="[
        'max-h-[80vh] overflow-auto md:max-h-[70vh]',
        {
          'rounded-t-lg': data.popupType === 2,
        },
      ]"
    >
      <div>
        <!-- 공지성 -->
        <template v-if="data.popupType === 1">
          <div v-if="data.imageUrl">
            <img :src="data.imageUrl" :alt="data.content" class="mx-auto" />
          </div>

          <div
            v-if="data.content"
            class="fs-14 px-8 py-[1.6rem] md:px-[2.8rem] md:py-[2.4rem]"
          >
            <CommonTextData :contents="data.content" />
          </div>
        </template>

        <!-- 안내성 -->
        <template v-else-if="data.popupType === 2">
          <div
            v-if="data.imageUrl"
            :role="data.linkUrl ? 'button' : undefined"
            :tabindex="data.linkUrl ? '0' : undefined"
            @click="linkClick"
            @keypress.enter.space="linkClick"
          >
            <img :src="data.imageUrl" :alt="data.content" class="mx-auto" />
          </div>

          <div
            v-else-if="data.content"
            class="fs-14 px-8 py-[1.6rem] md:px-[2.8rem] md:py-[2.4rem]"
          >
            <CommonHtmlData :contents="data.content || ''" />
          </div>
        </template>
      </div>
    </div>

    <div class="fs-14 p-[1.6rem] md:px-[2.8rem] md:py-[2.4rem]">
      <div class="ipt-line">
        <div class="ipt-item">
          <Checkbox
            :id="`mainPopupToday_${data.popupId}`"
            v-model:checked="today"
            class="ipt-check"
          ></Checkbox>
          <label :for="`mainPopupToday_${data.popupId}`"
            >오늘 하루 그만 보기</label
          >
        </div>
      </div>
    </div>
  </PopupBase>
</template>
