<template>
  <div class="broadcast-func-div">
    <button class="comment-btn" @click="showModal('comment')">
      <span class="icon">
        <i class="bi bi-chat"></i>
      </span>
      <span class="btn-text comment-count">{{ btn_broadcast.comments.length }}</span>
    </button>
    <button
      v-if="btn_broadcast.meta.has_retweeted"
      class="retweet-btn tweet-retweet"
      @click="undoRebroadcast()"
    >
      <span class="icon">
        <i class="bi bi-megaphone-fill"></i>
      </span>
      <span class="btn-text retweets-count">
        {{ btn_broadcast.retweets.length }}
      </span>
    </button>
    <button v-else class="retweet-btn" @click="rebroadcast()">
      <span class="icon">
        <i class="bi bi-megaphone"></i>
      </span>
      <span class="btn-text retweets-count">
        {{ btn_broadcast.retweets.length }}
      </span>
    </button>
    <button
      v-if="btn_broadcast.meta.has_liked"
      class="like-btn tweet-liked"
      @click="unlikeBroadcast()"
    >
      <span class="icon">
        <i class="bi bi-heart-fill"></i>
      </span>
      <span class="btn-text likes-count">
        {{ btn_broadcast.likes.length }}
      </span>
    </button>
    <button v-else class="like-btn" @click="likeBroadcast()">
      <span class="icon">
        <i class="bi bi-heart"></i>
      </span>
      <span class="btn-text likes-count">
        {{ btn_broadcast.likes.length }}
      </span>
    </button>
    <button class="share-btn" @click="showModal('share')">
      <span class="icon">
        <i class="bi bi-share"></i>
      </span>
    </button>
  </div>
</template>

<script>
import Analytics from "~/assets/js/api/Analytics";
export default {
  name: "BroadcastButtonComponent",
  // eslint-disable-next-line vue/require-prop-types
  props: ["broadcast", "type"],
  computed: {
    btn_broadcast() {
      return this.broadcast;
    },
  },
  methods: {
    async unlikeBroadcast() {
      try {
        const res = await Analytics.unlikeBroadcast({
          data: { broadcast_id: this.btn_broadcast._id },
        });
        this.btn_broadcast.meta.has_liked = false;
        return (this.btn_broadcast.likes = res.data.data);
      } catch (error) {}
    },
    async likeBroadcast() {
      try {
        const res = await Analytics.likeBroadcast({
          broadcast_id: this.btn_broadcast._id,
        });
        this.btn_broadcast.meta.has_liked = true;
        return (this.btn_broadcast.likes = res.data.data);
      } catch (error) {}
    },
    async rebroadcast() {
      try {
        const res = await Analytics.rebroadcast({ broadcast_id: this.btn_broadcast._id });
        this.btn_broadcast.meta.has_retweeted = true;
        return (this.btn_broadcast.retweets = res.data.data);
      } catch (error) {}
    },
    async undoRebroadcast() {
      try {
        const res = await Analytics.undoRebroadcast({
          data: { broadcast_id: this.btn_broadcast._id },
        });
        this.btn_broadcast.meta.has_retweeted = false;
        return (this.btn_broadcast.retweets = res.data.data);
      } catch (error) {}
    },
    showModal(modal) {
      if (this.type === true) {
        return this.$root.$emit("showModal", {
          tweet: this.btn_broadcast,
          type: "origin",
          modal,
        });
      }
      return this.$root.$emit("showModal", {
        tweet: this.btn_broadcast,
        type: "",
        modal,
      });
    },
  },
};
</script>

<style scoped>
.broadcast-func-div {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-left: 58px;
  justify-content: center;
  margin-top: -0.5rem;
  margin-bottom: -1rem;
}

button {
  /* width: 65px;
  height: 65px; */
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease-in-out 300ms;
  outline: none;
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

.share-btn:active .icon {
  background: var(--border-color);
}

button .icon {
  /* border: 1px solid black; */
  font-size: 0.9rem;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease-in-out 100ms;
}

button .btn-text {
  margin-left: -0.5rem;
}

.tweet-liked {
  color: var(--red-color);
}

.tweet-retweet {
  color: var(--brand-color);
}

.icon {
  margin-right: 0.25rem;
}
</style>
