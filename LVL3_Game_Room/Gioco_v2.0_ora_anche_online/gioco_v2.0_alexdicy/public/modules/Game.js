import GameStatus from "./GameStatus.js";
import Turn from "./Turn.js";

export default class Game {
  status = GameStatus.LOBBY;
  letters = [];
  /** @type Player */
  chooser = null;
  /** @type Turn */
  turn = new Turn();
}
