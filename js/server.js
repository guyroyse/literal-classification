const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('static'))

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

app.post('/saveClassination', async (req, res) => {
  res.send(await data.saveClassination(req.body))
})

app.listen(port, () => console.log(`Listening on port ${port}`))
