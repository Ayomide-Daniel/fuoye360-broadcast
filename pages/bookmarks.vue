<template>
  <div>
    <div class="page-meta-div">
      <h3><i class="bi bi-bookmark icon"></i> Bookmarks</h3>
    </div>
    <BroadcastGridComponent />
  </div>
</template>

<script>
export default {
  name: "BookmarksPage",
  middleware: "authenticated",
};
</script>

<style scoped></style>
