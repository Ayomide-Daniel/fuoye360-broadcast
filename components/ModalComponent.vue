<template>
  <div>
    <v-scale-transition origin="center">
      <div
        v-if="showCreateBroadcast"
        id="tweet-box"
        class="vs-wrapper"
        @click="closeBroadcastModal($event, 'broadcast')"
      >
        <div class="vs-container">
          <div class="vs-content">
            <form enctype="multipart/form-data" @submit.prevent="newBroadcast($event)">
              <div class="input-div">
                <textarea
                  id="new-broadcast"
                  v-model="form.body"
                  name="body"
                  cols="30"
                  rows="10"
                  placeholder="What's happening?"
                  maxlength="250"
                  required
                ></textarea>
              </div>
              <div class="broadcast-func-div">
                <input
                  id="broadcast-image-input"
                  style="display: none"
                  type="file"
                  name="images[]"
                  accept=".jpeg, .jpg, .png"
                  multiple
                  @change="previewImage($event)"
                />
                <button v-ripple type="button" style="padding: 1rem margin-left:-1rem">
                  <i class="bi bi-image" @click="triggerClick"></i>
                </button>
              </div>
              <div id="preview-div" class="image-preview"></div>
              <div class="input-div tweet-btn-div">
                <button
                  v-ripple
                  type="button"
                  class="closeTweetBox"
                  @click="showCreateBroadcast = false"
                >
                  Cancel
                </button>
                <button
                  v-ripple
                  type="submit"
                  class="tweet-btn"
                  style="min-width: 121.05px"
                  :disabled="form.body.length <= 0"
                  :style="form.body.length <= 0 ? 'opacity:.75;' : ''"
                >
                  <span v-if="loading"
                    ><v-progress-circular
                      indeterminate
                      color="white"
                      width="3"
                      size="20"
                    ></v-progress-circular
                  ></span>
                  <span v-else><i class="bi bi-megaphone icon"></i> Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        v-if="showComment"
        id="#comment-box"
        class="vs-wrapper"
        data-name="Comment"
        @click="closeBroadcastModal($event, 'comment')"
      >
        <div class="vs-container container-normal">
          <div class="vs-content">
            <div class="tweet-div">
              <div class="tweet-content-div">
                <BroadcastBodyComponent
                  :broadcast="tweet"
                  class="broadcat-body-component"
                />
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
              <button type="button" @click="showComment = false">Close</button>
              <button
                id="post-comment"
                type="submit"
                style="background: limegreen; color: #fff"
                :disabled="!comment.submit"
                :style="!comment.submit ? 'opacity:.75;' : ''"
                @click.prevent="newComment"
              >
                <span v-if="loading"
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
      </div>

      <div
        v-if="showImage"
        id="view-image"
        class="vs-wrapper"
        @click="closeImage($event)"
      >
        <div class="vs-container container-center">
          <div class="vs-content">
            <img loading="lazy" :src="imageSrc" alt="" class="" />
          </div>
        </div>
      </div>
    </v-scale-transition>
  </div>
</template>

<script>
import $ from "jquery";
import Broadcast from "~/assets/js/api/Broadcast";
export default {
  name: "ModalComponent",
  data() {
    return {
      showCreateBroadcast: false,
      showShare: false,
      showOption: false,
      showComment: false,
      showImage: false,
      comment: {
        submit: false,
        body: "",
        blogger_id: "",
        post_id: "",
        comment_id: "",
      },
      imageSrc: null,
      form: {
        // id: "",
        // broadcast: "",
        // page: "",
        // receiverid: "",
        // action: "",
        body: "",
        image: null,
      },
      tweet: {},
      loading: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.User.data;
    },
  },
  mounted() {
    this.$root.$on("viewImage", (src) => {
      this.imageSrc = src;
      this.showImage = true;
    });

    this.$root.$on("showModal", ({ tweet, type, modal }) => {
      if (modal === "broadcast") {
        return (this.showCreateBroadcast = true);
      }
      this.tweet = tweet;
      if (modal === "option") {
        return (this.showOption = true);
      }
      if (modal === "share") {
        return (this.showShare = true);
      }
      if (modal === "comment") {
        return (this.showComment = true);
      }
    });
  },
  methods: {
    closeImage(e) {
      if ($(e.target).closest("img").length === 0) {
        this.showImage = false;
      }
    },
    newBroadcast(e) {
      this.loading = true;
      //   const fd = new FormData(e.target);
      Broadcast.createBroadcast(this.form)
        .then((res) => {
          this.showCreateBroadcast = false;
          this.loading = false;
          this.$root.$emit("appendBroadcast", res.data.data.broadcast);
          this.form.body = "";
        })
        .catch((err) => {
          this.$root.$emit("alertNotification", { status: err.response.status });
        });
    },
    previewImage(e) {
      $(".image-preview").empty();
      const files = e.target.files;
      if (files) {
        if (files.length > 2) {
          alert("You can only upload a maximum of 2 images. Happy Broadcasting!");
          $("button[type=submit]").attr("disabled", "disabled");
        } else {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.addEventListener("load", function (e) {
              const pic = e.target;
              const image = document.createElement("img");
              $(image).attr("src", pic.result).addClass("preview");
              $(".image-preview").append(image, null);
              this.image = pic.result;
            });
            reader.readAsDataURL(file);
          }
        }
      }
    },
    closeBroadcastModal(e, modal) {
      if ($(e.target).closest(".vs-content").length === 0) {
        if (modal === "broadcast") {
          return (this.showCreateBroadcast = false);
        }
        if (modal === "option") {
          return (this.showOption = false);
        }
        if (modal === "share") {
          return (this.showShare = false);
        }
        if (modal === "comment") {
          this.comment.body = "";
          return (this.showComment = false);
        }
      }
    },
    closeTweetBox() {
      this.$root.$emit("closeBroadcast");
    },
    triggerClick() {
      $("#broadcast-image-input").click();
    },
  },
};
</script>

<style scoped>
.vs-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(129, 129, 129, 0.25);
  backdrop-filter: blur(5px);
  z-index: 3;
  overflow-y: scroll;
}

.vs-container {
  padding-bottom: 3rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 100px 0 25px;
}

.container-center {
  align-items: center;
}

.container-normal {
  align-items: center;
  padding: 0;
}
.vs-content {
  box-sizing: border-box;
  padding: 0.5rem;
  width: 95%;
  max-width: 500px;
  margin: 0 1rem;
  background: var(--white-color);
  position: relative;
  padding: 1rem;
  border: 1px solid var(--border-color);
  box-shadow: 0 1px 3px rgb(0 0 0 / 4%);
  box-sizing: border-box;
  border-radius: 1rem;
}

#tweet-box .tweet-btn-div {
  display: flex;
  justify-content: flex-end;
}
.tweet-btn-div button {
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font: inherit;
  margin: 0.5rem 0.25rem 0.5rem 0;
  border: 1px solid var(--brand-color);
  background: var(--white-color);
  color: var(--brand-color);
  box-shadow: 0 1px 3px rgb(0 0 0 / 4%);
}
.tweet-btn-div .tweet-btn {
  background: var(--brand-color);
  color: var(--white-color);
}
#tweet-box form {
  background: none;
  padding-top: 1rem;
}
#tweet-box form .input-div {
  width: 100%;
}
#tweet-box textarea {
  width: inherit;
  border: none;
  resize: none;
  font: inherit;
  outline: none;
  padding: 0 0.5rem;
}

.image-preview .preview {
  object-fit: cover;
  display: grid;
}
.image-preview img {
  width: 100%;
  height: auto;
  margin: 0.5rem;
}

#tweet-box form {
  background: none;
}
#tweet-box form .input-div {
  width: 100%;
}
#tweet-box textarea {
  width: inherit;
  border: none;
  resize: none;
  font: inherit;
  outline: none;
}
#tweet-box .tweet-btn-div {
  display: flex;
  justify-content: flex-end;
}
#comment-box textarea {
  max-width: inherit;
  outline: none;
  border: none;
  resize: none;
  background: none;
  width: 100%;
  font: inherit;
}
#comment-box button {
  border: 2px solid rgb(147, 197, 147);
  padding: 0.5rem;
  border-radius: 1rem;
  background: none;
  color: limegreen;
  font-weight: bold;
  text-transform: uppercase;
}
.broadcat-body-component {
  transform: scale(0.95);
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
}
.blog-modal .share-scroll-down {
  content: "";
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 5px;
  display: block;
  width: 15%;
  height: 8px;
  background: var(--bg-color);
  border-radius: 0.5rem;
  -webkit-border-radius: 0.5rem;
  -moz-border-radius: 0.5rem;
  -ms-border-radius: 0.5rem;
  -o-border-radius: 0.5rem;
}
.blog-modal h3 {
  margin: 1rem 0;
  text-align: center;
}
.blog-modal form {
  padding: 1rem;
}
.blog-modal .input-div {
  width: 100%;
}
.blog-modal button {
  padding: 0.8rem 0.5rem;
  font: inherit;
  width: inherit;
  text-align: left;
  background: none;
  border: none;
}

.tweeter-img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  background-color: var(--bg-color);
}

.tweet-txt-div textarea {
  width: 100%;
  outline: none;
  resize: none;
}
.comment-btn-div {
  display: flex;
  column-gap: 0.5rem;
  justify-content: flex-end;
  padding: 0.5rem;
}
.comment-btn-div button {
  min-width: 180px;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--brand-color);
  color: var(--brand-color);
  text-transform: uppercase;
}
</style>
