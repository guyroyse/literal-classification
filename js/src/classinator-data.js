const RedisConnector = require('../src/redis-connector')

class ClassinatorData {
  constructor() {
    this.redisConnection = new RedisConnector()
    this.redis = this.redisConnection.fetchConnection()
  }

  async fetchClasses() {
    let classes = await this.redis.smembers('dnd:classinator:classes')
    return classes.sort()
  }

}

module.exports = ClassinatorData
