<template>
  <div class="sidebar fill">
    <div class="sidebar-profile">
      <SidebarHeader />
    </div>
    <div class="sidebar-content">
      <keep-alive>
        <component :is="tabComponent"></component>
      </keep-alive>
    </div>
    <div class="sidebar-nav">
      <SidebarNav
        @navigate="switchTab"
        :selected="tab"
        :tabs="tabs"
      />
    </div>
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
  data: function() {
    return {
      tab: "",
      tabComponent: null,
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
          component: "Settings",
          icon: "cog",
          overflow: true
        }
        
        /*,
        {
          component: "Pots",
          icon: "coins",
          overflow: false
        },
        {
          component: "Webhooks",
          icon: "tasks",
          overflow: true
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
        },
        {
          component: "About",
          icon: "info-circle",
          overflow: true
        },
        {
          component: "Applets",
          icon: "cog"
        },
        */
      ]
    };
  },
  methods: {
    switchTab(tab) {
      this.tab = tab || (this.tabs.find(t => t.default === true).component)
    }
  },
  watch: {
    tab: {
      immediate: true,
      handler(currentTab) {
        if(currentTab) {
          this.tabComponent = () =>
            import(`@/components/SidebarTabs/${currentTab}SidebarTab.vue`);
        }
      }
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
