<template>
  <div class="broadcast-func-div">
    <button v-ripple @click="showModal('comment')">
      <i class="bi bi-chat icon"></i>
      <span class="comment-count">{{ btn_broadcast.meta.comments.count }}</span>
    </button>
    <button
      v-if="btn_broadcast.meta.retweets.has_retweeted"
      v-ripple
      class="tweet-retweet"
      @click="undoRebroadcast()"
    >
      <i class="bi bi-megaphone-fill icon"></i>
      {{ btn_broadcast.meta.retweets.count }}
    </button>
    <button v-else v-ripple @click="rebroadcast()">
      <i class="bi bi-megaphone icon"></i>
      {{ btn_broadcast.meta.retweets.count }}
    </button>
    <button
      v-if="btn_broadcast.meta.likes.has_liked"
      v-ripple
      class="tweet-liked"
      @click="unlikeBroadcast()"
    >
      <i class="bi bi-heart-fill icon"></i> {{ btn_broadcast.meta.likes.count }}
    </button>
    <button v-else v-ripple @click="likeBroadcast()">
      <i class="bi bi-heart icon"></i> {{ btn_broadcast.meta.likes.count }}
    </button>
    <button v-ripple @click="showModal('share')">
      <i class="bi bi-share"></i>
    </button>
  </div>
</template>

<script>
import Broadcast from "~/assets/js/api/Broadcast";
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
    unlikeBroadcast() {
      Broadcast.unlikeBroadcast(this.btn_broadcast.id).then((res) => {
        this.btn_broadcast.meta.likes.has_liked = false;
        this.btn_broadcast.likes.count = res.data.data.likes;
        return true;
      });
    },
    likeBroadcast() {
      Broadcast.likeBroadcast(this.btn_broadcast.id).then((res) => {
        this.btn_broadcast.meta.likes.has_liked = true;
        this.btn_broadcast.likes.count = res.data.data.likes;
        return true;
      });
    },
    rebroadcast() {
      Broadcast.rebroadcast(this.btn_broadcast.id).then((res) => {
        this.btn_broadcast.meta.retweets.has_retweeted = true;
        this.btn_broadcast.rebroadcasts = res.data.data.rebroadcasts;
        return true;
      });
    },
    undoRebroadcast() {
      Broadcast.undoRebroadcast(this.btn_broadcast.id).then((res) => {
        this.btn_broadcast.meta.retweets.has_retweeted = false;
        this.btn_broadcast.rebroadcasts = res.data.data.rebroadcasts;
        return true;
      });
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
