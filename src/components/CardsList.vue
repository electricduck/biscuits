<template>
  <div class="cards-list">
    <router-link
      v-for="card in cards"
      :key="card.id"
      class="cards-list-item"
      :to="`${prefix}${card.id}`"
    >
      <div class="cards-list-item-indicator">
        <font-awesome-icon class="cards-list-item-indicator-svg" icon="chevron-right" />
      </div>
      <Card class="cards-list-item-card" :image="card.image" :type="card.type" />
      <div class="cards-list-item-balance">
        <Balance :id="card.id" :negative-visible="false" :positive-visible="false" />
      </div>
      <div class="cards-list-item-title">{{ card.title }}</div>
    </router-link>
  </div>
</template>

<script>
import Balance from "@/components/Balance.vue";
import Card from "@/components/Card.vue";

export default {
  components: {
    Balance,
    Card
  },
  props: {
    cards: {},
    prefix: {
      default: "/",
      type: String
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.cards-list {
  .cards-list-item {
    border-bottom: 1px solid var(--border-color) !important;
    color: inherit !important;
    display: grid;
    font-weight: inherit;
    grid-template-columns: 30% #{$padding / 1.5} 1fr #{$padding / 1.5} auto;
    grid-template-rows: 1fr auto auto 1fr auto;
    padding: $padding;

    &:focus,
    &.router-link-active {
      .cards-list-item-indicator {
        visibility: visible;
      }
    }

    .cards-list-item-balance,
    .cards-list-item-title {
      display: block;
      grid-column: 3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .cards-list-item-card {
      grid-column: 1;
      grid-row-start: 1;
      grid-row-end: 5;
      width: unset;
    }

    .cards-list-item-balance {
      font-size: 2em;
      line-height: 1;
      grid-row: 2;
    }

    .cards-list-item-indicator {
      color: var(--accent-color);
      display: grid;
      font-size: 1em;
      grid-column: 5;
      grid-row-start: 1;
      grid-row-end: 6;
      visibility: hidden;

      .cards-list-item-indicator-svg {
        grid-row: 2;
      }
    }

    .cards-list-item-title {
      font-size: 0.8em;
      font-weight: 500;
      grid-row: 3;
    }
  }
}
</style>
