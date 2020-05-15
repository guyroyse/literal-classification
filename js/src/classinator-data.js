const RedisConnector = require('./redis-connector')
const IdGenerator = require('./id-generator')

class ClassinatorData {
  constructor() {
    this.redisConnection = new RedisConnector()
    this.redis = this.redisConnection.fetchConnection()

    this.idGenerator = new IdGenerator()
  }

  async fetchClasses() {
    let classes = await this.redis.smembers('dnd:classinator:classes')
    return classes.sort()
  }

  saveClassination(classination) {
    let id = this.idGenerator.generateId()
    let key = `dnd:classinator:classination:${id}`
    this.redis.hmset(key,
      'strength', classination.strength, 
      'dexterity', classination.dexterity,
      'constitution', classination.constitution,
      'intelligence', classination.intelligence,
      'wisdom', classination.wisdom,
      'charisma', classination.charisma,
      'class', classination.class)
    classination.id = id
    return classination
  }

}

module.exports = ClassinatorData
