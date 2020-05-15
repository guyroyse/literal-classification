const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Shoe = require('../src/shoe')
const axios = require('axios')

const QRNG_URL = "http://qrng.anu.edu.au/API/jsonI.php?type=uint8&length=512"

describe("Shoe", function() {
  beforeEach(function() {
    sinon.stub(axios, 'get')
    axios.get.resolves({ data: { data: [1, 2, 3] }})

    this.subject = new Shoe()
  })

  afterEach(function () {
    sinon.restore()
  })

  context("when a number is requested", function() {
    beforeEach(async function() {
      this.number = await this.subject.getNumber()
    })

    it("asks for some numbers", function() {
      expect(axios.get).to.have.been.calledOnceWithExactly(QRNG_URL)
    })

    it("return the first number", function() {
      expect(this.number).to.equal(1)
    })

    context("when we ask for more numbers", function() {
      beforeEach(async function() {
        this.number1 = await this.subject.getNumber()
        this.number2 = await this.subject.getNumber()
      })

      it("returns more numbers", function() {
        expect(this.number1).to.equal(2)
        expect(this.number2).to.equal(3)
      })

      context("when we request a number and are out of numbers", function() {
        beforeEach(async function() {
          axios.get.resetHistory()
          this.number = await this.subject.getNumber()
        })

        it("asks for more numbers", function() {
          expect(axios.get).to.have.been.calledOnceWithExactly(QRNG_URL)
        })

        it("returns the next number", function() {
          expect(this.number).to.equal(1)
        })
      })
    })
  })
})
