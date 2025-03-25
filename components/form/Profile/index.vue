<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { plainToClass } from "class-transformer";
import type { Form } from "vee-validate";
import type { AlertOptions } from "@/types/components/common/Alert";
import type { PropsType, PropsAuthType } from "@/types/components/form/Profile";
import { ProfileForm } from "@/types/components/form/Profile";

// uid
const uid = getCurrentInstance()?.uid;

// props
const props = withDefaults(
  defineProps<{
    type?: PropsType;
    authType?: PropsAuthType;
    usePassword?: boolean;
    submitDisabled?: boolean;
    initValues?: Partial<ProfileForm>;
  }>(),
  {
    type: "add",
    authType: undefined,
    usePassword: true,
    submitDisabled: false,
    initValues: undefined,
  },
);

// emit
const emit = defineEmits<{
  submit: [v: ProfileForm];
  cancel: [];
}>();

// api
const apiIdCheck = useApiSignUpIdCheck(uid);

// state
const initState = ref(false);
const initial = ref<ProfileForm>(plainToClass(ProfileForm, {}));
const preLoginId = ref("");
const loginIdCheck = ref(false);

// 아이디 중복체크
const idCheck = async (id: string): Promise<boolean | null> => {
  let isCheck: boolean | null = null;

  await apiIdCheck
    .mutateAsync({
      loginId: id,
    })
    .then(() => {
      isCheck = false;
    })
    .catch(() => {
      isCheck = true;
    });

  return isCheck;
};

// form
const labels: {
  [key: string]: string;
} = {
  loginId: "아이디",
  loginPw: "비밀번호",
  loginPwCheck: "비밀번호 확인",
  name: "이름",
  cellPhone: "휴대폰번호",
  birthday: "생년월일",
  email: "이메일",
  gender: "성별",
  address: "주소",
  addressDetail: "상세주소",
  homePhone: "전화번호",
  marriedDt: "결혼기념일",
  carList: "차량번호",
};
const form = useTemplateRef("form");
const formRaw = useTemplateRef("formRaw");
const initialValues = initial.value;
const formSchema = toTypedSchema(
  z.object({
    loginId: z.string().superRefine(async (val, ctx) => {
      if (
        props.type === "edit" ||
        (preLoginId.value === val && loginIdCheck.value)
      )
        return;

      const reg = useIdReg();

      loginIdCheck.value = false;

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.004", [labels.loginId]),
        });
      } else if (!reg.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.009"),
        });
      } else {
        const is = await idCheck(val);

        if (is === null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: useT("formMessage.011"),
          });
        } else if (is) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: useT("formMessage.010"),
          });
        }

        loginIdCheck.value = is === false;
      }

      preLoginId.value = val;
    }),

    loginPw: z.string().superRefine((val, ctx) => {
      if (
        (props.type === "add" && props.authType === "NAVER") ||
        (props.type === "edit" && !val)
      )
        return;

      const formValues = form.value?.getValues() as ProfileForm;

      if (!formValues) return;

      const check = usePasswordCheck(val, formValues.loginId);

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.004", [labels.loginPw]),
        });
      } else if (check) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: check,
        });
      }
    }),

    loginPwCheck: z.string().superRefine((val, ctx) => {
      const formValues = form.value?.getValues() as ProfileForm;

      if (
        !formValues ||
        (props.type === "add" && props.authType === "NAVER") ||
        (props.type === "edit" && !formValues.loginPw)
      )
        return;

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.003", [labels.loginPwCheck]),
        });
      } else if (val !== formValues.loginPw) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.014"),
        });
      }
    }),

    cellPhone: z.string().superRefine((val, ctx) => {
      const formValues = form.value?.getValues() as ProfileForm;
      const reg = usePhoneReg();

      if (!formValues) return;

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.004", [labels.cellPhone]),
        });
      } else if (!reg.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.032", [labels.cellPhone]),
        });
      } else if (!formValues.cellPhoneCheck) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.017", [labels.cellPhone]),
        });
      }
    }),

    email: z.string().superRefine((val, ctx) => {
      const reg = useEmailReg();

      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.003", [labels.email]),
        });
      } else if (!reg.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.031", [labels.email]),
        });
      }
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
      .superRefine((val, ctx) => {
        const formValues = form.value?.getValues() as ProfileForm;

        if (!formValues) return;

        if (formValues.agreePrivateOpt === "Y") {
          if (val !== null && !val.zipCode) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: useT("formMessage.032", [labels.address]),
            });
          } else if (val?.zipCode && !val?.addrDtl) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: useT("formMessage.004", [labels.addressDetail]),
            });
          } else if (val?.addrDtl && /[?#&+\\"]/.test(val.addrDtl)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: useT("formMessage.030"),
            });
          } else if (val?.addrDtl && val.addrDtl.length > 100) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: useT("formMessage.006", [
                labels.addressDetail,
                100,
                val.addrDtl.length,
              ]),
            });
          }
        }
      }),

    homePhone: z.string().superRefine((val, ctx) => {
      const formValues = form.value?.getValues() as ProfileForm;
      const reg = useTelReg();

      if (!formValues) return;

      if (formValues.agreePrivateOpt === "Y" && val && !reg.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: useT("formMessage.032", [labels.homePhone]),
        });
      }
    }),
  }),
);

// submit call
const submitCall = () => {
  const values = form.value?.values as ProfileForm;
  if (!values) return;
  emit("submit", values);
};

// submit
const submit = async () => {
  if (!form.value) return;

  loginIdCheck.value = false;

  const validate = await form.value.validate();
  const values = form.value.values as ProfileForm;

  if (
    props.type === "edit" &&
    useSigString<ProfileForm>(initial.value) ===
      useSigString<ProfileForm>(values)
  ) {
    alertOpen({
      message: useT("alertMessage.026"),
    });
  } else if (validate.valid) {
    if (!props.submitDisabled) {
      const certifyList = values.carList.filter(
        (item) =>
          item.crudType !== "D" &&
          (typeof item.certifyYn === "undefined" || item.certifyYn === "Y"),
      );
      const carRepI = certifyList.findIndex((item) => item.carRepCarYn === "Y");

      if (!values.agreeB8) {
        alertOpen({
          message: useT("alertMessage.039"),
          buttons: [
            {
              closeAutoFocus: (e: Event) => {
                e.preventDefault();
                $elFocus(document.getElementById("b8Y"));
              },
            },
          ],
        });
      } else if (
        values.agreeB8 === "Y" &&
        certifyList.length &&
        carRepI <= -1
      ) {
        alertOpen({
          message: useT("alertMessage.027"),
          buttons: [
            {
              closeAutoFocus: (e: Event) => {
                e.preventDefault();
                $elFocus(document.getElementById("carList"));
              },
            },
          ],
        });
      } else {
        submitCall();
      }
    }
  } else if (validate.errors) {
    const el = useGetValidateErrorEl(Object.keys(validate.errors));
    $elFocus(el);
  }
};

// submit 클릭
const submitClick = () => {
  formRaw.value?.dispatchEvent(new Event("submit", { cancelable: true }));
};

// 취소 클릭
const cancelClick = () => {
  emit("cancel");
};

// init
const init = () => {
  initState.value = true;

  if (!props.initValues) return;

  form.value?.setValues(props.initValues);
  initial.value = Object.assign({}, initial.value, props.initValues);
};

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// life cycle
onMounted(() => {
  init();
});

// expose
defineExpose<{
  form: () => InstanceType<typeof Form> | null;
}>({
  form: () => form.value || null,
});
</script>

<template>
  <div>
    <Form
      ref="form"
      as=""
      :validation-schema="formSchema"
      :initial-values="initialValues"
    >
      <form ref="formRaw" @submit.prevent="submit">
        <div class="border-top border-bottom inner mt-[2.8rem] md:mt-[5.9rem]">
          <FormProfileDefault
            v-if="initState"
            :type="type"
            :auth-type="authType"
            :use-password="usePassword"
            :form="form"
            :labels="labels"
          />
          <FormProfileCar
            v-if="initState"
            :type="type"
            :auth-type="authType"
            :form="form"
            :labels="labels"
          />
          <FormProfileMarketing
            v-if="initState"
            :type="type"
            :auth-type="authType"
            :form="form"
            :labels="labels"
          />
        </div>
        <div class="btn-wrap p-8 pb-0 md:pt-24">
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
            :aria-disabled="submitDisabled"
            @click="submitClick"
            @keypress.enter.space="submitClick"
          >
            {{ type === "add" ? "가입하기" : "수정" }}
          </a>
        </div>
      </form>
    </Form>

    <CommonAlert ref="alertLayer" />
  </div>
</template>

<style lang="css" scoped>
.ipt-wrap + .ipt-wrap {
  margin-top: 2rem;
}
@media (min-width: 768px) {
}
</style>
