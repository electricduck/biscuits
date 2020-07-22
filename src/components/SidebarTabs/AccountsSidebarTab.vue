<template>
  <BaseLayout class="sidebar-accounts" :header-visible="false" :loaded="loaded">
    <CardsList :cards="$store.state.accounts.allAccounts" />
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
  computed: {
    loaded: function() {
      if((
        this.$store.state.accounts.loaded/* &&
        this.$store.state.balance.allBalances.length > 0*/
      )) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
