import SpellsService from "../Services/SpellsService.js";
import store from "../store";

//Private
function _draw() {
  let spells = store.State.spells;
  console.log(spells);
}

//Public
export default class SpellsController {
  constructor() {
    store.subscribe("spells", _draw);
  }
}
