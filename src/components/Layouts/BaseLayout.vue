<template>
  <Page class="base-layout">
    <div class="base-layout-load" v-if="!loaded">
      <p class="base-layout-load-spinner s-center-align s-low-blend">
        <strong>Just a sec!</strong>
      </p>
      <p class="base-layout-load-spinner base-layout-load-spinner--longer s-center-align s-low-blend s-sml-size">
        Hmm, this is taking longer than usual.<br />Try reloading the page.
      </p>
    </div>
    <div class="base-layout-content" v-if="loaded">
      <slot></slot>
    </div>
  </Page>
</template>

<script>
import Page from "@/components/Page"

export default {
  components: {
    Page
  },
  props: {
    loaded: {
      default: true,
      type: Boolean
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.base-layout {
  .base-layout-content,
  .base-layout-load {
    height: 100%;
  }

  .base-layout-load {
    padding-bottom: $padding;
    padding-top: $padding;

    .base-layout-load-spinner {
      animation: to-visible 0s 1s forwards;
      visibility: hidden;

      &.base-layout-load-spinner--longer {
        animation-delay: 5s;
      }
    }
  }
}
</style>