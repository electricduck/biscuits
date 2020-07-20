import base from "../base"

const prefix = "/pots"

const pots = {
  async getPots(accountId = 0) {
    return base.get(
      `${prefix}`,
      {
        'current_account_id': accountId
      }
    )
  },
  async getAllPots(accountIds = []) {
    let out = []
    let pots = []

    for (let i = 0; i < accountIds.length; i++) {
      out.push(await base.get(
        `${prefix}`,
        {
          'current_account_id': accountIds[i]
        }
      ))
    }

    for (let i = 0; i < out.length; i++) {
      for (let i2 = 0; i2 < out[i].pots.length; i2++) {
        pots.push(out[i].pots[i2]);
      }
    }

    //console.log(pots)

    return pots
  }
}

export default pots
