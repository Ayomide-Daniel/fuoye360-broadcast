<template>
  <v-scroll-y-reverse-transition>
    <div
      v-if="showShare"
      class="vs-wrapper broadcast-modal"
      data-name="Share"
      @click="closeBroadcastModal($event, 'share')"
    >
      <div class="vs-container">
        <a href="#l-div" class="share-scroll-down"></a>
        <h4>What would you like to do?</h4>
        <form action="" method="post" style="border-radius: 1rem 1rem 0 0">
          <div class="input-div">
            <button
              v-if="!tweet.meta.has_bookmarked"
              v-ripple
              type="button"
              class="add-to-bookmark"
              @click="addToBookmarks(tweet._id)"
            >
              <i class="bi bi-bookmark icon"></i> Add to Bookmark
            </button>
            <button
              v-else
              v-ripple
              type="button"
              class="remove-from-bookmark"
              @click="removeFromBookmarks(tweet._id)"
            >
              <i class="bi bi-bookmark-x icon"></i> Remove from Bookmark
            </button>
          </div>
          <div class="input-div">
            <button v-ripple type="button" class="share-broadcast">
              <i class="bi bi-share icon"></i> Share Broadcast
            </button>
          </div>
          <div class="input-div">
            <button v-ripple type="button" class="share-copy-link">
              <i class="bi bi-link-45deg icon"></i> Copy link
            </button>
          </div>
          <div id="l-div"></div>
        </form>
      </div>
    </div>
  </v-scroll-y-reverse-transition>
</template>

<script>
import $ from "jquery";
import Analytics from "~/assets/js/api/Analytics";
export default {
  name: "ShareModalComponent",
  data() {
    return {
      tweet: null,
      showShare: false,
    };
  },
  mounted() {
    this.$root.$on("showModal", ({ tweet, type, modal }) => {
      this.tweet = tweet;
      if (modal === "share") {
        return (this.showShare = true);
      }
    });
  },
  methods: {
    setImageCarousel(src, index) {
      this.imageSrc = src;
      //   this.$refs.carousel.goTo(index);
      this.showImage = true;
    },
    closeBroadcastModal(e, modal) {
      if ($(e.target).closest(".vs-container").length === 0) {
        return (this.showShare = false);
      }
    },
    async removeFromBookmarks() {
      try {
        const res = await Analytics.removeFromBookmarks({
          data: { broadcast_id: this.tweet._id },
        });

        this.tweet.meta.has_bookmarked = false;
        this.$root.$emit("removedFromBookmark", this.tweet._id);
        this.$root.$emit("alertNotification", {
          message: "Removed From Bookmarks",
          res,
        });
      } catch (error) {
        console.log(error);
        // this.$root.$emit("alertNotification", { status: err.response.status });
      }
    },
    async addToBookmarks() {
      try {
        const res = await Analytics.addToBookmarks({ broadcast_id: this.tweet._id });
        this.tweet.meta.has_bookmarked = true;
        this.$root.$emit("addedFromBookmark", this.tweet._id);
        this.$root.$emit("alertNotification", {
          message: "Added To Bookmarks",
          res,
        });
      } catch (error) {
        console.log(error);
        // this.$root.$emit("alertNotification", { status: err.response.status });
      }
    },
  },
};
</script>

<style scoped>
.vs-wrapper {
  align-items: flex-end !important;
  padding: 0;
}
.vs-container {
  max-width: 500px;
  height: auto;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
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
  background: var(--input-color);
  padding: 1rem;
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
</style>
