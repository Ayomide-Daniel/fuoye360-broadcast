<template>
  <div class="broadcast-func-div">
    <button v-ripple @click="showModal('comment')">
      <i class="bi bi-chat icon"></i>
      <span class="comment-count">{{ btn_broadcast.comments.length }}</span>
    </button>
    <button
      v-if="btn_broadcast.meta.has_retweeted"
      v-ripple
      class="tweet-retweet"
      @click="undoRebroadcast()"
    >
      <i class="bi bi-megaphone-fill icon"></i>
      <span class="retweets-count">
        {{ btn_broadcast.retweets.length }}
      </span>
    </button>
    <button v-else v-ripple @click="rebroadcast()">
      <i class="bi bi-megaphone icon"></i>
      <span class="retweets-count">
        {{ btn_broadcast.retweets.length }}
      </span>
    </button>
    <button
      v-if="btn_broadcast.meta.has_liked"
      v-ripple
      class="tweet-liked"
      @click="unlikeBroadcast()"
    >
      <i class="bi bi-heart-fill icon"></i>
      <span class="likes-count">
        {{ btn_broadcast.likes.length }}
      </span>
    </button>
    <button v-else v-ripple @click="likeBroadcast()">
      <i class="bi bi-heart icon"></i>
      <span class="likes-count">
        {{ btn_broadcast.likes.length }}
      </span>
    </button>
    <button v-ripple @click="showModal('share')">
      <i class="bi bi-share"></i>
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
  width: 65px;
  height: 65px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease-in-out 300ms;
  outline: none;
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
