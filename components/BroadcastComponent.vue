<template>
  <div class="tweet-div" :style="origin ? 'border:none;padding:0' : ''">
    <v-container>
      <div
        class="tweet-content-div"
        :class="origin ? 'for-thread' : ''"
        :style="origin ? 'transform: scale(.85)' : ''"
        @click="viewStatus($event)"
      >
        <div v-if="origin" class="thread-border">
          <span class="border-content"></span>
        </div>
        <BroadcastBodyComponent :broadcast="d_broadcast" />
      </div>
    </v-container>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "BroadcastComponent",
  // eslint-disable-next-line vue/require-prop-types
  props: ["broadcast", "origin"],
  data() {
    return {
      createdThreadStatus: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.User.data;
    },
    d_broadcast() {
      return this.broadcast;
    },
  },
  mounted() {
    this.$root.$on("addedFromBookmark", (id) => {
      if (id === this.d_broadcast.id) {
        this.d_broadcast.meta.is_bookmarked = true;
      }
    });
    this.$root.$on("removedFromBookmark", (id) => {
      if (id === this.d_broadcast.id) {
        this.d_broadcast.meta.is_bookmarked = false;
      }
    });

    this.$root.$on("createdThread", () => {
      this.createdThreadStatus = true;
    });

    this.$root.$on("updateComment", (tweet) => {
      if (this.origin) {
        if (this.d_broadcast.type === "comment") {
          if (this.d_broadcast.id === tweet.post_id) {
            return (this.d_broadcast.meta.comments.count += 1);
          }
        }
      }
      if (this.d_broadcast.id === tweet.post_id) {
        this.d_broadcast.meta.comments.count += 1;
        if (this.createdThreadStatus) {
          this.d_broadcast.is_thread = true;
        }
      }
      if (this.d_broadcast.type === "comment") {
        if (this.d_broadcast.id === this.tweet.post_id) {
          this.d_broadcast.meta.comments.count += 1;
        }
      }
    });
  },
  methods: {
    showModal(data, type, modal) {
      this.$root.$emit("showModal", { tweet: data, type, modal });
    },
    viewStatus(e) {
      if (
        // $(e.target).closest(".tweet-btn-component").length === 0 &&
        $(e.target).closest(".tweet-content-div a").length === 0 &&
        $(e.target).closest(".tweet-content-div .broadcast-media").length === 0 &&
        $(e.target).closest(".tweet-content-div button").length === 0
      ) {
        this.$router.push({
          name: "status-id",
          params: { id: this.d_broadcast._id },
        });
      }
    },
  },
};
</script>

<style scoped>
.for-thread {
  position: relative;
}
.thread-border {
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  width: 2px;
  left: 26px;
}

.thread-border .border-content {
  width: inherit;
  height: 95%;
  background: #eee;
  z-index: -1;
}

.tweet-div {
  border-bottom: 1px solid #eee;
  transition: all ease-in-out 100ms;
}
.tweet-div:hover {
  cursor: pointer;
  /* background: var(--green-bg); */
}
.thread-icon-div {
  display: flex;
  justify-content: flex-end;
  padding-top: 0.75rem;
}

.thread-icon {
  background: var(--input-color);
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
}
</style>
