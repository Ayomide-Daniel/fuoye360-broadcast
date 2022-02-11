<template>
  <div>
    <v-scale-transition group origin="center">
      <BroadcastModalComponent key="broadcast" />
      <ImageModalComponent key="image" />
      <ProfileModalComponent key="profile" />
    </v-scale-transition>

    <v-scroll-y-reverse-transition group>
      <CommentModalComponent key="comment" />
      <ShareModalComponent key="share" />
    </v-scroll-y-reverse-transition>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
};
</script>

<style scoped></style>
