<script setup lang="ts">
interface WinnersItem {
  rank: number;
  prize: string;
  users: {
    id: string;
    name: string;
  }[];
}

// props
const props = withDefaults(
  defineProps<{
    id?: number;
  }>(),
  {
    id: 0,
  },
);

// route
const localePath = useLocalePath();

// api
const { data, suspense } = useApiEventAnnouncementDetail({
  postingNo: props.id,
});

// api ssr
await suspense();

// computed
const fuelTypeList = computed(() => {
  return data?.value?.data?.fuelTypeList || [];
});
const title = computed(() => {
  return data?.value?.data?.title || "";
});
const announcementDate = computed(() => {
  const d = data?.value?.data?.announcementDt || "";
  return d ? useFormattedDate(d, "yyyy-MM-dd") : "";
});
const contents = computed(() => {
  const text = data.value?.data?.winMessage || "";
  const eventTitle = data.value?.data?.eventTitle || "";
  return text.replace(/##이벤트명##/g, eventTitle);
});
const notice = computed(() => {
  return data.value?.data?.winNote || "";
});
const etc = computed(() => {
  return data.value?.data?.contents || "";
});
const winners = computed((): WinnersItem[] => {
  if (!data.value?.data) return [];

  const d = data.value.data;
  const arr: WinnersItem[] = [];

  for (let i = 1; i <= 10; i++) {
    if (d[`winItem${i}`]) {
      const conts = (d[`winConts${i}`] as string) || "";
      const usersArr = conts.replace(/;$/, "").split(";");

      arr.push({
        rank: i,
        prize: d[`winItem${i}`] as string,
        users: usersArr.map((item) => {
          return {
            id: item.replace(/^.*\((.*)\)$/, "$1"),
            name: item.replace(/^(.*)\(.*\)$/, "$1"),
          };
        }),
      });
    }
  }

  return arr;
});
const description = computed(() => useDescription(contents.value));

// SEO
$setSEO({
  boardTitle: title.value,
  location: [useT("location.003003"), useT("location.003")],
  description: description.value,
});
</script>

<template>
  <div class="md:inner mt-[2.8rem] md:mt-16">
    <div class="md:round-box">
      <div
        class="border-y border-solid border-gray-300 p-8 pb-6 md:border-t-0 md:px-16 md:py-12"
      >
        <div class="md:flex md:flex-row">
          <span class="bar bar-gray block md:hidden">
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

          <p
            class="fs-16 my-[.6rem] break-all font-bold md:my-0 md:mr-8 md:min-w-0 md:flex-1"
          >
            {{ title }}
          </p>

          <span class="bar fs-14 text-gray-600">
            <span>당첨자발표</span>
            <span class="date-text">{{ announcementDate }}</span>
          </span>
        </div>
      </div>

      <div class="p-8 pb-16 md:p-16">
        <CommonTextData class="fs-14 text-center" :contents="contents" />

        <div class="relative mt-[5.3rem] pt-[6.6rem] md:mt-24 md:pt-[13.3rem]">
          <p
            class="titi-bubble-box fs-12 md:left md:fs-22 absolute left-[12.7rem] right-0 top-0 h-[4.2rem] w-auto bg-primary-foreground px-12 py-[1.2rem] text-center align-baseline text-gray-900 md:left-[27rem] md:right-auto md:top-8 md:h-28 md:px-24 md:py-8"
          >
            <strong class="fs-12 md:fs-22 align-baseline font-bold text-primary"
              >이벤트 당첨</strong
            >을 축하합니다~!
          </p>

          <div
            class="winner-box rounded-lg bg-gray-100 px-[3.6rem] pb-24 pt-[7.8rem] text-center before:absolute before:left-0 before:top-0 before:size-60 before:bg-contain before:bg-center before:bg-no-repeat before:content-[''] md:left-8 md:px-24 md:pb-32 md:pt-24 md:before:size-[30rem]"
          >
            <div
              v-for="item in winners"
              :key="item.rank"
              class="border-top pb-20 pt-16 first:border-none first:pb-20 first:pt-0 last:pb-0 md:pb-28 md:pt-24 md:first:pb-28"
            >
              <div>
                <p class="fs-18 md:fs-22 pt-[1.6rem] font-bold">
                  <span
                    class="tit relative mx-auto w-auto px-[.4rem] after:absolute after:bottom-0 after:left-0 after:h-4 after:w-full after:bg-primary after:opacity-10 after:content-['']"
                  >
                    {{ item.rank }}등
                    <strong
                      class="fs-18 md:fs-22 align-baseline font-bold text-primary"
                      >{{ item.prize }}</strong
                    ></span
                  >
                  <span
                    class="count-round fs-14 md:fs-16 ml-[.7rem] mt-[-1.6rem] inline-block rounded-lg rounded-es-sm bg-primary px-4 py-[.6rem] font-normal text-white md:mt-[-1.2rem]"
                    >{{ item.users.length.toLocaleString() }}명</span
                  >
                </p>
                <ul class="fs-14 mt-24 px-[.4rem] text-left md:text-center">
                  <li v-for="(user, i) in item.users" :key="i">
                    <strong class="mr-[.8rem] align-baseline font-bold">{{
                      user.name
                    }}</strong
                    >({{ user.id }})
                  </li>
                </ul>
              </div>
            </div>

            <div
              v-if="etc"
              class="border-top pb-20 pt-16 first:border-none first:pb-20 first:pt-0 last:pb-0 md:pb-28 md:pt-24 md:first:pb-28"
            >
              <div>
                <p
                  class="tit fs-16 md:fs-22 relative mx-auto inline-block w-auto px-[.4rem] after:absolute after:bottom-0 after:left-0 after:h-4 after:w-full after:bg-primary after:opacity-10 after:content-['']"
                >
                  {{ etc }}
                </p>
              </div>
            </div>
          </div>

          <div
            v-if="notice"
            class="mt-8 rounded-lg bg-gray-100 p-[1.6rem] md:mt-16"
          >
            <CommonTextData class="fs-14 text-gray-600" :contents="notice" />
          </div>
        </div>
      </div>
    </div>

    <p class="btn-wrap border-top px-8 pt-8 md:mt-24 md:!border-none md:pt-0">
      <NuxtLink :to="localePath('/event/announcement')" class="btn-txt gray">
        목록
      </NuxtLink>
    </p>
  </div>
</template>

<style lang="css" scoped>
.winner-box:before {
  background-image: url("@/assets/img/event/event-titi.png");
}

.winner-box ul li {
  width: 50%;
  display: inline-block;
  margin-top: 2rem;
  text-align: center;
}
.winner-box ul li:only-child {
  width: 100%;
}
.winner-box ul li:nth-child(1),
.winner-box ul li:nth-child(2) {
  margin-top: 0;
}
.titi-bubble-box {
  border-radius: 1rem 1rem 1rem 0.2rem;
}
.count-round {
  border-radius: 1.2rem 1.2rem 1.2rem 0.4rem;
}
@media (min-width: 768px) {
  .winner-box ul li {
    width: 20%;
    margin-top: 4rem;
  }
  .winner-box ul li:nth-child(3),
  .winner-box ul li:nth-child(4),
  .winner-box ul li:nth-child(5) {
    margin-top: 0;
  }
  .titi-bubble-box {
    border-radius: 2rem 2rem 2rem 0.4rem;
  }
}
</style>
