<template>
  <a
    @click.prevent="navigate(link)"
    class="tab-bar-item"
    :href="link"
    :class="[
      { 'tab-bar-item--active' : active }
    ]"
    >
    <span class="tab-bar-item-icon">
      <font-awesome-icon :icon="icon" fixed-width />
    </span>
    <span class="tab-bar-item-text">
      <slot></slot>
    </span>
  </a>
</template>

<script>
export default {
  props: {
    active: Boolean,
    icon: {
      default: "plus",
      type: String
    },
    link: String
  },
  methods: {
    navigate(link) {
      if (link !== undefined) {
        if(this.$route.fullPath !== link) {
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
@import "@/scss/shared/_variables.scss";

.tab-bar-item {
  color: var(--nav-fg-color);
  display: block;
  font-size: 0;
  padding: #{$padding / 1.5};
  text-align: center;

  &:active,
  &:focus,
  &:hover,
  &.tab-bar-item--active {
    color: var(--primary-color);
  }

  .tab-bar-item-icon,
  .tab-bar-item-text {
    display: block;
  }

  .tab-bar-item-icon {
    font-size: 18px;
  }

  .tab-bar-item-text {
    font-size: 12px;
    user-select: none;
  }
}

.tab-bar-overflow-menu {
  .tab-bar-item {
    padding: #{$padding / 2.5} #{$padding};
    text-align: left;

    &:active,
    &:focus,
    &:hover,
    &.tab-bar-item--active {
      background-color: var(--primary-color);
      color: var(--primary-fg-color);
    }

    .tab-bar-item-icon,
    .tab-bar-item-text {
      display: inline-block;
      line-height: 14px;
      font-size: 14px;
      vertical-align: middle;
    }

    .tab-bar-item-icon {
      float: right;
      font-size: 12px;
      opacity: $high-transparency;
      padding-left: #{$padding / 2};
    }
  }
}
</style>
