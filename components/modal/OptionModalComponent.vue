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
                v-if="user.following.includes(tweet.user._id)"
                v-ripple
                type="button"
                @click="unfollowUser"
              >
                <i class="bi bi-person-x icon"></i> Unfollow
                <b>{{ tweet.user.full_name }}</b>
              </button>
              <button v-else v-ripple type="button" @click="followUser">
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
        this.$root.$emit("alert", res.data);
      } catch (error) {
        this.$root.$emit("alert", error.response.data);
        console.error(error);
      }
    },
    async unfollowUser() {
      try {
        const res = await Analytics.unfollowUser({
          data: { user_id: this.tweet.user._id },
        });
        this.tweet.meta.is_following = false;
        this.$store.commit("User/updateUserFollowing", res.data.data.sender);
        this.$root.$emit("alert", res.data);
      } catch (error) {
        this.$root.$emit("alert", error.response.data);
        console.error(error);
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
  padding: 0.75rem;
  padding-top: 1rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
