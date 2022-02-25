<template>
  <div>
    <div class="page-meta-div">
      <h3><i class="bi bi-hash icon"></i> Trending</h3>
    </div>
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
