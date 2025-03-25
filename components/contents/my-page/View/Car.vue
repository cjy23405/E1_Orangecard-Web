<script setup lang="ts">
import type { FuelCode } from "@/types/common";

// uid
const uid = getCurrentInstance()?.uid;

// route
const localePath = useLocalePath();
const router = useRouter();

// props
const props = defineProps<{
  code?: FuelCode;
}>();

// api
const { data } = useApiMyCarList();
const apiCarEdit = useApiMyCarEdit(uid);

// computed
const car = computed(() => {
  const emptyText = "차량정보를 등록해주세요.";
  const d = {
    text: "",
    isRep: false,
    isError: false,
  };

  if (data.value?.data) {
    if (data.value.data.length) {
      const errorCar = data.value.data.find((item) => item.certifyYn !== "Y");
      const thisCar = data.value.data.find(
        (item) => item.carFuelType === props.code,
      );

      if (errorCar) {
        d.text = "차량 정보가 변경되었습니다.";
        d.isError = true;
      } else if (thisCar) {
        d.text = thisCar.carNum;
        d.isRep = thisCar.carRepCarYn === "Y";
      } else {
        d.text = emptyText;
      }
    } else {
      d.text = emptyText;
    }
  }

  return d;
});

// 오류 차량 삭제
const removeErrorCar = () => {
  if (data.value?.data) {
    for (let i = 0; i < data.value.data.length; i++) {
      const item = data.value.data[i];

      if (item.certifyYn !== "Y") {
        apiCarEdit.mutate({
          crudType: "D",
          carRid: item.carRid,
          carFuelType: item.carFuelType,
          carNum: item.carNum,
          carModel: item.carModel,
        });
      }
    }
  }
};

// click
const click = useDebounceFn(async () => {
  if (apiCarEdit.isPending.value) return;

  if (car.value.isError) {
    removeErrorCar();
  }

  router.push(localePath("/my-page/profile"));
}, 300);
</script>

<template>
  <p class="mt-[.8rem] md:mt-[1.2rem]">
    <a
      role="button"
      tabindex="0"
      class="next relative block w-full"
      @click="click"
      @keypress.enter.space="click"
    >
      <span class="fs-14 text-gray-700">{{
        car.isRep ? "대표 차량" : "차량"
      }}</span>
      <span class="fs-14 ml-[.4rem] font-bold text-primary md:ml-4">{{
        car.text
      }}</span>
    </a>
  </p>
</template>
