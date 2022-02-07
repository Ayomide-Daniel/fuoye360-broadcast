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
        v-if="showImage"
        id="view-image"
        class="vs-wrapper"
        @click="closeImage($event)"
      >
        <div class="swiper-container">
          <VueSlickCarousel
            ref="carousel"
            class="swiper-wrapper"
            :arrows="true"
            :dots="true"
            :autoplay="false"
            :infinite="false"
          >
            <div v-for="(img, index) in imageSrc" :key="index">
              <img
                loading="lazy"
                :src="require('../assets/images/' + img)"
                alt=""
                class=""
              />
            </div>
          </VueSlickCarousel>
          <!-- Add Pagination -->
          <div class="swiper-pagination swiper-pagination-white"></div>
          <!-- Add Arrows -->
          <div class="swiper-div">
            <div class="swiper-button-next swiper-button-white"></div>
            <div class="swiper-button-prev swiper-button-white"></div>
          </div>
        </div>
      </div>
    </v-scale-transition>

    <v-scroll-y-reverse-transition>
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
        v-if="showShare"
        class="vs-wrapper broadcast-modal"
        data-name="Share"
        @click="closeBroadcastModal($event, 'share')"
      >
        <div
          class="vs-container"
          style="
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            align-items: flex-end;
            justify-content: center;
          "
        >
          <div
            class="vs-content"
            style="border-radius: 1rem 1rem 0 0; position: relative"
          >
            <a href="#l-div" class="share-scroll-down"></a>
            <h4>What would you like to do?</h4>
            <form action="" method="post" style="border-radius: 1rem 1rem 0 0">
              <div class="input-div">
                <button
                  v-if="!tweet.bookmarked"
                  type="button"
                  class="add-to-bookmark"
                  @click="addToBookmarks(tweet.id)"
                >
                  <i class="bi bi-bookmark icon"></i> Add to Bookmark
                </button>
                <button
                  v-else
                  type="button"
                  class="remove-from-bookmark"
                  @click="removeFromBookmarks(tweet.id)"
                >
                  <i class="bi bi-bookamark-x icon"></i> Remove from Bookmark
                </button>
              </div>
              <div class="input-div">
                <button type="button" class="share-broadcast">
                  <i class="bi bi-share icon"></i> Share Broadcast
                </button>
              </div>
              <div class="input-div">
                <button type="button" class="share-copy-link">
                  <i class="bi bi-link-45deg icon"></i> Copy link
                </button>
              </div>
              <div id="l-div"></div>
            </form>
          </div>
        </div>
      </div>
    </v-scroll-y-reverse-transition>
  </div>
</template>

<script>
import $ from "jquery";
import VueSlickCarousel from "vue-slick-carousel";
import Broadcast from "~/assets/js/api/Broadcast";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style forarrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  name: "ModalComponent",
  components: {
    VueSlickCarousel,
  },
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
        post_id: null,
        comment_id: null,
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
    this.$root.$on("viewImage", (src, index) => {
      this.setImageCarousel(src, index);
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
    setImageCarousel(src, index) {
      this.imageSrc = src;
      //   this.$refs.carousel.goTo(index);
      this.showImage = true;
    },
    closeImage(e) {
      if ($(e.target).closest(".swiper-container").length === 0) {
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
#view-image {
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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

.image-content {
  background: none;
  max-width: none;
  border: none;
  border-radius: 0;
  display: flex;
  justify-content: center;
  width: 100%;
}
.image-content img {
  /* width: 0%; */
  width: 100%;
  max-width: 768px;
  height: auto;
  border-radius: 0;
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
.broadcat-body-component {
  transform: scale(0.95);
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
}
.broadcast-modal .share-scroll-down {
  content: "";
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 5px;
  display: block;
  width: 15%;
  height: 8px;
  background: var(--input-color);
  /* background: url("../assets/images/45degreee_fabric.png");
  background-repeat: repeat;
  background-size: 25%;
  background-position: center; */
  border-radius: 0.5rem;
  -webkit-border-radius: 0.5rem;
  -moz-border-radius: 0.5rem;
  -ms-border-radius: 0.5rem;
  -o-border-radius: 0.5rem;
}
.broadcast-modal h4 {
  margin: 1rem 0;
  text-align: center;
}
.broadcast-modal form {
  /* background: url("../assets/images/45degreee_fabric.png");
  background-repeat: repeat;
  background-size: 25%;
  background-position: center; */
  background: var(--input-color);
  padding: 1rem;
  font-size: 0.9rem;
}
.broadcast-modal .input-div {
  width: 100%;
}
.broadcast-modal button {
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

.swiper-container {
  width: 100%;
  margin: 2% 0;
}
.swiper-container img {
  width: 95%;
  max-width: 768px;
  height: auto;
  margin: 0 auto;
}
</style>
