<template>
  <a
    @click.prevent="navigate(link)"
    class="button"
    :href="link"
    :class="[
      { 'button--disabled' : disabled },
      { 'button--no-text' : !textVisible },
      { 'button--transparent' : transparent },
      { 'button--wide' : wide }
    ]"
  >
    <span class="button-icon" v-if="icon">
      <font-awesome-icon :icon="icon" />
    </span>
    <span class="button-text">
      <slot></slot>
    </span>
  </a>
</template>

<script>
export default {
  props: {
    accent: Boolean,
    disabled: Boolean,
    icon: String,
    link: String,
    textVisible: {
      default: true,
      type: Boolean
    },
    transparent: Boolean,
    wide: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    navigate(link) {
      if (link !== undefined) {
        if(link.startsWith("http")) {
          window.location = link
        } else {
          this.$router.push(link);
        }
      } else {
        this.$emit("handle");
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/scss/shared/_variables.scss';

.button {
  background-color: var(--primary-color);
  border: none !important;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  color: var(--primary-fg-color) !important;
  display: inline-grid;
  grid-template-columns: 1fr auto auto 1fr;
  font-size: inherit;
  padding: 1.4em;

  &.button--disabled {
    filter: grayscale(1);
    opacity: $high-transparency;
    pointer-events: none;
  }

  &.button--no-text {
    .button-icon {
      padding-right: 0;
    }

    .button-text {
      display: none;
    }
  }

  &.button--transparent {
    background-color: var(--well-bg-color);
    color: var(--well-fg-color) !important;
  }

  &.button--wide {
    display: grid;
  }

  .button-icon {
    grid-column: 2;
    padding-right: #{$padding / 2};
  }

  .button-text {
    font-weight: 700;
    grid-column: 3;
    user-select: none;
  }
}
</style>