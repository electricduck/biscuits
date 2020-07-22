<template>
  <Modal class="app-main-buffer" v-if="!done">
    <Page>
      <h1 class="app-main-buffer-spinner s-center-align">
        <font-awesome-icon icon="spinner" pulse />
      </h1>
      <h2 class="s-center-align s-no-margin">Loading</h2>
      <h4 class="s-center-align s-high-blend">Just crunching some data</h4>
      <ul class="app-main-buffer-load-list">
        <li
          class="app-main-buffer-load-list-item"
          :class="{ 'app-main-buffer-load-list-item--loaded' : pong }">
          <span class="app-main-buffer-load-list-item-name">Monzo</span>
          <span class="app-main-buffer-load-list-item-icon">
            <font-awesome-icon icon="check" />
          </span>
        </li>
        <li
          v-for="item in buffer"
          :key="item.key"
          class="app-main-buffer-load-list-item"
          :class="{ 'app-main-buffer-load-list-item--loaded' : $store.state[item.key].loaded }"
        >
          <span class="app-main-buffer-load-list-item-name">{{ item.name }}</span>
          <span class="app-main-buffer-load-list-item-icon">
            <font-awesome-icon icon="check" />
          </span>
        </li>
      </ul>
    </Page>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import Page from "@/components/Page.vue";

export default {
  components: {
    Modal,
    Page
  },
  computed: {
    done: function() {
      if(
        this.$store.state[this.buffer[0].key].loaded &&
        this.$store.state[this.buffer[1].key].loaded &&
        this.$store.state[this.buffer[2].key].loaded &&
        this.$store.state[this.buffer[3].key].loaded // TODO: Better way of doing this
      ) {
        return true
      } else {
        return false
      }
    }
  },
  data: function() {
    return {
      buffer: [
        {
          dispatch: "invokeAccounts",
          key: "accounts",
          name: "Accounts"
        },
        {
          dispatch: "invokeBalances",
          key: "balance",
          name: "Balance"
        },
        {
          dispatch: "invokeDucks",
          key: "ducks",
          name: "Ducks"
        },
        {
          dispatch: "invokeTransactions",
          key: "transactions",
          name: "Transactions"
        }
      ],
      loaded: false,
      pong: false
    };
  },
  methods: {
    init() {
      this.$api.ping.getPing().then((data) => {
        if(data.ping === "pong") {
          this.pong = true
          for (let i = 0; i < this.buffer.length; i++) {
            this.$store.dispatch(this.buffer[i].dispatch);
          }
        }
      })
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
.app-main-buffer {
  backdrop-filter: blur(10px);

  .modal {
    background-color: var(--accent-color) !important;
    
    .page {
      color: var(--accent-fg-color);
    }
  }

  .app-main-buffer-spinner {
    opacity: 0.6;
  }

  .app-main-buffer-load-list {
    list-style: none;
    margin-left: 0;
    margin-right: 0;

    .app-main-buffer-load-list-item {
      display: grid;
      grid-template-columns: 1fr auto;

      &.app-main-buffer-load-list-item--loaded {
        .app-main-buffer-load-list-item-icon {
          opacity: 1;
        }
      }

      .app-main-buffer-load-list-item-name {
        font-weight: 700;
      }

      .app-main-buffer-load-list-item-icon {
        opacity: 0.1;
      }
    }
  }
}
</style>