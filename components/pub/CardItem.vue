<script setup lang="ts">
import { Input } from "@/components/ui/input";

withDefaults(
  defineProps<{
    titleTop?: boolean; // 웹모드에서도 모바일과 같이 타이틀이 위로 오는 경우
  }>(),
  {
    titleTop: false,
  },
);
</script>
<template>
  <div class="ipt-wrap" :class="{ titleTop: titleTop }">
    <label class="relative mb-[.8rem] block font-bold text-gray-800"
      >카드번호</label
    >
    <div class="flex flex-row">
      <Input
        class="block w-full flex-1"
        type="number"
        minlength="4"
        maxlength="4"
      />
      <span>-</span>
      <Input
        class="block w-full flex-1"
        type="number"
        minlength="4"
        maxlength="4"
      />
      <span>-</span>
      <Input
        class="block w-full flex-1"
        type="password"
        minlength="4"
        maxlength="4"
      />
      <span>-</span>
      <Input
        class="block w-full flex-1"
        type="password"
        minlength="4"
        maxlength="4"
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
input:focus {
  padding-right: 1.6rem;
}
span {
  line-height: 4.8rem;
  margin: 0 0.3rem;
}
@media (min-width: 768px) {
  input:focus {
    padding-right: 2rem;
  }
  span {
    line-height: 5.8rem;
    margin: 0 1.6rem;
  }
}
</style>
