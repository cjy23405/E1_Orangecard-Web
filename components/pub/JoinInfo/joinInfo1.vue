<template>
  <div class="pb-[2.8rem] pt-16 md:px-16 md:pb-16">
    <p class="fs-18 mb-[1.2rem] font-bold md:mb-16">필수입력정보</p>
    <div class="lb-small md:px-16">
      <input-item
        :label-text="'아이디'"
        :required="true"
        :placeholder="'영문,숫자 조합 6~16자'"
        :success-text="'사용할 수 있는 아이디입니다.'"
        :error-text="'이미 사용중인 아이디입니다.'"
      ></input-item>
      <input-item
        :label-text="'비밀번호'"
        :type="'password'"
        :required="true"
        :placeholder="'영문대소문자,숫자,특수문자 포함 10~16자리'"
        :success-text="'사용할 수 있는 비밀번호입니다.'"
        :error-text="'비밀번호는 8자 이상 20자 이하를 입력해야 합니다.'"
      ></input-item>
      <input-item
        :label-text="'비밀번호 확인'"
        :type="'password'"
        :required="true"
        :placeholder="'비밀번호를 다시 입력해주세요.'"
        :success-text="'비밀번호가 일치합니다.'"
        :error-text="'비밀번호가 일치하지 않습니다.'"
      ></input-item>
      <input-item
        :label-text="'이름'"
        :required="true"
        :disabled="true"
      ></input-item>
      <!-- 아이핀으로 인증한 경우 -->
      <phone-item
        v-if="props.typeIpin"
        :label-text="'휴대폰번호'"
        :required="true"
        :is-error="true"
      ></phone-item>
      <input-item
        v-else
        :label-text="'휴대폰번호'"
        :required="true"
        :disabled="true"
      ></input-item>
      <input-item
        :label-text="'생년월일'"
        :required="true"
        :disabled="true"
      ></input-item>
      <email-item :label-text="'이메일'" :is-error="true"></email-item>
    </div>
  </div>
</template>
<script setup lang="ts">
import InputItem from "@/components/pub/InputItem.vue";
import PhoneItem from "@/components/pub/PhoneItem.vue";
import EmailItem from "@/components/pub/EmailItem.vue";

const props = withDefaults(
  defineProps<{
    typeIpin?: boolean;
  }>(),
  {
    typeIpin: false,
  },
);
</script>

<style lang="css" scoped>
.ipt-wrap + .ipt-wrap {
  margin-top: 2.8rem;
}
@media (min-width: 768px) {
  .ipt-wrap + .ipt-wrap {
    margin-top: 3.2rem;
  }
}
</style>
