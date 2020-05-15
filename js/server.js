const express = require('express')

const app = express()
const port = 3000

const Shoe = require('./src/shoe')
const Bones = require('./src/bones')

app.get('/rollTheBones', (req, res) => {
  let rolls = times(6, rollAbility)
  res.send({ rolls })
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))

function rollAbility() {
  return times(4, rollDie)
    .sort()
    .slice(1, 4)
    .reduce((accum, roll) => { return accum + roll }, 0)
}

function rollDie() {
  return Math.floor(Math.random() * 6) + 1
}

function times(n, fn) {
  return new Array(4)
    .fill()
    .map(_ => fn())
}
