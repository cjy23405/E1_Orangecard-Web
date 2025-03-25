<script setup lang="ts">
import type { WallpaperDownloadCountRequest } from "@/types/api";
import type { CarouselApi } from "@/components/ui/carousel";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// api
const apiList = useApiWallpaperList();
const apiCount = useApiWallpaperDownloadCount(uid);

// api ssr
await apiList.suspense();

// computed
const list = computed(() => {
  return apiList.data.value?.data || null;
});
const thisData = computed(() => {
  return list.value ? list.value[current.value - 1] : null;
});

// download count
const downloadCount = (type: WallpaperDownloadCountRequest["downloadType"]) => {
  if (!thisData.value) return;

  apiCount.mutate(
    {
      wallpaperId: thisData.value.wallpaperId,
      downloadType: type,
    },
    {
      onSuccess: () => {},
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      },
    },
  );
};

// web 다운로드
const downloadWeb = (url: string) => {
  $download(url);
  downloadCount("WEB");
};

// app 다운로드
const downloadApp = (url: string) => {
  $download(url);
  downloadCount("APP");
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// Carousel 관련
const carousel = ref<CarouselApi>();
const totalCount = ref(0);
const current = ref(1);

const setCarousel = (val: CarouselApi) => {
  carousel.value = val;
};

watchOnce(carousel, (carousel) => {
  if (!carousel) return;

  totalCount.value = carousel.scrollSnapList().length;
  current.value = carousel.selectedScrollSnap() + 1;

  carousel.on("select", () => {
    current.value = carousel.selectedScrollSnap() + 1;
  });
});
</script>

<template>
  <section class="mt-[14.3rem] px-8 md:mt-[28.2rem] md:px-0">
    <div class="titi-wall md:relative md:pl-[67.4rem]">
      <p
        class="text-[2.6rem] font-bold leading-[3.6rem] md:px-8 md:text-[4rem] md:leading-[4rem]"
      >
        티티 월페이퍼
      </p>
      <div
        class="wallpapaer-wrap border-top border-alpha fs-18 relative mt-8 pt-[2.8rem] md:absolute md:left-8 md:top-0 md:mt-0 md:w-[52.7rem] md:border-t-0 md:!border-none md:pt-0"
      >
        <Carousel
          v-if="list"
          class="-mx-4 -mt-4"
          :opts="{
            align: 'center',
            loop: false,
            duration: 50,
          }"
          @init-api="setCarousel"
        >
          <CarouselContent>
            <CarouselItem v-for="item in list" :key="item.wallpaperId">
              <div class="wallpapaer flex p-4">
                <div
                  class="wallpapaer-img min-w-0 flex-1"
                  :style="{
                    background: `url('${item.imageUrlWeb}') no-repeat 50% 50% / cover`,
                  }"
                ></div>
                <div
                  class="wallpapaer-img w-[21.5%] flex-none"
                  :style="{
                    background: `url('${item.imageUrlApp}') no-repeat 50% 50% / cover`,
                  }"
                ></div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <div
            class="relative mt-[2.2rem] flex flex-row justify-center align-middle md:mt-[9.2rem]"
          >
            <CarouselPrevious
              class="btn-car-prev relative left-0 top-0 size-[2.4rem] translate-y-0 md:size-[3.2rem]"
            />
            <p class="fs-18 w-56 text-center align-baseline">
              <span class="align-baseline font-bold">{{ current }}</span>
              <span class="mx-[1.2rem] align-baseline">/</span>
              <span class="align-baseline">{{ totalCount }}</span>
            </p>
            <CarouselNext
              class="btn-car-next relative right-0 top-0 size-[2.4rem] translate-y-0 md:size-[3.2rem]"
            />
          </div>
        </Carousel>
      </div>
      <div
        class="md:border-top border-alpha mt-16 md:mt-8 md:w-[46.6rem] md:pt-[3.2rem]"
      >
        <p class="fs-18 text-center font-bold">
          {{ thisData?.wallpaperName }}
        </p>
        <p class="mt-8 px-8 md:mt-[2.4rem]">
          <a
            v-if="thisData?.imageUrlWeb"
            role="button"
            tabindex="0"
            class="btn-downtiti mx-auto inline-block w-full rounded-lg bg-white/50 p-[1.3rem] text-center font-bold md:px-16 md:py-6 md:text-lg"
            @click="downloadWeb(thisData.imageUrlWeb)"
            @keypress.enter.space="downloadWeb(thisData.imageUrlWeb)"
            >PC/데스크탑 다운로드</a
          >
        </p>
        <p class="mt-8 px-8 md:mt-[2.4rem]">
          <a
            v-if="thisData?.imageUrlApp"
            role="button"
            tabindex="0"
            class="btn-downtiti mx-auto inline-block w-full rounded-lg bg-white/50 p-[1.3rem] text-center font-bold md:px-16 md:py-6 md:text-lg"
            @click="downloadApp(thisData.imageUrlApp)"
            @keypress.enter.space="downloadApp(thisData.imageUrlApp)"
            >모바일 다운로드</a
          >
        </p>

        <ul class="list-dot mt-16 md:ml-[.5rem] md:mt-[3.2rem]">
          <li>
            해당 캐릭터에 대한 저작재산권은 주식회사 E1이 보유하고 있습니다.
          </li>
        </ul>
      </div>
    </div>
    <div
      class="mt-[23.9rem] rounded-lg bg-[#fff7e380]/50 py-8 text-center md:mt-[34.5rem] md:flex md:h-48 md:w-full md:flex-row md:py-0 md:pl-[9.6rem]"
    >
      <div
        class="titi-epi relative mx-auto inline-block w-auto pl-72 md:mx-0 md:pl-[26rem]"
      >
        <img
          src="@/assets/img/introduction/titi-ep.png"
          alt="티티 에피소드 이미지"
          class="absolute bottom-[-1.2rem] left-0 size-72 md:bottom-[-2.6rem] md:size-[26rem]"
        />
        <p
          class="fs-18 h-auto flex-1 text-left font-bold text-primary md:my-[4.6rem]"
        >
          티티의 더 많은 <span class="block md:inline"> 에피소드가</span>
          <span class="block md:inline"> 궁금하다면?</span>
        </p>
      </div>
      <div class="mt-[2.2rem] px-8 md:my-[2.9rem] md:pl-[7.2rem]">
        <a
          href="https://www.youtube.com/user/E1orangecard"
          target="_blank"
          class="btn-octv mx-auto inline-block w-full rounded-lg bg-white/50 p-6 text-center font-bold md:px-16 md:py-8 md:text-lg"
        >
          E1 공식 유튜브 오렌지테레비
        </a>
      </div>
    </div>

    <CommonAlert ref="alertLayer" />
  </section>
</template>

<style lang="css" scoped>
.wallpapaer-wrap::before,
.wallpapaer-wrap::after {
  content: "";
  display: table;
}
.wallpapaer {
  aspect-ratio: 320 / 136;
}
.wallpapaer .wallpapaer-img {
  border-radius: 0.8rem;
  box-shadow: 0 1.8px 5.5px 0 rgba(0, 0, 0, 0.25);
  border: solid 0.4rem #1d2023;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.wallpapaer .wallpapaer-img + .wallpapaer-img {
  margin-left: 6px;
}
@media (min-width: 768px) {
  .wallpapaer .wallpapaer-img + .wallpapaer-img {
    margin-left: 16px;
  }
}

.btn-car-prev {
  background: url("@/assets/img/introduction/btn-my-pre.png") no-repeat center
    center / 100% auto;
}
.btn-car-next {
  background: url("@/assets/img/introduction/btn-my-next.png") no-repeat center
    center / 100% auto;
}
.btn-car-prev *,
.btn-car-next * {
  display: none;
}
.btn-downtiti:after {
  content: "";
  display: inline-block;
  width: 1.8rem;
  height: 1.8rem;
  background: url("@/assets/img/introduction/btn-downtiti.png") no-repeat center
    center/100% auto;
  margin-bottom: -0.4rem;
  margin-left: 0.2rem;
}
.btn-octv:before {
  content: "";
  display: inline-block;
  width: 3.8rem;
  height: 3rem;
  background: url("@/assets/img/introduction/ico-otv.png") no-repeat center
    center/100% auto;
  margin: -1rem 1rem;
}
.border-alpha {
  border-top-color: rgba(0, 0, 0, 0.2) !important;
}
</style>
