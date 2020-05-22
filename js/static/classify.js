let ABILITY_NAMES = [ 'strength', 'dexterity', 'constitution',
  'intelligence', 'wisdom', 'charisma' ]

class Fetcher {
  async rollAbilities() {
    let response = await fetch('/rollAbilities')
    let abilities = await response.json()
    return abilities
  }

  async fetchClasses() {
    let response = await fetch('/fetchClasses')
    let classes = await response.json()
    return classes
  }

  async saveClassination(data) {
    await fetch('/saveClassination', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }

}

class View {
  constructor() {
    this.buttons = document.querySelector('#buttons')

    ABILITY_NAMES.forEach(abilityName => {
      let element = `${abilityName}Element`
      let selector = `#${abilityName}`

      this[element] = document.querySelector(selector)

      Object.defineProperty(this, abilityName, {
        get: () => this[element].textContent,
        set: value => this[element].textContent = value
      })
    })
  }

  addClassButton(className) {
    let button = document.createElement('button')
    button.className = 'classinate'
    button.textContent = className
    this.buttons.appendChild(button)
    return button
  }
}

document.addEventListener('DOMContentLoaded', async () => {

  let fetcher = new Fetcher()
  let view = new View()

  function abilitiesToView(rolledAbilities) {
    ABILITY_NAMES.forEach(abilityName => view[abilityName] = rolledAbilities[abilityName])
  }

  function viewToAbilities(view) {
    let data = {}
    ABILITY_NAMES.forEach(abilityName => data[abilityName] = view[abilityName])
    return data
  }

  (await fetcher.fetchClasses())
    .map(className => view.addClassButton(className))
    .forEach(button => {
      button.addEventListener('click', async event => {
        let className = event.currentTarget.textContent
        let data = viewToAbilities(view)
        data.class = className
        await fetcher.saveClassination(data)
        abilitiesToView(await fetcher.rollAbilities())
      })
    })

  abilitiesToView(await fetcher.rollAbilities())

})
