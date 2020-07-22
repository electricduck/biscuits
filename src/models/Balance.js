import { getCurrencySymbol } from "../common/utils"

export default class Balance {
  constructor({
    amount = 0,
    currency = "",
    id = ""
  }) {
    this.amount = Math.abs(amount)
    this.currency = currency
    this.id = id
    this.negative = (amount < 0) ? true : false

    this.absolute = (Math.trunc(this.amount / 100)).toString()
    this.decimal = (Math.round(((this.amount / 100) % 1) * 100)).toString().padStart(2, '00')
    this.symbol = getCurrencySymbol(currency)
  }
}
