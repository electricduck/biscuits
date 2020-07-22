<template>
  <BaseLayout
    class="dual-column-layout"
    :class="{ 'dual-column-layout--panel-visible' : panelVisible }"
    :header-transparent="true"
    :loaded="loaded"
  >
    <div class="dual-column-layout-left" ref="left">
      <slot></slot>
    </div>
    <template v-slot:outer>
      <div class="dual-column-layout-right" ref="right">
        <Panel>
          <template v-slot:header>
            <ActionBar />
          </template>
          <router-view />
        </Panel>
      </div>
    </template>
  </BaseLayout>
</template>

<script>
export default {
  components: {
    ActionBar: () =>
      import(/* webpackPrefetch: true */ "@/components/ActionBar.vue"),
    BaseLayout: () =>
      import(/* webpackPrefetch: true */ "@/components/Layouts/BaseLayout.vue"),
    Panel: () =>
      import(/* webpackPrefetch: true */ "@/components/Panel.vue")
  },
  data: function() {
    return {
      panelVisible: Boolean
    };
  },
  methods: {
    calculateSizes() {
      let wideClass = "dual-column-layout--wide";

      let left = this.$refs.left;
      let right = this.$refs.right;
      let content = left.parentElement;
      let base = left.parentElement.parentElement;

      let panelOffset = content.offsetWidth - content.clientWidth;
      let baseMinWidth =
        450 * 2.25 + // 450: $panel-width
        20 * 2 + // 20: $padding
        panelOffset;

      if (base.clientWidth <= baseMinWidth) {
        base.classList.remove(wideClass);
      } else {
        base.classList.add(wideClass);
      }

      if (panelOffset >= 0) {
        left.style.paddingRight = `${panelOffset}px`;
        right.style.marginRight = `${panelOffset}px`;
      }
    },
    handleResize() {
      var self = this;
      let exists = setInterval(function() {
        if (
          self.$refs !== undefined &&
          self.$refs.left !== undefined &&
          self.$refs.right !== undefined
        ) {
          self.calculateSizes();
          window.addEventListener("resize", self.calculateSizes);
          clearInterval(exists);
        }
      }, 100); // HACK: Due to v-if's in various parents (I think?), we can't get these refs right on mounted, so we need to wait for them to be created
    },
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
  },

  mounted() {
    this.handleResize();
  },
  updated() {
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.calculateSizes);
  }
};
</script>

<style lang="scss">
@import "@/scss/shared/_mixins.scss";
@import "@/scss/shared/_variables.scss";

.dual-column-layout {
  $panel-width: 450px;

  height: 100%;
  min-height: 100%;
  overflow: hidden;

  &.dual-column-layout--wide { // TODO: Make the default always narrow?
    .base-layout-content {
      .dual-column-layout-left {
        width: calc(100% - #{$panel-width + $padding});
        //width: 100%;
      }
    }

    .dual-column-layout-right .panel {
      box-shadow: var(--shadow);
    }
  }

  &.dual-column-layout--panel-visible {
    .dual-column-layout-right {
      display: block;
    }
  }

  .base-layout-content {
    height: 100%;
    overflow-y: scroll;

    .dual-column-layout-left {
      width: 100%;
      //width: calc(100% - #{$panel-width + $padding});
    }
  }

  .dual-column-layout-right {
    display: none;
    height: calc(100% - #{$padding * 2});
    position: absolute;
    right: $padding;
    top: $padding;
    width: $panel-width;

    .panel {
      box-shadow: var(--heavy-shadow);
      height: 100%;
    }
  }

  @include respond-to(mobile-only) {
    .base-layout-content {
      overflow: hidden;

      .dual-column-layout-left {
        padding-right: 0 !important;
      }
    }

    .dual-column-layout-right {
      background-color: var(--overlay-color);
      height: 100%;
      margin-right: 0 !important;
      right: 0;
      top: 0;
      width: 100%;

      .panel {
        border-bottom-right-radius: unset;
        border-top-right-radius: unset;
        margin-left: auto;
        max-width: $panel-width;
      }
    }
  }
}
</style>
