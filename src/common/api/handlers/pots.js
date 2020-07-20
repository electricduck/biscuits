import base from "../base"

const prefix = "/pots"

const accounts = {
  async getPots(accountId = 0) {
    return base.get(
      `${prefix}`,
      {
        'current_account_id': accountId
      }
    )
  },
  async getAllPots() {
    return base.get(`${prefix}`)
  }
}

export default accounts
