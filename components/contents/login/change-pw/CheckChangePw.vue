<script setup lang="ts">
// props
const props = defineProps<{
  deniedPath: string;
}>();

// emit
const emit = defineEmits<{
  clear: [];
}>();

// 스토어
const stores = {
  auth: useStoreAuth(),
};

// route
const localePath = useLocalePath();
const router = useRouter();

// state
const is = ref(false);

// return
const denied = () => {
  router.push(localePath(props.deniedPath));
};

// life cycle
onMounted(() => {
  // 변경 필요 없으면 return
  if (!stores.auth.loginInfo?.pwdChangeReq) {
    denied();
    return;
  }

  // 정상 접근이면 화면 노출
  nextTick(() => {
    is.value = true;
    emit("clear");
  });
});
</script>

<template>
  <slot v-if="is" />
</template>
