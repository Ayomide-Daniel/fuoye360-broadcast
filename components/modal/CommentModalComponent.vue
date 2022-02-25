<template>
  <v-scroll-y-reverse-transition>
    <div
      v-if="showComment"
      id="#comment-box"
      class="vs-wrapper"
      data-name="Comment"
      @click="closeBroadcastModal($event)"
    >
      <div class="vs-container" style="padding: 0">
        <div class="tweet-div">
          <div class="tweet-content-div">
            <BroadcastBodyComponent :broadcast="tweet" class="broadcat-body-component" />
          </div>
        </div>
        <form id="comment-form" @submit.prevent="newComment($event)">
          <input type="hidden" name="broadcast_id" :value="tweet._id" />
          <input
            id="comment-image-input"
            style="display: none"
            type="file"
            name="broadcast-images"
            accept=".jpeg, .jpg, .png"
            multiple
            @change="previewImage($event)"
          />
          <div class="tweet-div" style="margin-top: 0.5rem">
            <div class="tweet-content-div">
              <div>
                <img
                  :src="user.image"
                  :alt="`${user.full_name}'s profile picture`"
                  class="tweeter-img"
                  lazy="load"
                />
              </div>
              <div class="tweet-txt-div">
                <textarea
                  v-model="form.body"
                  name="body"
                  rows="10"
                  placeholder="What's on your mind?"
                  maxlength="250"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="comment-image-preview image-preview-div"></div>
          <div class="broadcast-func-div">
            <button v-ripple type="button" style="padding: 1rem margin-left:-1rem">
              <i class="bi bi-image" @click="triggerClick"></i>
            </button>
          </div>
          <div class="btn-div btn-div">
            <button
              v-ripple
              class="default-btn"
              type="button"
              @click="showComment = false"
            >
              Close
            </button>
            <button
              id="post-comment"
              v-ripple
              class="fill-btn"
              type="submit"
              :disabled="form.body.length <= 0"
              :style="form.body.length <= 0 ? 'opacity:.75;' : ''"
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
        </form>
      </div>
    </div>
  </v-scroll-y-reverse-transition>
</template>

<script>
import $ from "jquery";
import Broadcast from "~/assets/js/api/Broadcast";
export default {
  name: "CommentModalComponent",
  data() {
    return {
      showComment: false,
      tweet: null,
      form: {
        body: "",
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
    triggerClick() {
      $("#comment-image-input").click();
    },
    previewImage(e) {
      $(".comment-image-preview").empty();
      const files = e.target.files;
      if (files) {
        if (files.length > 2) {
          alert("You can only upload a maximum of 2 images");
          $("button[type=submit]").attr("disabled", "disabled");
        } else {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.addEventListener("load", function (e) {
              const pic = e.target;
              const image = document.createElement("img");
              $(image).attr("src", pic.result).addClass("preview");
              $(".comment-image-preview").append(image, null);
              this.image = pic.result;
            });
            reader.readAsDataURL(file);
          }
        }
      }
    },
    closeBroadcastModal(e) {
      if ($(e.target).closest(".vs-container").length === 0) {
        this.form.body = "";
        return (this.showComment = false);
      }
    },
    async newComment(e) {
      this.btnLoading = true;
      const fd = new FormData(e.target);
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await Broadcast.createBroadcast(fd);
        this.btnLoading = false;
        // const broadcast = res.data.data;
        // this.$root.$emit("newBroadcast", broadcast);
        this.form.body = "";
        this.showComment = false;
      } catch (error) {
        console.log(error);
        // this.$root.$emit("alertNotification", { status: err.response.status });
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
  margin-top: 1rem;
}
.tweeter-img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--bg-color);
}
#comment-form {
  padding: 1rem;
}
.tweet-txt-div textarea {
  outline: none;
  border: none;
  resize: none;
  background: none;
  width: 100%;
}
</style>
