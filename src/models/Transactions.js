export default class Transactions {
  constructor({
    data = null,
    id = "",
    lastUpdated = new Date()
  }) {
    this.data = data
    this.id = id
    this.lastUpdated = lastUpdated
  }
}
