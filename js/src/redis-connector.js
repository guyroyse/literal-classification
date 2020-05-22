const Redis = require('ioredis')
const Config = require('./config')

class RedisConnector {
  fetchConnection() {
    if (!this.connection) this.connection = new Redis({
      port: Config.port,
      host: Config.server,
      password: Config.password,
      db: 0,
    })
    return this.connection
  }
}

module.exports = RedisConnector