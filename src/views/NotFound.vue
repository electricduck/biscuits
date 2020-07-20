<template>
  <Page class="fill home central">
    <div class="central-inner">
      <h1 class="s-no-margin">Hmm.</h1>
      <h2 class="s-light-weight">I can't find that.</h2>
      <p>
        <Button icon="home" link="/">Home</Button>
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
