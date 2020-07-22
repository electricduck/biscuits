<template>
  <div class="transactions-list">
    <router-link
      v-for="transaction in transactions"
      :key="transaction.id"
      class="transactions-list-item"
      :to="prefix + '/' + transaction.id"
    >
      {{ transaction.id }} -
      {{ (transaction.description) ? transaction.description: "no desc" }} -
      {{ (transaction.counterparty.name) ? transaction.counterparty.name : "no counter" }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    prefix: String,
    transactions: {}
  },

  mounted() {
    console.log(this.transactions)
  }
}
</script>

<style lang="scss">
.transactions-list {
  display: table;

  .transactions-list-item {
    display: table-row;

    .transactions-list-item-cell {
      display: table-cell;
    }
  }
}
</style>