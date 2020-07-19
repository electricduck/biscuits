import Vue from 'vue'
import Vuex from 'vuex'
import setting from "../common/setting"
import { TOKEN } from "../common/setting/keys"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      token: {},
      valid: false
    }
  },

  getters: {
    auth: state => { return state.auth }
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
