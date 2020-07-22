import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import api from './common/api'
import auth from './common/auth'
import thirdParty from './common/thirdParty'

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.prototype.$auth = auth
Vue.prototype.$store = store

/*window.onerror = function (msg, url, line, col, error) {
  alert(`${msg} ${url} ${line} ${col} ${error} oh no!`)
}*/

thirdParty.FontAwesome()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
