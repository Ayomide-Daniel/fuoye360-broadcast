<template>
  <v-scale-transition origin="center">
    <div
      v-if="showCreateBroadcast"
      id="tweet-box"
      class="vs-wrapper"
      @click="closeBroadcastModal($event, 'broadcast')"
    >
      <div class="vs-container">
        <form @submit.prevent="newBroadcast($event)">
          <input
            id="broadcast-image-input"
            style="display: none"
            type="file"
            name="broadcast-images"
            accept=".jpeg, .jpg, .png"
            multiple
            @change="previewImage($event)"
          />
          <div class="input-div">
            <textarea
              id="new-broadcast"
              v-model="form.body"
              name="body"
              cols="30"
              rows="10"
              placeholder="What's happening?"
              maxlength="250"
              required
            ></textarea>
          </div>
          <div class="broadcast-func-div">
            <button v-ripple type="button" style="padding: 1rem margin-left:-1rem">
              <i class="bi bi-image" @click="triggerClick"></i>
            </button>
          </div>
          <div
            id="broadcast-image-preview"
            class="image-preview-div image-preview-div"
          ></div>
          <div class="input-div tweet-btn-div">
            <button
              v-ripple
              type="button"
              class="closeTweetBox"
              @click="showCreateBroadcast = false"
            >
              Cancel
            </button>
            <button
              v-ripple
              type="submit"
              class="tweet-btn"
              style="min-width: 121.05px"
              :disabled="form.body.length <= 0"
              :style="form.body.length <= 0 ? 'opacity:.75;' : ''"
            >
              <span v-if="btnLoading"
                ><v-progress-circular
                  indeterminate
                  color="white"
                  width="3"
                  size="20"
                ></v-progress-circular
              ></span>
              <span v-else><i class="bi bi-megaphone icon"></i> Broadcast</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </v-scale-transition>
</template>

<script>
import $ from "jquery";
import Broadcast from "~/assets/js/api/Broadcast";
export default {
  name: "BroadcastModalComponent",
  data() {
    return {
      showCreateBroadcast: false,
      form: {
        body: "",
        media: {
          images: null,
        },
      },
      btnLoading: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.User.data;
    },
  },
  mounted() {
    this.$root.$on("showModal", ({ tweet, type, modal }) => {
      if (modal === "broadcast") {
        return (this.showCreateBroadcast = true);
      }
    });
  },
  methods: {
    async newBroadcast(e) {
      this.btnLoading = true;
      const fd = new FormData(e.target);
      try {
        const res = await Broadcast.createBroadcast(fd);
        this.btnLoading = false;
        this.$root.$emit("newBroadcast", res.data.data);
        this.form.body = "";
        this.showCreateBroadcast = false;
      } catch (error) {
        console.log(error);
        // this.$root.$emit("alertNotification", { status: err.response.status });
      }
    },
    previewImage(e) {
      $(".broadcast-image-preview").empty();
      const files = e.target.files;
      if (files) {
        if (files.length > 2) {
          alert("You can only upload a maximum of 2 images");
          $("button[type=submit]").attr("disabled", "disabled");
        } else {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.addEventListener("load", function (e) {
              const pic = e.target;
              const image = document.createElement("img");
              $(image).attr("src", pic.result).addClass("preview");
              $(".broadcast-image-preview").append(image, null);
              this.image = pic.result;
            });
            reader.readAsDataURL(file);
            // this.uploadBroadcastImage(file);
            // $("#broadcast-images-form").submit();
          }
        }
      }
    },
    closeBroadcastModal(e, modal) {
      if ($(e.target).closest(".vs-container").length === 0) {
        if (modal === "broadcast") {
          return (this.showCreateBroadcast = false);
        }
        if (modal === "option") {
          return (this.showOption = false);
        }
        if (modal === "share") {
          return (this.showShare = false);
        }
        if (modal === "comment") {
          this.comment.body = "";
          return (this.showComment = false);
        }
      }
    },
    closeTweetBox() {
      this.$root.$emit("closeBroadcast");
    },
    triggerClick() {
      $("#broadcast-image-input").click();
    },
  },
};
</script>

<style scoped>
.vs-wrapper {
  align-items: center;
}

#tweet-box .tweet-btn-div {
  display: flex;
  justify-content: flex-end;
}
.tweet-btn-div button {
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font: inherit;
  margin: 0.5rem 0.25rem 0.5rem 0;
  border: 1px solid var(--brand-color);
  background: var(--white-color);
  color: var(--brand-color);
  box-shadow: 0 1px 3px rgb(0 0 0 / 4%);
}
.tweet-btn-div .tweet-btn {
  background: var(--brand-color);
  color: var(--white-color);
}
#tweet-box form {
  background: none;
  padding-top: 1rem;
}
#tweet-box form .input-div {
  width: 100%;
}
#tweet-box textarea {
  width: inherit;
  border: none;
  resize: none;
  font: inherit;
  outline: none;
  padding: 0 0.5rem;
}
</style>
