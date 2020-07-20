import Balance from "./Balance"
import Person from "./Person"

const buildOwners = (owners) => {
  let output = ""

  for (let i = 0; i < owners.length; i++) {
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

const title = (type, owners) => {
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
    image = "",
    name = "",
    owners = [new Person({})],
    type = ""
  }) {
    this.accountNumber = accountNumber
    this.balance = new Balance({
      amount: amount,
      currency: currency
    })
    this.created = created
    this.id = id
    this.image = image
    this.owners = owners
    this.title = name || title(type, owners)
    this.type = type
  }
}