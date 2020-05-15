const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const ClassinatorData = require('../src/classinator-data')
const RedisConnection = require('../src/redis-connection')
const Redis = require('ioredis')

describe("ClassinatorData", function() {
  beforeEach(function() {
    this.redis = sinon.createStubInstance(Redis)
    sinon.stub(RedisConnection.prototype, 'fetchConnection')
    RedisConnection.prototype.fetchConnection.returns(this.redis)

    this.subject = new ClassinatorData()
  })

  describe("#fetchClasses", function() {
    it("asks Redis for the classes", async function() {
      await this.subject.fetchClasses()
      expect(this.redis.smembers).to.have.been.calledWith('dnd:classinator:classes')
    })

    it("returns the classes from Redis")
  })
})
