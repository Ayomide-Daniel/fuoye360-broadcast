<template>
  <div>
    <div class="page-meta-div">
      <h3><i class="bi bi-person icon"></i>Profile</h3>
    </div>
    <div style="border-bottom: 1px solid var(--border-color)">
      <div class="img-banner">
        <img :src="require('~/assets/images/brown.jpg')" alt="" srcset="" />
      </div>
      <v-container class="profile-meta-div">
        <div class="top-meta-div">
          <div class="profile-img">
            <img :src="require('~/assets/images/brown.jpg')" alt="" srcset="" />
          </div>
          <div class="btn-div">
            <button v-ripple type="button" @click="showEditProfile">Edit Profile</button>
          </div>
        </div>
        <div class="bottom-meta-div">
          <h2>
            {{ user.name }}
            <span class="verified-patch"><i class="bi bi-patch-check-fill"></i></span>
          </h2>
          <span>@{{ user.username }}</span>
          <p class="profile-bio">
            <b>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam minus quasi
              alias esse id nemo. In neque dolore est, esse ipsa doloribus officia fugit
              beatae praesentium quidem rerum dolores accusamus.
            </b>
          </p>
          <div class="profile-meta">
            <div>
              <h3 class="bi bi-geo-alt meta-icon"></h3>
              <span>{{ user.location }}</span>
            </div>
            <div>
              <h3 class="bi bi-link-45deg meta-icon"></h3>
              <a :href="user.url" style="color: var(--brand-color)">{{ user.url }}</a>
            </div>
            <div>
              <h3 class="bi bi-calendar-event meta-icon"></h3>
              <span>{{ user.relative_at }}</span>
            </div>
          </div>
          <div class="profile-influence">
            <div>
              <h3>100</h3>
              <span>Following</span>
            </div>
            <div>
              <h3>100</h3>
              <span>Followers</span>
            </div>
          </div>
        </div>
      </v-container>
    </div>
    <BroadcastGridComponent />
  </div>
</template>

<script>
export default {
  name: "UserIndexPage",
  computed: {
    user() {
      return this.$store.state.User.data;
    },
  },
  methods: {
    showEditProfile() {
      return this.$root.$emit("showEditProfile");
    },
  },
};
</script>

<style scoped>
.img-banner {
  height: 200px;
}

.img-banner img {
  width: 100%;
  height: inherit;
  object-fit: cover;
}
.profile-meta-div {
  padding-left: 2rem;
  padding-right: 2rem;
}
.top-meta-div {
  display: flex;
  justify-content: space-between;
  margin-top: -5rem;
}

.profile-img img {
  padding: 0.25rem;
  background: var(--white-color);
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
}
.top-meta-div .btn-div {
  align-self: flex-end;
}
.top-meta-div button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--brand-color);
  color: var(--brand-color);
  font-weight: 500;
  cursor: pointer;
  align-self: bottom;
}
.top-meta-div button:hover {
  box-shadow: 0 4px 10px 0 var(--green-bg);
}

.bottom-meta-div {
  font-size: 14px;
}
.verified-patch {
  color: var(--brand-color);
}
.profile-bio {
  margin: 1rem 0;
}
.profile-meta,
.profile-influence {
  display: flex;
  margin-bottom: 0.5rem;
  column-gap: 1rem;
}
.profile-meta div,
.profile-influence div {
  column-gap: 0.5rem;
  display: flex;
  align-items: center;
}
.meta-icon {
  /* margin-right: -0.5rem; */
}
</style>
