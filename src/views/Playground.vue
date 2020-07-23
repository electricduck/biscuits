<template>
  <BaseLayout :fill="true">
    <div class="fill playground">
      <Panel class="playground-in" :pad="true" :scroll="false">
        <FormItem class="playground-in-url-input" title="URL">
          <input placeholder=" " type="text" v-model="vm.url" />
        </FormItem>
        <FormItem class="playground-in-method-select" title="Method">
          <select v-model="vm.method">
            <option value="get">GET</option>
            <option value="post">POST</option>
            <option value="put">PUT</option>
          </select>
        </FormItem>
        <FormItem class="playground-in-data" title="Data">
          <textarea placeholder=" " v-model="vm.data"></textarea>
        </FormItem>
        <Button
          @handle="run()"
          class="playground-in-run-button"
          :disabled="$v.$invalid"
          icon="play"
        >Run</Button>
      </Panel>
      <Panel class="playground-out" :pad="true" :scroll="false" v-if="result.status > 0">
        <template v-slot:header>
          <ActionBar
            class="playground-out-status"
            :class="[
              { 'playground-out-status--failure' : result.status >= 400 && result.status < 600 },
              { 'playground-out-status--success' : result.status >= 200 && result.status < 400 }
            ]"
          >
            <ActionBarItem>{{ result.status }}</ActionBarItem>
          </ActionBar>
        </template>
        <div class="playground-out-data" v-html="result.data"></div>
      </Panel>
    </div>
  </BaseLayout>
</template>

<script>
import api from "@/common/api/base";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    ActionBar: () =>
      import(/* webpackPrefetch: true */ "@/components/ActionBar.vue"),
    ActionBarItem: () =>
      import(/* webpackPrefetch: true */ "@/components/ActionBarItem.vue"),
    BaseLayout: () =>
      import(/* webpackPrefetch: true */ "@/components/Layouts/BaseLayout.vue"),
    Button: () => import(/* webpackPrefetch: true */ "@/components/Button.vue"),
    FormItem: () =>
      import(/* webpackPrefetch: true */ "@/components/FormItem.vue"),
    Panel: () => import(/* webpackPrefetch: true */ "@/components/Panel.vue")
  },
  data: function() {
    return {
      result: {
        data: "",
        status: 0
      },
      vm: {
        data: "",
        method: "get",
        url: ""
      }
    };
  },
  methods: {
    handleError(message) {
      this.result.data = `⚠️ ${message}`;
      this.result.status = 400;
    },
    request(url, method, data) {
      switch (method.toLowerCase()) {
        case "post":
          return api.post(url, data, true, false);
        case "put":
          return api.put(url, data, true, false);
        case "get":
        default:
          return api.get(url, data, true, false);
      }
    },
    run() {
      try {
        let json = {};

        if (this.vm.data) {
          json = JSON.parse(this.vm.data);
        }

        this.request(this.vm.url, this.vm.method, json).then(data => {
          this.result.status = data.status;
          data.text().then(output => {
            try {
              this.result.data = JSON.parse(output);
            } catch {
              this.result.data = output;
            }
          });
        });
      } catch (e) {
        this.handleError(e);
      }
    }
  },
  validations: {
    vm: {
      url: {
        required
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.playground {
  display: grid;
  grid-template-rows: auto 1fr;
  padding: $padding;
  row-gap: #{$padding / 2};

  .panel {
    &.playground-in .panel-inner {
      column-gap: #{$padding / 2};
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: auto 1fr auto;
      row-gap: #{$padding / 2};

      .playground-in-run-button,
      .playground-in-data {
        grid-column-start: 1;
        grid-column-end: 3;
      }

      .playground-in-method-select,
      .playground-in-url-input {
        grid-row: 1;
      }

      .playground-in-run-button {
        grid-row: 3;
      }

      .playground-in-data {
        grid-row: 2;

        textarea {
          font-family: monospace;
        }
      }

      .playground-in-method-select {
        grid-column: 2;
      }

      .playground-in-url-input {
        grid-column: 1;
      }
    }

    &.playground-out {
      background-color: var(--code-bg-color);
      color: var(--code-fg-color);

      .playground-out-data {
        font-family: monospace;
        white-space: pre;
      }

      .playground-out-status {
        &.playground-out-status--failure {
          background-color: var(--negative-color);
        }

        &.playground-out-status--success {
          background-color: var(--positive-color);
        }
      }
    }
  }
}
</style>