<template>
  <div
    class="panel"
    :class="[
    { 'panel--pad' : pad }
  ]"
  >
    <div class="panel-header">
      <slot name="header"></slot>
    </div>
    <div class="panel-scroll">
      <div class="panel-inner" :class="innerClass">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    innerClass: String,
    pad: {
      default: false,
      type: Boolean
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.panel {
  background-color: var(--panel-bg-color);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  color: var(--foreground-color);
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100px;
  overflow: hidden;

  &.panel--pad {
    .panel-scroll .panel-inner {
      padding: $padding;
    }
  }

  .panel-scroll {
    overflow: auto;
  }
}
</style>