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
</style>