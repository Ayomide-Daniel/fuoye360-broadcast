<template>
  <div id="navbar-component">
    <v-container class="nav-container">
      <nav class="navlinks-container">
        <nuxt-link to="/" class="navlinks">
          <i class="bi bi-house icon"></i> Home
        </nuxt-link>
        <nuxt-link to="/trending" class="navlinks">
          <i class="bi bi-hash icon"></i> Trending
        </nuxt-link>
        <nuxt-link to="/notifications" class="navlinks">
          <i class="bi bi-bell icon"></i> Notifications
        </nuxt-link>
        <nuxt-link to="/bookmarks" class="navlinks">
          <i class="bi bi-bookmark icon"></i> Bookmarks
        </nuxt-link>
        <nuxt-link to="/feedback" class="navlinks">
          <i class="bi bi-question-circle icon"></i> Feedback
        </nuxt-link>
        <nuxt-link to="/profile" class="navlinks">
          <i class="bi bi-person icon"></i> Profile
        </nuxt-link>
        <nuxt-link to="/more" class="navlinks">
          <i class="bi bi-three-dots icon"></i> More
        </nuxt-link>
      </nav>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>

<style scoped>
#navbar-component {
  border-right: 1px solid var(--border-color);
  position: relative;
}

.nav-container {
  height: 100vh;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
}

.navlinks-container {
  /* height: inherit; */
  display: grid;
  text-align: left;
  align-items: center;
  padding-left: 2rem;
}

.navlinks {
  padding: 1rem;
  border-radius: 2rem;
  margin: 0.15rem 0;
  text-decoration: none;
  font-weight: 600;
  color: var(--primary-color);
}
.navlinks .icon {
  font-size: 1.3rem;
}
.navlinks:hover {
  background: var(--green-bg);
  font-weight: 800;
}
</style>
