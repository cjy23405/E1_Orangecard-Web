<script setup lang="ts">
import type { ProfileFormCar } from "@/types/components/form/Profile";

// uid
const uid = getCurrentInstance()?.uid;

// props
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    data?: ProfileFormCar;
  }>(),
  {
    disabled: false,
    data: undefined,
  },
);

// emit
const emit = defineEmits<{
  delete: [v: ProfileFormCar];
}>();

// computed
const id = computed(() => {
  return uid || "";
});

// 삭제 클릭
const deleteClick = () => {
  if (!props.data || props.disabled) return;
  emit("delete", props.data);
};
</script>

<template>
  <BoardItem
    v-if="data"
    :class="[
      'flex flex-row items-center',
      {
        'list-dis': disabled,
      },
    ]"
  >
    <div class="ipt-item flex-1">
      <RadioGroupItem
        :id="`carItem_${id}`"
        :value="data.carNum"
        :disabled="disabled"
      ></RadioGroupItem>
      <label :for="`carItem_${id}`">
        <span class="fs-14 md:fs-16 mb-4 block leading-[2.4rem] md:mb-[1.8rem]"
          >대표차량</span
        >
        <span class="bar bar-big md:no-bar">
          <span
            class="font-bold md:flex md:flex-row"
            :class="{
              'text-primary': data.carFuelType === 'L',
              'text-e1h2blue': data.carFuelType === 'H',
              'text-e1evgreen': data.carFuelType === 'E',
            }"
            ><em class="hidden md:block md:w-[9.6rem]">연료종</em
            >{{ useFuelName(data.carFuelType) }}</span
          >
          <span class="md:mt-[1.6rem] md:flex md:flex-row md:font-bold"
            ><em class="hidden md:block md:w-[9.6rem]">차량번호</em
            >{{ data.carNum }}</span
          >
        </span>
      </label>
    </div>
    <a
      role="button"
      tabindex="0"
      :class="[
        'btn-delete',
        {
          'opacity-30 hover:!cursor-default hover:!opacity-30 focus:!opacity-30':
            disabled,
        },
      ]"
      :aria-disabled="disabled"
      @click="deleteClick"
      @keypress.enter.space="deleteClick"
    >
      삭제
    </a>
  </BoardItem>
</template>
