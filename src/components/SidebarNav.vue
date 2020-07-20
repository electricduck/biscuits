<template>
  <div class="sidebar-nav">
    <TabBar>
      <TabBarItem
        v-for="item in tabsMain"
        :key="item.title"
        :active="selected === item.component"
        @handle="handle(item)"
        :icon="item.icon"
      >{{ item.title || item.component }}</TabBarItem>
      <template v-slot:overflow>
        <TabBarItem
          v-for="item in tabsOverflow"
          :key="item.title"
          :active="selected === item.component"
          @handle="handle(item)"
          :icon="item.icon"
        >{{ item.title || item.component }}</TabBarItem>
      </template>
    </TabBar>
  </div>
</template>

<script>
export default {
  components: {
    TabBar: () => import(/* webpackPrefetch: true */ "@/components/TabBar.vue"),
    TabBarItem: () =>
      import(/* webpackPrefetch: true */ "@/components/TabBarItem.vue")
  },
  computed: {
    tabsMain: function() {
      return this.tabs.filter(t => t.overflow === false)
    },
    tabsOverflow: function() {
      return this.tabs.filter(t => t.overflow === true)
    }
  },
  methods: {
    handle(item) {
      if(item.component) {
        this.$emit('navigate', item.component)
      } else {
        this.$router.push(item.link)
      }
    }
  },
  props: {
    selected: String,
    tabs: null
  }
}
</script>
