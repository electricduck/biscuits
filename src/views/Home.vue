<template>
  <BaseLayout :fill="true" :header-visible="false">
    <div class="central fill home">
      <div class="central-inner">
        <h1 class="s-no-margin">Hello.</h1>
        <h2 class="s-light-weight">
          Welcome to
          <span class="brand"></span>.
        </h2>
        <p>
          <Button
            :link="`/transactions/${this.$store.state.accounts.defaultAccount.id}`"
          >Go to my Personal account</Button>
        </p>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
export default {
  components: {
    BaseLayout: () =>
      import(/* webpackPrefetch: true */ "@/components/Layouts/BaseLayout.vue"),
    Button: () =>
      import(/* webpackPrefetch: true */ "@/components/Button.vue"),
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
