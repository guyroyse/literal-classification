const express = require('express')

const app = express()
const port = 3000

const AbilityGenerator = require('./src/ability-generator')
let abilityGenerator = new AbilityGenerator()

const ClassinatorData = require('./src/classinator-data')
let data = new ClassinatorData()

app.get('/fetchClasses', async (req, res) => {
  res.send(await data.fetchClasses())
})

app.get('/rollAbilities', async (req, res) => {
  res.send(await abilityGenerator.rollAbilities())
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
