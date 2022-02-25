<template>
  <v-scroll-y-reverse-transition>
    <div
      v-if="showOption"
      class="vs-wrapper broadcast-modal"
      data-name="Option"
      @click="closeBroadcastModal($event)"
    >
      <div class="vs-container">
        <a href="#l-div" class="share-scroll-down"></a>
        <h4>What would you like to do?</h4>
        <form action="" method="post" style="border-radius: 1rem 1rem 0 0">
          <div v-if="tweet.user._id === user._id">
            <button
              type="button"
              class="delete-broadcast"
              @click="deleteBroadcast(tweet._id)"
            >
              <i class="bi bi-trash icon"></i> Delete broadcast
            </button>
          </div>
          <div v-if="tweet.user._id !== user._id">
            <div class="input-div">
              <button
                v-if="tweet.meta.is_following === true"
                type="button"
                class="report-broadcast"
                @click="unfollowUser"
              >
                <i class="bi bi-person-x icon"></i> Unfollow
                <b>{{ tweet.user.full_name }}</b>
              </button>
              <button v-else type="button" class="report-broadcast" @click="followUser">
                <i class="bi bi-person-check icon"></i> Follow
                <b>{{ tweet.user.full_name }}</b>
              </button>
            </div>
            <div class="input-div">
              <button
                type="button"
                class="report-broadcast"
                @click="reportBroadcast(tweet._id)"
              >
                <i class="bi bi-flag icon"></i> Report Broadcast
              </button>
            </div>
          </div>
          <div id="l-div"></div>
        </form>
      </div>
    </div>
  </v-scroll-y-reverse-transition>
</template>

<script>
import $ from "jquery";
import Broadcast from "~/assets/js/api/Broadcast";
import Analytics from "~/assets/js/api/Analytics";
export default {
  name: "OptionModalComponent",
  data() {
    return {
      tweet: null,
      showOption: false,
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
      if (modal === "option") {
        return (this.showOption = true);
      }
    });
  },
  methods: {
    closeBroadcastModal(e) {
      if ($(e.target).closest(".vs-container").length === 0) {
        return (this.showOption = false);
      }
    },
    async deleteBroadcast() {
      try {
        const res = await Broadcast.deleteBroadcast({ broadcast_id: this.tweet._id });
        this.$root.$emit("broacastDeleted", this.tweet._id);
        console.log(res);
      } catch (error) {}
    },

    async followUser() {
      try {
        const res = await Analytics.followUser({ user_id: this.tweet.user._id });
        this.tweet.meta.is_following = true;
        this.$store.commit("User/updateUserFollowing", res.data.data.sender);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async unfollowUser() {
      try {
        const res = await Analytics.unfollowUser({
          data: { user_id: this.tweet.user._id },
        });
        this.tweet.meta.is_following = false;
        this.$store.commit("User/updateUserFollowing", res.data.data.sender);
        console.log(res);
      } catch (error) {
        console.log(error);
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
