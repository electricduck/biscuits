<template>
  <div id="app" class="app fill">
    <AppAuth v-if="loaded && !this.$store.state.auth.valid" />
    <AppMain v-if="loaded && this.$store.state.auth.valid" />
    <AppError :error="error" v-if="error" />
  </div>
</template>

<script>
import AppError from "@/components/AppError.vue";
import Vue from "vue";

export default {
  components: {
    AppAuth: () =>
      import(/* webpackPrefetch: true */ "@/components/AppAuth.vue"),
    AppError,
    AppMain: () =>
      import(/* webpackPrefetch: true */ "@/components/AppMain.vue")
  },
  data: function() {
    return {
      error: null,
      loaded: false
    };
  },
  methods: {
    auth() {
      this.$auth.init().then(() => {
        this.loaded = true;
      });
    },
    handleErrors() {
      Vue.config.errorHandler = err => {
        this.error = err;
      };

      window.addEventListener("unhandledrejection", event => {
        this.error = event.reason;
        event.preventDefault();
      });
    }
  },

  created() {
    this.handleErrors();
    this.auth();
  }
};
</script>

<style lang="scss">
@import "@/scss/app.scss";

.app {
  height: 100%;
}
</style>
