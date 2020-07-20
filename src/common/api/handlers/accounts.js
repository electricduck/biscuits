import base from "../base"

const prefix = "/accounts"

const accounts = {
  async getAccounts() {
    return base.get(`${prefix}`)
  }
}

export default accounts