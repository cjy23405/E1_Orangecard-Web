<template>
  <div
    class="inner border-top border-bottom mt-[2.8rem] !py-16 md:mt-24 md:!py-24"
  >
    <div class="md:px-[29rem]">
      <!-- 보안문자영역 -->
      <div>
        <div
          class="line-box relative flex h-28 justify-center !p-0 md:h-[11.2rem]"
        >
          <!-- 보안문자이미지 -->
          <img class="h-full" />
          <NuxtLink
            class="btn-refresh absolute right-[.4rem] top-[.4rem] size-[2.4rem] bg-contain bg-center bg-no-repeat text-zero md:right-[.8rem] md:top-[.8rem]"
            >보안문자 새로고침</NuxtLink
          >
        </div>
        <input-item
          :placeholder="'보안문자를 입력해주세요.'"
          class="my-[.8rem]"
        ></input-item>
        <div class="gray-box">
          <ul class="list-dot text-gray-600">
            <li>보안문자는 대·소문자를 구분하지 않습니다.</li>
          </ul>
        </div>
      </div>
      <card-item
        :title-top="true"
        class="mt-[2.8rem] md:mt-[3.2rem]"
      ></card-item>
      <input-item
        :title-top="true"
        :label-text="'카드비밀번호'"
        :type="'password'"
        :placeholder="'숫자 4자리를 입력해 주세요.'"
      ></input-item>
      <div class="ipt-line mt-[1.6rem] md:mt-8">
        <div class="ipt-item">
          <checkbox id="chkSaveCard" class="ipt-check"></checkbox>
          <label for="chkSaveCard">카드번호 기억하기</label>
        </div>
      </div>
      <div class="btn-wrap pt-8 md:pt-16">
        <NuxtLink class="btn-txt primary md:w-full md:!max-w-full"
          >로그인</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CardItem from "@/components/pub/CardItem.vue";
import InputItem from "@/components/pub/InputItem.vue";
import { Checkbox } from "@/components/ui/checkbox";
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
  stores.layout.$setPageTitle("법인택시 오렌지&#mBr#&포인트 조회");
  stores.layout.$setUseFooter(false);
  stores.layout.$setUseHeaderLine(false);
});
</script>
<style lang="css" scoped>
.no-border * {
  border: none;
}
.ipt-wrap + .ipt-wrap {
  margin-top: 2.8rem;
}
@media (min-width: 768px) {
  .ipt-wrap + .ipt-wrap {
    margin-top: 3.2rem;
  }
}
.btn-refresh {
  background-image: url("@/assets/img/login/btn-refresh.png");
}
</style>
