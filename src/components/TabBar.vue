<template>
  <div class="tab-bar">
    <slot></slot>
    <div
      class="tab-bar-overflow-menu"
      :class="{ 'tab-bar-overflow-menu--visible' : overflowVisible }"
      @click="toggleOverflow(false)"
    >
      <slot name="overflow"></slot>
    </div>
    <TabBarItem
      :active="overflowVisible"
      class="tab-bar-overflow-button"
      @handle="toggleOverflow()"
      icon="ellipsis-h"
    >
      More
    </TabBarItem>
  </div>
</template>

<script>
import TabBarItem from "@/components/TabBarItem.vue"

export default {
  components: {
    TabBarItem
  },
  data: function() {
    return {
      overflowVisible: false
    }
  },
  methods: {
    toggleOverflow(toggle = !this.overflowVisible) {
      this.overflowVisible = toggle
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.tab-bar {
  background-color: var(--nav-bg-color);
  box-shadow: var(--shadow);
  display: grid;
  grid-auto-columns: 1fr;
  padding: 0 #{$padding / 1.5};
  position: relative;

  .tab-bar-item {
    grid-row: 1;
  }

  .tab-bar-overflow-button {

  }

  .tab-bar-overflow-menu {
    background-color: var(--nav-bg-color);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    display: none;
    min-width: 150px;
    padding: #{$padding / 1.5} 0;
    position: absolute;
    right: #{$padding + ($padding / 1.5)};
    top: calc(100% + #{$padding / 2});

    &.tab-bar-overflow-menu--visible {
      display: block;
    }

    &:empty {
      & + .tab-bar-overflow-button {
        display: none;
      }
    }
  }
}
</style>
