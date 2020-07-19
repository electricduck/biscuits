<template>
  <div class="sidebar fill">
    <div class="sidebar-panel sidebar-panel--profile">
      <ProfileHeader />
    </div>
    <div class="sidebar-panel sidebar-panel--content">
      <component :is="tabComponent"></component>
    </div>
    <div class="sidebar-panel sidebar-panel--nav">
      <TabBar>
        <TabBarItem icon="wallet">
          Accounts
        </TabBarItem>
        <TabBarItem icon="coins">
          Pots
        </TabBarItem>
        <TabBarItem icon="tasks">
          Tasks
        </TabBarItem>
        <TabBarItem icon="ellipsis-h">
          More
        </TabBarItem>
      </TabBar>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ProfileHeader: () => import(/* webpackPrefetch: true */ "@/components/ProfileHeader.vue"),
    TabBar: () => import(/* webpackPrefetch: true */ "@/components/TabBar.vue"),
    TabBarItem: () => import(/* webpackPrefetch: true */ "@/components/TabBarItem.vue")
  },
  computed: {
    tabComponent: function() {
      return () => import(`@/components/Sidebar${this.tab}.vue`);
    }
  },
  data: function() {
    return {
      tab: "Accounts",
      tabs: ["Accounts"]
    };
  }
};
</script>

<style lang="scss">
@import "@/scss/shared/_mixins.scss";
@import "@/scss/shared/_variables.scss";

.sidebar {
  display: grid;
  grid-template-rows: auto 1fr auto;

  .sidebar-panel {
    
  }

  @include respond-to(medium) {
    grid-template-rows: auto auto 1fr;

    .sidebar-panel {
      &.sidebar-panel--content {
        grid-row: 3;
      }

      &.sidebar-panel--nav {
        grid-row: 2;
      }
    }
  }
}
</style>