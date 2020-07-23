import base from "../base"

const prefix = "/accounts"

const accounts = {
  async getAccounts() {
    return base.getJson(`${prefix}`)
  }
}

export default accounts
