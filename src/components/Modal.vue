<template>
  <div class="modal-scroll fill">
    <div class="modal-container">
      <div class="modal">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.modal-scroll {
  background-color: var(--overlay-color);
  display: block;
  left: 0;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  width: 100%;

  .modal-container {
    display: grid;
    grid-template-columns: 1fr $padding auto $padding 1fr;
    grid-template-rows: 1fr $padding auto $padding 1fr;
    min-height: 100%;
    width: 100%;

    .modal {
      background-color: var(--background-color);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      color: var(--foreground-color);
      display: inline-block;
      grid-column: 3;
      grid-row: 3;
      max-width: $med-width;
      min-width: 0;
      padding: $padding;
    }
  }
}
</style>