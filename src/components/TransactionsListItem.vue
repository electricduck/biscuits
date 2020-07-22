<template>
  <router-link class="transactions-list-item" :to="link">
    <img class="transactions-list-item-image" :src="image" v-show="image" />
    <span class="central central--no-padding transactions-list-item-letter" v-show="!image">
      <span class="central-inner">{{ letter }}</span>
    </span>
    <span class="transactions-list-item-name">
      <span v-show="name">{{ name }}</span>
      <em v-show="!name">Unknown</em>
    </span>
    <span class="transactions-list-item-description">
      <span v-show="description">{{ description }}</span>
      <em v-show="!description">No notes</em>
    </span>
    <span class="central central--no-horizontal central--no-padding transactions-list-item-category">
      <Category :category="category" class="central-inner" fixed-width />
    </span>
    <span class="central central--no-padding transactions-list-item-icon">
      <font-awesome-icon class="central-inner transactions-list-item-icon-svg" :icon="icon" />
    </span>
    <span
      class="central central--no-horizontal central--no-padding transactions-list-item-cost"
      :class="{ 'transactions-list-item-cost--positive' : positive }"
    >
      <Balance :balance="cost" class="central-inner" />
    </span>
  </router-link>
</template>

<script>
import Balance from "@/models/Balance.js"

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
      if(this.transaction.notes) {
        return this.transaction.notes;
      } else {
        return "";
      }
    },
    icon: function() {
      if (this.transaction.local_amount > 0) {
        return "plus";
      } else {
        return "minus";
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
      } else {
        return "?";
      }
    },
    name: function() {
      if (this.transaction.merchant) {
        return this.transaction.merchant.name;
      } else if (this.transaction.counterparty && this.transaction.counterparty.name) {
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
  $image-size: 64px;
  $name-font-size: 1.4em;

  border-color: var(--border-color) !important;
  border-style: solid !important;
  border-width: 0 0 1px 0 !important;
  color: inherit !important;
  column-gap: #{$padding / 2};
  display: grid;
  font-weight: inherit !important;
  grid-template-columns: auto 1fr auto auto auto;
  grid-template-rows: 1fr auto auto 1fr;
  line-height: 1;
  padding: $padding;
  vertical-align: middle;

  .transactions-list-item-category,
  .transactions-list-item-cost,
  .transactions-list-item-icon,
  .transactions-list-item-image,
  .transactions-list-item-letter {
    grid-row-start: 1;
    grid-row-end: 5;
    vertical-align: middle;
  }

  .transactions-list-item-description,
  .transactions-list-item-icon {
    opacity: 0.4;
  }

  .transactions-list-item-description,
  .transactions-list-item-name {
    display: block;
    grid-column: 2;
    overflow: hidden;
    padding: 0 #{$padding / 2};
    text-overflow: ellipsis;
    white-space: nowrap;

    em {
      opacity: 0.5;
    }
  }

  .transactions-list-item-image,
  .transactions-list-item-letter {
    background-color: var(--primary-color);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    color: var(--primary-fg-color);
    font-weight: 700;
    grid-column: 1;
    height: $image-size;
    width: $image-size;
  }

  .transactions-list-item-category {
    grid-column: 3;
  }

  .transactions-list-item-cost {
    font-size: 1.75em;
    grid-column: 5;
    min-width: 5em;
    text-align: right;

    &.transactions-list-item-cost--positive {
      color: var(--positive-color);
    }
  }

  .transactions-list-item-description {
    font-size: #{$name-font-size / 1.75};
    grid-row: 3;
    line-height: #{$name-font-size / 1.166666};
  }

  .transactions-list-item-icon {
    font-size: 1em;
    grid-column: 4;
    padding-left: #{$padding / 3};

    .transactions-list-item-icon-svg {
      height: $name-font-size;
    }
  }

  .transactions-list-item-image {
    font-size: 0;
  }

  .transactions-list-item-letter {
    font-size: #{$image-size / 3};
  }

  .transactions-list-item-name {
    font-family: $display-fonts;
    font-size: $name-font-size;
    grid-row: 2;
    line-height: $name-font-size;
  }
}
</style>