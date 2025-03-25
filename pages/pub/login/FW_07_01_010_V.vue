<template>
  <div
    class="border-top border-bottom inner mt-[2.8rem] !py-16 md:mt-24 md:!py-24"
  >
    <div class="md:px-[29rem]">
      <input-item
        id="iptId"
        :placeholder="'아이디를 입력해주세요.'"
        :error-text="'아이디는 6~16글자로 입력하세요'"
      ></input-item>
      <input-item
        id="iptPw"
        :placeholder="'비밀번호를 입력하세요.'"
        :type="'password'"
        :error-text="'비밀번호를 확인해주세요.'"
        class="md:mt-8"
      ></input-item>
      <div class="ipt-line mt-[1.6rem] md:mt-8">
        <div class="ipt-item">
          <checkbox id="chkSaveId" class="ipt-check"></checkbox>
          <label for="chkSaveId">아이디 저장</label>
        </div>
      </div>

      <!-- 보안문자영역 -->
      <div class="mt-[.8rem]">
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

      <div class="btn-wrap my-8 md:mb-[2.8rem] md:mt-16">
        <NuxtLink class="btn-txt primary md:!max-w-full">로그인</NuxtLink>
      </div>
      <div class="bar bar-gray bar-lg text-center">
        <NuxtLink class="fs-14 inline-block text-gray-600">회원가입</NuxtLink>
        <NuxtLink class="fs-14 inline-block text-gray-600"
          >아이디 찾기</NuxtLink
        >
        <NuxtLink class="fs-14 inline-block text-gray-600"
          >비밀번호 재설정</NuxtLink
        >
      </div>
      <div class="btn-wrap mt-[3.2rem] md:mt-16">
        <NuxtLink class="btn-txt bg-[#fee500] font-bold md:!max-w-full"
          ><i
            class="kakao mr-[.4rem] mt-[-.2rem] inline-block size-[2.8rem] bg-contain bg-center bg-no-repeat"
          ></i
          >카카오 로그인</NuxtLink
        >
      </div>
      <div class="btn-wrap">
        <NuxtLink
          class="btn-txt bg-[#03c75a] font-bold text-white md:!max-w-full"
          ><i
            class="naver mr-[.4rem] mt-[-.2rem] inline-block size-[2.8rem] bg-contain bg-center bg-no-repeat"
          ></i
          >네이버 로그인</NuxtLink
        >
      </div>

      <div class="gray-box mt-[.8rem]">
        <ul class="list-dot text-gray-600">
          <li>
            고객님의 정보 보호를 위해 20분 이상 미이용하신 경우 자동으로
            로그아웃 됩니다.
          </li>
          <li>애플 ID로 로그인하시려면 E1오렌지카드 앱을 이용해주세요.</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import InputItem from "@/components/pub/InputItem.vue";
import { Checkbox } from "@/components/ui/checkbox";
// 스토어
const stores = {
  layout: useStoreLayout(),
};

// 레이아웃 선택
definePageMeta({
  layout: "sub",
});

onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("로그인");
});
</script>
<style lang="css" scoped>
@media (min-width: 768px) {
  .ipt-wrap + .ipt-wrap {
    margin-top: 2rem;
  }
  .bar > *:not(.icon-type) {
    font-size: 1.8rem;
    line-height: 2.4rem;
  }
}
.kakao {
  background-image: url("@/assets/img/login/btn-login-kakao.png");
}
.naver {
  background-image: url("@/assets/img/login/btn-login-naver.png");
}
.btn-refresh {
  background-image: url("@/assets/img/login/btn-refresh.png");
}
</style>
