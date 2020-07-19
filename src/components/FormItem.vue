<template functional>
  <label class="form-item">
    <span class="form-item-error">
      <slot name="error"></slot>
    </span>
    <slot></slot>
    <span class="form-item-above">
      <slot name="above"></slot>
    </span>
    <span class="form-item-description">
      <slot name="description">{{ props.description }}</slot>
    </span>
    <span class="form-item-title">{{ props.title }}</span>
    <span class="form-item-toggle">
      <font-awesome-icon
        icon="square"
        class="form-item-toggle-icon form-item-toggle-icon--check form-item-toggle-icon--off"
      />
      <font-awesome-icon
        icon="check-square"
        class="form-item-toggle-icon form-item-toggle-icon--check form-item-toggle-icon--on"
      />
    </span>
  </label>
</template>

<script>
export default {
  props: {
    description: String,
    title: {
      default: "?",
      type: String
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/shared/_variables.scss";
.form-item {
  $default-padding: $padding;
  $desc-font-size: 14px;
  $half-padding: #{$padding / 2};
  $input-font-size: 18px;
  $label-font-size: 12px;
  $textarea-font-size: 14px;
  $vertical-input-padding: $label-font-size;

  color: var(--foreground-color);
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto auto;
  margin-bottom: $half-padding;
  width: 100%;

  &:last-of-type {
    margin-bottom: 0;
  }

  /*& + .form-item {
    padding-top: 0;
  }*/
  & > input:placeholder-shown,
  & > select:not(:valid),
  & > textarea:placeholder-shown {
    & ~ .form-item-title {
      font-size: $input-font-size;
      padding: #{$vertical-input-padding + ($input-font-size / 2)} $half-padding;
    }
  }
  & > input,
  & > select,
  & > textarea {
    background-color: var(--input-bg-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    color: var(--input-fg-color);
    font-size: $input-font-size;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row: 2;
    padding: #{$label-font-size + $vertical-input-padding} $half-padding $vertical-input-padding
      $half-padding;
    width: 100%;
    z-index: 10;
    &:active,
    &:focus {
      border-color: var(--accent-color);
      box-shadow: var(--primary-shadow);
      outline: 0 !important;
      & ~ .form-item-title {
        color: var(--accent-color) !important;
      }
    }
    & ~ .form-item-title {
      font-size: $label-font-size;
      padding: $label-font-size $half-padding 0 $half-padding;
    }
  }
  & > input,
  & > textarea {
    &:active,
    &:focus {
      & ~ .form-item-title {
        font-size: $label-font-size;
        padding: $label-font-size $half-padding 0 $half-padding;
      }
    }
  }
  & > textarea {
    font-size: $textarea-font-size;
    //min-height: #{($vertical-input-padding * 2) + ($textarea-font-size * 6)};
    min-height: 125px;
    min-width: 100%;
    max-width: 100%;
  }
  & > input[type="file"],
  & > textarea {
    padding-top: #{($label-font-size + $vertical-input-padding) * 1.25};
  }
  & > input[type="checkbox"] {
    opacity: 0;
    &:active,
    &:focus {
      & ~ .form-item-toggle {
        .form-item-toggle-icon {
          color: var(--accent-color);
          filter: drop-shadow(var(--accent-shadow));
        }
      }
    }
    &:checked {
      & ~ .form-item-toggle {
        .form-item-toggle-icon--off {
          display: none;
        }
        .form-item-toggle-icon--on {
          display: inline;
        }
      }
    }
    & ~ .form-item-toggle {
      .form-item-toggle-icon--off {
        display: inline;
      }
      .form-item-toggle-icon--on {
        display: none;
      }
    }
  }
  & > input[type="checkbox"] {
    grid-column: 2;
    height: $input-font-size;
    width: $input-font-size;
    & ~ .form-item-title {
      color: unset;
      font-size: $input-font-size;
      grid-column: 1;
      padding: 0;
    }
    & ~ .form-item-toggle {
      display: block;
    }
  }
  & > input[type="color"] {
    height: #{($vertical-input-padding * 2) + ($input-font-size * 2.5)};
  }
  .form-item-above,
  .form-item-description,
  .form-item-error,
  .form-item-title {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .form-item-above,
  .form-item-description,
  .form-item-error {
    &:empty {
      display: none;
    }
  }
  .form-item-description,
  .form-item-error {
    font-size: $desc-font-size;
    padding-top: #{$desc-font-size / 2};
  }
  .form-item-above {
    margin-bottom: $default-padding;
    & > img {
      border: 1px solid var(--border-color);
      border-radius: var(--radius);
      width: 100%;
    }
  }
  .form-item-description {
    color: var(--foreground-low-color);
    grid-row: 4;
  }
  .form-item-error {
    color: var(--error-color);
    font-weight: 700;
    grid-row: 3;
    &:not(:empty) {
      & + input,
      & + select,
      & + textarea {
        border-color: var(--error-color);
        &:active,
        &:focus {
          box-shadow: var(--error-shadow);
          outline: 0 !important;
          & ~ .form-item-title {
            color: var(--error-color) !important;
          }
        }
      }
    }
  }
  .form-item-title {
    color: var(--foreground-low-color);
    display: block;
    font-weight: 700;
    line-height: 1;
    grid-row: 2;
    overflow: hidden;
    pointer-events: none;
    text-overflow: ellipsis;
    transition: $transition-speed;
    white-space: nowrap;
    z-index: 15;
  }
  .form-item-toggle {
    display: none;
    font-size: $input-font-size;
    grid-column: 2;
    grid-row: 2;
    .form-item-toggle-icon {
      display: none;
      height: #{$input-font-size + 6px};
      margin-bottom: -2px;
      transition: $transition-speed;
      width: unset;
      &.form-item-toggle-icon--on {
        color: var(--accent-color);
      }
    }
  }
}
</style>