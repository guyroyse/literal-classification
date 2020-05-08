const axios = require('axios')

const QRNG_URL = "https://qrng.anu.edu.au/API/jsonI.php?type=uint8&length=576"

class Shoe {
  constructor() {
    this.numbers = []
  }

  async start() {
    await this.fetchNumbers()
  }

  async getNumber() {
    if (this.numbers.length === 1) {
      await this.fetchNumbers()
    }
    return this.numbers.shift()
  }

  async fetchNumbers() {
    let response = await axios.get(QRNG_URL)
    this.numbers = this.numbers.concat(response.data.data)
  }
}

module.exports = Shoe
