<template>
  <div>
    <PageMetaComponent />
    <BroadcastGridComponent />
  </div>
</template>

<script>
export default {
  name: "TrendingPage",
  middleware: "authenticated",
};
</script>

<style scoped></style>
