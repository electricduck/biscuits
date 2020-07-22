import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:accountId',
    name: 'Transactions',
    component: () => import(/* webpackChunkName: "about" */ '../views/Transactions.vue'),
    children: [
      {
        path: ':transactionId',
        name: 'Transaction',
        component: () => import(/* webpackChunkName: "about" */ '../views/Transaction.vue'),
        meta: {
          ui: {
            close: '/:accountId'
          }
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
