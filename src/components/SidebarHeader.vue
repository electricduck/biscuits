<template>
  <div class="sidebar-header">
    <ActionBar class="sidebar-header-actions" :transparent="true">
      <template v-slot:left>
        <ActionBarItem class="sidebar-header-actions-home">
          <Button icon="home" link="/">Home</Button>
        </ActionBarItem>
      </template>
      <template v-slot:right>
        <ActionBarItem>
          <Button icon="sign-out-alt">Logout</Button>
        </ActionBarItem>
      </template>
    </ActionBar>
    <Balance :balance="this.$store.state.balance" class="sidebar-header-balance" />
    <div class="sidebar-header-description">
      <strong>Josh Robertson</strong>
    </div>
  </div>
</template>

<script>
import ActionBar from "@/components/ActionBar.vue";
import ActionBarItem from "@/components/ActionBarItem.vue";
import Balance from "@/components/Balance.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    ActionBar,
    ActionBarItem,
    Balance,
    Button
  }
}
</script>

<style lang="scss">
@import "@/scss/shared/_mixins.scss";
@import "@/scss/shared/_variables.scss";

.sidebar-header {
  background-color: var(--accent-color);
  color: var(--accent-fg-color);
  display: grid;
  font-size: 60px;
  grid-template-columns: auto;
  grid-template-rows: auto 40px auto auto;
  line-height: 1;
  padding: $padding;
  text-align: left;

  .sidebar-header-actions {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row: 1;
    margin: -#{$padding};
    margin-bottom: 0;

    .sidebar-header-actions-home {
      display: none;

      @include respond-to(large) {
        display: grid;
      }
    }
  }

  .sidebar-header-balance {
    grid-row: 3;
  }

  .sidebar-header-description {
    font-size: 0.3em;
    grid-row: 4;
    line-height: 1.4;
  }
}
</style>
