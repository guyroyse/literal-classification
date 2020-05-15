let Bones = require('./bones')

class AbilityGenerator {
  constructor() {
    this.bones = new Bones()
  }

  async rollAbilities() {
    return {
      strength: await this.rollAbility(),
      dexterity: await this.rollAbility(),
      constitution: await this.rollAbility(),
      intelligence: await this.rollAbility(),
      wisdom: await this.rollAbility(),
      charisma: await this.rollAbility()
    }
  }

  async rollAbility() {
    let rolls = await this.bones.roll(4)
    return rolls
      .sort()
      .slice(1, 4)
      .reduce((accumulator, roll) => accumulator + roll, 0)
  }
}

module.exports = AbilityGenerator
