<script setup lang="ts">
// props
const props = withDefaults(
  defineProps<{
    id?: string;
  }>(),
  {
    id: "0",
  },
);

// api
const { data, suspense } = useApiAssociationServiceDetail({
  partnershipServiceId: props.id,
});

// api ssr
await suspense();

// computed
const title = computed(() => {
  return data?.value?.data?.serviceName || "";
});
const contents = computed(() => {
  return data.value?.data?.content || "";
});
const description = computed(() => useDescription(contents.value));

// html 아닌 상세 404 로
if (!data.value || data.value.data?.displayType !== "1") {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

// SEO
$setSEO({
  boardTitle: title.value,
  location: [useT("location.002002"), useT("location.002")],
  description: description.value,
});
</script>

<template>
  <div v-if="data?.data?.displayType === '1'" class="inner">
    <CommonHtmlData :contents="contents" />
  </div>
</template>
