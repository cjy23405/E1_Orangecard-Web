<script setup lang="ts">
import type { Form } from "vee-validate";
import type {
  PropsType,
  PropsAuthType,
  ProfileForm,
} from "@/types/components/form/Profile";
import type { AddressData } from "@/types/components/form/Address";

// props
const props = withDefaults(
  defineProps<{
    type?: PropsType;
    authType?: PropsAuthType;
    form?: InstanceType<typeof Form> | null;
    labels?: {
      [key: string]: string;
    };
    disabled: boolean;
  }>(),
  {
    type: "add",
    authType: undefined,
    form: undefined,
    labels: () => ({}),
    disabled: false,
  },
);

// state
const gender = ref("");
const address = ref<AddressData | null>(null);

// ref
const marketingAgree = useTemplateRef("marketingAgree");

// computed
const agree = computed(() => {
  const marketingAgreeChecks = marketingAgree.value?.getChecked();

  return {
    B4: marketingAgreeChecks?.B4 ? "Y" : "N",
    email: marketingAgreeChecks?.email ? "Y" : "N",
    sms: marketingAgreeChecks?.sms ? "Y" : "N",
    appPush: marketingAgreeChecks?.appPush ? "Y" : "N",
    talk: marketingAgreeChecks?.talk ? "Y" : "N",
  };
});

// init
const init = () => {
  const values = props.form?.values as ProfileForm;

  marketingAgree.value?.setCheck({
    B4:
      values.agreeEmail === "Y" ||
      values.agreeSms === "Y" ||
      values.agreeBenefit === "Y" ||
      values.agreeTalk === "Y",
    email: values.agreeEmail === "Y",
    sms: values.agreeSms === "Y",
    appPush: values.agreeBenefit === "Y",
    talk: values.agreeTalk === "Y",
  });

  gender.value = values.gender;
  address.value = values.address;
  marriedDtVal.value = values.marriedDt;
};

// update agree
const agreeUpdate = () => {
  props.form?.setFieldValue("agreeEmail", agree.value.email);
  props.form?.setFieldValue("agreeSms", agree.value.sms);
  props.form?.setFieldValue("agreeBenefit", agree.value.appPush);
  props.form?.setFieldValue("agreeTalk", agree.value.talk);
};

// update gender
// const genderUpdate = () => {
//   props.form?.setFieldValue("gender", gender.value);
// };

// update address
const addressUpdate = () => {
  props.form?.setFieldValue("address", address.value);
};

// date 인풋
const marriedDtVal = ref("");
const marriedDtUpdate = () => {
  props.form?.setFieldValue("marriedDt", marriedDtVal.value.replace(/-/g, ""));
};

// life cycle
onMounted(() => {
  init();
});
</script>

<template>
  <div>
    <div class="lb-small md:px-16">
      <!-- <FormField name="gender" class="hidden md:block">
        <FormItem>
          <FormValidation for="gender" :label="labels.gender">
            <FormControl>
              <RadioGroup
                v-model="gender"
                class="ipt-line !py-0"
                @update:model-value="genderUpdate"
              >
                <div class="ipt-item">
                  <RadioGroupItem
                    id="genderM"
                    value="M"
                    :disabled="disabled"
                  ></RadioGroupItem>
                  <label for="genderM">남</label>
                </div>
                <div class="ipt-item !ml-24">
                  <RadioGroupItem
                    id="genderF"
                    value="F"
                    :disabled="disabled"
                  ></RadioGroupItem>
                  <label for="genderF">여</label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField> -->

      <FormField name="address">
        <FormItem>
          <FormValidation for="address" :label="labels.address">
            <FormControl>
              <FormAddress
                v-model="address"
                :disabled="disabled"
                @update:model-value="addressUpdate"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="homePhone">
        <FormItem>
          <FormValidation for="homePhone" :label="labels.homePhone">
            <FormControl>
              <FormTel
                id="homePhone"
                v-model="componentField['modelValue']"
                placeholder="- 없이 입력하세요"
                :disabled="disabled"
                @update:model-value="componentField['onUpdate:modelValue']"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField name="marriedDt">
        <FormItem>
          <FormValidation for="marriedDt" :label="labels.marriedDt">
            <FormControl>
              <FormDateTimeInput
                id="marriedDt"
                v-model="marriedDtVal"
                :disabled="disabled"
                @update:model-value="marriedDtUpdate"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>
    </div>

    <FormProfileMarketingAgree
      ref="marketingAgree"
      class="mb-[1.2rem] mt-[2.8rem] md:mb-0"
      :disabled="disabled"
      @change="agreeUpdate"
    />
  </div>
</template>

<style lang="css" scoped>
.ipt-wrap + .ipt-wrap {
  margin-top: 2.8rem;
}
@media (min-width: 768px) {
  .ipt-wrap + .ipt-wrap {
    margin-top: 3.2rem;
  }
  :deep(.ipt-line.sub) {
    margin-top: 3.1rem !important;
    padding-left: 6rem !important;
    padding-right: 0 !important;
  }
  :deep(.ipt-line:not(.sub) + .ipt-line.sub) {
    padding-left: 3.6rem !important;
  }
}
</style>
