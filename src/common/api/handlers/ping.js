import base from "../base"

const prefix = "/ping"

const ping = {
  async getPing() {
    return base.getJson(
      `${prefix}`
    )
  },
  async getWhoAmI() {
    return base.getJson(
      `${prefix}/whoami`
    )
  }
}

export default ping
