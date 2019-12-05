import SpellsService from "../Services/SpellsService.js";
import store from "../store.js";

//Private
function _drawSpells() {
  let template = "";
  let spells = store.State.spells;
  console.log(spells);
  spells.forEach(
    s =>
      (template += `<li onclick="app.spellsController.selectSpellsAsync('${s.id}')">${s.name}</li>`)
  );
  document.getElementById("spells").innerHTML = template;
}
function _drawActive() {
  let active = store.State.activeSpell;
  document.getElementById("active").innerHTML = active.Template;
}
function _drawMySpells() {
  let mySpelltemplate = "";
  let mySpells = store.State.mySpells;
  mySpells.forEach(s => (mySpelltemplate += `<li>${s.name}</li>`));
  document.getElementById("mine").innerHTML = mySpelltemplate;
}

//Public
export default class SpellsController {
  constructor() {
    store.subscribe("spells", _drawSpells);
    SpellsService.getSpellsAsync();
    store.subscribe("activeSpell", _drawActive);
    store.subscribe("mySpells", _drawMySpells);
  }

  async selectSpellsAsync(id) {
    try {
      await SpellsService.selectSpellsAsync(id);
    } catch (error) {
      console.error(error);
    }
  }

  async addSpellAsync() {
    try {
      await SpellsService.addSpellAsync();
    } catch (error) {
      console.error(error);
    }
  }
}
