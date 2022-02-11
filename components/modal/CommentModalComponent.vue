<template>
  <v-scroll-y-reverse-transition>
    <div
      v-if="showComment"
      id="#comment-box"
      class="vs-wrapper"
      data-name="Comment"
      @click="closeBroadcastModal($event)"
    >
      <div class="vs-container">
        <div class="tweet-div">
          <div class="tweet-content-div">
            <BroadcastBodyComponent :broadcast="tweet" class="broadcat-body-component" />
          </div>
        </div>
        <form id="comment-form" @submit.prevent="newComment">
          <div class="tweet-div" style="margin-top: 0.5rem">
            <div class="tweet-content-div">
              <div>
                <img
                  :src="require('@/assets/images/brown.jpg')"
                  :alt="user.name"
                  class="tweeter-img"
                />
              </div>

              <div class="tweet-txt-div">
                <textarea
                  v-model="comment.body"
                  rows="10"
                  placeholder="What's on your mind?"
                ></textarea>
              </div>
            </div>
          </div>
        </form>
        <div class="comment-btn-div">
          <button v-ripple type="button" @click="showComment = false">Close</button>
          <button
            id="post-comment"
            v-ripple
            type="submit"
            style="background: limegreen; color: #fff"
            :disabled="!comment.submit"
            :style="!comment.submit ? 'opacity:.75;' : ''"
            @click.prevent="newComment"
          >
            <span v-if="btnLoading"
              ><v-progress-circular
                indeterminate
                color="white"
                width="3"
                size="20"
              ></v-progress-circular
            ></span>
            <span v-else> Reply</span>
          </button>
        </div>
      </div>
    </div>
  </v-scroll-y-reverse-transition>
</template>

<script>
import $ from "jquery";
// import Broadcast from "~/assets/js/api/Broadcast";
export default {
  name: "CommentModalComponent",
  data() {
    return {
      showComment: false,
      tweet: null,
      comment: {
        submit: false,
        body: "",
        blogger_id: "",
        post_id: null,
        comment_id: null,
      },
      btnLoading: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.User.data;
    },
  },
  mounted() {
    this.$root.$on("showModal", ({ tweet, type, modal }) => {
      this.tweet = tweet;
      if (modal === "comment") {
        return (this.showComment = true);
      }
    });
  },
  methods: {
    closeBroadcastModal(e) {
      if ($(e.target).closest(".vs-container").length === 0) {
        this.comment.body = "";
        return (this.showComment = false);
      }
    },
  },
};
</script>

<style scoped>
.broadcat-body-component {
  transform: scale(0.95);
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
}
.tweeter-img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--bg-color);
}

.tweet-txt-div textarea {
  outline: none;
  border: none;
  resize: none;
  background: none;
  width: 100%;
}

.comment-btn-div {
  display: flex;
  column-gap: 0.5rem;
  justify-content: flex-end;
  padding: 0.5rem;
}
.comment-btn-div button {
  max-width: 180px;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--brand-color);
  color: var(--brand-color);
  text-transform: uppercase;
}
</style>
