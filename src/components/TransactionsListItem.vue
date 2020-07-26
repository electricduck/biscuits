<template>
  <router-link class="transactions-list-item" :to="link">
    <span class="transactions-list-item-icon">
      <img class="transactions-list-item-icon-image" :src="image" v-show="image" />
      <span
        class="central central--no-padding transactions-list-item-icon-letter fill"
        v-show="!image"
      >
        <span class="central-inner">{{ letter }}</span>
      </span>
    </span>
    <span class="transactions-list-item-name">
      <span v-show="name">{{ name }}</span>
      <em v-show="!name">Unknown</em>
    </span>
    <span class="transactions-list-item-description">
      <span v-show="description">{{ description }}</span>
      <em v-show="!description">No notes</em>
    </span>
    <span
      class="transactions-list-item-cost"
      :class="{ 'transactions-list-item-cost--positive' : positive }"
    >
      <Balance :balance="cost" />
    </span>
    <span class="transactions-list-item-category">
      <Category :category="category" class />
    </span>
  </router-link>
</template>

<script>
import Balance from "@/models/Balance.js";

export default {
  components: {
    Balance: () =>
      import(/* webpackPrefetch: true */ "@/components/Balance.vue"),
    Category: () =>
      import(/* webpackPrefetch: true */ "@/components/Category.vue")
  },
  computed: {
    category: function() {
      return this.transaction.category;
    },
    cost: function() {
      let foreign =
        this.transaction.currency !== this.transaction.local_currency;
      return new Balance({
        amount: foreign
          ? this.transaction.local_amount
          : this.transaction.amount,
        currency: foreign
          ? this.transaction.local_currency
          : this.transaction.currency
      });
    },
    description: function() {
      if (this.transaction.notes) {
        return this.transaction.notes;
      } else {
        return "";
      }
    },
    image: function() {
      if (this.transaction.merchant && this.transaction.merchant.logo) {
        return this.transaction.merchant.logo;
      } else {
        return null;
      }
    },
    letter: function() {
      if (this.transaction.merchant) {
        return this.transaction.merchant.name[0];
      } else if (
        this.transaction.counterparty &&
        this.transaction.counterparty.name
      ) {
        return this.transaction.counterparty.name[0];
      } else {
        return "?";
      }
    },
    name: function() {
      if (this.transaction.merchant) {
        return this.transaction.merchant.name;
      } else if (
        this.transaction.counterparty &&
        this.transaction.counterparty.name
      ) {
        return this.transaction.counterparty.name;
      } else {
        return "";
      }
    },
    positive: function() {
      if (this.transaction.local_amount > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  props: {
    link: String,
    transaction: {}
  }
};
</script>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.transactions-list-item {
  $description-padding-top: $padding / 6;

  border-bottom: 1px solid var(--border-color) !important;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  color: inherit !important;
  column-gap: #{$padding / 2};
  display: grid;
  font-weight: 500 !important;
  grid-template-columns: min-content 1fr auto;
  grid-template-rows: auto 1fr;
  line-height: 1;
  padding: $padding;

  &:focus,
  &.router-link-active {
    border-left-color: var(--accent-color);
  }

  .transactions-list-item-cost,
  .transactions-list-item-name {
    font-size: calc(#{$transactions-list-item-icon-width / 1.8} - #{$description-padding-top});
    grid-row: 1;
  }

  .transactions-list-item-category,
  .transactions-list-item-cost {
    text-align: right;
  }

  .transactions-list-item-category,
  .transactions-list-item-description {
    grid-row: 3;
  }

  .transactions-list-item-description,
  .transactions-list-item-name {
    line-height: 1.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    em {
      opacity: 0.5;
    }
  }

  .transactions-list-item-category {
    font-size: #{$transactions-list-item-icon-width / 2.2};
    grid-column: 3;
  }

  .transactions-list-item-cost {
    font-weight: 700 !important;
    grid-column: 3;

    &.transactions-list-item-cost--positive {
      color: var(--positive-color);
    }

    .balance {
      & > span {
        &:nth-of-type(1),
        &:nth-of-type(4) {
          font-size: 0.8em;
        }
      }
    }
  }

  .transactions-list-item-description {
    font-size: calc(#{$transactions-list-item-icon-width / 2.2} - #{$description-padding-top});
    grid-column-start: 2;
    grid-column-end: 2;
    opacity: $high-transparency;
    padding-top: $description-padding-top;
  }

  .transactions-list-item-icon {
    background-color: var(--primary-color);
    border-radius: 9999px;
    box-shadow: var(--shadow);
    color: var(--primary-fg-color);
    grid-column: 1;
    grid-row-start: 1;
    grid-row-end: 4;
    height: $transactions-list-item-icon-width;
    line-height: 0;
    overflow: hidden;
    width: $transactions-list-item-icon-width;

    .transactions-list-item-icon-image {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }

    .transactions-list-item-icon-letter {
      font-size: ($transactions-list-item-icon-width / 2.25);
    }
  }

  .transactions-list-item-name {
    font-family: $display-fonts;
    grid-column-start: 2;
    grid-column-end: 3;
  }
}
</style>