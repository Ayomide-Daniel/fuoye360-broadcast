<template>
  <div class="alert-div">
    <v-alert
      v-for="({ status, message }, index) in alerts"
      :key="index"
      transition="scale-transition"
      :type="!status ? 'danger' : 'success'"
      border="left"
      dismissible
      elevation="5"
    >
      <span class="alert-text">{{ message }}</span>
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "AlertComponent",
  data() {
    return {
      alerts: [],
    };
  },
  mounted() {
    this.$root.$on("alert", (alert) => {
      return this.alerts.unshift(alert);
    });
  },
};
</script>

<style scoped>
.alert-div {
  position: fixed;
  z-index: 4;
  bottom: 0;
  right: 1rem;
  background: none;
  width: 90%;
  max-width: 380px;
}
.alert-text {
  font: inherit;
  font-family: "Montserrat", sans-serif;
  word-break: break-word;
}
</style>
