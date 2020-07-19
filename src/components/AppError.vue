<template>
  <Page class="app-error fill">
    <Panel class="app-error-panel">
      <h2 class="s-no-margin">Oh balls.</h2>
      <h3>Something went wrong.</h3>
      <code v-html="error.stack">
        
      </code>
      <p class="s-sml-size">
        Don't fret, its probably just a glitch.<br />But if the error does persist, <a href="">report a bug on Github</a>.
      </p>
      <p>
      <Button @handle="reload()" icon="sync" :transparent="true">Reload</Button>
      </p>
    </Panel>
  </Page>
</template>

<script>
import Button from "@/components/Button.vue";
import Page from "@/components/Page.vue";
import Panel from "@/components/Panel.vue";

export default {
  components: {
    Button,
    Page,
    Panel
  },
  methods: {
    reload() {
      window.location.reload(true); 
    }
  },
  props: {
    error: null
  }
}
</script>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.app-error {
  background-color: var(--overlay-color);
  display: grid;
  grid-template-columns: 1fr $padding auto $padding 1fr;
  grid-template-rows: 1fr $padding auto $padding 1fr;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  .app-error-panel {
    background-color: var(--accent-color);
    color: var(--accent-fg-color);
    display: inline-block;
    grid-column: 3;
    grid-row: 3;
    max-width: $sml-width;

    a {
      border-color: inherit;
      color: inherit;
    }
  }
}
</style>