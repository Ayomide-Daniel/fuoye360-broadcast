<template>
  <div id="broadcast-component">
    <div v-if="loading">
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
export default {
  name: "BroadcastGridComponent",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    broadcasts() {
      return this.$store.state.Broadcast.data;
    },
  },
  watch: {
    broadcasts() {
      if (this.broadcasts.length > 0) {
        return (this.loading = false);
      }
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
