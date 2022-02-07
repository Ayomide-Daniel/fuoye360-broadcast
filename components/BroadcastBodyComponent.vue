<template>
  <div class="broadcast-body-component">
    <div class="tweet-img-div">
      <nuxt-link
        :to="{
          name: 'username',
          params: { username: d_broadcast.user.name },
          query: { v: 'broadcast' },
        }"
        ><img
          loading="lazy"
          :alt="d_broadcast.user.name"
          class="tweeter-img"
          :src="require('@/assets/images/brown.jpg')"
      /></nuxt-link>
      <!-- :src="$asset('storage/profile_images/' + d_broadcast.user.image)" -->
    </div>
    <div class="tweet-content">
      <div
        v-if="d_broadcast.meta._info.count > 0 && !d_broadcast.meta.is_thread"
        class="info-display"
      >
        <div v-if="d_broadcast.meta._info.type === 'retweets'" class="tweet-retweet">
          <div v-if="d_broadcast.meta._info.user.id === user.id">
            <b> <i class="bi bi-megaphone-fill icon"></i> You rebroadcasted this </b>
          </div>
          <div v-else-if="d_broadcast.meta._info.count === 1">
            <i class="bi bi-megaphone-fill icon"></i>
            <b> {{ d_broadcast.meta._info.user.name }} rebroadcasted this </b>
          </div>
          <div v-else-if="d_broadcast.meta._info.count === 2">
            <i class="bi bi-megaphone-fill icon"></i>
            <b> {{ d_broadcast.meta._info.user.name }} and 1 other rebrodcasted this</b>
          </div>
          <div v-else-if="d_broadcast.meta._info.count > 2">
            <i class="bi bi-megaphone-fill icon"></i>
            <b>
              {{ d_broadcast.meta._info.user.name }} and
              {{ d_broadcast.meta._info.count }} others rebroadcasted this
            </b>
          </div>
        </div>
        <div v-else-if="d_broadcast.meta._info.type === 'likes'" class="tweet-liked">
          <div v-if="d_broadcast.meta._info.count === 1">
            <i class="bi bi-heart-fill icon"></i>
            <b> {{ d_broadcast.meta._info.user.name }} liked this </b>
          </div>
          <div v-else-if="d_broadcast.meta._info.count === 2">
            <i class="bi bi-heart-fill icon"></i>
            <b> {{ d_broadcast.meta._info.user.name }} and 1 other liked this </b>
          </div>
          <div v-else-if="d_broadcast.meta._info.count > 2">
            <i class="bi bi-heart-fill icon"></i>
            <b>
              {{ d_broadcast.meta._info.user.name }} and
              {{ d_broadcast.meta._info.count }} others liked this
            </b>
          </div>
        </div>
      </div>
      <div class="tweet-profile-div">
        <div class="profile-meta">
          <nuxt-link to="" style="text-decoration: none; color: var(--primary-color)">
            <span class="tweet-profilename">{{ d_broadcast.user.name }}</span
            ><span class="tweet-time" style="font-weight: 600">@brown</span>
          </nuxt-link>
          <span class="tweet-time"> . {{ d_broadcast.relative_at }} </span>
        </div>
        <button class="tweet-options" @click="showModal(broadcast, null, 'option')">
          <i class="bi bi-chevron-down"></i>
        </button>
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="tweet-body" v-html="d_broadcast.body"></div>
      <div v-if="d_broadcast.media != null" class="broadcast-media">
        <div
          v-for="(img, index) in d_broadcast.media"
          :key="img.id"
          v-ripple
          class="img-div"
        >
          <img
            loading="lazy"
            :src="require('../assets/images/' + img)"
            :alt="`broadcast-img-${index}`"
            load="lazy"
            @click="viewImage(require('../assets/images/' + img))"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BroadcastBodyComponent",
  // eslint-disable-next-line vue/require-prop-types
  props: ["broadcast", "origin"],
  computed: {
    user() {
      return this.$store.state.User.data;
    },
    d_broadcast() {
      return this.broadcast;
    },
  },
};
</script>

<style scoped>
.broadcast-body-component {
  display: flex;
  align-items: flex-start;
  z-index: 1;
}
.tweet-profile-div {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.tweet-profile-div span {
  margin-left: 0.25rem;
  word-break: break-all;
}

.tweet-options {
  background: none;
  border: none;
}

.tweet-time {
  color: var(--grey-color);
  font-size: 0.8rem;
}

.tweet-img-div {
  z-index: 1;
  padding: 0.25rem 0;
  background: var(--white-color);
}
.tweeter-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--bg-color);
}

.tweet-profilename {
  font-size: 0.95rem;
  font-weight: 700;
}

.tweet-content {
  margin-left: 0.5rem;
  width: 100%;
}

.tweet-body a {
  color: var(--brand-color);
}
.tweet-liked i {
  color: var(--red-color);
}

.tweet-retweet i {
  color: var(--brand-color);
}

.info-display {
  font-size: 0.75rem;
}

.broadcast-media {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-around;
  column-gap: 0.5rem;
  width: 100%;
  padding: 1rem 0;
}

.broadcast-media .img-div {
  width: 100%;
  min-height: 200px;
  border-radius: 0.5rem;
  position: relative;
  cursor: pointer;
  transition: all ease-in-out 300ms;
}

.broadcast-media img {
  width: inherit;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

.broadcast-media .img-div::before {
  display: block;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  width: inherit;
  height: 100%;
  border-radius: inherit;
}
.broadcast-media .img-div:hover::before {
  background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.5));
}
.broadcast-media .img-div:hover {
  transform: scale(0.9);
}
</style>
