<template>
  <section>
    <div class="highlight-container form-div">
      <form>
        <div class="btn-div">
          <button
            :style="btnLoading ? 'opacity: 0.75' : ''"
            @click.prevent="promptGoogleSignin"
          >
            <div class="img-div">
              <img :src="require('~/assets/images/google.png')" alt="" />
            </div>
            <span v-if="btnLoading"
              ><v-progress-circular
                indeterminate
                color="white"
                width="3"
                size="20"
              ></v-progress-circular>
            </span>
            <span v-else> Sign in with Google </span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import User from "~/assets/js/api/User";
export default {
  name: "LoginPage",
  middleware: "guest",
  data() {
    return {
      btnLoading: false,
    };
  },
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
      this.btnLoading = true;
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
        return (window.location = "/");
        // return this.$router.push({
        //   name: "index",
        // });
      } catch (error) {
        console.log(error);
        this.$root.$emit("alert", error.response.data);
      }
    },
  },
};
</script>

<style scoped>
section {
  min-height: 100vh;
  background-image: url("../assets/images/tactile_noise.png");
  background-position: center;
  background-size: 5%;
  background-repeat: repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-div {
  max-width: 600px;
  /* background: var(--white-color);
  border: 1px solid var(--border-color); */
  box-shadow: 0 1px 3px rgb(0 0 0 / 4%);
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

form {
  width: 100%;
}

.btn-div {
  justify-content: center;
}
.form-div button {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  background: var(--brand-color);
  border-radius: 0.5rem;
  color: var(--white-color);
  font-weight: 500;
  min-width: 248px;
  max-width: none;
}
.img-div {
  padding: 0.5rem;
  display: flex;
  background: var(--white-color);
  border-radius: 0.5rem;
}
img {
  width: 25px;
  height: 25px;
}
button span {
  text-align: center;
  width: 100%;
}
@media screen and (min-width: 768px) {
  section {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
