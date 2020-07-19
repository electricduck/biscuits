<template>
  <div class="action-bar">
    <div class="action-bar-content">
      <slot name="content"></slot>
    </div>
    <div class="action-bar-float">
      <div class="action-bar-left">
        <slot name="left"></slot>
      </div>
      <div class="action-bar-middle">
        <slot></slot>
      </div>
      <div class="action-bar-right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.action-bar {
  $height: 56px;

  background-color: var(--accent-color);
  box-shadow: var(--shadow);
  min-height: $height;
  position: relative;

  .action-bar-content {
    color: var(--accent-fg-color);
    font-size: 14px;
    padding: $height $padding $padding $padding;

    &:empty {
      display: none;
    }

    a {
      border-bottom-color: var(--accent-fg-color);
      color: inherit;
    }
  }

  .action-bar-float {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    height: $height;
    left: 0;
    padding: 0 $padding;
    position: absolute;
    top: 0;
    width: 100%;

    .action-bar-left,
    .action-bar-middle,
    .action-bar-right {
      height: $height;
    }

    .action-bar-middle {
      font-size: $display-fonts;
      font-weight: 700;
      text-align: center;
    }

    .action-bar-right {
      text-align: right;
    }

    .action-bar-item {
      margin: 0 #{$padding / 4};

      &:first-of-type {
        margin-left: 0;
      }

      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
</style>