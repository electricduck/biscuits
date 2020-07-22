<template>
  <DualColumnLayout class="transactions">
    <TransactionsList :prefix="prefx" :transactions="transactions" />
  </DualColumnLayout>
</template>

<script>
export default {
  components: {
    DualColumnLayout: () =>
      import(
        /* webpackPrefetch: true */ "@/components/Layouts/DualColumnLayout.vue"
      ),
    TransactionsList: () =>
      import(/* webpackPrefetch: true */ "@/components/TransactionsList.vue")
  },
  computed: {
    prefix: function() {
      return `/${this.$route.params.style}/${this.$route.params.accountId}`
    },
    transactions: function() {
      if (this.$store.state.transactions.allTransactions.length > 0) {
        return this.$store.state.transactions.allTransactions[0].data; // HARCODED
      } else {
        return null;
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/shared/_mixins.scss";
@import "@/scss/shared/_variables.scss";

.transactions {
  .transactions-list {
  }

  @include respond-to(
    (($dual-column-layout-panel-width * 3.75) + ($padding * 2))
  ) {
    .transactions-list {
      width: calc(100% - #{$dual-column-layout-panel-width + $padding});
    }
  }
}
</style>
