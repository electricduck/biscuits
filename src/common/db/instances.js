import localforage from 'localforage'

const dbName = 'biscuits'

export const settingsTbl = localforage.createInstance({
  name: dbName,
  storeName: 'settings'
})