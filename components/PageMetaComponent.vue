<template>
  <div class="page-meta-div">
    <div v-ripple class="profile-img icon">
      <img
        :src="user.image"
        :alt="`${user.full_name}'s profile picture`"
        lazy="load"
        @click="showSideNav"
      />
    </div>
    <h3 v-if="$route.name === 'index'">Home</h3>
    <h3 v-else-if="$route.name === 'trending'">Trending</h3>
    <h3 v-else-if="$route.name === 'bookmarks'">Bookmarks</h3>
  </div>
</template>

<script>
export default {
  name: "PageMetaComponent",
  computed: {
    user() {
      return this.$store.state.User.data;
    },
  },
  methods: {
    showSideNav() {
      return this.$root.$emit("showSideNav");
    },
  },
};
</script>

<style scoped></style>
