<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { plainToClass } from "class-transformer";
import { DateTimeInputDateTime } from "@/types/components/form/DateTimeInput";
import type { AddressData } from "@/types/components/form/Address";

// 레이아웃 선택
definePageMeta({
  layout: "sub",
});

// 스토어
const stores = {
  layout: useStoreLayout(),
};

// life cycle
onBeforeMount(() => {
  // 레이아웃 추가 설정
  stores.layout.$setGnbActive("");
  stores.layout.$setPageTitle("폼 컴포넌트 예제");
});

// form
class TestForm {
  text: string = "";
  email: string = "";
  phone: string = "";
  tel: string = "";
  address: AddressData | null = null;
  textarea: string = "";
  date: string = "";
  datetime: string = "";
  time: string = "";
}
const form = useTemplateRef("form");
const initialValues = plainToClass(TestForm, {});
const formSchema = toTypedSchema(
  z.object({
    text: z.string().refine((v) => v, {
      message: `필수입니다.`,
    }),
    email: z.string().refine((v) => v, {
      message: `필수입니다.`,
    }),
    phone: z.string().refine((v) => v, {
      message: `필수입니다.`,
    }),
    tel: z.string().refine((v) => v, {
      message: `필수입니다.`,
    }),
    address: z
      .object({
        zipCode: z.string(),
        sido: z.string(),
        gugun: z.string(),
        addr: z.string(),
        addrJi: z.string(),
        addrDtl: z.string(),
      })
      .nullable()
      .refine((v) => v, {
        message: `필수입니다.`,
      }),
    textarea: z.string().refine((v) => v, {
      message: `필수입니다.`,
    }),
    date: z.string().refine(() => dateDateTime.value.isValid, {
      message: "날짜가 유효하지 않습니다.",
    }),
    datetime: z.string().refine(() => datetimeDateTime.value.isValid, {
      message: "날짜가 유효하지 않습니다.",
    }),
    time: z.string().refine(() => timeDateTime.value.isValid, {
      message: "시간이 유효하지 않습니다.",
    }),
  }),
);

// state
const email = ref("");
const phone = ref("");
const phoneCheck = ref(null);
const tel = ref("");
const address = ref<AddressData | null>(null);

// update address
const addressUpdate = () => {
  form.value?.setFieldValue("address", address.value);
};

// date 인풋
const dateVal = ref("2024-12-25");
const dateInput = useTemplateRef("dateInput");
const dateDateTime = computed((): DateTimeInputDateTime => {
  return plainToClass(
    DateTimeInputDateTime,
    dateInput.value?.getDateTime() || {},
  );
});

// datetime 인풋
const datetimeVal = ref("");
const datetimeInput = useTemplateRef("datetimeInput");
const datetimeDateTime = computed((): DateTimeInputDateTime => {
  return plainToClass(
    DateTimeInputDateTime,
    datetimeInput.value?.getDateTime() || {},
  );
});

// time 인풋
const timeVal = ref("");
const timeInput = useTemplateRef("timeInput");
const timeDateTime = computed((): DateTimeInputDateTime => {
  return plainToClass(
    DateTimeInputDateTime,
    timeInput.value?.getDateTime() || {},
  );
});
</script>

<template>
  <div class="inner">
    <FormBasicInput
      type="text"
      required
      placeholder="placeholder"
      default-value="default-value"
      class="mb-10"
    />

    <Form
      ref="form"
      :validation-schema="formSchema"
      :initial-values="initialValues"
    >
      <FormField v-slot="{ componentField }" name="text">
        <FormItem>
          <FormValidation
            for="text"
            label="text"
            required
            success-message="사용할 수 있는 아이디입니다."
          >
            <FormControl>
              <FormBasicInput
                id="text"
                type="text"
                required
                v-bind="componentField"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormValidation for="email" label="email" required>
            <FormControl>
              <FormEmail
                v-model="email"
                @update:model-value="componentField['onUpdate:modelValue']"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField name="phone">
        <FormItem>
          <FormValidation for="phone" label="phone" required>
            <FormControl>
              <FormPhone v-model="phone" v-model:check="phoneCheck" />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="tel">
        <FormItem>
          <FormValidation for="tel" label="tel">
            <FormControl>
              <FormTel
                id="tel"
                v-model="tel"
                @update:model-value="componentField['onUpdate:modelValue']"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField name="address">
        <FormItem>
          <FormValidation for="address" label="address" required>
            <FormControl>
              <FormAddress
                v-model="address"
                @update:model-value="addressUpdate"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="textarea">
        <FormItem>
          <FormValidation for="textarea" label="textarea" required>
            <FormControl>
              <FormTextarea id="textarea" required v-bind="componentField" />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="date">
        <FormItem>
          <FormValidation for="date" label="date" required>
            <FormControl>
              <FormDateTimeInput
                id="date"
                ref="dateInput"
                v-model="dateVal"
                disabled
                @update:model-value="componentField['onUpdate:modelValue']"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="datetime">
        <FormItem>
          <FormValidation for="datetime" label="datetime" required>
            <FormControl>
              <FormDateTimeInput
                id="datetime"
                ref="datetimeInput"
                v-model="datetimeVal"
                mode="datetime"
                min-date="2024-12-12 05:20:00"
                max-date="2025-01-30 12:30:00"
                @update:model-value="componentField['onUpdate:modelValue']"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="time">
        <FormItem>
          <FormValidation for="time" label="time" required>
            <FormControl>
              <FormDateTimeInput
                id="time"
                ref="timeInput"
                v-model="timeVal"
                mode="time"
                min-date="05:20:00"
                max-date="12:30:00"
                @update:model-value="componentField['onUpdate:modelValue']"
              />
            </FormControl>
          </FormValidation>
        </FormItem>
      </FormField>

      <div class="mt-16 text-2xl">
        <button
          type="submit"
          class="rounded-full bg-black px-4 py-2 font-bold text-white disabled:opacity-30"
        >
          submit
        </button>
      </div>
    </Form>
  </div>
</template>
