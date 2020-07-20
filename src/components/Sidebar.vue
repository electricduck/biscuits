<template>
  <div class="sidebar fill">
    <div class="sidebar-profile">
      <ProfileHeader />
    </div>
    <div class="sidebar-content">
      <keep-alive>
        <component :is="tabComponent"></component>
      </keep-alive>
    </div>
    <div class="sidebar-nav">
      <TabBar>
        <TabBarItem
          v-for="item in tabs"
          :key="item.title"
          :active="tab === item.component"
          @handle="switchTab(item.component)"
          :icon="item.icon"
        >{{ item.title || item.component }}</TabBarItem>
      </TabBar>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ProfileHeader: () =>
      import(/* webpackPrefetch: true */ "@/components/ProfileHeader.vue"),
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
          component: "Accounts",
          icon: "wallet"
        },
        {
          component: "Pots",
          icon: "coins"
        },
        {
          component: "Settings",
          icon: "cog"
        }
      ]
    };
  },
  methods: {
    switchTab(tab) {
      this.tab = tab || "Accounts"
      this.tabComponent = () =>
        import(`@/components/SidebarTabs/${this.tab}SidebarTab.vue`);
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
    overflow-y: auto;
  }

  @include respond-to(medium) {
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