<script setup lang="ts">
// props
withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: "",
  },
);
</script>

<template>
  <div
    id="appDownloadGuidePage"
    class="bg-titi relative min-h-[54rem] flex-1 pt-24 text-center"
  >
    <h1 class="logo">
      <img
        src="@/assets/img/head/logo-orangecard.png"
        alt="E1 Orange Card"
        class="mx-auto w-[22rem]"
      />
    </h1>

    <p v-if="title" class="fs-16 mt-[1.6rem]">{{ title }}</p>

    <p class="fs-14 mt-[1.6rem] text-gray-600">
      E1 오렌지카드 앱을 설치하시면 <br />더 편리하게 이용할 수 있어요.
    </p>

    <div class="btn-wrap subinner absolute bottom-16 left-0 md:!px-[33rem]">
      <a
        :href="useGooglePlay()"
        target="_blank"
        class="btn-txt onShadow fs-16 google large font-bold before:mb-[-.6rem] before:mr-[0.6rem] before:inline-block before:size-[2.4rem] before:!bg-contain before:content-[''] md:before:mb-[-1.6rem] md:before:size-[4.8rem]"
      >
        Google Play
      </a>
      <a
        :href="useAppStore()"
        target="_blank"
        class="btn-txt onShadow fs-16 apple large font-bold before:mb-[-.6rem] before:mr-[0.6rem] before:inline-block before:size-[2.4rem] before:!bg-contain before:content-[''] md:!ml-8 md:before:mb-[-1.6rem] md:before:size-[4.8rem]"
      >
        App Store
      </a>
    </div>
  </div>
</template>

<style lang="css" scoped>
.bg-titi {
  background: #fff7e3 url("@/assets/img/etc/bg-titi-big.png") no-repeat center
    bottom/36rem auto;
}
.btn-txt.google:before {
  background: url("@/assets/img/main/google.png") no-repeat center center;
}
.btn-txt.apple:before {
  background: url("@/assets/img/main/apple.png") no-repeat center center;
}
</style>
