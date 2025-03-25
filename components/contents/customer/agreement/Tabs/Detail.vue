<script setup lang="ts">
// props
const props = withDefaults(
  defineProps<{
    id?: number;
    isActive?: boolean;
  }>(),
  {
    id: 0,
    isActive: false,
  },
);

// api
const { data, suspense } = useApiAgreementDetail({
  agreementId: props.id,
});

// computed
const title = computed(() => data.value?.data?.title || "");
const description = computed(() =>
  useDescription(data.value?.data?.contents || ""),
);

// api ssr
await suspense();

// SEO
const seo = () => {
  if (props.isActive) {
    $setSEO({
      location: [title.value, useT("location.004004"), useT("location.004")],
      description: description.value,
    });
  }
};
seo();

// life cycle
onUpdated(() => {
  seo();
});
</script>

<template>
  <div class="round-box mb:mt-8 mt-[2.4rem] p-8 md:p-16">
    <CommonHtmlData :contents="data?.data?.contents || ''" />
  </div>
</template>
