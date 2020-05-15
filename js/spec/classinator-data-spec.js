const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const ClassinatorData = require('../src/classinator-data')
const RedisConnector = require('../src/redis-connector')
const Redis = require('ioredis')
const IdGenerator = require('../src/id-generator')

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

  describe("#saveClassination", function() {

    const SAMPLE_CLASSINATION = {
      strength: 11, dexterity: 12, constitution: 13,
      intelligence: 14, wisdom: 15, charisma: 16,
      'class': 'Code Slinger'
    }

    const BADFOOD_UUID = 'baadf00d-beef-baad-baad-baadf00dbeef'

    beforeEach(function() {
      sinon.stub(IdGenerator.prototype, 'generateId')
      IdGenerator.prototype.generateId.returns(BADFOOD_UUID)
    })

    it("saves the classination to redis", function() {
      this.subject.saveClassination(SAMPLE_CLASSINATION)
      expect(this.redis.hmset).to.have.been.calledWith(
        `dnd:classinator:classination:${BADFOOD_UUID}`,
        'strength', 11, 'dexterity', 12, 'constitution', 13,
        'intelligence', 14, 'wisdom', 15, 'charisma', 16,
        'class', 'Code Slinger'
      )
    })

    it("returns the classination with an id", function() {
      let result = this.subject.saveClassination(SAMPLE_CLASSINATION)
      expect(result.strength).to.equal(11)
      expect(result.dexterity).to.equal(12)
      expect(result.constitution).to.equal(13)
      expect(result.intelligence).to.equal(14)
      expect(result.wisdom).to.equal(15)
      expect(result.charisma).to.equal(16)
      expect(result.class).to.equal('Code Slinger')
      expect(result.id).to.equal(BADFOOD_UUID)
    })
  })
})
