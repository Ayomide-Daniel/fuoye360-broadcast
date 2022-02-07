<template>
  <v-app dark>
    <v-main>
      <div class="main-wrapper">
        <NavbarComponent />
        <Nuxt />
        <SearchComponent />
        <ModalComponent />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {};
  },
};
</script>

<style scoped></style>
