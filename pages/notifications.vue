<template>
  <div>
    <PageMetaComponent />
    <div class="notification-grid">
      <nuxt-link to="/" class="notification-content">
        <div class="lhs">
          <h3 class="bi bi-person-fill icon follow"></h3>
        </div>
        <div class="rhs">
          <div class="img-div">
            <img :src="user.image" alt="" />
            <p>
              <span class="bold-text">{{ user.full_name }} </span>followed you
            </p>
          </div>
        </div>
      </nuxt-link>
      <nuxt-link to="/" class="notification-content">
        <div class="lhs">
          <h3 class="bi bi-megaphone-fill icon retweet"></h3>
        </div>
        <div class="rhs">
          <div class="img-div">
            <img
              :src="user.image"
              :alt="`${user.full_name}'s profile picture`"
              lazy="load"
            />
            <p>
              <span class="bold-text">{{ user.full_name }} </span>followed you
            </p>
          </div>
        </div>
      </nuxt-link>
      <nuxt-link to="/" class="notification-content">
        <div class="lhs">
          <h3 class="bi bi-heart-fill icon like"></h3>
        </div>
        <div class="rhs">
          <div class="img-div">
            <img :src="user.image" alt="" />
            <p>
              <span class="bold-text">{{ user.full_name }}</span> liked your tweet
            </p>
            <div></div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotificationsPage",
  middleware: "authenticated",
  computed: {
    user() {
      return this.$store.state.User.data;
    },
  },
};
</script>

<style scoped>
.notification-content {
  display: grid;
  grid-template-columns: 20% 80%;
  padding: 0.5rem;
  align-items: flex-start;
  border-bottom: 1px solid #eee;
  color: inherit;
  text-decoration: none;
}

.notification-content:hover {
  background: var(--input-color);
}

.notification-content .lhs {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* justify-self: flex-end; */
}
.notification-content .icon {
  font-size: 1.3rem;
  /* display: flex; */
  /* margin-right: 1rem; */
  margin: 0 !important;
}

.notification-content img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}

.notification-content p {
  margin: 0;
}

.bold-text {
  font-weight: 500;
}

.retweet {
  color: var(--green);
}

.like {
  color: var(--red-color);
}

.follow {
  color: var(--blue);
}
</style>
