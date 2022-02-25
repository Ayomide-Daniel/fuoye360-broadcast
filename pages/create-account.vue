<template>
  <section>
    <div class="lhs-section"></div>
    <div class="form-div">
      <form class="highlight-container">
        <div class="input-div btn-div">
          <div class="img-div">
            <img :src="require('~/assets/images/google.png')" alt="" />
          </div>
          <button>Sign up with Google</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script src="https://apis.google.com/js/api.js"></script>
<script></script>
<script>
export default {
  name: "CreateAccountPage",
  mounted() {
    // 1. Load the JavaScript client library.
    gapi.load("client", this.start());
  },
  methods: {
    start() {
      // 2. Initialize the JavaScript client library.
      gapi.client
        .init({
          apiKey: "YOUR_API_KEY",
          // clientId and scope are optional if auth is not required.
          clientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
          scope: "profile",
        })
        .then(function () {
          // 3. Initialize and make the API request.
          return gapi.client.request({
            path:
              "https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names",
          });
        })
        .then(
          function (response) {
            console.log(response.result);
          },
          function (reason) {
            console.log("Error: " + reason.result.error.message);
          }
        );
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
