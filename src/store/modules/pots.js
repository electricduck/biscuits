import accountsApi from "../../common/api/handlers/accounts"
import potsApi from "../../common/api/handlers/pots"
import Card from "../../models/Card"

const pots = {
  state: () => ({
    allPots: [],
    loaded: false
  }),

  mutations: {
    allPots(state, payload) {
      state.allPots = payload
    },
    loaded(state) {
      state.loaded = true
    }
  },

  actions: {
    invokePots(context) {
      accountsApi.getAccounts().then((data) => {
        let accountIds = []
        let pots = [];

        for (let i = 0; i < data.accounts.length; i++) {
          accountIds.push(data.accounts[i].id)
        }

        potsApi.getAllPots(accountIds).then((data) => {
          //console.log(data)
  
          for (let i = 0; i < data.length; i++) {
            if(!data[i].deleted) {
              pots.push(
                new Card({
                  id: data[i].id,
                  image: data[i].cover_image_url || data[i].style,
                  name: data[i].name,
                  type: 'pot'
                })
              )
            }
          }
  
          context.commit('allPots', pots)
          context.commit('loaded')
        })
      })
    }
  },

  getters: {
    allPots: state => { return state.allPots },
    loaded: state => { return state.loaded }
  }
}

export default pots