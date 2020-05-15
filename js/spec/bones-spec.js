const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Bones = require('../src/bones')
const Shoe = require('../src/shoe')

describe("Bones", function() {

  beforeEach(function() {
    sinon.stub(Shoe.prototype, 'getNumber')
    this.subject = new Bones()
  })

  afterEach(function () {
    sinon.restore()
  })

  context("when rolling a single die", function() {

    afterEach(function() {
      Shoe.prototype.getNumber.resetBehavior()
    })

    it("can roll a 1", async function() {
      Shoe.prototype.getNumber.resolves(0)
      let result = await this.subject.roll(1)
      expect(result).to.have.ordered.members([1])
    })

    it("can roll a 2", async function() {
      Shoe.prototype.getNumber.resolves(1)
      let result = await this.subject.roll(1)
      expect(result).to.have.ordered.members([2])
    })

    it("can roll multiple numbers", async function() {
      Shoe.prototype.getNumber.onCall(0).resolves(2)
      Shoe.prototype.getNumber.onCall(1).resolves(3)
      Shoe.prototype.getNumber.onCall(2).resolves(4)
      Shoe.prototype.getNumber.onCall(3).resolves(5)

      let result = await this.subject.roll(4)

      expect(result).to.have.ordered.members([3, 4, 5, 6])
    })

    it("rejects numbers from the shoe above the maximum multiple for a 6-sided die", async function() {
      Shoe.prototype.getNumber.onCall(0).resolves(253)
      Shoe.prototype.getNumber.onCall(1).resolves(252)
      Shoe.prototype.getNumber.onCall(2).resolves(251)
      Shoe.prototype.getNumber.onCall(3).resolves(250)
      Shoe.prototype.getNumber.onCall(4).resolves(249)
      Shoe.prototype.getNumber.onCall(5).resolves(248)

      let result = await this.subject.roll(4)

      expect(result).to.have.ordered.members([6, 5, 4, 3])
    })
  })
})
