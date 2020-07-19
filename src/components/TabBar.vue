<template functional>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.tab-bar {
  background-color: var(--nav-bg-color);
  box-shadow: var(--shadow);
  display: grid;
  grid-auto-columns: 1fr;
  padding: 0 #{$padding / 1.5};

  .tab-bar-item {
    grid-row: 1;
  }
}
</style>