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
    <div v-if="$route.name === 'index'" class="page-title">
      <h3>Home</h3>
      <h3 class="bi bi-house"></h3>
    </div>
    <div v-else-if="$route.name === 'trending'" class="page-title">
      <h3>Trending</h3>
      <h3 class="bi bi-hash"></h3>
    </div>
    <div v-else-if="$route.name === 'bookmarks'" class="page-title">
      <h3>Bookmarks</h3>
      <h3 class="bi bi-bookmark"></h3>
    </div>
    <div v-else-if="$route.name === 'username'" class="page-title">
      <h3>Profile</h3>
      <h3 class="bi bi-person"></h3>
    </div>
    <div v-else-if="$route.name === 'notifications'" class="page-title">
      <h3>Notifications</h3>
      <h3 class="bi bi-bell"></h3>
    </div>
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

<style scoped>
.page-meta-div {
  padding: 0.5rem 1rem;
  position: sticky;
  top: 0;
  border-bottom: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  z-index: 2;
  display: flex;
  align-items: center;
}
.page-meta-div .profile-img {
  display: flex;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
}

.profile-img img {
  width: inherit;
  height: inherit;
  object-fit: cover;
  border-radius: inherit;
  -webkit-border-radius: inherit;
  -moz-border-radius: inherit;
  -ms-border-radius: inherit;
  -o-border-radius: inherit;
}

.page-title {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
