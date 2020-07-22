<template>
  <Page class="base-layout" :class="{ 'base-layout--loaded' : loaded }">
    <div class="base-layout-load">
      <p class="base-layout-load-spinner s-center-align s-low-blend">
        <strong>Just a sec!</strong>
      </p>
      <p class="base-layout-load-spinner base-layout-load-spinner--longer s-center-align s-low-blend s-sml-size">
        Hmm, this is taking longer than usual.<br />Try reloading the page.
      </p>
    </div>
    <div class="base-layout-content">
      <ActionBar class="base-layout-content-header" :transparent="headerTransparent" v-if="headerVisible">
        <template v-slot:left>
          <ActionBarItem>
            <Button @handle="goBack()" icon="arrow-left">Back</Button>
          </ActionBarItem>
        </template>
      </ActionBar>
      <slot></slot>
    </div>
    <slot name="outer"></slot>
  </Page>
</template>

<script>
export default {
  components: {
    ActionBar: () =>
      import(/* webpackPrefetch: true */ "@/components/ActionBar.vue"),
    ActionBarItem: () =>
      import(/* webpackPrefetch: true */ "@/components/ActionBarItem.vue"),
    Button: () =>
      import(/* webpackPrefetch: true */ "@/components/Button.vue"),
    Page: () =>
      import(/* webpackPrefetch: true */ "@/components/Page.vue"),
  },
  methods: {
    goBack() {
      this.$router.go(-1) // TODO: Go home if there is no history
    }
  },
  props: {
    headerTransparent: {
      default: false,
      type: Boolean
    },
    headerVisible: {
      default: true,
      type: Boolean
    },
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
  position: relative;

  &.base-layout--loaded {
    .base-layout-content {
      display: block;
    }

    .base-layout-load {
      display: none;
    }
  }

  .base-layout-content {
    display: none;
  }

  .base-layout-load {
    display: block;
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
