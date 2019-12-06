export default class Spell {
  constructor(data) {
    this.name = data.name;
    this.id = data.id || data._id;
    this.range = data.range;
    this.duration = data.duration;
    this.description = data.desc || data.description;
    this.level = data.level;
    this.user = data.user || "";
  }

  get Template() {
    let template = `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <p class="card-text">${this.level}</p>
            <p class="card-text">${this.range}</p>
            <p class="card-text">${this.duration}</p>
            <p class="card-text">${this.description}</p>
        </div>
    </div>`;
    if (this.user) {
      template += `<button onclick="app.spellsController.removeSpellAsync('${this.id}')">Remove Spell</button>`;
    } else {
      template += `<button onclick="app.spellsController.addSpellAsync()">Add Spell</button>`;
    }
    return template;
  }
}
