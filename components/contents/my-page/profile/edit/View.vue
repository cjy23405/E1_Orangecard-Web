<script setup lang="ts">
import type { BooleanYN } from "@/types/common";
import type { MyProfileEditRequest } from "@/types/api";
import type { AlertOptions } from "@/types/components/common/Alert";
import type { ProfileForm } from "@/types/components/form/Profile";

// uid
const uid = getCurrentInstance()?.uid;

// 스토어
const stores = {
  session: useStoreSession(),
};

// route
const localePath = useLocalePath();
const router = useRouter();

// api
const apiProfile = useApiMyProfile();
const apiCarList = useApiMyCarList();
const apiProfileEdit = useApiMyProfileEdit(uid);

// api ssr
await apiProfile.suspense();
await apiCarList.suspense();

// computed
const profile = computed(() => {
  return apiProfile.data.value?.data || null;
});
const carList = computed(() => {
  return apiCarList.data.value?.data || null;
});
const initial = computed((): Partial<ProfileForm> | null => {
  if (
    !apiProfile.isSuccess.value ||
    !apiCarList.isSuccess.value ||
    !profile.value ||
    !carList.value
  ) {
    return null;
  } else {
    return {
      loginId: profile.value.loginId,
      name: profile.value.name,
      cellPhone: profile.value.cellPhone,
      cellPhoneCheck: true,
      birthday: profile.value.birthDay,
      email: profile.value.email,

      carList: (carList.value || []).map((item) => {
        return {
          crudType: "",
          carRegServiceType: "",
          carRepCarYn: item.carRepCarYn || "",
          carRegLoc: item.carRegLoc || "",

          carNum: item.carNum || "",
          carFuelType: item.carFuelType || "L",
          carGbn: item.carGbn || "",
          carMakr: item.carMakr || "",
          carMkngYy: item.carMkngYy || "",
          carModel: item.carModel || "",
          distinctNumber: item.distinctNumber || "",

          carRid: item.carRid || "",
          connectorType: item.evtConnector || "",

          certifyYn: item.certifyYn || "",
        };
      }),

      gender: profile.value.gender || "",
      address: profile.value.zipCode
        ? {
            zipCode: profile.value.zipCode || "",
            sido: profile.value.sido || "",
            gugun: profile.value.gugun || "",
            addr: profile.value.addr || "",
            addrJi: profile.value.addrJi || "",
            addrDtl: profile.value.addrDtl || "",
          }
        : null,
      homePhone: profile.value.homePhone,
      marriedDt: profile.value.marriedDt || "",

      agreeB8: (carList.value || []).length ? "Y" : "N",
      agreePrivateOpt: profile.value.agreePrivateOpt,
      agreeEmail: profile.value.agreeEmail,
      agreeSms: profile.value.agreeSms,
      agreeBenefit: profile.value.agreeBenefit,
      agreeTalk: profile.value.agreeTalk,
    };
  }
});

// 변경 필요한 값인지 확인
const checkEdit = (o: string = "", n: string = "") => {
  return o !== n ? n : undefined;
};

// submit call
const submitCall = useDebounceFn(async (values: ProfileForm) => {
  if (!profile.value || !initial.value) return;

  const initialVal = initial.value;
  const agreePrivateOpt = values.agreePrivateOpt === "Y";
  const agreeB8 = values.agreeB8 === "Y";

  const data: MyProfileEditRequest = {
    password: values.loginPw ? useSha256(values.loginPw) : undefined,
    cellPhone: checkEdit(initialVal.cellPhone, values.cellPhone),
    email: checkEdit(initialVal.email, values.email),

    agreePrivateOpt: checkEdit(
      initialVal.agreePrivateOpt as string,
      values.agreePrivateOpt as string,
    ) as BooleanYN,

    ...(agreeB8
      ? {
          carList: values.carList
            .filter((item) => !!item.crudType)
            .map((item) => {
              delete item.certifyYn;
              return item;
            }),
        }
      : {
          carList: values.carList
            .filter((item) => item.crudType !== "C")
            .map((item) => {
              delete item.certifyYn;
              item.crudType = "D";
              return item;
            }),
        }),

    ...(agreePrivateOpt
      ? {
          agreeEmail: checkEdit(
            initialVal.agreeEmail as string,
            values.agreeEmail as string,
          ) as BooleanYN,
          agreeSms: checkEdit(
            initialVal.agreeSms as string,
            values.agreeSms as string,
          ) as BooleanYN,
          agreeBenefit: checkEdit(
            initialVal.agreeBenefit as string,
            values.agreeBenefit as string,
          ) as BooleanYN,
          agreeTalk: checkEdit(
            initialVal.agreeTalk as string,
            values.agreeTalk as string,
          ) as BooleanYN,

          gender:
            (checkEdit(
              initialVal.gender as string,
              values.gender as string,
            ) as ProfileForm["gender"]) || undefined,
          zipCode: checkEdit(
            initialVal.address?.zipCode,
            values.address ? values.address.zipCode : "",
          ),
          sido: checkEdit(
            initialVal.address?.sido,
            values.address ? values.address.sido : "",
          ),
          gugun: checkEdit(
            initialVal.address?.gugun,
            values.address ? values.address.gugun : "",
          ),
          addr: checkEdit(
            initialVal.address?.addr,
            values.address ? values.address.addr : "",
          ),
          addrJi: checkEdit(
            initialVal.address?.addrJi,
            values.address ? values.address.addrJi : "",
          ),
          addrDtl: checkEdit(
            initialVal.address?.addrDtl,
            values.address ? values.address.addrDtl : "",
          ),
          homePhone: checkEdit(initialVal.homePhone, values.homePhone),
          marriedDt: checkEdit(initialVal.marriedDt, values.marriedDt),
        }
      : {}),
  };

  apiProfileEdit.mutate(
    {
      loginId: profile.value.loginId,
      data,
    },
    {
      onSuccess: (data) => {
        const msg = data.data?.marketingStatusMsg
          ? "\n\n" + data.data?.marketingStatusMsg
          : "";

        alertOpen({
          message: useT("alertMessage.029") + msg,
          buttons: [
            {
              callback: (closeFn) => {
                closeFn();
                stores.session.$setPassword(null);
                router.replace(localePath("/my-page"));
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

// 가입하기 클릭
const submitClick = (values: ProfileForm) => {
  submitCall(values);
};

// 취소 클릭
const cancelClick = useDebounceFn(() => {
  alertOpen({
    message: useT("alertMessage.028"),
    buttons: [
      {
        type: "cancel",
      },
      {
        text: "수정 취소",
        callback: (closeFn) => {
          closeFn();
          stores.session.$setPassword(null);
          router.replace(localePath("/my-page"));
        },
      },
    ],
  });
}, 300);

// 얼럿
const alertLayer = useTemplateRef("alertLayer");
const alertOpen = (customOptions: AlertOptions) => {
  alertLayer.value?.open(customOptions);
};
</script>

<template>
  <CommonBeforeunload />

  <CommonCheckPasswordSession
    check-path="/my-page/profile"
    denied-path="/my-page/profile"
  >
    <FormProfile
      v-if="initial"
      type="edit"
      :submit-disabled="apiProfileEdit.isPending.value"
      :init-values="initial"
      :use-password="!!profile?.pwStatus"
      @cancel="cancelClick"
      @submit="submitClick"
    />
  </CommonCheckPasswordSession>

  <CommonAlert ref="alertLayer" />
</template>
