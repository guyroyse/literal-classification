const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const AbilityGenerator = require('../src/ability-generator')
const Bones = require('../src/bones')

describe("AbilityGenerator", function() {
  beforeEach(function() {
    sinon.stub(Bones.prototype, 'roll')
    this.subject = new AbilityGenerator()
  })

  afterEach(function () {
    sinon.restore()
  })  

  describe("#rollAbilities", function() {
    beforeEach(function() {
      Bones.prototype.roll.onCall(0).resolves([1, 1, 1, 1])
      Bones.prototype.roll.onCall(1).resolves([2, 2, 2, 2])
      Bones.prototype.roll.onCall(2).resolves([3, 3, 3, 3])
      Bones.prototype.roll.onCall(3).resolves([4, 4, 4, 4])
      Bones.prototype.roll.onCall(4).resolves([5, 5, 5, 5])
      Bones.prototype.roll.onCall(5).resolves([6, 6, 6, 6])
    })

    it("returns all six abilities", async function() {
      let abilities = await this.subject.rollAbilities()
      expect(abilities).to.have.all.keys('strength', 'dexterity', 
        'constitution', 'intelligence', 'wisdom', 'charisma')
    })

    it("returns expected numbers", async function() {
      let abilities = await this.subject.rollAbilities()
      expect(abilities.strength).to.equal(3)
      expect(abilities.dexterity).to.equal(6)
      expect(abilities.constitution).to.equal(9)
      expect(abilities.intelligence).to.equal(12)
      expect(abilities.wisdom).to.equal(15)
      expect(abilities.charisma).to.equal(18)
    })
  })

  describe("#rollAbility", function() {

    beforeEach(function() {
      Bones.prototype.roll.resolves([1, 1, 1, 1])
    })

    afterEach(function() {
      Bones.prototype.roll.resetBehavior()
    })

    it("returns a number", async function() {
      let score = await this.subject.rollAbility()
      expect(score).to.be.a('number')
    })

    it("rolls 4 dice", async function() {
      await this.subject.rollAbility()
      expect(Bones.prototype.roll).to.be.calledOnceWithExactly(4)
    })

    it("returns the smallest score", async function() {
      Bones.prototype.roll.resolves([1, 1, 1, 1])
      let score = await this.subject.rollAbility()
      expect(score).to.equal(3)
    })

    it("returns the largest score", async function() {
      Bones.prototype.roll.resolves([6, 6, 6, 6])
      let score = await this.subject.rollAbility()
      expect(score).to.equal(18)
    })

    it("drops the lowest die roll", async function() {
      Bones.prototype.roll.resolves([4, 3, 2, 1])
      let score = await this.subject.rollAbility()
      expect(score).to.equal(9)
    })

    it("drops the lowest die roll regardless of position", async function() {
      Bones.prototype.roll.resolves([1, 2, 3, 4])
      let score = await this.subject.rollAbility()
      expect(score).to.equal(9)
    })
  })
})
