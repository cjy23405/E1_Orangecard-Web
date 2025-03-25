<template>
  <div class="inner !pt-0">
    <div class="border-top mt-[2.8rem] bg-e1yellow-foreground text-center">
      <div class="bg-titi inline-block w-auto py-6 pl-52 pr-8">
        <p class="fs-12 text-left">
          오렌지카드 앱을 다운로드 받으시면 <br />
          더 편리하게 서비스를 이용할 수 있어요.
        </p>
        <p class="mt-[.8rem] flex flex-row items-center">
          <img
            src="@/assets/img/head/logo-orangecard.png"
            alt="E1 Orange Card"
            class="w-[8.8rem]"
          />
          <NuxtLink class="btn-small ml-[1.6rem] px-[.8rem] py-[.3rem]"
            >앱 다운로드</NuxtLink
          >
        </p>
      </div>
    </div>

    <div class="px-8 py-16">
      <card-item></card-item>
      <input-item :label-text="'차량번호'" :placeholder="'입력'"></input-item>
      <input-item
        :label-text="'카드비밀번호'"
        :type="'password'"
        :placeholder="'숫자 4자리를 입력해 주세요.'"
      ></input-item>
      <input-item
        :label-text="'카드비밀번호 확인'"
        :type="'password'"
        :placeholder="'비밀번호를 다시 입력해주세요.'"
      ></input-item>
      <div class="border-top mt-[2.8rem] pt-[2.8rem] md:pt-16">
        <p class="fs-16 font-bold text-gray-700">
          개인정보 수집 및 이용에 대한 안내 동의<strong
            class="fs-16 ml-[.2rem] align-baseline font-bold text-primary"
            >(필수)</strong
          >
        </p>
        <div
          class="round-box my-[.8rem] h-72 overflow-y-auto md:my-[1.6rem] md:h-[21.4rem]"
        >
          <div id="divContentes" class="terms-box data-terms"></div>
        </div>
        <ul class="list-dot text-gray-600">
          <li>
            고객님께서는 동의를 거부할 수 있습니다.
            <span class="block md:inline">
              (단, 동의 거부시에는 오렌지카드 서비스 제공이 제한됩니다.)</span
            >
          </li>
        </ul>
        <div class="mt-[.8rem] pr-[.8rem] text-right md:mt-[1.6rem]">
          <radio-group class="ipt-line">
            <div class="ipt-item">
              <radio-group-item id="rdTerms01Ok" checked></radio-group-item>
              <label for="rdTerms01Ok">동의함</label>
            </div>
            <div class="ipt-item">
              <radio-group-item id="rdTerms01No"></radio-group-item>
              <label for="rdTerms01No">동의하지 않음</label>
            </div>
          </radio-group>
        </div>
      </div>
    </div>

    <div class="border-top btn-wrap px-8 pt-8">
      <NuxtLink class="btn-txt primary">등록하기</NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import CardItem from "@/components/pub/CardItem.vue";
import InputItem from "@/components/pub/InputItem.vue";
// 스토어
const stores = {
  layout: useStoreLayout(),
};

// 레이아웃 선택
definePageMeta({
  layout: "etc",
});

onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setPageTitle("롯데오토리스 전용&#mBr#&오렌지카드 등록");
  stores.layout.$setUseFooter(false);
  stores.layout.$setUseHeaderLine(false);
});
</script>
<style lang="css" scoped>
.no-border * {
  border: none;
}
.bg-titi {
  background: url("@/assets/img/etc/bg-titi.png") no-repeat 1rem bottom / 12rem
    auto;
}
.ipt-wrap + .ipt-wrap {
  margin-top: 2.8rem;
}
@media (min-width: 768px) {
  .ipt-wrap + .ipt-wrap {
    margin-top: 3.2rem;
  }
}
</style>
