<template>
  <div class="amount balance" :class="{ 'balance--loaded' : loaded }">
    <span>{{ (computedBalance) ? computedBalance.symbol : "£" }}</span>
    <span>{{ (computedBalance) ? computedBalance.absolute : "0" }}</span>
    <span>.{{ (computedBalance) ? computedBalance.decimal : "00" }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    computedBalance: function() {
      if(!this.balance) {
        return this.$store.state.balances.find(b => b.id === this.id)
      } else {
        console.log(this.balance.amount)
        return this.balance
      }
    }
  },
  props: {
    balance: null,
    id: String
  },
  watch: {
    computedBalance: {
      immediate: true,
      handler(currentBalance) {
        this.loaded = currentBalance ? true : false
      }
    }
  }
}
</script>

<style lang="scss">
.balance {
  opacity: 0.4;

  &.balance--loaded {
    opacity: 1;
  }
}
</style>