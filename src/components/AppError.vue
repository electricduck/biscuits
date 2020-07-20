<template>
  <Modal class="app-error">
    <Page>
      <h2 class="s-no-margin">Oh balls.</h2>
      <h3>Something went wrong.</h3>
      <code>{{ error.stack }}</code>
      <p class="s-sml-size">
        Don't fret, its probably just a glitch.
        <br />But if the error does persist,
        <a
          href="https://github.com/electricduck/biscuits/issues/new"
          target="_blank"
        >report a bug on Github</a>.
      </p>
      <p>
        <Button @handle="reload()" icon="sync" :transparent="true">Reload</Button>
      </p>
    </Page>
  </Modal>
</template>

<script>
import Button from "@/components/Button.vue";
import Modal from "@/components/Modal.vue";
import Page from "@/components/Page.vue";

export default {
  components: {
    Button,
    Modal,
    Page
  },
  methods: {
    reload() {
      window.location.reload(true);
    }
  },
  props: {
    error: null
  }
};
</script>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.app-error .modal {
  background-color: var(--accent-color) !important;
  color: var(--accent-fg-color) !important;

  a {
    border-color: inherit;
    color: inherit;
  }
}
</style>