import { getCurrencySymbol } from "../common/utils"

export default class Balance {
  constructor({
    amount = 0,
    currency = "",
    id = ""
  }) {
    this.absolute = (Math.trunc(amount / 100)).toString()
    this.amount = amount
    this.currency = currency
    this.decimal = (Math.round(((amount / 100) % 1) * 100)).toString().padStart(2, '0')
    this.id = id
    this.symbol = getCurrencySymbol(currency)
  }
}