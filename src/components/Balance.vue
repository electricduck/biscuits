<template>
  <div class="amount balance" :class="{ 'balance--loaded' : loaded }">
    <span>{{ (computedBalance) ? computedBalance.symbol : "¤" }}</span>
    <span>{{ operator }}</span>
    <span>{{ (computedBalance) ? computedBalance.absolute : "0" }}</span>
    <span>.{{ (computedBalance) ? computedBalance.decimal : "00" }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    computedBalance: function() {
      if (!this.balance) {
        return this.$store.state.balance.allBalances.find(
          b => b.id === this.id
        );
      } else {
        return this.balance;
      }
    },
    operator: function() {
      if (this.computedBalance && this.computedBalance.amount !== 0) {
        if (this.computedBalance.negative) {
          return this.negativeVisible ? "-" : "";
        } else {
          return this.positiveVisible ? "+" : "";
        }
      } else {
        return "";
      }
    }
  },
  props: {
    balance: null,
    id: String,
    negativeVisible: {
      default: false,
      type: Boolean
    },
    positiveVisible: {
      default: true,
      type: Boolean
    }
  },
  watch: {
    computedBalance: {
      immediate: true,
      handler(currentBalance) {
        this.loaded = currentBalance ? true : false;
      }
    }
  }
};
</script>

<style lang="scss">
.balance {
  opacity: 0.4;

  &.balance--loaded {
    opacity: 1;
  }
}
</style>
