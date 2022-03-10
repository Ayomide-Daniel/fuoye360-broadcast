<template>
  <div id="broadcast-component">
    <div v-if="broadcastsLoading">
      <div class="skeleton-loader">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
        <v-skeleton-loader
          min-width="120"
          type="heading, heading, heading"
          class="heading-loading"
        ></v-skeleton-loader>
      </div>
      <div class="skeleton-loader">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
        <v-skeleton-loader
          min-width="120"
          type="heading, heading, heading"
          class="heading-loading"
        ></v-skeleton-loader>
      </div>
      <div class="skeleton-loader">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
        <v-skeleton-loader
          min-width="120"
          type="heading, heading, heading"
          class="heading-loading"
        ></v-skeleton-loader>
      </div>
      <div class="skeleton-loader">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
        <v-skeleton-loader
          min-width="120"
          type="heading, heading, heading"
          class="heading-loading"
        ></v-skeleton-loader>
      </div>
      <div class="skeleton-loader">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
        <v-skeleton-loader
          min-width="120"
          type="heading, heading, heading"
          class="heading-loading"
        ></v-skeleton-loader>
      </div>
      <div class="skeleton-loader">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
        <v-skeleton-loader
          min-width="120"
          type="heading, heading, heading"
          class="heading-loading"
        ></v-skeleton-loader>
      </div>
    </div>
    <div v-else>
      <div v-if="broadcasts.length > 0">
        <div v-for="broadcast in broadcasts" :key="broadcast.id">
          <div v-if="broadcast.is_comment && !broadcast.is_thread">
            <BroadcastComponent :broadcast="broadcast.original_post" :origin="true" />
          </div>
          <BroadcastComponent :broadcast="broadcast" :origin="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import Broadcast from "~/assets/js/api/Broadcast";
export default {
  name: "BroadcastGridComponent",
  data() {
    return {
      broadcastsLoading: true,
      broadcasts: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.User.data;
    },
  },
  watch: {
    broadcasts() {
      if (this.broadcasts.length > 0) {
        return (this.broadcastsLoading = false);
      }
    },
  },
  mounted() {
    this.$root.$on("statusPageSetup", (broadcast) => {
      return this.pushBroadcasts(broadcast);
    });
    if (this.$route.name === "index") {
      this.setupIndexPage();
    }
    if (this.$route.name === "trending") {
      this.setupTrendingPage();
    }
    if (this.$route.name === "bookmarks") {
      this.setupBookmarkPage();
    }
    this.$root.$on("userProfileRetreived", (user) => {
      this.broadcasts = user.broadcasts;
    });

    this.$root.$on("newBroadcast", ({ broadcast, origin_broadcast }) => {
      if (origin_broadcast === null) {
        broadcast.user = this.user;
        this.broadcasts.unshift(broadcast);
      }
    });

    this.$root.$on("broacastDeleted", (broadcast_id) => {
      this.broadcasts = this.broadcasts.filter((broadcast) => {
        return broadcast._id !== broadcast_id;
      });
    });
  },
  methods: {
    pushBroadcasts(broadcast) {
      this.broadcasts = [...broadcast.comments];
      return (this.broadcastsLoading = false);
    },
    async setupTrendingPage() {
      try {
        const res = await Broadcast.trending();
        this.broadcasts = res.data.data;
        if (this.broadcasts.length > 0) {
          return (this.broadcastsLoading = false);
        }
        return false;
      } catch (error) {
        console.log(error);
      }
    },

    async setupBookmarkPage() {
      try {
        const res = await Broadcast.bookmarks();
        this.broadcasts = res.data.data;
        if (this.broadcasts.length > 0) {
          return (this.broadcastsLoading = false);
        }
        return false;
      } catch (error) {
        console.log(error);
      }
    },
    async setupIndexPage() {
      const res = await Broadcast.getBroadcasts();
      this.broadcasts = res.data.data;
      if (this.broadcasts.length > 0) {
        return (this.broadcastsLoading = false);
      }
      return false;
    },
  },
};
</script>

<style scoped></style>
