<template>
  <DualColumnLayout :loaded="loaded">
    <Poster class="poster--open">
      <template v-slot:content>
        <div class="transactions">
          <TransactionsList :prefix="prefix" :transactions="transactions" />
        </div>
      </template>
    </Poster>
  </DualColumnLayout>
</template>

<script>
export default {
  components: {
    DualColumnLayout: () =>
      import(
        /* webpackPrefetch: true */ "@/components/Layouts/DualColumnLayout.vue"
      ),
    Poster: () =>
      import(/* webpackPrefetch: true */ "@/components/Poster.vue"),
    TransactionsList: () =>
      import(/* webpackPrefetch: true */ "@/components/TransactionsList.vue")
  },
  computed: {
    prefix: function() {
      return `/${this.$route.params.accountId}`;
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
    };
  },
  watch: {
    transactions: {
      immediate: true,
      handler(currentTransactions) {
        if (currentTransactions !== null) {
          this.loaded = true;
        } else {
          this.loaded = false;
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
}
</style>
