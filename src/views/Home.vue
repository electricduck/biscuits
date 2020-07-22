<template>
  <Page class="fill home central">
    <div class="central-inner">
      <h1 class="s-no-margin">Hello.</h1>
      <h2 class="s-light-weight">Welcome to <span class="brand"></span>.</h2>
      <p>
        <Button :link="`/transactions/${this.$store.state.accounts.defaultAccount.id}`">
          Go to my Personal account
        </Button>
      </p>
    </div>
  </Page>
</template>

<script>
import Button from "@/components/Button.vue";
import Page from "@/components/Page.vue";

export default {
  components: {
    Button,
    Page
  }
};
</script>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.home {
  .central-inner {
    max-width: $med-width;
  }
}
</style>
