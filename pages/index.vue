<template>
  <div>
    <PageMetaComponent />
    <BroadcastGridComponent />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  middleware: "authenticated",
};
</script>

<style scoped></style>
