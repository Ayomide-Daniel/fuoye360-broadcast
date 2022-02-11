<template>
  <v-scale-transition>
    <div
      v-if="showProfile"
      id="profile-box"
      class="vs-wrapper"
      @click="closeBroadcastModal($event)"
    >
      <div class="vs-container">
        <div class="meta-div">
          <v-row class="">
            <button v-ripple class="close-btn">
              <h1 class="bi bi-x icon"></h1>
            </button>
            <h3>Edit Profile</h3>
          </v-row>
          <div>
            <button type="button" class="save-btn" @click="submitProfile">Save</button>
          </div>
        </div>
        <div>
          <div class="img-banner">
            <img :src="require('~/assets/images/brown.jpg')" alt="" srcset="" />
            <button><i class="bi bi-camera"></i></button>
          </div>
          <div class="profile-img">
            <img :src="require('~/assets/images/brown.jpg')" alt="" srcset="" />
            <button><i class="bi bi-camera"></i></button>
          </div>
        </div>
        <v-container>
          <form @submit.prevent="submitProfile">
            <input type="file" style="display: none" name="profile-image" />
            <input type="file" style="display: none" name="banner-image" />
            <div class="input-div">
              <label for="name">Name</label>
              <input id="name" v-model="form.name" type="text" />
            </div>
            <div class="input-div">
              <label for="username">Username</label>
              <input id="username" v-model="form.username" type="text" />
            </div>
            <div class="input-div">
              <label for="bio">Bio</label>
              <textarea id="bio" v-model="form.bio"></textarea>
            </div>
            <div class="input-div">
              <label for="location">Location</label>
              <input id="location" v-model="form.location" type="text" />
            </div>
            <div class="input-div">
              <label for="website">Website</label>
              <input id="website" v-model="form.url" type="url" />
            </div>
          </form>
        </v-container>
      </div>
    </div>
  </v-scale-transition>
</template>

<script>
import $ from "jquery";
// import Broadcast from "~/assets/js/api/Broadcast";
export default {
  name: "ProfileModalComponent",
  data() {
    return {
      showProfile: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.User.data;
    },
    form() {
      return this.user;
    },
  },
  mounted() {
    this.$root.$on("showEditProfile", () => {
      return (this.showProfile = true);
    });
  },
  methods: {
    closeBroadcastModal(e) {
      if (
        $(e.target).closest(".vs-container").length === 0 ||
        $(e.target).closest(".close-btn").length === 1
      ) {
        return (this.showProfile = false);
      }
    },
    submitProfile() {
      return true;
    },
  },
};
</script>

<style scoped>
.vs-wrapper {
  align-self: center;
}
.vs-container {
  padding: 0;
}
.meta-div {
  z-index: 3;
  position: sticky;
  top: 0;
  background: var(--white-color);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
}
.meta-div .close-btn {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 1rem;
}

.meta-div .icon {
  margin: 0 auto;
}

.meta-div .save-btn {
  padding: 0.5rem 2rem;
  background: var(--brand-color);
  border-radius: 0.5rem;
  border: 1px solid var(--brand-color);
  color: var(--white-color);
  font-weight: 500;
  box-shadow: 0 4px 10px 0 var(--green-bg);
}
.meta-div div {
  align-items: center;
}

.img-banner {
  position: relative;
  height: 200px;
}
.img-banner::before {
  position: absolute;
  display: block;
  content: "";
  width: inherit;
  height: inherit;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.35);
}
.img-banner img {
  width: 100%;
  height: inherit;
  object-fit: cover;
}
.img-banner button,
.profile-img button {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  margin: 0 auto;
  color: var(--white-color);
}
.img-banner button {
  top: 100px;
}
.profile-img {
  margin-left: 2rem;
  transform: translateY(-5rem);
  margin-bottom: -5rem;
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: var(--white-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-img::before {
  position: absolute;
  display: block;
  content: "";
  width: 140px;
  height: 140px;
  background: rgba(0, 0, 0, 0.35);
  z-index: 2;
  border-radius: inherit;
}

.profile-img img {
  width: 140px;
  height: 140px;
  border-radius: inherit;
  object-fit: cover;
}

form .input-div {
  position: relative;
  border-radius: 0.5rem;
  border: 1px solid var(--input-color);
  margin-bottom: 1rem;
  transition: all ease-in-out 300ms;
}

form .input-div:hover {
  border: 2px solid var(--brand-color);
}
form .input-div:hover label {
  color: var(--brand-color);
}
form .input-div label {
  padding: 0.5rem 0;
  font-size: 14px;
  position: absolute;
  left: 1rem;
  font-weight: 700;
  top: -0.25rem;
  color: var(--input-color);
  transition: all ease-in-out 300ms;
}
form input,
form textarea {
  width: 100%;
  margin-top: 0.75rem;
  background: none;
  outline: none;
}

form textarea {
  padding: 0.5rem;
  height: 100px;
  resize: none;
}
</style>
