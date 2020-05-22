async function setupClassButtons() {

  let buttons = document.querySelector('#buttons')

  let classResponse = await fetch('/fetchClasses')
  let classes = await classResponse.json()

  classes.forEach(clazz => {
    let button = document.createElement('button')
    button.className = 'classinate'
    button.textContent = clazz
    buttons.appendChild(button)
  })

}

async function rollAbilities() {

  let rollResponse = await fetch('/rollAbilities')
  let abilities = await rollResponse.json()

  document.querySelector('#strength').textContent = abilities.strength
  document.querySelector('#dexterity').textContent = abilities.dexterity
  document.querySelector('#constitution').textContent = abilities.constitution
  document.querySelector('#intelligence').textContent = abilities.intelligence
  document.querySelector('#wisdom').textContent = abilities.wisdom
  document.querySelector('#charisma').textContent = abilities.charisma

  return abilities
}

document.addEventListener('DOMContentLoaded', async () => {

  await setupClassButtons()
  let abilities = await rollAbilities()

  document.querySelectorAll('.classinate').forEach(button => {

    button.addEventListener('click', async event => {
      let clazz = event.currentTarget.textContent
      
      let data = {
        strength: abilities.strength, 
        dexterity: abilities.dexterity,
        constitution: abilities.constitution,
        intelligence: abilities.intelligence,
        wisdom: abilities.wisdom,
        charisma: abilities.charisma,
        class: clazz
      }

      await fetch('/saveClassination', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      rollAbilities()
    })
  })
})
