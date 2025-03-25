<script setup lang="ts">
import { VCalendar } from "@/components/ui/v-calendar";
import Button from "@/components/ui/button/Button.vue";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const date = ref(new Date());
const formattedDate = computed(() => {
  return formatDate(date.value);
});

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    disabled?: boolean;
  }>(),
  {
    placeholder: "placeholder",
    disabled: false,
  },
);
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        :disabled="props.disabled"
        class="ipt-cal block w-full items-start rounded-lg border border-solid border-gray-300 text-left text-lg text-gray-900 placeholder:text-gray-500 hover:bg-gray-100 focus:border-gray-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100"
      >
        <span class="ellipsis block align-baseline leading-none">{{
          formattedDate
        }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[28rem] p-2">
      <v-calendar v-model="date"></v-calendar>
    </PopoverContent>
  </Popover>
</template>
<style lang="css" scoped>
@tailwind components;
@layer components {
  .ipt-cal {
    @apply md:h-[5.6rem] h-[4.8rem] bg-no-repeat text-lg md:text-xl md:py-[1.6rem] md:px-[2rem] py-[1.3rem] px-[1.6rem] bg-white md:pr-[5rem] overflow-hidden bg-none;
  }
  .ipt-cal:disabled {
    @apply bg-gray-200;
  }

  @media (min-width: 768px) {
    .ipt-cal {
      background-image: url(@/assets/img/form/ic-input-calendar.png);
      background-repeat: no-repeat;
      background-position: right 1.6rem center;
      background-size: 2.4rem auto;
    }
    .ipt-cal:disabled {
      background-image: url(@/assets/img/form/ic-input-calendar-dis.png);
      background-size: 2.4rem auto;
    }
  }
}
</style>
