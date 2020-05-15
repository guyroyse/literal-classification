const RedisConnection = require('../src/redis-connection')

class ClassinatorData {
  constructor() {
    this.redisConnection = new RedisConnection()
    this.redis = this.redisConnection.fetchConnection()
  }

  async fetchClasses() {
    await this.redis.smembers('dnd:classinator:classes')
  }

}

module.exports = ClassinatorData
