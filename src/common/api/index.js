import accounts from "./handlers/accounts"
import balance from "./handlers/balance"
import oauth2 from "./handlers/oauth2"
import ping from "./handlers/ping"

const api = {
  accounts,
  balance,
  oauth2,
  ping
}

export default api