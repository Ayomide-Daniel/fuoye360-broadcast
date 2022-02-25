<template>
  <div>
    <section>
      <div class="lhs-section"></div>
      <div class="form-div">
        <form class="highlight-container">
          <div class="input-div btn-div">
            <div class="img-div">
              <img :src="require('~/assets/images/google.png')" alt="" />
            </div>
            <button @click.prevent="promptGoogleSignin">Sign in with Google</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import User from "~/assets/js/api/User";
export default {
  name: "LoginPage",
  middleware: "guest",
  //   head: {
  //     script: [
  //       {
  //         src: "https://accounts.google.com/gsi/client",
  //         async: true,
  //         defer: true,
  //       },
  //     ],
  //   },
  methods: {
    async setToken(response) {
      const res = await User.googleOauth(response);
      sessionStorage.setItem("fuoye360-jwt", res.data.data.token);
      this.$router.push({
        name: "index",
      });
    },
    async promptGoogleSignin() {
      //   const authCode = await this.$gAuth.getAuthCode();
      const googleUser = await this.$gAuth.signIn();
      // eslint-disable-next-line camelcase
      const { id_token } = googleUser.getAuthResponse();

      try {
        // eslint-disable-next-line camelcase
        const res = await User.googleOauth({ credential: id_token });
        this.$store.commit("User/setUserData", res.data.data.user);
        sessionStorage.setItem("fuoye360-jwt", res.data.data.token);
        sessionStorage.setItem("fuoye360-auth-status", true);
        // return (window.location = "/");
        return this.$router.push({
          name: "index",
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
section {
  min-height: 100vh;
  display: grid;
  background-image: url("../assets/images/tactile_noise.png");
  background-position: center;
  background-size: 5%;
  background-repeat: repeat;
  grid-template-columns: repeat(2, 1fr);
}

.lhs-section {
}
.form-div {
  padding: 1rem;
  /* background: var(--white-color); */
  border: 1px solid var(--border-color);
  box-shadow: 0 1px 3px rgb(0 0 0 / 4%);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-div {
  display: flex;
  column-gap: 1rem;
  border: 1px solid var(--brand-color);
  border-right: 0;
  border-radius: 0.5rem 0 0 0.5rem;
}
.btn-div .img-div {
  padding: 0 0.5rem;
  height: 50px;
  width: 50px;
  box-sizing: border-box;
}
.img-div img {
  width: inherit;
  height: inherit;
}
.form-div button {
  padding: 1rem;
  background: var(--brand-color);
  border-radius: 0 0.5rem 0.5rem 0;
  color: var(--white-color);
  font-weight: 500;
}
</style>
