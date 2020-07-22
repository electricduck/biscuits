<template>
  <DualColumnLayout class="transactions">
    <TransactionsList
      :prefix="'/' + $route.params.accountId"
      :transactions="transactions" 
    />
  </DualColumnLayout>
</template>

<script>
export default {
  components: {
    DualColumnLayout: () =>
      import(/* webpackPrefetch: true */ "@/components/Layouts/DualColumnLayout.vue"),
    TransactionsList: () =>
      import(/* webpackPrefetch: true */ "@/components/TransactionsList.vue"),
  },
  computed: {
    transactions: function() {
      if(this.$store.state.transactions.allTransactions.length > 0) {
        return this.$store.state.transactions.allTransactions[0].data // HARCODED
      } else {
        return null
      }
    }
  }
};
</script>
