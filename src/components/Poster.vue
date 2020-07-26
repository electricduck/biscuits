<template>
  <div class="poster fill">
    <div class="poster-inner fill">
      <slot></slot>
    </div>
    <div class="poster-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/scss/shared/_mixins.scss";
@import "@/scss/shared/_variables.scss";

.poster {
  display: grid;
  overflow: hidden;

  &.poster--open {
    .poster-inner {
      transform: translateY(-100%);
    }
  }

  .poster-content,
  .poster-inner {
    grid-column: 1;
    grid-row: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .poster-content {
    z-index: 90;
  }

  .poster-inner {
    background-color: var(--panel-bg-color);
    box-shadow: var(--shadow);
    color: var(--panel-fg-color);
    transition: $slow-transition-speed;
    z-index: 100;
  }
}
</style>