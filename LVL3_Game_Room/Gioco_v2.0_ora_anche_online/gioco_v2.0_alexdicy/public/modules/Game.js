import GameStatus from "./GameStatus.js";

export default class Game {
  status = GameStatus.LOBBY;
  letters = [];
  chooser = null;
  turn = {
    player: null
  };
}
