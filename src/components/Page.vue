<template>
  <div class="page">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.page {
  a {
    border-bottom: 1px solid var(--primary-color);
    color: var(--primary-color);
    font-weight: 700;
  }

  code,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  table,
  ul,
  .d-form,
  .d-well {
    display: block;
    margin-block-start: $padding;
    margin-block-end: $padding;

    &.s-half-margin {
      margin-block-end: #{$padding / 2};

      & + * {
        margin-block-start: #{$padding / 2};
      }
    }

    &.s-no-margin {
      margin-block-end: 0;

      & + * {
        margin-block-start: 0;
      }
    }
  }

  code,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  table,
  ul {
    line-height: 1.4;
    padding-left: $padding;
    padding-right: $padding;

    &.s-accent-color {
      color: var(--accent-color);
    }

    &.s-center-align {
      text-align: center;
    }

    &.s-high-blend {
      opacity: 0.8;
    }

    &.s-low-blend {
      opacity: 0.4;
    }
  }

  code {
    background-color: var(--foreground-color);
    border-radius: var(--radius);
    color: var(--background-color);
    font-family: monospace;
    font-size: 14px;
    margin-left: $padding;
    margin-right: $padding;
    overflow: auto;
    padding: #{$padding / 2};
    white-space: pre;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: $display-fonts;
  }

  h1 {
    font-size: 6em;
    line-height: 1;
  }

  h2 {
    font-size: 2.5em;
  }

  p,
  table,
  ul {
    font-size: 1em;

    &.s-sml-size {
      font-size: 0.9em;
    }

    &.s-xsm-size {
      font-size: 0.7em;
    }
  }

  ul {
    margin-left: $padding;
  }

  .d-form,
  .d-well {
    overflow: hidden;
  }

  .d-form {
    & > .button {
      margin: 0 $padding;
      width: calc(100% - #{$padding * 2});
    }

    .form-item {
      border-bottom: 1px solid var(--border-color);
      padding: $padding;

      &:last-of-type {
        & ~ .button {
          margin-bottom: $padding;
          margin-top: $padding;
        }
      }
    }
  }

  .d-well {
    background-color: var(--well-bg-color);
    border-radius: var(--radius);
  }
}
</style>