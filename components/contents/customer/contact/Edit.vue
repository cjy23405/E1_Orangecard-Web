<script setup lang="ts">
import { DateTime } from "luxon";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { plainToClass } from "class-transformer";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// route
const localePath = useLocalePath();
const router = useRouter();

// api
const apiCodeList = useApiCodeList({
  codeGroup: "E1_SR_AREA_B2C",
});
const { isPending, mutate } = useApiContactAdd(uid);

// ssr
await apiCodeList.suspense();

// computed
const category = computed(() => {
  return apiCodeList.data.value?.data?.map((item) => ({
    value: item.code,
    text: item.codeNm,
  }));
});

// form
class ContactForm {
  srType: string = "";
  title: string = "";
  contents: string = "";
  uniqueId: string = "";
}
const labels: {
  [key: string]: string;
} = {
  srType: "구분",
  title: "제목",
  contents: "내용",
};
const form = useTemplateRef("form");
const formRaw = useTemplateRef("formRaw");
const initialValues = plainToClass(ContactForm, {});
const formSchema = toTypedSchema(
  z.object({
    srType: z.string().refine((v) => v, {
      message: useT("formMessage.001", [labels.srType]),
    }),
    title: z.string().superRefine((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.003", [labels.title]),
        });
      } else if (val.length > 40) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.005", [
            labels.title,
            "40",
            String(val.length),
          ]),
        });
      }
    }),
    contents: z.string().superRefine((val, ctx) => {
      const byte = useGetUtf16Byte(val);

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.003", [labels.contents]),
        });
      } else if (byte > 1000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.007", [
            labels.contents,
            "1000",
            String(byte),
          ]),
        });
      }
    }),
    uniqueId: z.string().refine((v) => v, {
      message: `uniqueId${useT("formMessage.004")}`,
    }),
  }),
);

// form reset
const reset = () => {
  form.value?.resetForm();
  form.value?.setFieldValue("uniqueId", DateTime.now().toMillis().toString());
};

// submit call
const submitCall = useDebounceFn(async () => {
  const values = form.value?.values as ContactForm;

  if (!values) return;

  mutate(
    {
      srType: values.srType,
      title: values.title,
      contents: values.contents,
      uniqueId: values.uniqueId,
    },
    {
      onSuccess: () => {
        alertOpen({
          message: useT("alertMessage.002"),
          buttons: [
            {
              callback: (closeFn) => {
                reset();
                closeFn();
              },
            },
          ],
        });
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      },
    },
  );
}, 300);

// submit
const submit = async () => {
  const validate = await form.value?.validate();

  if (validate?.valid) {
    if (!isPending.value) {
      submitCall();
    }
  } else if (validate?.errors) {
    const el = useGetValidateErrorEl(Object.keys(validate.errors));
    $elFocus(el);
  }
};

// 등록 클릭
const submitClick = () => {
  formRaw.value?.dispatchEvent(new Event("submit", { cancelable: true }));
};

// 취소 클릭
const cancelClick = () => {
  router.push(localePath("/"));
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// life cycle
onMounted(() => {
  form.value?.setFieldValue("uniqueId", DateTime.now().toMillis().toString());
});
</script>

<template>
  <div class="inner md:!px-40">
    <Form
      ref="form"
      as=""
      :validation-schema="formSchema"
      :initial-values="initialValues"
    >
      <form ref="formRaw" @submit.prevent="submit">
        <div class="md:flex md:flex-row">
          <FormField v-slot="{ componentField }" name="srType">
            <FormItem>
              <Label for="srType" class="md:w-[4.4rem] md:pt-[1.7rem]">
                {{ labels.srType }}
              </Label>
              <FormValidation class="md:w-full">
                <FormControl>
                  <FormSelect
                    id="srType"
                    v-model="componentField['modelValue']"
                    title="구분"
                    placeholder="선택"
                    :options="category"
                    @update:model-value="componentField['onUpdate:modelValue']"
                  />
                </FormControl>
              </FormValidation>
            </FormItem>
          </FormField>
        </div>
        <div class="md:mt-mt-[3.2rem] mt-[2.8rem] md:flex md:flex-row">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <Label for="title" class="md:w-[4.4rem] md:pt-[1.7rem]">
                {{ labels.title }}
              </Label>
              <FormValidation class="md:w-full">
                <FormControl>
                  <FormBasicInput
                    id="title"
                    type="text"
                    placeholder="제목을 입력하세요 (최대 40자)"
                    v-bind="componentField"
                  />
                </FormControl>
              </FormValidation>
            </FormItem>
          </FormField>
        </div>
        <div class="mt-[2.8rem] md:mt-[3.2rem] md:flex md:flex-row">
          <FormField v-slot="{ componentField }" name="contents">
            <FormItem>
              <Label for="contents" class="md:w-[4.4rem] md:pt-[1.7rem]">
                {{ labels.contents }}
              </Label>
              <FormValidation class="md:w-full">
                <FormControl>
                  <FormTextarea
                    id="contents"
                    placeholder="내용을 입력하세요 (최대 1000byte)"
                    v-bind="componentField"
                  />
                </FormControl>
              </FormValidation>
            </FormItem>
          </FormField>
        </div>

        <p class="btn-wrap mt-8 md:mt-24">
          <a
            role="button"
            tabindex="0"
            class="btn-txt gray"
            @click="cancelClick"
            @keypress.enter.space="cancelClick"
          >
            취소
          </a>
          <a
            role="button"
            tabindex="0"
            class="btn-txt primary"
            :aria-disabled="isPending"
            @click="submitClick"
            @keypress.enter.space="submitClick"
          >
            등록
          </a>
        </p>
      </form>
    </Form>

    <CommonAlert ref="alertLayer" />
  </div>
</template>
