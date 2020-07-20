import db from "../../common/db"
import transactionsApi from "../../common/api/handlers/transactions"
import { transactionsTbl } from "../../common/db/instances"
import Transactions from "../../models/Transactions"

const transactions = {
  state: () => ({
    allTransactions: new Transactions({})
  }),

  mutations: {
    allTransactions(state, payload) {
      db.set(transactionsTbl, payload.id, payload).then((data) => {
        state.allTransactions = data
      })
    },
    allTransactions_push(state, payload) {
      db.get(transactionsTbl, payload.id).then((data) => {
        db.set(transactionsTbl, data.id, new Transactions({
          data: data.data.concat(payload.data),
          id: data.id,
          lastUpdated: new Date()
        }))
      })
    }
  },

  actions: {
    invokeTransactions(context, accountId) {
      db.get(transactionsTbl, accountId).then((data) => {
        let transactions = new Transactions({});
        let init = (data) ? false : true;
        let before = new Date();
        let since = !init ? data.lastUpdated : new Date("2020-07-01T00:00:00.000Z");

        console.log(since)

        transactionsApi.getTransactions(accountId, since, before).then((data) => {
          let transactionsData = [];

          for (let i = 0; i < data.transactions.length; i++) {
            transactionsData.push(data.transactions[i])
          }

          transactions = new Transactions({
            data: transactionsData,
            id: accountId,
            lastUpdated: new Date(Date.now())
          })

          if(init) {
            context.commit('allTransactions', transactions)
          } else {
            console.log(transactions)
            context.commit('allTransactions_push', transactions)
          }
        })
      })
    }
  },

  getters: {
    allTransactions: state => { return state.allTransactions }
  }
}

export default transactions