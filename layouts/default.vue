<template>
  <v-app dark>
    <v-main>
      <div
        class="main-wrapper"
        :class="
          !['create-account', 'login'].includes($route.name)
            ? 'not-auth-screen'
            : 'auth-screen'
        "
      >
        <NavbarComponent v-if="!['create-account', 'login'].includes($route.name)" />
        <Nuxt />
        <SearchComponent v-if="!['create-account', 'login'].includes($route.name)" />
        <ModalComponent v-if="!['create-account', 'login'].includes($route.name)" />
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
