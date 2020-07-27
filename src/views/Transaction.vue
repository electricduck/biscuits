<template>
  <div class="transaction">
    <Map class="transaction-map" />
    <div class="transaction-header">
      <div class="transaction-header-left">
        <img class="transaction-header-image" src="http://placekitten.com/128/128" />
      </div>
      <div class="transaction-header-center">
        <h3 class="s-no-margin transaction-header-title">Title</h3>
        <h5 class="transaction-header-date">Date goes here</h5>
        <p class="s-low-blend s-sml-size transaction-header-description">
          BP OIL UK LIMITED<br />339 HULL ROAD<br />YORK<br />YO10 3LE GBRGBR
        </p>
      </div>
      <div class="transaction-header-right">
        <h2 class="transaction-header-cost">
          <Balance />
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Balance: () => import(/* webpackPrefetch: true */ "@/components/Balance.vue"),
    Map: () => import(/* webpackPrefetch: true */ "@/components/Map.vue")
  },
  data: function() {
    return {
      transaction: {}
    };
  },

  beforeMount() {}
};
</script>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.transaction {
  display: grid;
  grid-template-columns: #{$padding} auto #{$padding};
  grid-template-rows: auto #{$padding} auto 1fr;

  .transaction-header {
    display: grid;
    grid-column: 2;
    grid-row: 2;
    grid-template-columns: auto 1fr;
    grid-template-rows: #{$padding * 1.5} auto;
    z-index: 150;

    .transaction-header-center,
    .transaction-header-right {
      grid-row: 2;

      * {
        margin-block-end: #{$padding / 2};
        margin-block-start: #{$padding / 2};
        //margin-bottom: #{$padding / 3};

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .transaction-header-center {
      grid-column: 2;
    }

    .transaction-header-left {
      grid-column: 1;
      grid-row-start: 1;
      grid-row-end: 3;
    }

    .transaction-header-right {
      grid-column: 3;
    }

    .transaction-header-image {
      border: 3px solid var(--background-color);
      border-radius: var(--radius);
      box-shadow: var(--heavy-shadow);
    }

    .transaction-header-title {
    }
  }

  .transaction-map {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
    height: 300px;
  }
}
</style>