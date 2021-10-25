import Game from "./modules/Game.js";
import GameStatus from "./modules/GameStatus.js";
import Player from "./modules/Player.js";

// websocket
let ws;

const app = new Vue({
  el: "#app",
  data: {
    alerts: [],
    overlay: {
      show: false,
      title: "",
      content: ""
    },
    game: new Game(),
    showLobby: false,
    disableStartVote: false,
    players: [],
    player: new Player(0),
    lives: 6,
    totalLives: 6,
    keyboard: []
  },
  methods: {
    alert(text, title = "Notification") {
      let id = Date.now();
      let alert = {
        id: id,
        title: title,
        text: text,
        time: 5,
        hideCallback: () => {
          // remove the alert
          let position = -1;
          for (let i = 0; i < this.alerts.length; i++) {
            if (this.alerts[i].id === id) {
              position = i;
              break;
            }
          }
          if (position >= 0) {
            this.alerts.splice(position, 1);
          }
        }
      };
      this.alerts.push(alert);
    },
    // imposta le lettere sulla pagina
    sendWord() {
      let word = this.overlay.input.value.trim().toUpperCase();
      if (word.length < 2 || word.includes(" ")) {
        this.alert("La parola deve essere lunga 2 o più caratteri e non deve contenere spazi", "Errore");
        this.overlay.input.focus();
        return;
      }
      if (!/^[a-zA-Z]+$/.test(word)) {
        this.alert("La parola deve contenere solo lettere", "Errore");
        this.overlay.input.focus();
        return;
      }

      this.send("CHOOSE_WORD", {word});
      this.closeOverlay();
    },
    keyClick(key) {
      if (key.guessed || this.game.turn.player !== this.player.id) {
        return;
      }
      this.game.turn.player = -1; // block everything
      // revert after 5 seconds
      setTimeout(() => {
        if (this.game.turn.player === -1) {
          this.game.turn.player = this.player.id;
        }
      }, 5000);

      key.guessed = true;

      this.send("CHOOSE_LETTER", {letter: key.letter});
    },
    // aggiorna le parti del corpo dell'omino o chiude il gioco se non ha più vite
    checkGameOver() {
      if (this.lives < 0) {
        this.openOverlay("GameOver, Giocatore 2");
        return;
      }
      switch (this.lives) {
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
    },
    // se tutte le lettere della parola sono state indovinate il gioco finisce
    // e il giocatore 2 vince
    checkHasWon() {
      for (let l of this.game.letters) {
        if (!l.guessed) {
          return;
        }
        this.openOverlay("Hai vinto, Giocatore 2");
      }
    },
    voteToStart() {
      // allow vote only if there is more than one player
      if (this.players.length > 1) {
        this.disableStartVote = true;
        this.send("START_VOTE");
      }
    },
    openOverlay(title, content = null, input = null) {
      this.overlay.show = true;
      this.overlay.title = title;
      this.overlay.content = content;
      if (input && typeof input === "object") {
        this.overlay.showInput = true;
        this.overlay.input = input;
      } else {
        this.overlay.showInput = false;
        this.overlay.input = {};
      }
    },
    closeOverlay() {
      this.overlay.show = false;
      this.overlay.title = null;
      this.overlay.content = null;
      this.overlay.showInput = false;
      this.overlay.input = {};
    },
    connectWS() {
      const secure = window.location.protocol !== "http:";
      ws = new WebSocket((secure ? "wss://" : "ws://") + window.location.host);
      ws.addEventListener("error", () => {
        this.alert("Errore di connessione al server");
      });
      ws.addEventListener("close", () => {
        this.alert("Disconnesso dal server, mi sto riconnettendo");
        setTimeout(this.connectWS, 1000);
      });
      ws.addEventListener("open", () => {
        // chiedi al giocatore di inserire il proprio nickname
        this.openOverlay("Scegli il tuo nickname:", null, {
          value: "",
          placeholder: "Pippo",
          label: "Nickname",
          required: true,
          minLength: 2,
          buttonText: "Entra",
          onSend: () => {
            let nickname = this.overlay.input.value.trim();
            if (nickname.length < 2) {
              this.alert("Il nickname deve essere lungo 2 o più caratteri", "Riprova");
              this.$refs.overlayInput.focus();
              return;
            }

            this.send("JOIN", {nickname});
          }
        });
      });
      ws.addEventListener("message", m => {
        let message = JSON.parse(m.data);
        switch (message.type) {
          case "ERROR":
            this.alert(message.error, "Errore");
            break;
          case "WELCOME":
            console.log("Received Welcome from Websocket server");
            break;
          case "LOG":
            console.log(message.log);
            break;
          case "GAME":
            this.game = message.game;
            break;
          case "KEYBOARD":
            this.keyboard = message.keyboard;
            break;
          case "JOINED":
            console.log("Joined successfully");
            this.player = message.player;
            this.overlay.show = false;
            break;
          case "PLAYER_INFO":
            this.player = message.player;
            break;
          case "PLAYERS":
            this.players = message.players;
            break;
        }
      });
    },
    handleGameStatus() {
      switch (this.game.status) {
        case GameStatus.LOBBY:
          console.log("Game Status: LOBBY");
          this.showLobby = true;
          this.disableStartVote = false;
          break;
        case GameStatus.VOTING_PLAYER:
          console.log("Game Status: VOTING_PLAYER");
          break;
        case GameStatus.CHOOSING_WORD:
          console.log("Game Status: CHOOSING_WORD");

          if (this.player.id === this.game.chooser.id) {
            this.openOverlay(this.player.nickname + ", scegli una parola:", null, {
              value: "",
              placeholder: "Topolino",
              label: "Parola",
              required: true,
              minLength: 2,
              buttonText: "Conferma",
              onSend: this.sendWord
            });
          } else {
            this.openOverlay(this.game.chooser.nickname, "sta scegliendo la parola...");
          }
          break;
        case GameStatus.PLAYING:
          console.log("Game Status: PLAYING");
          this.overlay.show = false;
          this.showLobby = false;
          break;
        case GameStatus.ENDED:
          console.log("Game Status: ENDED");
          break;
      }
    },
    send(type, data = {}) {
      data.type = type;
      ws.send(JSON.stringify(data));
    }
  },
  watch: {
    "game.status"() {
      this.handleGameStatus();
    }
  },
  mounted() {
    this.handleGameStatus();
    this.connectWS();
  }
});

window.app = app;

Vue.component("toast", {
  props: {
    title: String,
    text: String,
    time: {type: Number, default: 5},
    hideCallback: Function
  },
  data() {
    return {
      show: false
    }
  },
  template: `<div class="toast toast-dark fade" :class="{'show': show}">
                <div class="toast-header">
                  <strong class="toast-title">{{ title }}</strong>
                  <button @click="hide" type="button" class="btn-close"></button>
                </div>
                <div class="toast-body">
                  {{ text }}
                </div>
              </div>`,
  methods: {
    hide() {
      this.show = false;
      setTimeout(() => {
        this.$emit("hidden");
      }, 200);
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 100);
    setTimeout(() => {
      this.hide();
    }, this.time * 1000 - 200);
  }
});


let keyboard = document.getElementById("keyboard");
let guessForm = document.getElementById("guess-form");

let head = document.getElementById("head");
let neck = document.getElementById("neck");
let leftArm = document.getElementById("left-arm");
let rightArm = document.getElementById("right-arm");
let waist = document.getElementById("waist");
let leftLeg = document.getElementById("left-leg");
let rightLeg = document.getElementById("right-leg");


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
    this.alert("La lunghezza della parola è diversa dalla parola da indovinare", "Ritenta");
  }
  return false;
});
