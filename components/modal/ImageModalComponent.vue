<template>
  <v-scale-transition origin="center">
    <div v-if="showImage" id="view-image" class="vs-wrapper" @click="closeImage($event)">
      <div class="swiper-container">
        <VueSlickCarousel
          ref="carousel"
          class="swiper-wrapper"
          :arrows="true"
          :dots="true"
          :autoplay="false"
          :infinite="false"
        >
          <div v-for="(img, index) in imageSrc" :key="index">
            <img loading="lazy" :src="img" :alt="`${index}- broadcast image`" />
          </div>
        </VueSlickCarousel>
        <!-- Add Pagination -->
        <div class="swiper-pagination swiper-pagination-white"></div>
        <!-- Add Arrows -->
        <div class="swiper-div">
          <div class="swiper-button-next swiper-button-white"></div>
          <div class="swiper-button-prev swiper-button-white"></div>
        </div>
      </div>
    </div>
  </v-scale-transition>
</template>

<script>
import $ from "jquery";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style forarrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "ImageModalComponent",
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      showImage: false,
      imageSrc: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.User.data;
    },
  },
  mounted() {
    this.$root.$on("viewImage", (src, index) => {
      return this.setImageCarousel(src, index);
    });
  },
  methods: {
    setImageCarousel(src, index) {
      this.imageSrc = src;
      //   this.$refs.carousel.goTo(index);
      return (this.showImage = true);
    },
    closeImage(e) {
      if ($(e.target).closest(".swiper-container").length === 0) {
        this.showImage = false;
      }
    },
  },
};
</script>

<style scoped>
#view-image {
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-container {
  width: 100%;
  margin: 2% 0;
}

.swiper-container img {
  width: 95%;
  max-width: 768px;
  height: auto;
  margin: 0 auto;
}
</style>
