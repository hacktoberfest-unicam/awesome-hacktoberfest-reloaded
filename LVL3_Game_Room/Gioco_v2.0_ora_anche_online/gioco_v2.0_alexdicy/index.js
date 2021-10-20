import express from "express";
import WebSocket from "ws";

const app = express();
// servi i file statici (il client del gioco)
app.use(express.static("public"));
// ascolta sulla porta 80
const server = app.listen(process.env.PORT || 80);

const players = [];
let nextPlayerId = 0;

// abilita il server websocket
const ws = new WebSocket.Server({noServer: true});
ws.on("connection", client => {
  console.log("New client connected, ID: " + nextPlayerId);
  client.playerId = nextPlayerId;
  sendMessage("WELCOME", {}, client);
  console.log("Sending player data");
  sendMessage("PLAYERS", {
    players: players
  }, client);

  players.push({
    id: nextPlayerId
  });

  nextPlayerId++;
});
// gestisci i websocket tramite express
server.on("upgrade", (request, socket, head) => {
  ws.handleUpgrade(request, socket, head, socket => {
    ws.emit("connection", socket, request);
  });
});


function sendMessage(type, data = {}, client = null) {
  if (client.readyState === SOCKET_OPEN) {
    client.send('__ping__');
  } else {
    console.log('Server - connection has been closed for client ' + client);
    removeUser(client);
  }

  data.type = type;
  let message = JSON.stringify(data);
  if (client) {
    client.send(message);
  } else {
    ws.clients.forEach(client => client.send(message));
  }
}
