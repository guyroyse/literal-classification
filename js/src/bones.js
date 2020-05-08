class Bones {
  constructor(shoe) {
    this.shoe = shoe
  }

  async roll(quantity) {
    let numbers = await this.fetchNumbers(quantity)
    return numbers.map(number => number % 6 + 1)
  }

  async fetchNumbers(quantity) {
    let numbers = []
    while (numbers.length < quantity) {
      let number = await this.shoe.getNumber()
      if (number <= 251) numbers.push(number)
    }
    return numbers
  }
}

module.exports = Bones
