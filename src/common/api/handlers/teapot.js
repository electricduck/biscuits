import base from "../base"

const prefix = "/teapot"

const teapot = {
  async getTeapot() {
    return base.get(`${prefix}`)
  }
}

export default teapot