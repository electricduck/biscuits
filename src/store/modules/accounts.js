import accountsApi from "../../common/api/handlers/accounts"
import Card from "../../models/Card"
import Person from "../../models/Person"

const accounts = {
  state: () => ({
    allAccounts: [],
    defaultAccount: new Card({}),
    loaded: false
  }),

  mutations: {
    allAccounts(state, payload) {
      state.allAccounts = payload
    },
    defaultAccount(state, payload) {
      state.defaultAccount = payload
    },
    loadedAccounts(state, toggle) {
      state.loaded = toggle
    }
  },

  actions: {
    invokeAccounts(context) {
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

        context.commit('allAccounts', accounts)
        context.commit('defaultAccount', accounts[0])
        context.commit('loadedAccounts', true)
      })
    },
  },

  getters: {
    allAccounts: state => { return state.allAccounts },
    defaultAccount: state => { return state.defaultAccount },
    loadedAccounts: state => { return state.loaded }
  }
}

export default accounts