<template>
  <v-scale-transition origin="center">
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
            <button
              v-ripple
              type="submit"
              class="save-btn"
              style="opacity: 0.75"
              @click.prevent="submitProfile"
            >
              <span v-if="btnLoading"
                ><v-progress-circular
                  indeterminate
                  color="white"
                  width="3"
                  size="20"
                ></v-progress-circular
              ></span>
              <span v-else> SAVE</span>
            </button>
          </div>
        </div>
        <div>
          <div class="img-banner">
            <img
              id="profile-banner"
              :src="user.banner"
              :alt="`${user.full_name}'s profile banner`"
            />
            <button @click="triggerClick('banner')"><i class="bi bi-camera"></i></button>
          </div>
          <div class="profile-img">
            <img
              id="profile-image"
              :src="user.image"
              :alt="`${user.full_name}'s profile picture`"
            />
            <button @click="triggerClick('image')"><i class="bi bi-camera"></i></button>
          </div>
        </div>
        <v-container>
          <div style="display: none">
            <form id="profile-image-form"></form>
            <form id="profile-banner-form"></form>
          </div>
          <form id="profile-form" @submit.prevent="submitProfile">
            <input
              id="profile-image-input"
              type="file"
              style="display: none"
              name="user-image"
              accept=".jpeg, .jpg, .png"
              @change="previewImage($event, 'image')"
            />
            <input
              id="profile-banner-input"
              type="file"
              style="display: none"
              name="user-banner"
              accept=".jpeg, .jpg, .png"
              @change="previewImage($event, 'banner')"
            />
            <div class="grid-row">
              <div class="input-div">
                <label for="full_name">Name</label>
                <input
                  id="full_name"
                  :value="form.full_name"
                  type="text"
                  name="full_name"
                />
              </div>
              <div class="input-div">
                <label for="username">Username</label>
                <input id="username" :value="form.username" type="text" name="username" />
                <i class="bi bi-at at-icon"></i>
              </div>
            </div>
            <div class="grid-row">
              <div class="input-div">
                <label for="location">Location</label>
                <input id="location" :value="form.location" type="text" name="location" />
              </div>
              <div class="input-div">
                <label for="website">Website</label>
                <input id="website" :value="form.url" type="url" name="url" />
              </div>
            </div>
            <div class="input-div">
              <label for="bio">Bio</label>
              <textarea id="bio" :value="form.bio" name="bio"></textarea>
            </div>
          </form>
        </v-container>
      </div>
    </div>
  </v-scale-transition>
</template>

<script>
import $ from "jquery";
import User from "~/assets/js/api/User";
export default {
  name: "ProfileModalComponent",
  data() {
    return {
      showProfile: false,
      profileImagesChanged: false,
      btnLoading: false,
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
    previewImage(event, type) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.addEventListener("load", function (e) {
          const pic = e.target;
          if (type === "image") {
            $("#profile-image").attr("src", pic.result);
          } else {
            $("#profile-banner").attr("src", pic.result);
          }
        });
        reader.readAsDataURL(file);
      }
    },
    closeBroadcastModal(e) {
      if (
        $(e.target).closest(".vs-container").length === 0 ||
        $(e.target).closest(".close-btn").length === 1
      ) {
        return (this.showProfile = false);
      }
    },
    async submitProfile() {
      this.btnLoading = true;
      const fd = new FormData(document.querySelector("#profile-form"));
      try {
        const res = await User.updateProfile(fd);
        this.$store.commit("User/setUserData", res.data.data.user);
        this.showProfile = false;
        this.$root.$emit("alert", res.data);
      } catch (error) {
        console.log(error);
        this.$root.$emit("alert", error.response.data);
      }
      this.btnLoading = false;
    },
    triggerClick(type) {
      if (type === "banner") {
        return $("#profile-banner-input").click();
      }
      if (type === "image") {
        return $("#profile-image-input").click();
      }
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
}

.meta-div .icon {
  margin: 0 auto;
}

.meta-div .save-btn {
  min-width: 100px;
  padding: 0.5rem 1rem;
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
  top: 80px;
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
  border: 1px solid var(--brand-color);
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
form .input-div .at-icon {
  background: var(--input-color);
  align-self: normal;
  padding: 0.5rem 0.8rem;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  border-radius: 0 0.5rem 0.5rem 0;
}
form textarea {
  padding: 0.5rem 1rem;
  height: 100px;
  resize: none;
}

@media screen and (min-width: 768px) {
  .grid-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }
}
</style>
