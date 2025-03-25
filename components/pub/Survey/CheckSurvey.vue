<template>
  <div class="answer">
    <template v-for="g in row" :key="g">
      <div class="answer-row">
        <template v-for="i in Math.ceil((length / row) * g)" :key="i">
          <div v-if="list[getIndex(g, i)]" class="answer-item">
            <div class="answer-button">
              <checkbox
                :id="list[getIndex(g, i)].id"
                :disabled="item.disabled"
                class="ipt-check"
              ></checkbox>
              <label :for="list[getIndex(g, i)].id">
                {{ list[getIndex(g, i)].label }}
              </label>
            </div>
            <div v-if="list[getIndex(g, i)].imgsrc" class="answer-img">
              <img :src="list[getIndex(g, i)].imgsrc" />
            </div>
            <div v-if="list[getIndex(g, i)].useInput" class="answer-input">
              <input-item :disabled="item.disabled"></input-item>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";
import InputItem from "@/components/pub/InputItem.vue";

interface answerItem {
  id: string;
  label: string;
  useInput?: boolean;
  imgsrc?: string;
}
interface surveyItem {
  title: string;
  type: string;
  twoline: boolean;
  answerList: answerItem[];
  disabled?: boolean;
  id?: string;
}
const props = defineProps<{
  item: surveyItem;
}>();

const row = computed(() => {
  return props.item.twoline ? 2 : 1;
});
const list = computed(() => {
  return props.item.answerList;
});
const length = computed(() => {
  return list.value.length;
});

const getIndex = (g: number, i: number) => {
  return (
    Math.ceil((length.value / row.value) * (g - 1)) +
    (Math.ceil((length.value / row.value) * g) -
      (Math.ceil((length.value / row.value) * g) - (i - 1)))
  );
};
</script>
