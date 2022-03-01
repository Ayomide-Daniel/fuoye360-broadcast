<template>
  <div>
    <PageMetaComponent />
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
