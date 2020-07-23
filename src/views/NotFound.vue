<template>
  <BaseLayout :fill="true">
    <div class="central fill not-found">
      <div class="central-inner">
        <h1 class="s-no-margin">Hmm.</h1>
        <h2 class="s-light-weight">I can't find that.</h2>
        <p>
          <Button icon="home" link="/">Home</Button>
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

.not-found {
  .central-inner {
    max-width: $med-width;
  }
}
</style>
