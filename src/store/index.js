import Vue from 'vue'
import Vuex from 'vuex'
import setting from "../common/setting"
import { TOKEN } from "../common/setting/keys"
import accountsApi from "../common/api/handlers/accounts"
import balanceApi from "../common/api/handlers/balance"
import Balance from "../models/Balance"

Vue.use(Vuex)

// TODO: Put these in modules. Its a mess!
export default new Vuex.Store({
  state: {
    auth: {
      token: {},
      valid: false
    },
    balance: new Balance({}),
    balances: []
  },

  getters: {
    auth: state => { return state.auth },
    balances: state => { return state.balances }
  },

  mutations: {
    auth_setToken(state, payload) {
      state.auth.token = payload
    },
    auth_setValid(state, toggle) {
      state.auth.valid = toggle
    },
    balance_set(state, payload) {
      state.balance = payload
    },
    balances_set(state, payload) {
      state.balances = payload
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
    },
    updateBalances(context) {
      accountsApi.getAccounts().then((data) => {
        let accountIds = []
        let newBalances = []
        let totalBalance = new Balance({
          currency: "GBP"
        })

        for (let i = 0; i < data.accounts.length; i++) {
          accountIds.push(data.accounts[i].id)
        }

        balanceApi.getBalances(accountIds).then((data) => {
          for (let i = 0; i < data.length; i++) {
            newBalances.push(new Balance({
              amount: data[i].balance,
              currency: data[i].currency,
              id: accountIds[i]
            }))

            totalBalance.amount += parseInt(data[i].total_balance)
          }

          context.commit('balance_set', totalBalance)
          context.commit('balances_set', newBalances)
        })
      })
    }
  }
})
