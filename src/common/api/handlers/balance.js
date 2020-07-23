import base from "../base"

const prefix = "/balance"

const balance = {
  async getBalance(accountId = 0) {
    return base.getJson(
      `${prefix}`,
      {
        'account_id': accountId
      }
    )
  },
  async getBalances(accountIds = []) {
    let out = []

    for (let i = 0; i < accountIds.length; i++) {
      out.push(await base.getJson(
        `${prefix}`,
        {
          'account_id': accountIds[i]
        }
      ))
    }

    return out
  }
}

export default balance
