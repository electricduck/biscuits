import localforage from 'localforage'

const dbName = 'biscuits'

const store = (name = "") => localforage.createInstance({
  name: dbName,
  storeName: name
})

export const settingsTbl = store('settings')
export const transactionsTbl = store('transations')
export const usersTbl = store('users')