<template>
  <div class="app-main fill" :class="{ 'app-main--content-visible' : contentVisible }">
    <div class="app-main-panel app-main-panel--sidebar">
      <Sidebar />
    </div>
    <div class="app-main-panel app-main-panel--content">
      <router-view />
    </div>
    <AppMainBuffer />
  </div>
</template>

<script>


export default {
  components: {
    AppMainBuffer: () =>
      import(/* webpackPrefetch: true */ "@/components/AppMainBuffer.vue"),
    Sidebar: () =>
      import(/* webpackPrefetch: true */ "@/components/Sidebar.vue")
  },
  computed: {
    contentVisible: function() {
      return (this.$route.path !== "/") ? true : false
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/shared/_mixins.scss";
@import "@/scss/shared/_variables.scss";

.app-main {
  $sidebar-width: 450px;

  display: grid;
  grid-template-columns: 1fr;
  overflow: hidden;

  &.app-main--content-visible {
    .app-main-panel {
      &.app-main-panel--content {
        display: block;
      }

      &.app-main-panel--sidebar {
        display: none;
      }
    }
  }

  .app-main-panel {
    border-color: var(--border-color);
    border-style: solid;
    border-width: 0;
    overflow-y: auto;

    &.app-main-panel--content {
      display: none;
    }

    &.app-main-panel--sidebar {
      box-shadow: var(--shadow);
    }
  }

  @include respond-to(small) {
    grid-template-columns: 1fr $sidebar-width 1fr;

    .app-main-panel {
      &.app-main-panel--content {
        grid-column-start: 1;
        grid-column-end: 4;
      }

      &.app-main-panel--sidebar {
        border-width: 0 1px;
        grid-column: 2;
      }
    }
  }

  @include respond-to(large) {
    grid-template-columns: $sidebar-width 1fr;

    .app-main-panel {
      border-left-width: 0 !important;
      display: block !important;
      grid-column: unset !important;

      &:last-of-type {
        border-right-width: 0;
      }
    }
  }
}
</style>
