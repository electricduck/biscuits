import base from "../base"

const prefix = "/ping"

const ping = {
  async getPing() {
    return base.get(
      `${prefix}`
    )
  },
  async getWhoAmI() {
    return base.get(
      `${prefix}/whoami`
    )
  }
}

export default ping