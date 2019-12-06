import Spell from "../Models/Spell.js";
import store from "../store.js";
// @ts-ignore
let _sandbox = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/class/spells"
});

// @ts-ignore
let _spellApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/spells"
});
class SpellsService {
  async removeSpellAsync(id) {
    let spellToRemove = store.State.mySpells.find(s => s.id == id);
    _sandbox.delete(`/${id}`, spellToRemove).then(res => {
      this.getMySpellsAsync();
    });
    store.commit("activeSpell", {});
  }
  makeActive(id) {
    let activeSpell = store.State.mySpells.find(s => s.id == id);
    store.commit("activeSpell", activeSpell);
  }
  async selectSpellsAsync(id) {
    let res = await _spellApi.get(id);
    let description = "";
    res.data.desc.forEach(text => (description += text));
    res.data.desc = description;
    let activeSpell = new Spell(res.data);
    store.commit("activeSpell", activeSpell);
  }
  constructor() {
    this.getMySpellsAsync();
  }

  async getSpellsAsync() {
    let res = await _spellApi.get("");
    store.commit("spells", res.data);
  }

  async addSpellAsync() {
    let spell = store.State.activeSpell;
    _sandbox.post("", spell).then(res => {
      this.getMySpellsAsync();
    });
  }

  async getMySpellsAsync() {
    let res = await _sandbox.get();
    store.commit(
      "mySpells",
      res.data.data.map(s => new Spell(s))
    );
    let myspells = store.State.mySpells;
    console.log("these are my spells", myspells);
  }
}

const service = new SpellsService();
export default service;
