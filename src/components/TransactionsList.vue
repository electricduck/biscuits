<template>
  <div class="transactions-list">
    <div
      v-for="(transaction, index) in transactions"
      :key="transaction.id"
      class="transactions-list-group"
    >
      <div
        class="transactions-list-group-date"
        v-if="showHeader(transactions[index], transactions[index-1])"
      >{{ transactions[index].created | moment("Do MMMM 'YY") }}</div>
      <TransactionsListItem
        class="transactions-list-group-item"
        :link="`${prefix}/${transactions[index].id}`"
        :transaction="transactions[index]"
      />
    </div>
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
  methods: {
    showHeader(currentTransaction, previousTransaction) {
      if (
        currentTransaction &&
        previousTransaction &&
        currentTransaction.created.substring(0, 10) !==
          previousTransaction.created.substring(0, 10)
      ) {
        return true;
      } else {
        return false;
      }
    }
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
@import "@/scss/shared/_variables.scss";

.transactions-list {
  display: block;

  .transactions-list-group {
    &:first-of-type {
      .transactions-list-group-date {
        padding-top: 0;
      }
    }

    .transactions-list-group-date {
      background-color: var(--well-bg-color);
      border-bottom: 1px solid var(--border-color);
      color: var(--well-fg-color);
      font-size: 0.8em;
      font-weight: 700;
      padding: $padding;
      padding-left: calc(#{$transactions-list-item-icon-width} + #{$padding * 2});
    }
  }
}
</style>