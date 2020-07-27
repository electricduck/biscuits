<template>
  <div class="sidebar fill">
    <SidebarHeader class="sidebar-header" />
    <div class="sidebar-content">
      <keep-alive>
        <component :is="tabComponent"></component>
      </keep-alive>
    </div>
    <SidebarNav class="sidebar-nav" @navigate="switchTab" :selected="tab" :tabs="tabs" />
  </div>
</template>

<script>
export default {
  components: {
    SidebarHeader: () =>
      import(/* webpackPrefetch: true */ "@/components/SidebarHeader.vue"),
    SidebarNav: () =>
      import(/* webpackPrefetch: true */ "@/components/SidebarNav.vue"),
    TabBar: () => import(/* webpackPrefetch: true */ "@/components/TabBar.vue"),
    TabBarItem: () =>
      import(/* webpackPrefetch: true */ "@/components/TabBarItem.vue")
  },
  computed: {
    tabComponent: function() {
      let found = this.tabs.find(t => t.component === this.tab);
      return found
        ? () =>
            import(`@/components/SidebarTabs/${found.component}SidebarTab.vue`)
        : null;
    }
  },
  data: function() {
    return {
      tab: "",
      tabs: [
        {
          component: "Applets",
          icon: "bolt",
          overflow: false
        },
        {
          component: "Accounts",
          default: true,
          icon: "wallet",
          overflow: false,
          title: "Money"
        },
        {
          icon: "play",
          link: "/playground",
          overflow: true,
          title: "Playground"
        },
        {
          component: "Settings",
          icon: "cog",
          overflow: true
        }
      ]
    };
  },
  methods: {
    switchTab(tab) {
      this.tab = tab || this.tabs.find(t => t.default === true).component;
    }
  },

  beforeMount() {
    this.switchTab();
  }
};
</script>

<style lang="scss">
@import "@/scss/shared/_mixins.scss";
@import "@/scss/shared/_variables.scss";

.sidebar {
  display: grid;
  grid-template-rows: auto 1fr auto;

  .sidebar-content {
    min-height: 100px;
    overflow-y: auto;
  }

  .sidebar-nav {
    grid-row: 3;
  }

  @include respond-to(mobile-only) {
    .sidebar-nav {
      .tab-bar-overflow-menu {
        bottom: calc(100% + #{$padding / 2});
        top: unset;
      }
    }
  }

  @include respond-to(small) {
    grid-template-rows: auto auto 1fr;

    .sidebar-content {
      grid-row: 3;
    }

    .sidebar-nav {
      grid-row: 2;
    }
  }
}
</style>
