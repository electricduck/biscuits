import base from "../base"

const prefix = "/transactions"

const transactions = {
  async getTransactions(
    accountId = 0,
    since = new Date(),
    before = new Date()
  ) {
    return base.get(
      `${prefix}`,
      {
        'account_id': accountId,
        'before': before.toJSON(),
        'since': since.toJSON()
      }
    )
  },
  async getAllTransactions(
    accountIds = [],
    since = new Date(),
    before = new Date()
  ) {
    let out = []

    for (let i = 0; i < accountIds.length; i++) {
      out.push(await this.getTransactions(accountIds[i], since, before))
    }

    return out
  }
}

export default transactions