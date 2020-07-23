<template>
  <div class="action-bar" :class="{ 'action-bar--transparent' : transparent }">
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

<script>
export default {
  props: {
    transparent: Boolean
  }
}
</script>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.action-bar {
  background-color: var(--accent-color);
  box-shadow: var(--shadow);
  color: var(--accent-fg-color);
  min-height: $action-bar-height;
  pointer-events: none;
  position: relative;

  & + .fill {
    height: calc(100% - #{$action-bar-height});
    min-height: calc(100% - #{$action-bar-height});
    //margin-top: -#{$action-bar-height};
    //padding-top: #{$action-bar-height + $padding};
  }

  &.action-bar--transparent {
    background-color: unset;
    color: inherit;

    .action-bar-item {
      color: inherit;
    }
  }

  .action-bar-item {
    pointer-events: auto;
  }

  .action-bar-float {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    height: $action-bar-height;
    left: 0;
    padding: 0 $padding;
    position: absolute;
    top: 0;
    width: 100%;

    .action-bar-left,
    .action-bar-middle,
    .action-bar-right {
      height: $action-bar-height;
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
