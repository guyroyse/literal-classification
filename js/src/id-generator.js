const UUID = require('uuid')

class IdGenerator {
  generateId() {
    return UUID.v4()
  }
}

module.exports = IdGenerator