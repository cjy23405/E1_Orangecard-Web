<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import type { MarketingAgree } from "@/types/components/form/Profile";

// defineOptions
defineOptions({
  inheritAttrs: false,
});

// props
const props = withDefaults(
  defineProps<{
    type?: "default" | "agreements";
    class?: HTMLAttributes["class"];
    disabled?: boolean;
  }>(),
  {
    type: "default",
    class: "",
    disabled: false,
  },
);

// emit
const emit = defineEmits<{
  change: [v: MarketingAgree];
}>();

// state
const b4 = ref(false);
const email = ref(false);
const sms = ref(false);
const appPush = ref(false);
const talk = ref(false);

// computed
const agree = computed<MarketingAgree>(() => {
  return {
    B4: b4.value,
    email: email.value,
    sms: sms.value,
    appPush: appPush.value,
    talk: talk.value,
  };
});

// all check
const allCheck = (v: boolean) => {
  b4.value = v;
  email.value = v;
  sms.value = v;
  appPush.value = v;
  talk.value = v;
};

// set check
const setCheck = (v: MarketingAgree) => {
  b4.value = v.B4;
  email.value = v.email;
  sms.value = v.sms;
  appPush.value = v.appPush;
  talk.value = v.talk;
};

// b4 동의
const b4Change = (v: boolean) => {
  allCheck(v);
};

// watch
watch([b4, email, sms, appPush, talk], () => {
  emit("change", agree.value);
});
watch([email, sms, appPush, talk], () => {
  if (
    (!email.value || !sms.value || !appPush.value || !talk.value) &&
    b4.value
  ) {
    b4.value = false;
  } else if (
    email.value &&
    sms.value &&
    appPush.value &&
    talk.value &&
    !b4.value
  ) {
    b4.value = true;
  }
});

// expose
defineExpose<{
  allCheck: (v: boolean) => void;
  setCheck: (v: MarketingAgree) => void;
  getChecked: () => MarketingAgree;
}>({
  allCheck,
  setCheck,
  getChecked: () => agree.value,
});
</script>

<template>
  <div :class="cn('border-top mb-16 pt-[2.8rem] md:pt-16', props.class)">
    <div class="ipt-line">
      <div class="ipt-item">
        <Checkbox
          id="agreeB4"
          v-model:checked="b4"
          class="ipt-check"
          :disabled="disabled"
          @update:checked="b4Change"
        ></Checkbox>
        <label for="agreeB4">광고성 정보 수신 동의</label>
      </div>
    </div>
    <div class="ipt-line sub">
      <div class="ipt-item">
        <Checkbox
          id="agreeEmail"
          v-model:checked="email"
          class="ipt-check noline"
          :disabled="disabled"
        ></Checkbox>
        <label for="agreeEmail">이메일</label>
      </div>
    </div>
    <div class="ipt-line sub">
      <div class="ipt-item">
        <Checkbox
          id="agreeSms"
          v-model:checked="sms"
          class="ipt-check noline"
          :disabled="disabled"
        ></Checkbox>
        <label for="agreeSms">SMS</label>
      </div>
    </div>
    <div class="ipt-line sub">
      <div class="ipt-item">
        <Checkbox
          id="agreeAppPush"
          v-model:checked="appPush"
          class="ipt-check noline"
          :disabled="disabled"
        ></Checkbox>
        <label for="agreeAppPush">App Push</label>
      </div>
    </div>
    <div class="ipt-line sub">
      <div class="ipt-item">
        <Checkbox
          id="agreeTalk"
          v-model:checked="talk"
          class="ipt-check noline"
          :disabled="disabled"
        ></Checkbox>
        <label for="agreeTalk">카카오 알림톡/친구톡</label>
      </div>
    </div>
    <div class="mt-8 md:mt-12">
      <ul class="list-dot pl-[3.6rem] text-gray-600">
        <li>
          E1 오렌지카드와 관련한 정보(이벤트, 할인쿠폰, 기념일 등)를
          안내해드립니다.
        </li>
        <li>
          비밀번호 변경 등 일부 안내사항은 수신동의 여부와 상관 없이 발송됩니다.
        </li>
      </ul>
    </div>
    <div
      v-if="type === 'agreements'"
      class="gray-box mt-8 hidden md:mt-16 md:block"
    >
      <ul class="list-dot text-gray-600">
        <li>
          「 개인정보보호법 」 제 15조, 제 22조에 따라 고객 본인의 동의를 얻고
          있습니다. 반드시 약관 및 개인정보 수집 내용을 확인해주세요.
        </li>
        <li>자세한 사항은 개인정보처리방침에서 다시 확인하실 수 있습니다.</li>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
@media (min-width: 768px) {
  .ipt-line.sub {
    display: inline-block;
    padding-right: 6rem;
    margin-top: 3rem !important;
  }
}
</style>
