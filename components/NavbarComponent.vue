<template>
  <v-slide-x-transition>
    <div v-if="showNav" id="navbar-component" @click="closeNavbar($event)">
      <v-container class="nav-container">
        <v-slide-x-transition>
          <nav class="navlinks-container">
            <!-- <button class="close-btn"><i class="bi bi-x icon"></i></button> -->
            <nuxt-link v-ripple="{ class: 'success--text' }" to="/" class="navlinks">
              <i class="bi bi-house icon"></i> Home
            </nuxt-link>
            <nuxt-link
              v-ripple="{ class: 'success--text' }"
              to="/trending"
              class="navlinks"
            >
              <i class="bi bi-hash icon"></i> Trending
            </nuxt-link>
            <nuxt-link
              v-ripple="{ class: 'success--text' }"
              to="/notifications"
              class="navlinks"
            >
              <i class="bi bi-bell icon"></i> Notifications
            </nuxt-link>
            <nuxt-link
              v-ripple="{ class: 'success--text' }"
              to="/bookmarks"
              class="navlinks"
            >
              <i class="bi bi-bookmark icon"></i> Bookmarks
            </nuxt-link>
            <nuxt-link
              v-ripple="{ class: 'success--text' }"
              to="/feedback"
              class="navlinks"
            >
              <i class="bi bi-question-circle icon"></i> Feedback
            </nuxt-link>
            <nuxt-link
              v-ripple="{ class: 'success--text' }"
              :to="{
                name: 'username',
                params: {
                  username: user.username,
                },
              }"
              class="navlinks"
            >
              <i class="bi bi-person icon"></i> Profile
            </nuxt-link>
            <!-- <nuxt-link v-ripple="{ class: 'success--text' }" to="/more" class="navlinks">
              <i class="bi bi-three-dots icon"></i> More
            </nuxt-link> -->
            <button
              v-ripple="{ class: 'success--text' }"
              to="/more"
              class="navbtn fill-btn"
              @click="newBroadcast"
            >
              <i class="bi bi-megaphone icon"></i> New Broadcast
            </button>
          </nav>
        </v-slide-x-transition>
      </v-container>
    </div>
  </v-slide-x-transition>
</template>

<script>
import $ from "jquery";
export default {
  name: "NavbarComponent",
  data() {
    return {
      showNav: true,
    };
  },
  computed: {
    user() {
      return this.$store.state.User.data;
    },
  },
  watch: {
    $route() {
      if (window.innerWidth < 768) {
        this.showNav = false;
      }
    },
  },
  mounted() {
    if (window.matchMedia("only screen and (max-width: 425px)").matches) {
      this.showNav = false;
    }

    window.addEventListener("resize", this.handleResize);
    this.$root.$on("showSideNav", () => {
      this.showNav = true;
    });
  },
  methods: {
    handleResize() {
      if (parseInt(window.innerWidth) >= 768) {
        return (this.showNav = true);
      } else {
        return (this.showNav = false);
      }
    },
    closeNavbar(e) {
      if ($(e.target).closest(".nav-container").length === 0) {
        return (this.showNav = false);
      }
    },
    newBroadcast() {
      this.$root.$emit("showModal", { modal: "broadcast" });
    },
  },
};
</script>

<style scoped>
#navbar-component {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  width: 100%;
  border-right: 1px solid var(--border-color);
}

.nav-container {
  height: 100vh;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  width: 75%;
  background: var(--white-color);
  margin-left: 0;
}

.navlinks-container {
  display: grid;
  text-align: left;
  align-items: center;
  padding-left: 1.5rem;
  position: relative;
}
.navlinks,
.navbtn {
  font-size: 0.85rem;
  padding: 1rem;
  border-radius: 2rem;
  margin: 0.15rem 0;
  text-decoration: none;
  font-weight: 600;
  color: var(--primary-color);
}
.navlinks .icon,
.navbtn .icon {
  font-size: 1.3rem;
}
.navlinks:hover {
  background: var(--green-bg);
}
.fill-btn {
  background: var(--brand-color);
  color: var(--white-color);
  box-shadow: 0 0 14px 0 var(--green-bg);
}

@media screen and (min-width: 768px) {
  #navbar-component {
    position: relative !important;
    background: var(--white-color);
    backdrop-filter: none;
  }
  .nav-container {
    width: 100% !important;
  }

  .navlinks-container {
    padding-left: 2rem;
  }
}
</style>
