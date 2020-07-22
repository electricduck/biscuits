<template>
  <div class="transactions-list">
    <TransactionsListItem
      v-for="transaction in transactions"
      :key="transaction.id"
      :link="`${prefix}/${transaction.id}`"
      :transaction="transaction"
    />
  </div>
</template>

<script>
export default {
  components: {
    TransactionsListItem: () =>
      import(
        /* webpackPrefetch: true */ "@/components/TransactionsListItem.vue"
      )
  },
  props: {
    prefix: String,
    transactions: {}
  },

  mounted() {
    console.log(this.transactions);
  }
};
</script>

<style lang="scss">
.transactions-list {
  display: block;
}
</style>