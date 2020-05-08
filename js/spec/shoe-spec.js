const chai = require('chai')
let expect = chai.expect

const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const Shoe = require('../src/shoe')
const axios = require('axios')

const QRNG_URL = "https://qrng.anu.edu.au/API/jsonI.php?type=uint8&length=576"

describe("Shoe", function() {

  beforeEach(function() {
    sinon.stub(axios, 'get')
    axios.get.resolves({ data: { data: [1, 2, 3] }})

    this.subject = new Shoe()
  })

  afterEach(function () {
    sinon.restore()
  })

  context("when started", function() {
    beforeEach(async function() {
      await this.subject.start()
    })

    it("asks for a big ol' stack of numbers", function() {
      expect(axios.get).to.have.been.calledOnceWithExactly(QRNG_URL)
    })

    context("when a number is requested", function() {
      beforeEach(async function() {
        this.number = await this.subject.getNumber()
      })

      it("return the number", function() {
        expect(this.number).to.equal(1)
      })

      context("when we ask for another number", function() {
        beforeEach(async function() {
          this.number = await this.subject.getNumber()
        })

        it("returns more numbers", function() {
          expect(this.number).to.equal(2)
        })

        context("when we request the last number", function() {
          beforeEach(async function() {
            axios.get.resetHistory()
            this.number = await this.subject.getNumber()
          })
  
          it("asks for more numbers", function() {
            expect(axios.get).to.have.been.calledOnceWithExactly(QRNG_URL)
          })

          it("returns the last number", function() {
            expect(this.number).to.equal(3)
          })

          context("when we one of the newly fetched numbers", function() {
            beforeEach(async function() {
              this.number = await this.subject.getNumber()
            })
    
            it("returns the number", function() {
              expect(this.number).to.equal(1)
            })
          })
        })
      })
    })
  })
})
