<template>
  <div class="tweet-div" :style="origin ? 'border:none;padding:0' : ''">
    <v-container>
      <div
        class="tweet-content-div"
        :class="origin ? 'for-thread' : ''"
        :style="origin ? 'transform: scale(.85)' : ''"
        @click="viewStatus(d_broadcast.id, d_broadcast.type, $event)"
      >
        <div v-if="origin" class="thread-border">
          <span class="border-content"></span>
        </div>

        <input
          v-if="d_broadcast.user_id != user.id"
          hidden
          class=""
          style="display: none"
          value=""
        />
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
                <b>
                  {{ d_broadcast.meta._info.user.name }} and 1 other rebrodcasted this</b
                >
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
          <div class="tweet-body">
            {{ d_broadcast.body }}
          </div>
          <div v-if="d_broadcast.media != null" class="broadcast-media">
            <div v-for="img in d_broadcast.media" :key="img.id" class="img-div">
              <img
                loading="lazy"
                :src="require('../assets/images/' + img)"
                alt=""
                load="lazy"
                @click="viewImage(require('../assets/images/' + img))"
              />
            </div>
          </div>
          <BroadcastButtonComponent :broadcast="d_broadcast" />
          <div v-if="d_broadcast.meta.is_thread" class="thread-icon-div">
            <span class="thread-icon"> <i class="bi bi-newspaper icon"></i> Thread </span>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "BroadcastComponent",
  // eslint-disable-next-line vue/require-prop-types
  props: ["broadcast", "origin"],
  data() {
    return {
      createdThreadStatus: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.User.data;
    },
    d_broadcast() {
      return this.broadcast;
    },
  },
  mounted() {
    this.$root.$on("addedFromBookmark", (id) => {
      if (id === this.d_broadcast.id) {
        this.d_broadcast.meta.is_bookmarked = true;
      }
    });
    this.$root.$on("removedFromBookmark", (id) => {
      if (id === this.d_broadcast.id) {
        this.d_broadcast.meta.is_bookmarked = false;
      }
    });

    this.$root.$on("createdThread", () => {
      this.createdThreadStatus = true;
    });

    this.$root.$on("updateComment", (tweet) => {
      if (this.origin) {
        if (this.d_broadcast.type === "comment") {
          if (this.d_broadcast.id === tweet.post_id) {
            return (this.d_broadcast.meta.comments.count += 1);
          }
        }
      }
      if (this.d_broadcast.id === tweet.post_id) {
        this.d_broadcast.meta.comments.count += 1;
        if (this.createdThreadStatus) {
          this.d_broadcast.is_thread = true;
        }
      }
      if (this.d_broadcast.type === "comment") {
        if (this.d_broadcast.id === this.tweet.post_id) {
          this.d_broadcast.meta.comments.count += 1;
        }
      }
    });
  },
  methods: {
    viewImage(src) {
      this.$root.$emit("viewImage", src);
    },
    showModal(data, type, modal) {
      this.$root.$emit("showModal", { tweet: data, type, modal });
    },
    viewStatus(id, type, e) {
      if (
        $(e.target).closest(".tweeter-img").length === 0 &&
        $(e.target).closest(".tweet-func-div").length === 0 &&
        $(e.target).closest(".tweet-profile-div").length === 0 &&
        $(e.target).closest(".info-display").length === 0 &&
        $(e.target).closest(".broadcast-media img").length === 0 &&
        $(e.target).closest(".tweet-content-div a").length === 0
      ) {
        if (this.status !== id) {
          this.$router.push({
            name: "broadcast-status-id",
            params: { id },
            query: { t: type },
          });
        }
        this.status = id;
      }
    },
  },
};
</script>

<style scoped>
.for-thread {
  position: relative;
}
.thread-border {
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  width: 2px;
  left: 26px;
}

.thread-border .border-content {
  width: inherit;
  height: 95%;
  background: #eee;
  z-index: -1;
}

.display-tweets {
  background: var(--white-color);
}

.hr-line {
  content: "";
  margin-left: 0.5rem;
  width: 100%;
  height: 2px;
  background: var(--brand-color);
}

.tweet-div {
  border-bottom: 1px solid #eee;
}

.tweet-content-div {
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

.tweet-txt {
  margin-top: 0.5rem;
}

.tweet-func-div {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0.25rem 0;
}

.tweet-func-div button {
  font-size: inherit;
  background: none;
  color: var(--grey-color);
  padding: 0.25rem;
  border: none;
  border-radius: 0.5rem;
  outline: none;
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

.broadcast-func-div input[type="file"] {
  display: none;
}
.broadcast-func-div button {
  font-size: inherit;
  font-size: 1.2rem;
  background: none;
  color: var(--brand-color);
  border: 1px solid var(--brand-color);
  border: none;
  padding: 0.25rem;
}

.thread-icon-div {
  display: flex;
  justify-content: flex-end;
  padding-top: 0.75rem;
}

.thread-icon {
  background: var(--input-color);
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
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
