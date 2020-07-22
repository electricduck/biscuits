import db from "../../common/db"
import accountsApi from "../../common/api/handlers/accounts"
import transactionsApi from "../../common/api/handlers/transactions"
import { transactionsTbl } from "../../common/db/instances"
import Transactions from "../../models/Transactions"

const transactions = {
  state: () => ({
    allTransactions: [],
    loaded: false
  }),

  mutations: {
    allTransactions_setTransaction(state, payload) {
      let id = payload.id
      let transactions = payload

      db.set(transactionsTbl, id, transactions).then((data) => {
        id = data.id
        transactions = data

        let found = state.allTransactions.find(t => t.id === id)

        if (found) {
          found.transactions = transactions
        } else {
          state.allTransactions.push(transactions)
        }
      })
    },
    loadedTransactions(state, toggle) {
      state.loaded = toggle
    }
  },

  actions: {
    invokeTransactions(context) {
      // TODO: Put into another method so we can use awaits instead of this horrible promise chain?
      accountsApi.getAccounts().then((accountsFromApi) => {
        //let allTransactions = []
        let accountIds = []
        let dbPromises = []
        let apiPromises = []

        for (let i = 0; i < accountsFromApi.accounts.length; i++) {
          let accountId = accountsFromApi.accounts[i].id
          accountIds.push(accountId)
          dbPromises.push(db.get(transactionsTbl, accountId))
        }

        Promise.all(dbPromises).then((dbPromise) => {
          for (let i = 0; i < dbPromise.length; i++) {
            let init = (dbPromise[i]) ? false : true;
            let before = new Date();
            let since = !init ? dbPromise[i].lastUpdated : new Date("2020-05-20T00:00:00.000Z");

            apiPromises.push(transactionsApi.getTransactions(accountIds[i], since, before))
          }

          Promise.all(apiPromises).then((apiPromise) => {
            for (let i2 = 0; i2 < apiPromise.length; i2++) {
              let transactionsData = [];

              for (let i3 = 0; i3 < apiPromise[i2].transactions.length; i3++) {
                transactionsData.push(apiPromise[i2].transactions[i3])
              }

              let transactions =
                new Transactions({
                  data: dbPromise[i2] ? dbPromise[i2].data.concat(transactionsData) : transactionsData,
                  id: accountIds[i2],
                  lastUpdated: new Date(Date.now())
                })

              context.commit('allTransactions_setTransaction', transactions)
              context.commit('loadedTransactions', true)
            }
          })
        })
      })
    }
  },

  getters: {
    allTransactions: state => { return state.allTransactions },
    loadedTransactions: state => { return state.loaded }
  }
}

export default transactions