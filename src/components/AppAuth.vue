<template>
  <Page class="app-auth central fill">
    <Panel class="app-auth-panel central-inner">
      <template v-slot:header>
        <ActionBar>
          <ActionBarItem>
            <span v-if="!isSetupOpen">Login</span>
            <span v-if="isSetupOpen">Setup</span>
          </ActionBarItem>
          <template v-slot:left>
            <ActionBarItem v-if="isSetupOpen || state !== 'init'">
              <Button icon="arrow-left" @handle="handleBackButton()">Back</Button>
            </ActionBarItem>
          </template>
          <template v-slot:right>
            <ActionBarItem v-if="!isSetupOpen && state === 'init'">
              <Button icon="cog" @handle="toggleSetup()">Settings</Button>
            </ActionBarItem>
            <ActionBarItem v-if="isSetupOpen">
              <Button icon="check" @handle="saveSetup()">Save</Button>
            </ActionBarItem>
          </template>
          <template v-slot:content>
            <div v-if="isSetupOpen">
              <FormItem title="Client ID">
                <input type="text" placeholder=" " v-model="oauth.clientId" />
              </FormItem>
              <FormItem title="Client Secret">
                <input type="text" placeholder=" " v-model="oauth.clientSecret" />
              </FormItem>
              <div class="d-well s-no-margin">
                <p class="s-sml-size">
                  Due to current limitations in
                  <strong>Monzo</strong>'s API, you must set these keys yourself. Visit
                  <a
                    href="https://developers.monzo.com/apps/home"
                    target="_blank"
                  >Monzo for Developers</a> and add a new client, with the below settings:
                </p>
                <ul class="s-sml-size">
                  <li>
                    <strong>Name:</strong> Biscuits
                  </li>
                  <li>
                    <strong>Redirect URLs:</strong>
                    {{ oauth.callbackUrl }}
                  </li>
                  <li>
                    <strong>Confidentiality:</strong> Confidential
                  </li>
                </ul>
                <p class="s-sml-size">
                  You'll find the
                  <strong>Client ID</strong> and
                  <strong>Client secret</strong> on your newly created OAuth2 app.
                </p>
                <p class="s-sml-size">
                  <strong>Biscuits</strong> does not send these keys anywhere: honest! If you adorn a tin-foil hat, you can
                  <a
                    href="https://github.com/electricduck/biscuits"
                    target="_blank"
                  >sift through the code</a>, or even
                  <a
                    href="https://github.com/electricduck/biscuits"
                    target="_blank"
                  >run it yourself</a>.
                </p>
              </div>
            </div>
          </template>
        </ActionBar>
      </template>
      <div v-if="!isSetupOpen">
        <div v-if="state === 'init'">
          <h1 class="s-accent-color s-center-align s-no-height">
            <font-awesome-icon icon="cookie-bite" />
          </h1>
          <h2 class="s-center-align s-no-margin"><span class="brand"></span></h2>
          <p class="s-center-align s-high-blend">A tasty web client for Monzo</p>
          <p>
            <Button icon="sign-in-alt" :link="oauthUrl" :wide="true" v-if="oauthUrl">Login</Button>
            <Button @handle="toggleSetup()" icon="cog" :wide="true" v-if="!oauthUrl">Setup</Button>
          </p>
        </div>
        <div v-if="state === 'third_party_developer_app.pre_verification'">
          <h1 class="s-accent-color s-center-align">
            <font-awesome-icon icon="mobile" />
          </h1>
          <h2 class="s-center-align">Hold up!</h2>
          <p class="s-center-align">
            You're almost there. Open
            <strong>Monzo</strong> on your phone and approve this login.
          </p>
          <p
            class="s-center-align s-high-blend s-xsm-size"
          >Or don't. I'm just a block of text, not your mother.</p>
          <p>
            <Button @handle="handleAuthRefresh()" icon="check" :wide="true">Approved</Button>
          </p>
        </div>
      </div>
    </Panel>
  </Page>
</template>

<script>
import ActionBar from "@/components/ActionBar.vue";
import ActionBarItem from "@/components/ActionBarItem.vue";
import Button from "@/components/Button.vue";
import FormItem from "@/components/FormItem.vue";
import Page from "@/components/Page.vue";
import Panel from "@/components/Panel.vue";

import setting from "../common/setting";
import { MONZO_CLIENTID, MONZO_CLIENTSECRET } from "../common/setting/keys";

export default {
  components: {
    ActionBar,
    ActionBarItem,
    Button,
    FormItem,
    Page,
    Panel
  },
  computed: {
    oauthUrl: function() {
      if (
        this.oauth.callbackUrl &&
        this.oauth.clientId &&
        this.oauth.clientSecret
      ) {
        return `https://auth.monzo.com/?client_id=${this.oauth.clientId}&redirect_uri=${this.oauth.callbackUrl}&response_type=code`;
      } else {
        return undefined;
      }
    },
    state: function() {
      return this.$store.state.auth.token
        ? this.$store.state.auth.token.scope
        : "init";
    }
  },
  data: function() {
    return {
      retryInterval: null,
      oauth: {
        callbackUrl: `${window.location.protocol}//${window.location.host}/callback`,
        clientId: "",
        clientSecret: ""
      },
      isSetupOpen: false
    };
  },
  methods: {
    handleAuthCallback(route) {
      let code = route.query.code;
      this.$auth.login(code, this.oauth.callbackUrl);
    },
    handleAuthRefresh() {
      this.$auth.refresh();
    },
    handleBackButton() {
      if (this.isSetupOpen) {
        this.loadSetup();
        this.toggleSetup();
      } else {
        this.$auth.logout();
      }
    },
    toggleSetup() {
      this.isSetupOpen = !this.isSetupOpen;
    },
    loadSetup() {
      Promise.all([
        setting.get(MONZO_CLIENTID),
        setting.get(MONZO_CLIENTSECRET)
      ]).then(out => {
        this.oauth.clientId = out[0];
        this.oauth.clientSecret = out[1];
      });
    },
    saveSetup() {
      Promise.all([
        setting.set(MONZO_CLIENTID, this.oauth.clientId),
        setting.set(MONZO_CLIENTSECRET, this.oauth.clientSecret)
      ]).then(() => {
        this.isSetupOpen = false;
      });
    }
  },
  watch: {
    state: {
      immediate: true,
      handler(currentState) {
        if (currentState === "third_party_developer_app.pre_verification") {
          this.retryInterval = setInterval(this.handleAuthRefresh, 2000);
        } else {
          clearInterval(this.retryInterval);
        }
      }
    }
  },

  async mounted() {
    this.loadSetup();

    if (this.$route.path.startsWith("/callback")) {
      this.handleAuthCallback(this.$route);
      this.$router.replace("/");
    }
  },
  destroyed() {
    clearInterval(this.retryInterval);
  }
};
</script>

<style lang="scss">
@import "@/scss/shared/_variables.scss";

.app-auth {
  .app-auth-panel {
    display: inline-block;
    width: 400px;

    .panel-inner {
      padding: #{$padding * 2} $padding;
    }
  }
}
</style>
