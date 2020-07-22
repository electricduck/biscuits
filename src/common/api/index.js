import accounts from "./handlers/accounts"
import balance from "./handlers/balance"
import oauth2 from "./handlers/oauth2"
import ping from "./handlers/ping"
import pots from "./handlers/pots"
import teapot from "./handlers/teapot"

const api = {
  accounts,
  balance,
  oauth2,
  ping,
  pots,
  teapot
}

export default api
