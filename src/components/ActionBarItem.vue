<template>
  <div class="action-bar-item">
    <span class="action-bar-item-inner">
      <slot></slot>
    </span>
  </div>
</template>

<style lang="scss">
.action-bar-item {
  color: inherit !important;
  display: inline-grid;
  font-size: 18px;
  height: 100%;
  line-height: 1;
  grid-template-rows: 1fr auto 1fr;

  .action-bar-item-inner {
    grid-row: 2;
  }

  .button {
    background-color: unset;
    box-shadow: unset;
    color: inherit !important;
    padding: 0;

    .button-icon {
      padding: 0;
    }

    .button-text {
      display: none;
    }
  }
}
</style>
