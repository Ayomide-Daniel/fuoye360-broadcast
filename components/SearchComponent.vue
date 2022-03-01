<template>
  <v-scroll-y-reverse-transition>
    <div v-if="showSearch" id="search-component">
      <v-container class="main-container">
        <div class="search-container">
          <div class="form-container">
            <form action="" class="">
              <div class="input-div">
                <i class="bi bi-search"></i>
                <input id="" type="text" name="" class="search-input" />
              </div>
            </form>
          </div>
          <!-- <div class="magic-container"> -->
          <div class="trending-container green-bg">
            <v-container class="container">
              <div class="meta-div">
                <h3>
                  <i class="bi bi-hash icon" style="font-size: 1.3rem"></i>Treding On
                  Campus
                </h3>
              </div>
              <div class="content-div">
                <div class="topic">
                  <p>Lorem, ipsum dolor sitjansd jknasjk dnjkasnd !</p>
                </div>
                <div class="topic">
                  <p>Lorem, ipsum dolor sitjansd jknasjk dnjkasnd !</p>
                </div>
                <div class="topic">
                  <p>Lorem, ipsum dolor sitjansd jknasjk dnjkasnd !</p>
                </div>
                <div class="topic">
                  <p>Lorem, ipsum dolor sitjansd jknasjk dnjkasnd !</p>
                </div>
              </div>
            </v-container>
          </div>
          <div class="suggestion-container" style="background: var(--input-color)">
            <v-container class="container">
              <div class="meta-div">
                <h3>
                  <i class="bi bi-at icon" style="font-size: 1.5rem"></i> Who to follow
                </h3>
              </div>
              <div class="content-div">
                <div class="topic">
                  <p>Lorem, ipsum dolor sitjansd jknasjk dnjkasnd !</p>
                </div>
                <div class="topic">
                  <p>Lorem, ipsum dolor sitjansd jknasjk dnjkasnd !</p>
                </div>
              </div>
            </v-container>
          </div>
          <!-- </div> -->
        </div>
      </v-container>
    </div>
  </v-scroll-y-reverse-transition>
</template>

<script>
export default {
  name: "SearchComponent",
  data() {
    return {
      // showSearch: true,
    };
  },
  computed: {
    showSearch() {
      const check = window.matchMedia("only screen and (max-width: 768px)").matches;
      // if (check) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // this.showSearch = false;
      // }
      return !check;
    },
  },
};
</script>

<style scoped>
#search-component {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  border-left: 1px solid var(--border-color);
}

@media screen and (min-width: 768px) {
  #search-component {
    position: relative !important;
  }
  .form-container {
    position: sticky !important;
    top: 0 !important;
  }
}

.main-container {
  display: flex;
  z-index: 1;
  padding: 0.5rem 2rem;
  background: var(--white-color);
}

.search-container {
  width: 100%;
  display: grid;
  grid-gap: 1rem;
}

.form-container {
  padding: 0.5rem;
  background: #fff;
}
.input-div {
  background: var(--input-color);
  border-radius: 2rem;
  padding: 0.7rem 1rem;
}
.search-input {
  padding: 0;
  margin-left: 1rem;
  border-radius: 0 !important;
}
/* .-container {
  display: grid;
  align-items: center;
} */

/* .magic-container {
  position: sticky;
  bottom: 0;
  height: 100vh;
  overflow-y: hidden;
} */

.trending-container,
.suggestion-container {
  margin-bottom: 1rem;
  min-height: 200px;
  width: 100%;
  border-radius: 1.5rem;
}

.suggestion-container {
  background: url("../assets/images/45degreee_fabric.png");
  background-repeat: repeat;
  background-size: 25%;
  background-position: center;
}
.meta-div {
  margin: 0.5rem 1rem;
}

.topic {
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
}

.topic:hover {
  background: var(--green-dark-bg);
}

/* .suggestion-container {
  position: sticky;
  bottom: 0;
} */
</style>
