import express from "express";
import WebSocket from "ws";

import Player from "./public/modules/Player.js";
import GameStatus from "./public/modules/GameStatus.js";
import Game from "./public/modules/Game.js";

const app = express();
// servi i file statici (il client del gioco)
app.use(express.static("public"));
// ascolta sulla porta 80
const server = app.listen(process.env.PORT || 80);

const players = [];
let nextPlayerId = 0;

let game = new Game();
let turnIndex = 0;

let votes = [];

// contains the current word
let wordLetters = [];
// available letters to choose from
let keyboard = [];

// abilita il server websocket
const ws = new WebSocket.Server({noServer: true});
ws.on("connection", client => {
  if (nextPlayerId >= Number.MAX_SAFE_INTEGER) {
    nextPlayerId = 0;
  }
  let player = new Player(nextPlayerId);

  // heartbeat
  client.isAlive = true;
  client.on("pong", () => {
    client.isAlive = true;
  });
  client.on("close", () => {
    removePlayer(client.playerId);
  });
  client.on("message", message => {
    console.log("--->", message, player);

    let data = JSON.parse(message);
    switch (data.type) {
      case "JOIN":
        if (game.status === GameStatus.PLAYING) {
          return;
        }
        let nickname = data.nickname.trim();
        if (nickname.length < 2) {
          return;
        }
        // remove if already present
        removePlayer(client.playerId);

        player.nickname = nickname;
        players.push(player);
        send("JOINED", {player}, client);
        send("PLAYERS", {players});
        break;
      case "START_VOTE":
        // do not count votes if they're the only player connected
        // or if the game is not in a lobby state
        if (game.status !== GameStatus.LOBBY || players.length < 2) {
          return;
        }
        if (!votes.includes(player.id)) {
          votes.push(player.id);
        }
        if (votes.length > players.length / 2) {
          startGame();
        }
        break;
      case "CHOOSE_WORD":
        // ignore if the player is not the chooser or if the gameStatus is not correct
        if (game.status !== GameStatus.CHOOSING_WORD || game.chooser.id !== player.id) {
          return;
        }
        let word = data.word.trim().toUpperCase();
        if (word.length < 2 || word.includes(" ")) {
          return;
        }
        if (!/^[a-zA-Z]+$/.test(word)) {
          return;
        }
        wordLetters = [];

        for (let c of word) {
          wordLetters.push({
            letter: c,
            guessed: false,
          });
        }
        let clientLetters = [];
        for (let l of wordLetters) {
          clientLetters.push({
            letter: "",
            guessed: false,
          })
        }
        game.letters = clientLetters;
        setGameStatus(GameStatus.PLAYING);
        break;
      case "CHOOSE_LETTER":
        // ignore if the player is not in the current turn or if the gameStatus is not correct
        if (game.status !== GameStatus.PLAYING || game.turn.player !== player.id) {
          return;
        }
        let letter = data.letter;
        if (!/^[A-Z]$/.test(letter)) {
          return;
        }

        let correct = false;
        // check if the letter is in the chosen word
        for (let i = 0; i < wordLetters.length; i++) {
          if (wordLetters[i].letter === letter) {
            correct = true;
            wordLetters[i].guessed = true;
            game.letters[i].letter = wordLetters[i].letter;
            game.letters[i].guessed = true;
          }
        }

        for (let key of keyboard) {
          if (key.letter === letter) {
            key.guessed = true;
            break;
          }
        }

        if (!correct) {
          game.lives--;
        }
        // change turn
        nextTurn();
        // send updated keyboard
        send("KEYBOARD", {keyboard});
        // send updated word
        send("GAME", {game});
        // check if game has ended
        checkGame();
        break;
    }
  });

  // login player
  console.log("New client connected, ID: " + nextPlayerId);
  client.playerId = nextPlayerId;

  send("WELCOME", {}, client);
  // broadcast game info and players
  send("KEYBOARD", {keyboard});
  send("GAME", {game});
  send("PLAYER_INFO", {player}, client);
  send("PLAYERS", {players}, client);

  nextPlayerId++;
});

// gestisci i websocket tramite express
server.on("upgrade", (request, socket, head) => {
  ws.handleUpgrade(request, socket, head, socket => {
    ws.emit("connection", socket, request);
  });
});

const interval = setInterval(() => {
  ws.clients.forEach(client => {
    if (!client.isAlive) {
      console.log("Client is not alive, removing: " + client.playerId);
      removePlayer(client.playerId);
      return client.terminate();
    }

    client.isAlive = false;
    client.ping();
  });
}, 10000);

ws.on("close", function close() {
  clearInterval(interval);
});

function removePlayer(id) {
  if (typeof id !== "number") {
    return;
  }
  for (let i = 0; i < players.length; i++) {
    let p = players[i];
    if (id === p.id) {
      players.splice(i, 1);
      send("PLAYERS", {
        players: players
      });
      // remove their vote
      const index = votes.indexOf(p.id);
      if (index > -1) {
        votes.splice(index, 1);
      }

      if (players.length <= 2) {
        resetGame();
      }
      break;
    }
  }
}

function getDefaultKeyboard() {
  return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map(c => {
    return {
      letter: c, guessed: false
    }
  });
}

function startGame() {
  console.log("Game is starting");
  keyboard = getDefaultKeyboard();
  // choose a random player
  game.chooser = players[Math.floor(Math.random() * players.length)];
  console.log(`Player "${game.chooser.nickname}" (${game.chooser.id}) is the word chooser`);
  // turn settings
  nextTurn();
  send("KEYBOARD", {keyboard});
  setGameStatus(GameStatus.CHOOSING_WORD);
}

function resetGame() {
  game = new Game();
  turnIndex = 0;
  wordLetters = [];
  votes = [];
  send("GAME", {game});
}

function nextTurn() {
  if (++turnIndex >= players.length) {
    turnIndex = 0;
  }
  let player = players[turnIndex];
  if (player.id === game.chooser.id) {
    nextTurn();
    return;
  }
  game.turn.player = player.id;
}

function checkGame() {
  // check if all letters have been guessed
  for (let l of wordLetters) {
    if (!l.guessed) {
      // missing a letter
      // check if it's gameover
      if (game.lives < 0) {
        setGameStatus(GameStatus.ENDED);
        // reset game after 5 seconds
        setTimeout(resetGame, 5000);
      }
      return;
    }
  }
  // all letters have been guessed
  setGameStatus(GameStatus.ENDED);
  // reset game after 5 seconds
  setTimeout(resetGame, 5000);
}

/**
 * @param {number} status
 */
function setGameStatus(status) {
  game.status = status;
  send("GAME", {game});
}

function send(type, data = {}, client = null) {
  data.type = type;
  let message = JSON.stringify(data);
  if (client) {
    client.send(message);
  } else {
    ws.clients.forEach(client => client.send(message));
  }
}

function sendLog(message, client = null) {
  send("LOG", {log: message}, client);
}
