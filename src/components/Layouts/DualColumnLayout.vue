<template>
  <BaseLayout
    class="dual-column-layout fill"
    :class="[
      { 'dual-column-layout--panel-visible' : panelVisible }
    ]"
    :header-transparent="true"
    :loaded="loaded"
  >
    <slot></slot>
    <template v-slot:outer>
      <div class="dual-column-layout-panel">
        <router-view />
      </div>
      <div class="central dual-column-layout-placeholder">
        <div class="central-inner">
          <h1 class="s-center-align s-low-blend"><font-awesome-icon icon="hand-pointer" /></h1>
          <p class="s-center-align s-low-blend">Select an item from the left</p>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script>
export default {
  components: {
    BaseLayout: () =>
      import(/* webpackPrefetch: true */ "@/components/Layouts/BaseLayout.vue")
  },
  data: function() {
    return {
      panelVisible: Boolean
    };
  },
  methods: {
    setPanelVisibility() {
      const findMe = match => {
        if (
          match.parent &&
          match.parent.components &&
          match.parent.components.default &&
          match.parent.components.default.components &&
          match.parent.components.default.components.DualColumnLayout
        ) {
          if (match.components && match.components.default) {
            return true;
          } else {
            return false;
          }
        } else {
          if (match.parent) {
            return findMe(match.parent);
          }
        }
      };

      let found = this.$route.matched.filter(m => {
        return m.name === this.$route.name;
      });

      this.panelVisible = findMe(found[0]);
    }
  },
  props: {
    loaded: {
      default: true,
      type: Boolean
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.setPanelVisibility();
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/shared/_mixins.scss";
@import "@/scss/shared/_variables.scss";

.base-layout {
  &.dual-column-layout {
    &:not(.base-layout--loaded) {
      .base-layout-content,
      .dual-column-layout-panel,
      .dual-column-layout-placeholder {
        display: none !important;
      }
    }

    &.dual-column-layout--panel-visible {
      .base-layout-content,
      .dual-column-layout-placeholder {
        display: none;
      }

      .dual-column-layout-panel {
        display: block;
      }
    }

    .base-layout-content {
      background-color: var(--panel-bg-color);
    }

    .base-layout-load {
      grid-column: 1;
      grid-row: 2;
    }

    .dual-column-layout-panel,
    .dual-column-layout-placeholder {
      background-color: var(--background-color);
      border-left: 1px solid var(--border-color);
      display: none;
      overflow-y: auto;
    }

    @include respond-to(($dual-column-layout-content-width * 3)) {
      grid-template-columns: #{$dual-column-layout-content-width} 1fr;

      &:not(.base-layout--loaded) {
        .dual-column-layout-placeholder {
          display: grid !important;
        }
      }

      &.dual-column-layout--panel-visible {
        .base-layout-content {
          display: block;
        }
      }

      .dual-column-layout-placeholder {
        display: grid;
      }

      .dual-column-layout-panel,
      .dual-column-layout-placeholder {
        grid-row-start: 1;
        grid-row-end: 3;
        z-index: 250;
      }
    }
  }
}
</style>
