<template functional>
  <a @click.prevent="navigate(props.link)" class="tab-bar-item" :href="props.link">
    <span class="tab-bar-item-icon">
      <font-awesome-icon :icon="props.icon" fixed-width />
    </span>
    <span class="tab-bar-item-text">
      <slot></slot>
    </span>
  </a>
</template>

<script>
export default {
  props: {
    icon: {
      default: "plus",
      type: String
    },
    link: {
      default: "#",
      type: String
    }
  },
  methods: {
    navigate(link) {
      if (link !== undefined) {
        this.$router.push(link);
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

  &:hover {
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
  }
}
</style>