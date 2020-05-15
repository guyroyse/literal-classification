const Redis = require('ioredis')

class RedisConnector {
  fetchConnection() {
    if (!this.connection) this.connection = new Redis()
    return this.connection
  }
}

module.exports = RedisConnector