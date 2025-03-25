<script setup lang="ts">
import type { Form } from "vee-validate";
import type {
  PropsType,
  PropsAuthType,
  ProfileForm,
} from "@/types/components/form/Profile";

// route
const localePath = useLocalePath();

// props
const props = withDefaults(
  defineProps<{
    type?: PropsType;
    authType?: PropsAuthType;
    usePassword?: boolean;
    form?: InstanceType<typeof Form> | null;
    labels?: {
      [key: string]: string;
    };
  }>(),
  {
    type: "add",
    authType: undefined,
    usePassword: true,
    form: undefined,
    labels: () => ({}),
  },
);

// state
const cellPhone = ref("");
const cellPhoneCheck = ref<boolean | null>();
const email = ref("");
const loginPw = ref("");

// 휴대폰 번호 update
const cellPhoneUpdate = () => {
  props.form?.setFieldValue("cellPhone", cellPhone.value);
};
const cellPhoneCheckUpdate = () => {
  props.form?.setFieldValue("cellPhoneCheck", cellPhoneCheck.value);
};

// init
const init = () => {
  const values = props.form?.values as ProfileForm;

  cellPhone.value = values.cellPhone;
  cellPhoneCheck.value = values.cellPhoneCheck;
  email.value = values.email;
};

// life cycle
onBeforeMount(() => {
  init();
});
</script>

<template>
  <div class="px-8 pb-[2.8rem] pt-16 md:px-16 md:pb-16">
    <p class="fs-18 mb-[1.2rem] font-bold md:mb-16">필수입력정보</p>
    <div class="lb-small md:px-16">
      <FormField v-slot="{ componentField }" name="loginId">
        <FormItem>
          <FormValidation
            for="loginId"
            :label="labels.loginId"
            required
            success-message="사용할 수 있는 아이디입니다."
          >
            <FormControl>
              <FormBasicInput
                id="loginId"
                type="text"
                required
                placeholder="영문,숫자 조합 6~16자"
                v-bind="componentField"
                :disabled="type === 'edit'"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField
        v-if="usePassword && !(type === 'add' && authType === 'NAVER')"
        v-slot="{ componentField }"
        name="loginPw"
      >
        <FormItem>
          <FormValidation
            for="loginPw"
            :label="labels.loginPw"
            :required="type === 'add'"
            :success-message="
              type === 'edit' && !loginPw
                ? ''
                : '사용할 수 있는 비밀번호입니다.'
            "
          >
            <FormControl>
              <FormBasicInput
                id="loginPw"
                v-bind="componentField"
                v-model="loginPw"
                type="password"
                :required="type === 'add'"
                placeholder="영문대소문자,숫자,특수문자 포함 10~16자리"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField
        v-if="usePassword && !(type === 'add' && authType === 'NAVER')"
        v-slot="{ componentField }"
        name="loginPwCheck"
      >
        <FormItem>
          <FormValidation
            for="loginPwCheck"
            :label="labels.loginPwCheck"
            :required="type === 'add'"
            :success-message="
              type === 'edit' && !loginPw ? '' : '비밀번호가 일치합니다.'
            "
          >
            <FormControl>
              <FormBasicInput
                id="loginPwCheck"
                type="password"
                :required="type === 'add'"
                placeholder="비밀번호를 다시 입력해주세요."
                v-bind="componentField"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormValidation for="name" :label="labels.name" required>
            <FormControl>
              <div class="relative">
                <FormBasicInput
                  id="name"
                  type="text"
                  class="flex-1"
                  disabled
                  v-bind="componentField"
                />
                <NuxtLink
                  v-if="type === 'edit'"
                  :to="localePath('/my-page/profile/rename')"
                  class="btn-mini absolute right-[0.6rem] top-[1.2rem] md:top-6"
                >
                  회원명변경
                </NuxtLink>
              </div>
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField
        v-if="(type === 'add' && authType === 'IPIN') || type === 'edit'"
        name="cellPhone"
      >
        <FormItem>
          <FormValidation for="cellPhone" :label="labels.cellPhone" required>
            <FormControl>
              <FormPhone
                v-model="cellPhone"
                v-model:check="cellPhoneCheck"
                :type="type"
                @update:model-value="cellPhoneUpdate"
                @update:check="cellPhoneCheckUpdate"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField v-else v-slot="{ componentField }" name="cellPhone">
        <FormItem>
          <FormValidation for="cellPhone" :label="labels.cellPhone" required>
            <FormControl>
              <FormBasicInput
                id="cellPhone"
                type="text"
                disabled
                v-bind="componentField"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="birthday">
        <FormItem>
          <FormValidation for="birthday" :label="labels.birthday" required>
            <FormControl>
              <FormBasicInput
                id="birthday"
                type="text"
                disabled
                v-bind="componentField"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormValidation for="email" :label="labels.email" required>
            <FormControl>
              <FormEmail
                v-model="email"
                :id-attrs="{
                  id: 'email',
                }"
                @update:model-value="componentField['onUpdate:modelValue']"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>
    </div>
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
}
</style>
