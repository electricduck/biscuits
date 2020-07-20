import Vue from 'vue'
import Vuex from 'vuex'
import setting from "../common/setting"
import { TOKEN } from "../common/setting/keys"

import accounts from "./modules/accounts"
import balance from "./modules/balance"
import pots from "./modules/pots"
import transactions from "./modules/transactions"

Vue.use(Vuex)

// TODO: Put these in modules. Its a mess!
export default new Vuex.Store({
  modules: {
    accounts,
    balance,
    pots,
    transactions
  },

  state: {
    auth: {
      token: {},
      valid: false
    }
  },

  getters: {
    auth: state => { return state.auth },
    balance: state => { return state.balance },
    balances: state => { return state.balances }
  },

  mutations: {
    auth_setToken(state, payload) {
      state.auth.token = payload
    },
    auth_setValid(state, toggle) {
      state.auth.valid = toggle
    }
  },

  actions: {
    updateAuth(context, payload) {
      setting.set(TOKEN, payload).then(() => {
        let isValid = false;

        if (payload !== null && payload.scope === "third_party_developer_app.verified.ext") {
          isValid = true;
        }

        context.commit('auth_setToken', payload)
        context.commit('auth_setValid', isValid)
      })
    }
  }
})
