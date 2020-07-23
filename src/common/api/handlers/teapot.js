import base from "../base"

const prefix = "/teapot"

const teapot = {
  async getTeapot() {
    return (await base.get(`${prefix}`, {}, false, false)).text()
  }
}

export default teapot
