let connectedPlayers = document.getElementById("connected-players");
let lobby = document.getElementById("lobby");
let lobbyPlayerList = document.getElementById("lobby-player-list");
let startVote = document.getElementById("start-vote");
let overlay = document.getElementById("overlay");
let overlayTitle = document.getElementById("overlay-title");
let overlayContent = document.getElementById("overlay-content");
let wordContainer = document.getElementById("word-container");
let livesText = document.getElementById("lives");
let keyboard = document.getElementById("keyboard");
let guessForm = document.getElementById("guess-form");

let head = document.getElementById("head");
let neck = document.getElementById("neck");
let leftArm = document.getElementById("left-arm");
let rightArm = document.getElementById("right-arm");
let waist = document.getElementById("waist");
let leftLeg = document.getElementById("left-leg");
let rightLeg = document.getElementById("right-leg");

let templates = {
  lobbyPlayer: name => {
    return `<div class="lobby-player">
              <div class="flex">
                <img src="player-avatar.svg" alt="">
                <div class="name">${name}</div>
              </div>
            </div>`;
  },
  lobbyNextPlayer: () => {
    return `<div class="lobby-player not-connected">
              <div class="flex">
                <img src="player-avatar.svg" alt="">
                <div class="name">Attesa altri giocatori...</div>
              </div>
            </div>`;
  }
}


let previousGameInfo = {
  status: -1
};

let gameInfo = previousGameInfo;
let player = {};

let letters = [];

let lives = 6;
let totalLives = lives;
updateLives();

// websocket
let ws;

connectWS();
updateGameInfo();

function joinGame() {
  let input = overlayContent.getElementsByTagName("input")[0];
  let nickname = input.value.trim();
  if (nickname.length < 2) {
    alert("Il nickname deve essere lungo 2 o più caratteri");
    input.focus();
    return;
  }

  send("JOIN", {nickname});
}

startVote.addEventListener("click", () => {
  startVote.disabled = true;
  send("START_VOTE");
});

// imposta le lettere sulla pagina
function sendWord() {
  let input = overlayContent.getElementsByTagName("input")[0];
  let word = input.value.trim().toUpperCase();
  if (word.length < 2 || word.includes(" ")) {
    alert("La parola deve essere lunga 2 o più caratteri e non deve contenere spazi");
    input.focus();
    return;
  }
  if (!/^[a-zA-Z]+$/.test(word)) {
    alert("La parola deve contenere solo lettere");
    input.focus();
    return;
  }

  send("CHOOSE_WORD", {word});

  overlay.classList.add("hide");
}

// imposta il click per ogni lettera che può essere scelta
// controlla se è presente nella parola,
// se non è presente toglie una vita
//
// aggiorna le vite e chiama il controllo al gameover o win
for (let letter of keyboard.childNodes) {
  letter.addEventListener("click", () => {
    if (letter.classList.contains("guessed")) {
      return;
    }
    let c = letter.innerText.trim();
    letter.classList.add("guessed");

    let correct = false;

    for (let l of letters) {
      if (l.letter === c) {
        correct = true;
        l.guessed = true;
        l.element.innerText = c;
      }
    }

    if (!correct) {
      lives--;
      updateLives();
    }
    checkGameOver();
    checkHasWon();
  });
}

// cambia il testo a inizio pagina
function updateLives() {
  livesText.innerText = `${lives}/${totalLives}`;
}

// aggiorna le parti del corpo dell'omino o chiude il gioco se non ha più vite
function checkGameOver() {
  if (lives < 0) {
    openOverlay("GameOver, Giocatore 2");
    return;
  }
  switch (lives) {
    case 5:
      head.classList.remove("hide");
      break;
    case 4:
      neck.classList.remove("hide");
      waist.classList.remove("hide");
      break;
    case 3:
      leftArm.classList.remove("hide");
      break;
    case 2:
      rightArm.classList.remove("hide");
      break;
    case 1:
      leftLeg.classList.remove("hide");
      break;
    case 0:
      rightLeg.classList.remove("hide");
      break;
  }
}

// se tutte le lettere della parola sono state indovinate il gioco finisce
// e il giocatore 2 vince
function checkHasWon() {
  for (let l of letters) {
    if (!l.guessed) {
      return;
    }
    openOverlay("Hai vinto, Giocatore 2");
  }
}

function openOverlay(title, content) {
  overlay.classList.remove("hide");
  overlayTitle.innerText = title;
  overlayContent.innerText = content ? content : "";
}

guessForm.addEventListener("submit", e => {
  e.preventDefault();
  let input = document.getElementById("guess-input");
  let word = input.value.trim().toUpperCase();
  if (word.length === letters.length) {
    for (let i = 0; i < word.length; i++) {
      // noinspection EqualityComparisonWithCoercionJS
      if (word.charAt(i) != letters[i].letter) {
        lives--;
        updateLives();
        checkGameOver();
        return false;
      }
    }
    // ha vinto
    openOverlay("Hai vinto, Giocatore 2");
  } else {
    alert("La lunghezza della parola è diversa dalla parola da indovinare")
  }
  return false;
});

function connectWS() {
  const secure = window.location.protocol !== "http:";
  ws = new WebSocket((secure ? "wss://" : "ws://") + window.location.host);
  ws.addEventListener("error", () => {
    this.alert("Connection error");
  });
  ws.addEventListener("close", () => {
    this.alert("Disconnected from server, reconnecting");
    setTimeout(this.connectWS, 1000);
  });
  ws.addEventListener("open", () => {
    // chiedi al giocatore di inserire il proprio nickname
    overlayTitle.innerText = "Scegli il tuo nickname:"
    overlayContent.innerHTML = `
    <br>
    <br>
    <div class="flex">
      <div class="input-group">
        <input type="text" placeholder="Pippo" id="nick-input" minlength="2" required />
        <label for="nick-input" class="input-label">Nickname</label>
      </div>
      <button onclick="joinGame()">Entra</button>
    </div>`;
  })
  ws.addEventListener("message", m => {
    let message = JSON.parse(m.data);
    switch (message.type) {
      case "ERROR":
        this.alert("Error: " + message.error);
        break;
      case "WELCOME":
        console.log("Received Welcome from Websocket server");
        break;
      case "LOG":
        console.log(message.log);
        break;
      case "GAME":
        previousGameInfo = gameInfo;
        gameInfo = message;
        updateGameInfo();
        break;
      case "JOINED":
        console.log("Joined successfully");
        player = message.player;
        overlay.classList.add("hide");
        break;
      case "PLAYER_INFO":
        player = message.player;
        break;
      case "PLAYERS":
        connectedPlayers.innerText = `Player ID: ${player.id} | ${message.players.length} giocatori connessi | IDs: ${JSON.stringify(message.players)}`;
        resetLobbyPlayerList();
        for (let p of message.players) {
          addLobbyPlayer(p.nickname);
        }
        break;
    }
  });
}

function send(type, data = {}) {
  data.type = type;
  ws.send(JSON.stringify(data));
}

function updateGameInfo() {
  if (previousGameInfo.status !== gameInfo.status) {
    switch (gameInfo.status) {
      case 0:
        console.log("Game Status: LOBBY");
        lobby.classList.remove("hide");
        resetLobbyPlayerList();
        break;
      case 1:
        console.log("Game Status: VOTING_PLAYER");
        break;
      case 2:
        console.log("Game Status: CHOOSING_WORD");
        lobby.classList.remove("hide");
        if (player.id === gameInfo.choser.id) {
          overlay.classList.remove("hide");
          overlayTitle.innerText = player.nickname + ", scegli una parola:";
          overlayContent.innerHTML = `
              <br>
              <br>
              <div class="flex">
                <div class="input-group">
                  <input type="text" placeholder="Topolino" id="word-input" required />
                  <label for="word-input" class="input-label">Parola</label>
                </div>
                <button onclick="sendWord()">Conferma</button>
              </div>`;
        } else {
          openOverlay(gameInfo.choser.nickname, "sta scegliendo la parola...");
        }
        break;
      case 3:
        console.log("Game Status: PLAYING");
        overlay.classList.add("hide");
        lobby.classList.add("hide");

        wordContainer.innerHTML = "";
        letters = [];

        for (let c of gameInfo.letters) {
          let wordLetter = document.createElement("div");
          wordLetter.classList.add("word-letter");

          wordContainer.appendChild(wordLetter);
          letters.push({
            letter: c,
            guessed: false,
            element: wordLetter
          });
        }
        break;
      case 4:
        console.log("Game Status: ENDED");
        break;
    }
  }
}

function resetLobbyPlayerList() {
  lobbyPlayerList.innerHTML = "";
  lobbyPlayerList.insertAdjacentHTML("beforeend", templates.lobbyNextPlayer());
}

function addLobbyPlayer(name) {
  lobbyPlayerList.lastElementChild.remove();
  lobbyPlayerList.insertAdjacentHTML("beforeend", templates.lobbyPlayer(name));
  lobbyPlayerList.insertAdjacentHTML("beforeend", templates.lobbyNextPlayer());
}
