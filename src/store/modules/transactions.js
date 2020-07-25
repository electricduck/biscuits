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
      accountsApi.getAccounts().then((accountsFromApi) => {
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
            let now = new Date();
            let init = (dbPromise[i]) ? false : true;
            let last90Days = new Date(now.setDate(now.getDate()-89));
            let lastAllDays = new Date("2015-10-30T00:00:00.000Z"); // https://monzo.com/blog/2015/10/30/we-are-ready
            let before = now;
            let since = !init ? last90Days : lastAllDays;

            apiPromises.push(transactionsApi.getTransactions(accountIds[i], since, before))
          }

          Promise.all(apiPromises).then((apiPromise) => {
            for (let i2 = 0; i2 < apiPromise.length; i2++) {
              let transactionsFromApi = apiPromise[i2].transactions;
              let hasData = dbPromise[i2] ? true : false;
              let transactionsData = hasData ? dbPromise[i2].data : transactionsFromApi;

              if(hasData) {
                for (let i3 = 0; i3 < transactionsFromApi.length; i3++) {
                  let foundTransactionInDb = transactionsData.findIndex(t => t.id === transactionsFromApi[i3].id)

                  if(foundTransactionInDb > -1) {
                    transactionsData[foundTransactionInDb] = transactionsFromApi[i3]
                  } else {
                    transactionsData.push(transactionsFromApi[i3])
                  }

                  // TODO: Handle removed items
                }
              }

              let transactions =
                new Transactions({
                  data: transactionsData,
                  id: accountIds[i2]
                })

              context.commit('allTransactions_setTransaction', transactions)

              if((i2+1) === apiPromise.length) {
                context.commit('loadedTransactions', true)
              }
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