export default class Transactions {
  constructor({
    data = null,
    id = ""
  }) {
    this.data = data
    this.id = id
    this.lastUpdated = new Date()
  }
}
