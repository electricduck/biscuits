import Vue from 'vue'
import Vuex from 'vuex'
import setting from "../common/setting"
import { TOKEN } from "../common/setting/keys"
import accountsApi from "../common/api/handlers/accounts"
import balanceApi from "../common/api/handlers/balance"
import Balance from "../models/Balance"
import Card from "../models/Card"
import Person from "../models/Person"

Vue.use(Vuex)

// TODO: Put these in modules. Its a mess!
export default new Vuex.Store({
  state: {
    accounts: [],
    auth: {
      token: {},
      valid: false
    },
    balance: new Balance({}),
    balances: []
  },

  getters: {
    accounts: state => { return state.accounts },
    auth: state => { return state.auth },
    balances: state => { return state.balances }
  },

  mutations: {
    accounts_set(state, payload) {
      state.accounts = payload
    },
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
    updateAccounts(context) {
      accountsApi.getAccounts().then((data) => {
        let accounts = [];

        data.accounts.forEach(account => {
          let owners = []

          account.owners.forEach(owner => {
            owners.push(new Person({
              fullName: owner.preferred_name,
              id: account.id,
              shortName: owner.preferred_first_name
            }))
          })

          accounts.push(
            new Card({
              accountNumber: account.account_number,
              amount: 0,
              created: new Date(account.created),
              currency: "GBP",
              id: account.id,
              owners: owners,
              type: account.type
            })
          );
        });

        accounts = accounts.sort((a, b) => {
          if (a.created > b.created) return 1;
          if (a.created < b.created) return -1;
          return 0;
        });

        context.commit('accounts_set', accounts)
        context.dispatch('updateBalances', accounts)
      })
    },
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
    updateBalances(context, payload) {
      let accountIds = []
      let newBalances = []
      let totalBalance = 0

      for (let i = 0; i < payload.length; i++) {
        accountIds.push(payload[i].id)
      }

      balanceApi.getBalances(accountIds).then((data) => {
        data.forEach((o) => {
          return o
        })

        /*for (let i = 0; i < data.length; i++) {
          newBalances.push(new Balance({
            amount: data[i].balance,
            currency: data[i].currency,
            id: accountIds[i]
          }))

          totalBalance += parseInt(data[i].total_balance)
        }*/

        context.commit(
        'balance_set',
          new Balance({
            amount: totalBalance,
            currency: "GBP"
          })
        )
        context.commit('balances_set', newBalances)
      })
    }
  }
})
