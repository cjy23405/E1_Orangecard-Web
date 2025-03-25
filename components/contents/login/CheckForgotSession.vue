<script setup lang="ts">
// props
const props = defineProps<{
  checkPath: string;
  deniedPath: string;
}>();

// emit
const emit = defineEmits<{
  clear: [];
}>();

// 스토어
const stores = {
  session: useStoreSession(),
};

// route
const localePath = useLocalePath();
const router = useRouter();

// state
const is = ref(false);

// return
const denied = () => {
  stores.session.$setForgot(null);
  router.push(localePath(props.deniedPath));
};

// 이전 화면 체크
const checkPath = useCheckBackPath(props.checkPath);

// life cycle
onMounted(() => {
  // 세션 없으면 return
  if (!stores.session.auth || !stores.session.forgot) {
    denied();
    return;
  }

  // 정상 접근 아니면 return
  if (!checkPath) {
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
