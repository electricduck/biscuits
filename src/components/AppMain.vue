<template>
  <div class="app-main fill">
    <div class="app-main-panel app-main-panel--sidebar">
      <Sidebar />
    </div>
    <div class="app-main-panel app-main-panel--content">
      <router-view />
    </div>
  </div>
</template>

<script>


export default {
  components: {
    Sidebar: () =>
      import(/* webpackPrefetch: true */ "@/components/Sidebar.vue")
  }
}
</script>

<style lang="scss">
.app-main {
  display: grid;
  grid-template-columns: 450px 1fr;
  overflow: hidden;

  .app-main-panel {
    border-right: 1px solid var(--border-color);
    overflow-y: auto;

    &:last-of-type {
      border-right-width: 0;
    }

    &.app-main-panel--sidebar {
      box-shadow: var(--shadow);
    }
  }
}
</style>