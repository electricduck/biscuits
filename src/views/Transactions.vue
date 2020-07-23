<template>
  <DualColumnLayout :loaded="loaded">
    <div class="transactions">
      <TransactionsList :prefix="prefix" :transactions="transactions" />
    </div>
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
      return `/${this.$route.params.style}/${this.$route.params.accountId}`;
    },
    transactions: function() {
      let allTransactions = this.$store.state.transactions.allTransactions;
      if (allTransactions) {
        let accountTransactions = allTransactions.filter(s => {
          return s.id === this.$route.params.accountId;
        });

        if (accountTransactions.length > 0) {
          return accountTransactions[0].data.sort((a, b) => {
            if (a.created < b.created) return 1;
            if (a.created > b.created) return -1;
            return 0;
          });
        } else {
          return {};
        }
      } else {
        return null;
      }
    }
  },
  data: function() {
    return {
      loaded: false
    }
  },
  watch: {
    transactions: {
      immediate: true,
      handler(currentTransactions) {
        if(currentTransactions !== null) {
          this.loaded = true
        } else {
          this.loaded = false
        }
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
