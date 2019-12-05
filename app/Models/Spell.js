export default class Spell {
  constructor(data) {
    this.name = data.name;
    this.id = data.id || data._id;
    this.range = data.range;
    this.duration = data.duration;
    this.description = data.desc;
    this.level = data.level;
  }

  get Template() {
    return `
    <div class="card" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">${this.level}</p>
                <p class="card-text">${this.range}</p>
                <p class="card-text">${this.duration}</p>
                <button onclick="app.spellsController.addSpellAsync()">Add Spell</button>
              </div>
            </div>
    `;
  }
}
