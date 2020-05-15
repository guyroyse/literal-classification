const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Bones = require('../src/bones')
const Shoe = require('../src/shoe')

describe("Bones", function() {

  beforeEach(function() {
    this.shoe = sinon.createStubInstance(Shoe)
    this.subject = new Bones(this.shoe)
  })

  afterEach(function () {
    sinon.restore()
  })

  context("when rolling a single die", function() {

    afterEach(function() {
      this.shoe.getNumber.resetBehavior()
    })

    it("can roll a 1", async function() {
      this.shoe.getNumber.resolves(0)
      let result = await this.subject.roll(1)
      expect(result).to.have.ordered.members([1])
    })

    it("can roll a 2", async function() {
      this.shoe.getNumber.resolves(1)
      let result = await this.subject.roll(1)
      expect(result).to.have.ordered.members([2])
    })

    it("can roll multiple numbers", async function() {
      this.shoe.getNumber.onCall(0).resolves(2)
      this.shoe.getNumber.onCall(1).resolves(3)
      this.shoe.getNumber.onCall(2).resolves(4)
      this.shoe.getNumber.onCall(3).resolves(5)

      let result = await this.subject.roll(4)

      expect(result).to.have.ordered.members([3, 4, 5, 6])
    })

    it("rejects numbers from the shoe above the maximum multiple for a 6-sided die", async function() {
      this.shoe.getNumber.onCall(0).resolves(253)
      this.shoe.getNumber.onCall(1).resolves(252)
      this.shoe.getNumber.onCall(2).resolves(251)
      this.shoe.getNumber.onCall(3).resolves(250)
      this.shoe.getNumber.onCall(4).resolves(249)
      this.shoe.getNumber.onCall(5).resolves(248)

      let result = await this.subject.roll(4)

      expect(result).to.have.ordered.members([6, 5, 4, 3])
    })
  })
})
