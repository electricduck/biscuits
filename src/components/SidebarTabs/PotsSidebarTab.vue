<template>
  <BaseLayout class="sidebar-pots" :loaded="$store.state.pots.loaded">
    <CardsList :cards="$store.state.pots.allPots" />
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/components/Layouts/BaseLayout.vue";
import CardsList from "@/components/CardsList.vue";

export default {
  components: {
    BaseLayout,
    CardsList
  },

  async beforeMount() {
    this.$store.dispatch('invokePots')
  }
}
</script>
