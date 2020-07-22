<template>
  <div class="panel">
    <div class="panel-scroll">
      <div class="panel-header">
        <slot name="header"></slot>
      </div>
      <div class="panel-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.panel {
  background-color: var(--panel-bg-color);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  color: var(--foreground-color);
  overflow: hidden;

  .panel-scroll {
    height: 100%;
    overflow: auto;

    .panel-inner {
      &:empty {
        display: none;
      }
    }
  }
}
</style>