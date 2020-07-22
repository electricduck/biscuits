/**
 * And he waddled away
 * Waddle waddle
 * 'til the very next day
 * Bum bum bum bumb bum da-bum
 **/

const ducks = {
  state: () => ({
    loaded: false
  }),

  mutations: {
    loadedDucks(state, toggle) {
      state.loaded = toggle
    }
  },

  actions: {
    invokeDucks(context) {
      let duck = `  __
<(o )___
 ( ._> /
  \`---'`
      console.log(duck)
      context.commit('loadedDucks', true)
    }
  },

  getters: {
    loadedDucks: state => { return state.loaded }
  }
}

export default ducks