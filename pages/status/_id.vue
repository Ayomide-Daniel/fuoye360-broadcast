<template>
  <div>
    <PageMetaComponent />

    <div v-if="broadcast" class="tweet-div">
      <v-container>
        <div class="tweet-content-div">
          <div class="broadcast-body-component">
            <div class="tweet-img-div">
              <nuxt-link
                :to="{
                  name: 'username',
                  params: { username: broadcast.user.username },
                }"
                ><img
                  loading="lazy"
                  :alt="`${broadcast.user.full_name}'s profile picture`"
                  class="tweeter-img"
                  :src="broadcast.user.image"
              /></nuxt-link>
              <div v-if="broadcast.thread" class="thread-icon-div">
                <span class="thread-icon"> <i class="bi bi-newspaper"></i></span>
              </div>
            </div>
            <div class="tweet-content">
              <div class="tweet-profile-div">
                <div class="profile-meta">
                  <nuxt-link
                    :to="{
                      name: 'username',
                      params: { username: broadcast.user.username },
                    }"
                    style="color: var(--primary-color)"
                  >
                    <div class="tweet-profilename">{{ broadcast.user.full_name }}</div>
                    <div class="tweet-username-div">
                      <span class="tweet-small-meta" style="font-weight: 500"
                        >@{{ broadcast.user.username }}</span
                      >
                    </div>
                  </nuxt-link>
                  <!-- <div class="tweet-time-div">
                    <nuxt-link to="/" class="tweet-small-meta">
                      {{ broadcast.relative_at }}
                    </nuxt-link>
                  </div> -->
                </div>
                <!-- <button
                  v-ripple
                  class="tweet-options"
                  type="button"
                  @click="showModal('option')"
                >
                  <i class="bi bi-three-dots"></i>
                </button> -->
              </div>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div
                class="tweet-body"
                style="font-weight: 600; padding-top: 1rem"
                v-html="broadcast.body"
              ></div>
              <div
                v-if="broadcast.media != null && broadcast.media.length > 0"
                class="broadcast-media"
              >
                <div
                  v-for="(img, index) in broadcast.media"
                  :key="index"
                  v-ripple
                  class="img-div"
                  @click="viewImage(broadcast.media, index)"
                >
                  <img loading="lazy" :src="img" :alt="`${index}- broadcast image`" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-container>
      <div class="status-meta-div">
        <span
          ><b style="font-weight: 500">{{ broadcast.comments.length }}</b> comments</span
        >
        <span
          ><b style="font-weight: 500">{{ broadcast.retweets.length }}</b> retweets</span
        >
        <span
          ><b style="font-weight: 500">{{ broadcast.likes.length }}</b> likes</span
        >
      </div>

      <div class="status-meta-div status-btn-div">
        <button class="comment-btn" @click="showModal('comment')">
          <span class="icon">
            <i class="bi bi-chat"></i>
          </span>
        </button>
        <button
          v-if="broadcast.meta.has_retweeted"
          class="retweet-btn tweet-retweet"
          @click="undoRebroadcast()"
        >
          <span class="icon">
            <i class="bi bi-megaphone-fill"></i>
          </span>
          <span class="btn-text retweets-count"> </span>
        </button>
        <button v-else class="retweet-btn" @click="rebroadcast()">
          <span class="icon">
            <i class="bi bi-megaphone"></i>
          </span>
          <span class="btn-text retweets-count"> </span>
        </button>
        <button
          v-if="broadcast.meta.has_liked"
          class="like-btn tweet-liked"
          @click="unlikeBroadcast()"
        >
          <span class="icon">
            <i class="bi bi-heart-fill"></i>
          </span>
          <span class="btn-text likes-count"> </span>
        </button>
        <button v-else class="like-btn" @click="likeBroadcast()">
          <span class="icon">
            <i class="bi bi-heart"></i>
          </span>
          <span class="btn-text likes-count"> </span>
        </button>
        <!-- <button class="share-btn" @click="showModal('share')">
          <span class="icon">
            <i class="bi bi-share"></i>
          </span>
        </button> -->
      </div>
      <BroadcastGridComponent />
    </div>
  </div>
</template>

<script>
import Analytics from "~/assets/js/api/Analytics";
import Broadcast from "~/assets/js/api/Broadcast";
export default {
  name: "StatusIdPage",
  data() {
    return {
      broadcast: null,
    };
  },
  mounted() {
    this.setUpStatusPage();
  },
  methods: {
    async setUpStatusPage() {
      try {
        const res = await Broadcast.findById(this.$route.params.id);
        this.broadcast = res.data.data;
        return this.$root.$emit("statusPageSetup", res.data.data);
      } catch (error) {}
    },
    viewImage(src) {
      return this.$root.$emit("viewImage", src);
    },
    showModal(modal) {
      if (this.type === true) {
        return this.$root.$emit("showModal", {
          tweet: this.broadcast,
          type: "origin",
          modal,
        });
      }
      return this.$root.$emit("showModal", {
        tweet: this.broadcast,
        type: "",
        modal,
      });
    },
    async unlikeBroadcast() {
      try {
        const res = await Analytics.unlikeBroadcast({
          data: { broadcast_id: this.broadcast._id },
        });
        this.broadcast.meta.has_liked = false;
        return (this.broadcast.likes = res.data.data);
      } catch (error) {}
    },
    async likeBroadcast() {
      try {
        const res = await Analytics.likeBroadcast({
          broadcast_id: this.broadcast._id,
        });
        this.broadcast.meta.has_liked = true;
        return (this.broadcast.likes = res.data.data);
      } catch (error) {}
    },
    async rebroadcast() {
      try {
        const res = await Analytics.rebroadcast({ broadcast_id: this.broadcast._id });
        this.broadcast.meta.has_retweeted = true;
        return (this.broadcast.retweets = res.data.data);
      } catch (error) {}
    },
    async undoRebroadcast() {
      try {
        const res = await Analytics.undoRebroadcast({
          data: { broadcast_id: this.broadcast._id },
        });
        this.broadcast.meta.has_retweeted = false;
        return (this.broadcast.retweets = res.data.data);
      } catch (error) {}
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
}
.profile-meta {
  display: flex;
  padding: 0;
  margin: 0;
  flex: 11;
  flex-direction: row;
}
.profile-meta a {
  text-decoration: none;
}

.profile-meta a:hover .tweet-profilename {
  text-decoration: underline;
}

.tweet-profilename {
  font-weight: 700;
  display: flex;
  flex: none;
}

.tweet-username-div {
  margin-left: 0.15rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.75rem;
}
.tweet-options {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: none;
  outline: none;
  border: none;
}

.tweet-small-meta {
  color: var(--grey-color);
}
.tweet-time-div {
  margin-left: 0.15rem;
  display: flex;
  flex: none;
}
.tweet-time-div a {
  text-decoration: none;
}
.tweet-img-div {
  background: var(--white-color);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.tweet-img-div a {
  flex: 1;
}
.tweeter-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--bg-color);
}

.tweet-content {
  margin-left: 0.5rem;
  width: 100%;
  font-size: 0.98rem;
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
  max-height: 200px;
  border-radius: 0.5rem;
  position: relative;
  cursor: pointer;
  transition: all ease-in-out 300ms;
}

.broadcast-media img {
  width: inherit;
  height: 100%;
  max-height: 200px;
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

.thread-icon-div {
  flex: 1;
  display: flex;
  text-align: center;
  width: 100%;
  margin-top: 75%;
}

.thread-icon {
  background: var(--input-color);
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  width: 100%;
}

.status-meta-div {
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  /* min-height: 100px; */
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.status-meta-div button {
  padding: 0 1rem;
}

.like-btn:active .icon {
  background: var(--red-bg);
}
.retweet-btn:active .icon {
  background: var(--green-bg);
}
.comment-btn:active .icon {
  background: var(--blue-bg);
}

button .icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease-in-out 100ms;
}

.status-btn-div {
  padding: 0.5rem;
}
</style>
