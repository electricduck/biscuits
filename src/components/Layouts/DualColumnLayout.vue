<template>
  <BaseLayout class="dual-column-layout" :loaded="loaded">
    <template v-slot:outer>
      <div class="base-layout-content dual-column-layout-left">
        <slot></slot>
      </div>
      <div class="base-layout-content dual-column-layout-right">
        <Panel v-if="panelVisible">
          <router-view />
        </Panel>
      </div>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/components/Layouts/BaseLayout.vue"
import Panel from "@/components/Panel.vue"

export default {
  components: {
    BaseLayout,
    Panel
  },
  data: function() {
    return {
      panelVisible: Boolean
    }
  },
  methods: {
    setPanelVisibility() {
      const findMe = (match) => {
        if((
          match.parent &&
          match.parent.components &&
          match.parent.components.default &&
          match.parent.components.default.components &&
          match.parent.components.default.components.DualColumnLayout
        )) {
          if((
            match.components &&
            match.components.default
          )) {
            return true;
          } else {
            return false;
          }
        } else {
          if(match.parent) {
            return findMe(match.parent)
          }
        }
      }

      let found = this.$route.matched.filter(m => {
        return m.name === this.$route.name;
      });

      this.panelVisible = findMe(found[0])
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
}
</script>

<style lang="scss">
@import "@/scss/shared/_mixins.scss";
@import "@/scss/shared/_variables.scss";

.dual-column-layout {
  display: grid;
  grid-template-columns: 1fr 450px;
  grid-template-rows: auto auto;
  padding: $padding;

  & > * {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  .base-layout-content {
    &.dual-column-layout-left,
    &.dual-column-layout-right {
      grid-column-start: 1;
      grid-column-end: 3;
      padding-right: $padding;

      &:last-child {
        padding-right: 0;
      }
    }

    &.dual-column-layout-left {
      grid-row-start: 1;
      grid-row-end: 3;
    }

    &.dual-column-layout-right {
      grid-row: 1;

      .panel {
        height: calc(100vh - #{$padding * 2});
      }
    }

    &.dual-column-layout-right,
    &.dual-column-layout-right .panel {
      position: sticky;
      top: $padding;
    }

    @include respond-to(mobile-only) {
      &.dual-column-layout-right .panel {
        border-radius: 0;
        height: 100% !important;
        left: 0;
        margin-top: 0;
        position: fixed;
        top: 0 !important;
      }
    }

    @include respond-to(small) {
      &.dual-column-layout-right {
        grid-column: 2;
      }
    }

    @include respond-to(xlarge) {
      &.dual-column-layout-left {
        grid-column: 1;
      }
    }
  }
}

.action-bar {
  & + .page {
    .panel {
      margin-top: -#{$action-bar-height - $padding};
    }

    .dual-column-layout-right,
    .dual-column-layout-right .panel {
      top: $action-bar-height;
    }
  }
}  // TODO: This is really hacky. Find another way?
</style>
