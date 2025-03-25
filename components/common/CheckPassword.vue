<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { plainToClass } from "class-transformer";
import type { MySnsListResponse } from "@/types/api";
import type { SessionPassword } from "@/types/stores";
import type { AlertOptions } from "@/types/components/common/Alert";

// uid
const uid = getCurrentInstance()?.uid;

// 스토어
const stores = {
  auth: useStoreAuth(),
  session: useStoreSession(),
};

// hook
const hookKakaoAuth = useHookKakaoAuth("checkPasswordAuthenticationPopup");
const hookNaverAuth = useHookNaverAuth("checkPasswordAuthenticationPopup");

// api
const apiMySnsList = useApiMySnsList();
const apiCheckPassword = useApiAuthCheckPassword(uid);

// ssr
await apiMySnsList.suspense();

// emit
const emit = defineEmits<{
  authenticated: [v?: SessionPassword];
}>();

// computed
const loginType = computed(() => {
  return stores.auth.loginType;
});
const snsList = computed((): MySnsListResponse => {
  return apiMySnsList.data.value?.data || [];
});
const kakaoInfo = computed(() => {
  return snsList.value.find((item) => item.snsType === "kakao");
});
const isKakao = computed(() => {
  return !!kakaoInfo.value;
});
const naverInfo = computed(() => {
  return snsList.value.find((item) => item.snsType === "naver");
});
const isNaver = computed(() => {
  return !!naverInfo.value;
});

// form
class CheckPasswordForm {
  password: string = "";
}
const labels: {
  [key: string]: string;
} = {
  password: "비밀번호",
};
const form = useTemplateRef("form");
const formRaw = useTemplateRef("formRaw");
const initialValues = plainToClass(CheckPasswordForm, {});
const formSchema = toTypedSchema(
  z.object({
    password: z.string().refine((v) => v, {
      message: useT("formMessage.004", [labels.password]),
    }),
  }),
);

// 비밀번호 확인
const submitCall = useDebounceFn(() => {
  const values = form.value?.values as CheckPasswordForm;

  if (!values) return;

  apiCheckPassword.mutate(
    {
      password: useSha256(values.password),
    },
    {
      onSuccess: (data) => {
        if (data.data?.password === useSha256(useSha256(values.password))) {
          stores.session.$setPassword({
            type: "PASSWORD",
          });
          if (stores.session.password) {
            emit("authenticated", stores.session.password);
          }
        } else {
          alertOpen({
            message: useT("alertMessage.021"),
          });
        }
      },
      onError: (err) => {
        alertOpen({
          message: useApiGetErrorMessage(err.data),
        });
      },
    },
  );
}, 300);

// 비밀번호 확인 submit
const submit = async () => {
  const validate = await form.value?.validate();

  if (validate?.valid) {
    if (!apiCheckPassword.isPending.value) {
      submitCall();
    }
  } else if (validate?.errors) {
    const el = useGetValidateErrorEl(Object.keys(validate.errors));
    $elFocus(el);
  }
};

// 비밀번호 확인 클릭
const submitClick = () => {
  formRaw.value?.dispatchEvent(new Event("submit", { cancelable: true }));
};

// 카카오 인증
const kakaoAuth = () => {
  hookKakaoAuth
    ?.open()
    .then((data) => {
      if (kakaoInfo.value?.snsId === String(data.user.id)) {
        stores.session.$setPassword({
          type: "KAKAO",
          data,
        });

        useHookKakaoLogin(data.token.refresh_token);

        if (stores.session.password) {
          emit("authenticated", stores.session.password);
        }
      } else {
        alertOpen({
          message: useT("alertMessage.021"),
        });
      }
    })
    .catch(() => {});
};

// 카카오 인증 클릭
const kakaoClick = useDebounceFn(() => {
  kakaoAuth();
}, 300);

// 네이버 인증
const naverAuth = () => {
  hookNaverAuth
    ?.open()
    .then((data) => {
      if (naverInfo.value?.snsId === data.id) {
        stores.session.$setPassword({
          type: "NAVER",
          data,
        });

        if (stores.session.password) {
          emit("authenticated", stores.session.password);
        }
      } else {
        alertOpen({
          message: useT("alertMessage.021"),
        });
      }
    })
    .catch(() => {});
};

// 네이버 인증 클릭
const naverClick = useDebounceFn(() => {
  naverAuth();
}, 300);

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};

// life cycle
onMounted(() => {
  stores.session.$setPassword(null);
});
onBeforeUnmount(() => {
  hookKakaoAuth?.clear();
  hookNaverAuth?.clear();
});
</script>

<template>
  <div>
    <div
      class="border-top border-bottom inner mt-[2.8rem] flex min-h-[60vh] flex-col justify-center px-8 md:mt-24 md:px-16"
    >
      <div class="fs-16 text-center">
        <p>
          회원님의 소중한 개인정보를 보호하기 위해
          <span class="block md:inline"> 한번 더 인증해주세요.</span>
        </p>
      </div>

      <div v-if="loginType === 'KAKAO' && isKakao" class="gray-box">
        <a
          role="button"
          tabindex="0"
          class="btn-auth kakao"
          @click="kakaoClick"
          @keypress.enter.space="kakaoClick"
        >
          카카오로 인증하기
        </a>
      </div>

      <div v-else-if="loginType === 'NAVER' && isNaver" class="gray-box">
        <a
          role="button"
          tabindex="0"
          class="btn-auth naver"
          @click="naverClick"
          @keypress.enter.space="naverClick"
        >
          네이버로 인증하기
        </a>
      </div>

      <div v-else>
        <Form
          ref="form"
          as=""
          :validation-schema="formSchema"
          :initial-values="initialValues"
        >
          <form ref="formRaw" @submit.prevent="submit">
            <div class="mt-16 md:mx-auto md:w-[60rem]">
              <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                  <FormValidation for="password">
                    <FormControl>
                      <FormBasicInput
                        id="password"
                        type="password"
                        :title="labels.password"
                        placeholder="비밀번호를 입력해주세요."
                        required
                        v-bind="componentField"
                      />
                    </FormControl>
                  </FormValidation>
                </FormItem>
              </FormField>
            </div>
            <div class="btn-wrap mb-[8.3rem] mt-16 md:my-24">
              <a
                role="button"
                tabindex="0"
                class="btn-txt primary"
                :aria-disabled="apiCheckPassword.isPending.value"
                @click="submitClick"
                @keypress.enter.space="submitClick"
              >
                확인
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>

    <CommonAlert ref="alertLayer" />
  </div>
</template>

<style lang="css" scoped>
@tailwind components;
@layer components {
  .gray-box {
    @apply mt-16 flex h-[6rem] md:h-[7.2rem] w-full flex-row items-center justify-center text-center md:mx-auto md:w-[60rem];
  }
  .btn-auth {
    @apply relative pl-[4rem] md:pl-[6rem] before:content-[''] before:absolute before:size-[3rem] before:top-1/2 before:left-[0rem] before:-translate-y-1/2 md:before:size-[4rem] text-lg leading-[2.2rem] block font-bold md:text-2xl md:leading-[2.8rem];
  }
  .kakao::before {
    background: url("@/assets/img/mypage/btn-login-kakao.png") no-repeat center
      center/100% auto;
  }
  .naver::before {
    background: url("@/assets/img/mypage/btn-login-naver.png") no-repeat center
      center/100% auto;
  }
}
@media (min-width: 768px) {
  .btn-wrap {
    width: 60rem;
    margin-left: auto;
    margin-right: auto;
  }
  .btn-wrap .btn-txt {
    max-width: 100%;
  }
}
</style>
