<script setup lang="ts">
// 스토어
const stores = {
  auth: useStoreAuth(),
};

// api
const { data } = useApiPopupList({
  fuelType: stores.auth.loginInfo?.repFuelType,
  customerKey: stores.auth.loginInfo?.customerKey,
  memberType: stores.auth.loginInfo?.memDivCd,
  memberGrade: stores.auth.loginInfo?.tierCd,
});

// computed
const list = computed(() => {
  return data.value?.data || [];
});

// ref
const popups = useTemplateRef("popups");

// watch
watch(popups, () => {
  if (popups.value && popups.value.length === list.value.length) {
    popups.value.forEach((item) => {
      setTimeout(() => {
        item?.init();
      }, 200);
    });
  }
});
</script>

<template>
  <ClientOnly>
    <PopupMainNotice
      v-for="item in list"
      :key="item.popupId"
      ref="popups"
      :data="item"
    />
  </ClientOnly>
</template>
