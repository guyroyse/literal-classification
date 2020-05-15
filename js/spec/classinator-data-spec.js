const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const ClassinatorData = require('../src/classinator-data')
const RedisConnector = require('../src/redis-connector')
const Redis = require('ioredis')

describe("ClassinatorData", function() {
  beforeEach(function() {
    this.redis = sinon.createStubInstance(Redis)
    sinon.stub(RedisConnector.prototype, 'fetchConnection')
    RedisConnector.prototype.fetchConnection.returns(this.redis)

    this.subject = new ClassinatorData()
  })

  afterEach(function() {
    sinon.restore()
  })

  describe("#fetchClasses", function() {
    it("asks Redis for the classes", async function() {
      this.redis.smembers.resolves([])
      await this.subject.fetchClasses()
      expect(this.redis.smembers).to.have.been.calledWith('dnd:classinator:classes')
    })

    it("returns the classes from Redis", async function() {
      this.redis.smembers.resolves(['foo', 'bar', 'baz', 'qux'])
      let classes = await this.subject.fetchClasses()
      expect(classes).to.have.ordered.members(['bar', 'baz', 'foo', 'qux'])
    })
  })
})
