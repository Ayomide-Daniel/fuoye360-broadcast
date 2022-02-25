<template>
  <div>
    <div class="page-meta-div">
      <h3><i class="bi bi-house icon"></i> Home</h3>
    </div>
    <!-- <TrendingProfileComponent /> -->
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
