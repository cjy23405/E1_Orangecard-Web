<script setup lang="ts">
import type { Form } from "vee-validate";
import type {
  PropsType,
  PropsAuthType,
  ProfileForm,
} from "@/types/components/form/Profile";

// props
const props = withDefaults(
  defineProps<{
    type?: PropsType;
    authType?: PropsAuthType;
    form?: InstanceType<typeof Form> | null;
    labels?: {
      [key: string]: string;
    };
  }>(),
  {
    type: "add",
    authType: undefined,
    form: undefined,
    labels: () => ({}),
  },
);

// state
const agreeB2 = ref("");

// init
const init = () => {
  const values = props.form?.values as ProfileForm;
  agreeB2.value = values.agreePrivateOpt;
};

// update agree
const update = () => {
  props.form?.setFieldValue("agreePrivateOpt", agreeB2.value);
};

// life cycle
onBeforeMount(() => {
  init();
});
</script>

<template>
  <div class="border-top lb-small !border-t-2 px-8 py-[2.8rem] md:p-16">
    <p class="fs-18 mb-[1.2rem] font-bold md:mb-16">추가정보</p>

    <div class="border-bottom mb-[2.8rem] pb-[2.8rem]">
      <p class="fs-16 font-bold text-gray-700">
        맞춤형 서비스 제공을 위한 마케팅 수집이용 동의<strong
          class="fs-16 ml-[.2rem] align-baseline font-bold text-gray-600"
          >(선택)</strong
        >
      </p>

      <AgreementsDetailBox code="B2" />

      <div class="pr-[.8rem] text-right">
        <RadioGroup
          v-model="agreeB2"
          class="ipt-line"
          @update:model-value="update"
        >
          <div class="ipt-item">
            <RadioGroupItem id="b2Y" value="Y"></RadioGroupItem>
            <label for="b2Y">동의함</label>
          </div>
          <div class="ipt-item">
            <RadioGroupItem id="b2N" value="N"></RadioGroupItem>
            <label for="b2N">동의하지 않음</label>
          </div>
        </RadioGroup>
      </div>
    </div>

    <FormProfileMarketingAdditional
      :type="type"
      :auth-type="authType"
      :form="form"
      :labels="labels"
      :disabled="agreeB2 === 'N'"
    />
  </div>
</template>
