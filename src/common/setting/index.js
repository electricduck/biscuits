import db from "../db"
import { settingsTbl } from "../db/instances"

const setting = {
  get(key) {
    return new Promise((resolve) => {
      db.get(settingsTbl, key).then((out) => {
        resolve(out)
      })
    })
  },
  set(key, value) {
    return db.set(settingsTbl, key, value)
  }
}

export default setting