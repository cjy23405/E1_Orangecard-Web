<script setup lang="ts">
// props
const props = withDefaults(
  defineProps<{
    id?: number;
  }>(),
  {
    id: 0,
  },
);

// route
const localePath = useLocalePath();

// api
const { data, suspense } = useApiNoticeDetail({
  postingNo: props.id,
});

// api ssr
await suspense();

// computed
const title = computed(() => {
  return data.value?.data?.title || "";
});
const date = computed(() => {
  const d = data?.value?.data?.entryDateTime || "";
  return d ? useFormattedDate(d, "yyyy-MM-dd") : "";
});
const contents = computed(() => {
  return data.value?.data?.contents || "";
});
const fileName = computed(() => {
  const fileName = data.value?.data?.fileName;
  return fileName ? useFileName(fileName) : "";
});
const description = computed(() => useDescription(contents.value));

// SEO
$setSEO({
  boardTitle: title.value,
  location: [useT("location.004001"), useT("location.004")],
  description: description.value,
});
</script>

<template>
  <div class="inner md:!px-40">
    <BoardDetail
      :title="title"
      :date="date"
      :list-url="localePath('/customer/notice')"
      :file-url="data?.data?.file"
      :file-name="fileName"
    >
      <CommonHtmlData :contents="contents" />
    </BoardDetail>
  </div>
</template>
