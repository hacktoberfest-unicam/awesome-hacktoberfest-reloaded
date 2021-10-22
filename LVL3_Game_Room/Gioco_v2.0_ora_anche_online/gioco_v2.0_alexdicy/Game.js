import GameStatus from "./GameStatus.js";

export default class Game {
  status = GameStatus.LOBBY;
  chooser = null;
  turn = {
    player: null
  };
}
