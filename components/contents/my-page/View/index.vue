<script setup lang="ts">
import { DateTime } from "luxon";
import type { CookieRef } from "#app";
import type { FuelCode } from "@/types/common";
import type { SelectOptions } from "@/types/components/form/Select";

interface CookieData {
  code?: FuelCode;
  expires: string;
}

// 스토어
const stores = {
  auth: useStoreAuth(),
};

// fuelList
const fuelList = useFuelList();

// route
const localePath = useLocalePath();
const router = useRouter();

// api
const apiClassList = useApiCodeList({
  codeGroup: "E1_MEMBER_TYPE",
});
const { data, suspense } = useApiMyProfile();

// api ssr
await apiClassList.suspense();
await suspense();

// state
const fuelType = ref<CookieRef<CookieData>>();
const fuelTypeVal = ref<FuelCode>();

// ref
const tierBenefits = useTemplateRef("tierBenefits");

// computed
const classList = computed(() => {
  return apiClassList.data.value?.data;
});
const myData = computed(() => {
  return data.value?.data;
});
const myID = computed(() => {
  return myData.value?.loginId;
});
const fuelOptions = computed((): SelectOptions => {
  return fuelList.map((item) => {
    return {
      value: item.code as string,
      text: item.name,
    };
  });
});
const station = computed(() => {
  if (!myData.value?.mainStnId || myData.value.mainStnId === "29999") {
    return "없음";
  } else {
    return myData.value.mainStnNm;
  }
});
const fuelInfo = computed(() => {
  const data: {
    code: FuelCode;
    name: string;
    tierCode: string;
    tierName: string;
    classCode: string;
    className: string;
  } = {
    code: undefined,
    name: "",
    tierCode: "",
    tierName: "",
    classCode: "",
    className: "",
  };

  if (myData.value) {
    fuelList.forEach((item) => {
      if (item.code === fuelTypeVal.value) {
        data.code = item.code;
        data.name = item.name;
      }
    });

    switch (fuelTypeVal.value) {
      case "L":
        data.tierCode = myData.value.lTierCd;
        data.tierName = myData.value.lTierNm;
        data.classCode = stores.auth.loginInfo?.memDivCd || "";
        break;
      case "H":
        data.tierCode = myData.value.hTierCd;
        data.tierName = myData.value.hTierNm;
        data.classCode = stores.auth.loginInfo?.memDivFcevCd || "";
        break;
      case "E":
        data.tierCode = myData.value.eTierCd;
        data.tierName = myData.value.eTierNm;
        data.classCode = stores.auth.loginInfo?.memDivEvtCd || "";
        break;
      default:
        break;
    }

    if (classList.value) {
      data.className =
        classList.value.find((item) => item.code === data.classCode)?.codeNm ||
        "일반";
    }
  }

  return data;
});

// 쿠키 데이터에 세팅
const setFuelType = (v: FuelCode) => {
  if (fuelType.value?.value) {
    fuelType.value.value.code = v;
  }
};

// update fuelType
const updateFuelType = () => {
  setFuelType(fuelTypeVal.value);
};

// init
const init = () => {
  if (!myData.value) return;

  if (!fuelType.value) {
    const expires = DateTime.now().plus({ year: 1 }).toJSDate();
    const c = useCookie(useSha256(`fuelType_${myID.value}`), {
      default: (): CookieData => ({
        expires: expires.toString(),
      }),
      expires,
      watch: true,
    });
    c.value.expires = expires.toString();
    fuelType.value = c;
  }

  // DD : EV 서비스 추가 되면 대표 유종 디폴트 적용으로 수정 필요
  const repFuelType =
    myData.value?.repFuelType === "E" ? "L" : myData.value?.repFuelType;

  const initFuelType = fuelType.value.value.code || repFuelType;

  fuelTypeVal.value = initFuelType;
  setFuelType(initFuelType);
};

// 드롭다운 링크
const menuLink = (path: string) => {
  router.push(localePath(path));
};

// 등급 혜택 레이어 열기
const tierBenefitsOpen = () => {
  if (tierBenefits.value) {
    tierBenefits.value.open();
  }
};

// life cycle
onMounted(() => {
  init();
});
</script>

<template>
  <div>
    <div class="inner mt-[2.8rem] md:mt-24">
      <div
        class="border-top border-bottom relative px-8 py-[2.8rem] md:px-16 md:py-[1.6rem]"
      >
        <FormSelect
          v-model="fuelTypeVal"
          class="block md:inline-block md:w-48"
          :options="fuelOptions"
          @update:model-value="updateFuelType"
        />
        <p
          class="fs-16 relative mt-[2.2rem] pl-[4.5rem] md:mx-16 md:mt-0 md:inline-block md:py-[1.4rem] md:pl-[6.5rem]"
        >
          <BoardBadge type="gray" class="absolute left-0 top-0 md:top-[1.4rem]">
            {{ fuelInfo.className }}
          </BoardBadge>
          {{ myData?.name }}님 이달의 등급은
          <strong class="fs-16 align-baseline font-bold"
            >{{ fuelInfo.tierName }}회원</strong
          >입니다.
        </p>
        <p
          v-if="
            fuelInfo.tierCode === 'NOR' && !/^(T|H)$/.test(fuelInfo.classCode)
          "
          class="mt-[1.6rem] md:mt-0 md:inline-block"
        >
          <a
            role="button"
            tabindex="0"
            class="btn-small"
            @click="tierBenefitsOpen"
            @keypress.enter.space="tierBenefitsOpen"
          >
            등급 혜택
          </a>
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger
            as-child
            :class="[
              'btn-more-menu absolute right-8 size-[2.8rem] text-zero md:bottom-[2.3rem] md:right-[2.4rem] md:size-16',
              {
                'bottom-[2.4rem]': !(
                  fuelInfo.tierCode === 'NOR' &&
                  !/^(T|H)$/.test(fuelInfo.classCode)
                ),
                'bottom-[2.9rem]':
                  fuelInfo.tierCode === 'NOR' &&
                  !/^(T|H)$/.test(fuelInfo.classCode),
              },
            ]"
          >
            <a role="button" tabindex="0">더보기</a>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem @select="menuLink('/my-page/profile')">
                <span>회원 정보 수정</span>
              </DropdownMenuItem>
              <DropdownMenuItem @select="menuLink('/my-page/sns')">
                <span>간편 로그인 설정</span>
              </DropdownMenuItem>
              <DropdownMenuItem @select="menuLink('/my-page/delete-account')">
                <span>회원 탈퇴</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div class="px-8 pt-8 md:px-16">
        <div
          class="bg-e1 rounded-lg bg-primary-foreground/60 px-8 py-12 md:px-16"
        >
          <ContentsMyPageViewCard />
          <ContentsMyPageViewCar :code="fuelInfo.code" />
          <p class="mt-[.8rem] md:mt-[1.2rem]">
            <span class="relative block w-full">
              <span class="fs-14 text-gray-700">주거래 충전소</span>
              <span class="fs-14 ml-[.4rem] font-bold text-primary md:ml-4">{{
                station
              }}</span>
            </span>
          </p>
        </div>

        <div class="md:mt-8 md:flex md:flex-row">
          <ContentsMyPageViewPoint />
          <ContentsMyPageViewCharge :code="fuelInfo.code" />
        </div>

        <div
          class="fs-14 md:fs-18 mt-16 text-center md:mt-[5.8rem] md:overflow-hidden"
        >
          <div class="flew-row flex md:float-start md:w-1/2">
            <NuxtLink
              :to="localePath('/my-page/card/register')"
              class="add flex-1 pt-[4.4rem] md:pt-[8.8rem]"
            >
              카드 등록
            </NuxtLink>
            <NuxtLink
              :to="localePath('/my-page/card')"
              class="lost flex-1 pt-[4.4rem] md:pt-[8.8rem]"
            >
              카드 분실 신고
            </NuxtLink>
            <NuxtLink
              :to="localePath('/my-page/card/reset-password')"
              class="password flex-1 pt-[4.4rem] md:pt-[8.8rem]"
            >
              카드 비밀번호 변경
            </NuxtLink>
          </div>
          <div
            class="flew-row mt-[1.6rem] flex md:float-start md:mt-0 md:w-1/2"
          >
            <NuxtLink
              :to="localePath('/my-page/contact')"
              class="inquiry flex-1 pt-[4.4rem] md:pt-[8.8rem]"
            >
              1:1문의 내역
            </NuxtLink>
            <NuxtLink
              :to="localePath('/my-page/sns')"
              class="login flex-1 pt-[4.4rem] md:pt-[8.8rem]"
            >
              간편로그인설정
            </NuxtLink>
            <NuxtLink
              :to="localePath('/my-page/profile')"
              class="info flex-1 pt-[4.4rem] md:pt-[8.8rem]"
            >
              회원정보수정
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <PopupTierBenefits ref="tierBenefits" />
  </div>
</template>

<style lang="css" scoped>
:deep(.next.w-full) {
  width: 100%;
}
:deep(.next.w-full:after) {
  position: absolute;
  right: 0;
  top: 0.4rem;
  background: url("@/assets/img/mypage/ic-agree-arrow.png") no-repeat center
    center/1.6rem auto;
}
:deep(.round-box .next.w-full:after) {
  top: 0.6rem;
  background: url("@/assets/img/mypage/icon-arrow-down-pc.png") no-repeat center
    center/2.4rem auto;
}
:deep(.bar > * + *.block) {
  margin-left: 0.6rem;
}
:deep(.btn-morepoint:after) {
  background: url("@/assets/img/mypage/btn-point.png") no-repeat center
    center/100% auto;
}
:deep(.bar > *) {
  font-size: 1.2rem;
}
.btn-more-menu {
  background: url("@/assets/img/mypage/btn-car-more.png") no-repeat center
    center/100% auto;
}
.add {
  background: url("@/assets/img/mypage/ic-menu-card.png") no-repeat top
    center/4rem auto;
}
.lost {
  background: url("@/assets/img/mypage/ic-menu-report.png") no-repeat top
    center/4rem auto;
}
.password {
  background: url("@/assets/img/mypage/ic-menu-password.png") no-repeat top
    center/4rem auto;
}
.inquiry {
  background: url("@/assets/img/mypage/ic-menu-inquiry.png") no-repeat top
    center/4rem auto;
}
.login {
  background: url("@/assets/img/mypage/ic-menu-login.png") no-repeat top
    center/4rem auto;
}
.info {
  background: url("@/assets/img/mypage/ic-menu-info.png") no-repeat top
    center/4rem auto;
}
@media (min-width: 768px) {
  :deep(.bar > *) {
    font-size: 1.6rem;
  }
  :deep(.next.w-full) {
    width: auto;
    padding-right: 2.8rem;
  }
  :deep(.next.w-full:after) {
    top: 0.6rem;
  }
  :deep(.round-box .next.w-full:after) {
    top: 0.8rem;
  }
  :deep(.bar > * + *.block) {
    margin-left: 1.3rem;
  }
  .bg-e1 {
    background-image: url("@/assets/img/mypage/bg-mypage.png");
    background-repeat: no-repeat;
    background-size: 34.8rem auto;
    background-position: right 4rem bottom;
  }
  .add,
  .lost,
  .password,
  .inquiry,
  .login,
  .info {
    background-size: 8rem auto;
  }
}
</style>
