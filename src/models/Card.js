import Balance from "./Balance"
import Person from "./Person"

const buildOwners = (owners) => {
  let output = ""

  for (let i = 0; i < owners.length; i++) {
    console.log(owners[i])
    output += owners[i].shortName

    if(i+2 === owners.length) {
      output += " & "
    } else if(i+1 < owners.length) {
      output += ", "
    }
  }

  output += "'s"

  return output
}

const description = (type, owners) => {
  switch(type) {
    case 'uk_business':
      return "Your Business Account";
    case 'uk_retail':
      return "Your Personal Account";
    case 'uk_retail_joint':
      return `${buildOwners(owners)} Joint Account`;
    case 'uk_retail_plus':
      return "Your Plus Account"
  }
}

export default class Card {
  constructor({
    accountNumber = 0,
    amount = 0,
    created = new Date(),
    currency = "",
    id = "",
    owners = [new Person()],
    type = ""
  }) {
    this.accountNumber = accountNumber
    this.balance = new Balance({
      amount: amount,
      currency: currency
    })
    this.created = created
    this.description = description(type, owners)
    this.id = id
    this.owners = owners
    this.type = type
  }
}