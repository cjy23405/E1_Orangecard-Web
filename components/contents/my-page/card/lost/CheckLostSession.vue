<script setup lang="ts">
// props
const props = defineProps<{
  checkPath: string;
  deniedPath: string;
}>();

// 스토어
const stores = {
  session: useStoreSession(),
};

// route
const localePath = useLocalePath();
const router = useRouter();

// return
const denied = () => {
  stores.session.$setCardLost(null);
  router.push(localePath(props.deniedPath));
};

// 이전 화면 체크
const checkPath = useCheckBackPath(props.checkPath);

// life cycle
onMounted(() => {
  // 세션 없으면 return
  if (!stores.session.cardLost) {
    denied();
  }

  // 정상 접근 아니면 return
  if (!checkPath) {
    denied();
  }
});
</script>

<template>
  <slot />
</template>
