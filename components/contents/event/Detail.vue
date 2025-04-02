<script setup lang="ts">
import { DateTime } from "luxon";

// props
const props = withDefaults(
  defineProps<{
    id?: number;
    ongoingEvent?: boolean;
  }>(),
  {
    id: 0,
    ongoingEvent: true,
  },
);

// route
const localePath = useLocalePath();

// api
const { data, suspense } = useApiEventDetail({
  postingNo: props.id,
});

// api ssr
await suspense();

// computed
const isOngoingEvent = computed(() => {
  if (!data?.value?.data) return false;

  const today = DateTime.now();
  const startDate = DateTime.fromSQL(data.value.data.eventStartDt);
  const endDate = DateTime.fromSQL(data.value.data.eventEndDt);

  return startDate <= today && today <= endDate;
});
const title = computed(() => {
  return data?.value?.data?.eventTitle || "";
});
const thumb = computed(() => {
  return data?.value?.data?.thumbnailImage || "";
});
const fuelTypeList = computed(() => {
  return data?.value?.data?.fuelTypeList || [];
});
const startDate = computed(() => {
  const d = data?.value?.data?.eventStartDt || "";
  return d ? useFormattedDate(d, "yyyy-MM-dd") : "";
});
const endDate = computed(() => {
  const d = data?.value?.data?.eventEndDt || "";
  return d ? useFormattedDate(d, "yyyy-MM-dd") : "";
});
const announcementDate = computed(() => {
  const d = data?.value?.data?.announcementDate || "";
  return d ? useFormattedDate(d, "yyyy-MM-dd") : "";
});
const contents = computed(() => {
  return data.value?.data?.webContents || "";
});
const notice = computed(() => {
  return data.value?.data?.eventNote || "";
});
const description = computed(() => useDescription(contents.value));

// store click
const storeClick = (url: string) => {
  if (!window) return;

  window.open(url);
};

// 카카오 공유
const kakaoClick = () => {
  if (!window || !window.Kakao) return;

  // 상수
  const { $constants } = useNuxtApp();
  const keys = $constants.kakaoKeys();
  const link = `${window.location.origin}/bridge?type=event&id=${props.id}`;

  // 카카오 관련
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(keys.script);
  }

  if (window.Kakao.isInitialized()) {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title.value,
        imageUrl: thumb.value,
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
      buttonTitle: "오렌지카드 앱 실행하기",
    });
  }
};

// 뷰 조건 맞지 않으면 404 로
if (
  (!props.ongoingEvent && isOngoingEvent.value) ||
  (props.ongoingEvent && !isOngoingEvent.value)
) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

// SEO
$setSEO({
  boardTitle: title.value,
  location: props.ongoingEvent
    ? [useT("location.003001"), useT("location.003")]
    : [useT("location.003002"), useT("location.003")],
  description: description.value,
  image: thumb.value,
});
</script>

<template>
  <div class="md:inner mt-[2.8rem] md:mt-0">
    <div class="md:round-box">
      <div
        class="border-y border-solid border-gray-300 p-8 pb-6 md:border-none md:px-16 md:py-[2.8rem]"
      >
        <p class="overflow-hidden">
          <span class="bar bar-gray inline-block">
            <span
              v-if="fuelTypeList.length >= 3"
              class="fs-12 font-bold text-gray-600 md:!text-lg"
            >
              전체
            </span>
            <template v-else>
              <span
                v-for="type in fuelTypeList"
                :key="type"
                :class="[
                  'fs-12 font-bold md:!text-lg',
                  {
                    'text-primary': type === 'L',
                    'text-e1h2blue': type === 'H',
                    'text-e1evgreen': type === 'E',
                  },
                ]"
                >{{ useFuelName(type) }}</span
              >
            </template>
          </span>

          <span class="bar fs-14 float-end text-gray-600">
            <span>당첨자발표</span>
            <span class="date-text">{{ announcementDate }}</span>
          </span>
        </p>

        <div class="md:mt-4 md:flex md:flex-row">
          <p
            class="fs-16 md:fs-18 my-[.6rem] break-all font-bold md:my-0 md:mr-8 md:min-w-0 md:flex-1"
          >
            {{ title }}
          </p>
          <p class="fs-14 date-text text-gray-600">
            {{ startDate }}~{{ endDate }}
          </p>
        </div>
      </div>

      <!-- html load : event -->
      <div class="md:border-top">
        <CommonHtmlData :contents="contents" />

        <div v-if="ongoingEvent">
          <!-- 카카오 공유 버튼  -->
          <div class="px-8 py-16 md:px-0 md:py-[4.8rem] md:text-center">
            <button type="button" class="btn-share" @click="kakaoClick">
              <i class="ico-kakako">카카오톡 아이콘</i>
              앱 접속 링크 카카오톡으로 공유하기
            </button>
          </div>

          <!-- 앱다운로드 -->
          <div
            :class="[
              'bg-gray-400 px-8 pb-[4.4rem] pt-[3.6rem] text-center md:px-0',
              {
                'md:rounded-b-2xl': !notice,
              },
            ]"
          >
            <p class="font-bold">E1 오렌지 카드 앱</p>
            <p>설치하시고 이벤트에 참여해보세요!</p>
            <div class="mt-[1.6rem] flex flex-row md:mx-auto md:w-[53.6rem]">
              <button
                type="button"
                class="btn-download"
                @click="storeClick(useGooglePlay())"
              >
                <i class="ico-google"></i>
                Google Play
              </button>
              <button
                type="button"
                class="btn-download ml-[.8rem] md:ml-8"
                @click="storeClick(useAppStore())"
              >
                <i class="ico-apple"></i>
                App Store
              </button>
            </div>
          </div>
        </div>

        <div v-if="notice" class="p-8 md:p-16">
          <div class="rounded-lg bg-gray-100 p-[1.6rem]">
            <CommonHtmlData :contents="notice" />
          </div>
        </div>
      </div>
    </div>

    <p class="btn-wrap border-top p-8 pb-0 md:mt-20 md:!border-none md:pt-0">
      <NuxtLink
        :to="localePath(`/event${ongoingEvent ? '' : '/end'}`)"
        class="btn-txt gray"
      >
        목록
      </NuxtLink>
    </p>
  </div>
</template>

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
    width: 4.8rem;
    height: 9.8rem;
    margin-right: 0.4rem;
  }
}
</style>
