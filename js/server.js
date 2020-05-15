const express = require('express')

const app = express()
const port = 3000

const AbilityGenerator = require('./src/ability-generator')
let abilityGenerator = new AbilityGenerator()

app.get('/rollAbilities', async (req, res) => {
  res.send(await abilityGenerator.rollAbilities())
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
