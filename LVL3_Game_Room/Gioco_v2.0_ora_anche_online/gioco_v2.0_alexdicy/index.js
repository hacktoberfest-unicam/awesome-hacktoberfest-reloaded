import express from "express";
import WebSocket from "ws";

import Player from "./Player.js";
import GameStatus from "./GameStatus.js";

const app = express();
// servi i file statici (il client del gioco)
app.use(express.static("public"));
// ascolta sulla porta 80
const server = app.listen(process.env.PORT || 80);

const players = [];
let nextPlayerId = 0;
const game = {
  status: GameStatus.LOBBY
};
let votes = [];

// contains the current word
let letters = [];

// abilita il server websocket
const ws = new WebSocket.Server({noServer: true});
ws.on("connection", client => {
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
    console.log(message, player);
    let data = JSON.parse(message);
    switch (data.type) {
      case "JOIN":
        players.push(player);
        player.nickname = data.nickname;
        send("JOINED", {player}, client);
        send("PLAYERS", {
          players: players
        });
        break;
      case "START_VOTE":
        if (!votes.includes(player.id)) {
          votes.push(player.id);
        }
        if (votes.length > players.length / 2) {
          startGame();
        }
        break;
      case "CHOOSE_WORD":
        let word = data.word.trim().toUpperCase();
        if (word.length < 2 || word.includes(" ")) {
          break;
        }
        if (!/^[a-zA-Z]+$/.test(word)) {
          break;
        }
        letters = [];

        for (let c of word) {
          letters.push({
            letter: c,
            guessed: false,
          });
        }
        game.status = GameStatus.PLAYING;
        let clientLetters = [];
        for (let l of letters) {
          clientLetters.push({
            letter: "",
            guessed: false,
          })
        }
        game.letters = clientLetters;
        send("GAME", game);
        break;
    }
  });

  // login player
  console.log("New client connected, ID: " + nextPlayerId);
  client.playerId = nextPlayerId;

  send("WELCOME", {}, client);
  // broadcast game info and players
  send("GAME", game);
  send("PLAYER_INFO", {player}, client);

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
      break;
    }
  }
}

function startGame() {
  console.log("Game is starting");
  game.status = GameStatus.CHOOSING_WORD;
  // choose a random player
  game.choser = players[Math.floor(Math.random() * players.length)];
  send("GAME", game);
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
