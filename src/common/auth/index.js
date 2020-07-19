import oauth2 from "../api/handlers/oauth2"
import ping from "../api/handlers/ping"
import setting from "../setting"
import { MONZO_CLIENTID, MONZO_CLIENTSECRET, TOKEN } from "../setting/keys"
import store from "../../store"

const client = async () => {
  let clientId = await setting.get(MONZO_CLIENTID)
  let clientSecret = await setting.get(MONZO_CLIENTSECRET)

  return {
    id: clientId,
    secret: clientSecret
  }
}

const auth = {
  init() {
    return setting.get(TOKEN).then((data) => {
      store.dispatch('updateAuth', data)
    })
  },
  async login(code = "", redirectUri = "") {
    let c = await client()
    return new Promise((resolve) => {
      oauth2.postToken(
        c.id,
        c.secret,
        redirectUri,
        code
      ).then((data) => {
        store.dispatch('updateAuth', data)
        resolve(data)
      })
    })
  },
  async logout() {
    store.dispatch('updateAuth', null)
  },
  async refresh() {
    let c = await client()
    let refreshToken = (await setting.get(TOKEN)).refresh_token;
    return new Promise((resolve) => {
      oauth2.postTokenRefresh(
        c.id,
        c.secret,
        refreshToken
      ).then((data) => {
        store.dispatch('updateAuth', data)
        resolve(data)
      })
    })
  },
  async whoAmI() {
    return ping.getWhoAmI()
  }
}

export default auth