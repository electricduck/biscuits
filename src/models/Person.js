export default class Person {
  constructor({
    fullName = "",
    id = "",
    shortName = ""
  }) {
    this.fullName = fullName
    this.id = id
    this.shortName = shortName
  }
}