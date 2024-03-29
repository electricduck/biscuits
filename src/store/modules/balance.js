import accountsApi from "../../common/api/handlers/accounts"
import balanceApi from "../../common/api/handlers/balance"
import potsApi from "../../common/api/handlers/pots"
import Balance from "../../models/Balance"

const balance = {
  state: () => ({
    allBalances: [],
    loaded: false,
    totalBalance: new Balance({})
  }),

  mutations: {
    allBalances(state, payload) {
      state.allBalances = payload
    },
    loadedBalance(state, toggle) {
      state.loaded = toggle
    },
    totalBalance(state, payload) {
      state.totalBalance = payload
    }
  },

  actions: {
    invokeBalances(context) {
      accountsApi.getAccounts().then((data) => {
        let accountIds = []
        let balances = []
        let totalBalance = 0

        for (let i = 0; i < data.accounts.length; i++) {
          accountIds.push(data.accounts[i].id)
        }

        Promise.all([
          balanceApi.getBalances(accountIds),
          potsApi.getAllPots(accountIds)
        ]).then((data) => {
          for (let i = 0; i < data.length; i++) {
            for (let i2 = 0; i2 < data[i].length; i2++) {
              let accountBalance = parseInt(data[i][i2].total_balance)
              
              balances.push(new Balance({
                amount: accountBalance,
                currency: data[i][i2].currency,
                id: data[i][i2].id || accountIds[i2]
              }))
    
              if(accountBalance) {
                totalBalance += accountBalance
              }
            }
          }

          context.commit(
            'totalBalance',
            new Balance({
              amount: totalBalance,
              currency: "GBP"
            })
          )

          context.commit('allBalances', balances)
          context.commit('loadedBalance', true)
        })
      })
    }
  },

  getters: {
    allBalances: state => { return state.allBalances },
    loadedBalance: state => { return state.loaded },
    totalBalance: state => { return state.totalBalance }
  }
}

export default balance