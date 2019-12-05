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
  async selectSpellsAsync(id) {
    let res = await _spellApi.get(id);
    console.log(res);
    let description = "";
    res.data.desc.forEach(text => (description += text));
    res.data.desc = description;
    let activeSpell = new Spell(res.data);
    store.commit("activeSpell", activeSpell);
    console.log(activeSpell);
  }
  constructor() {
    this.getMySpellsAsync();
  }

  async getSpellsAsync() {
    let res = await _spellApi.get("");
    console.log("from get spells", res.data);
    store.commit("spells", res.data);
  }

  async addSpellAsync() {
    let spell = store.State.activeSpell;
    _sandbox.post("", spell);
    console.log(spell);
    this.getMySpellsAsync();
  }

  async getMySpellsAsync() {
    let res = await _sandbox.get();
    store.commit(
      "mySpells",
      res.data.data.map(s => new Spell(s))
    );
    console.log("my spells", store.State.mySpells);
  }
}

const service = new SpellsService();
export default service;
