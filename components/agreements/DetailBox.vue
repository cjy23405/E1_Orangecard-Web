<script setup lang="ts">
// props
const props = withDefaults(
  defineProps<{
    code?: string;
  }>(),
  {
    code: "",
  },
);

// api
const { data, suspense } = useApiAgreementDetail({
  agreementType: props.code,
});

// api ssr
await suspense();
</script>

<template>
  <div class="terms-box data-terms">
    <CommonHtmlData :contents="data?.data?.contents || ''" />
  </div>
</template>

<style lang="css" scoped>
.terms-box {
  height: 18.2rem;
  margin: 0.8rem 0;
  padding: 2rem;
  border-radius: 1.2rem;
  border: solid 1px #e8ecef;
  color: #858e96;
  overflow: auto;
}
@media (min-width: 768px) {
  .terms-box {
    height: 21.4rem;
    margin: 1.6rem 0;
    padding: 4rem;
  }
}
</style>
