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
  }
}

export default transactions