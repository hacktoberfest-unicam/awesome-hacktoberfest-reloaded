import Game from "./modules/Game.js";
import GameStatus from "./modules/GameStatus.js";
import Player from "./modules/Player.js";
import Toast from "./components/Toast.js";
import Overlay from "./components/Overlay.js";
import SidebarPlayer from "./components/SidebarPlayer.js";

// websocket
let ws;

const app = new Vue({
  el: "#app",
  components: {Toast, Overlay, SidebarPlayer},
  data: {
    alerts: [],
    overlay: {
      show: false,
      title: "",
      content: "",
      html: null
    },
    game: new Game(),
    showLobby: false,
    disableStartVote: false,
    hasJoined: false,
    players: [],
    player: new Player(-1),
    keyboard: [],
    guessInput: ""
  },
  computed: {
    spectating() {
      return !this.hasJoined && this.game.status === GameStatus.PLAYING;
    }
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
        this.$refs.overlay.focusInput();
        return;
      }
      if (!/^[a-zA-Z]+$/.test(word)) {
        this.alert("La parola deve contenere solo lettere", "Errore");
        this.$refs.overlay.focusInput();
        return;
      }

      this.send("CHOOSE_WORD", {word});
      this.closeOverlay();
    },
    keyClick(key) {
      if (key.guessed || this.game.turn.player !== this.player.id) {
        return;
      }
      this.lockTurn();

      key.guessed = true;

      this.send("CHOOSE_LETTER", {letter: key.letter});
    },
    guessWord() {
      if (this.game.turn.player !== this.player.id) {
        return;
      }
      let word = this.guessInput.trim().toUpperCase();
      if (word.length !== this.game.letters.length) {
        this.alert("La lunghezza della parola è diversa dalla parola da indovinare", "Ritenta");
        return;
      }
      this.lockTurn();
      this.send("GUESS_WORD", {word});
    },
    voteToStart() {
      // allow vote only if there is more than one player
      if (this.players.length > 1) {
        this.disableStartVote = true;
        this.send("START_VOTE");
      }
    },
    lockTurn() {
      // block everything
      this.game.turn.player = -1;
      // revert after 5 seconds
      setTimeout(() => {
        if (this.game.turn.player === -1) {
          this.alert("Si è verificato un errore", "Riprova");
          this.game.turn.player = this.player.id;
        }
      }, 5000);
    },
    openOverlay(title, content = null, input = null) {
      this.overlay.show = true;
      this.overlay.title = title;
      this.overlay.html = null;
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
      try {
        ws = new WebSocket((secure ? "wss://" : "ws://") + window.location.host);

        ws.addEventListener("error", () => {
          console.error("WebSocket Error");
        });
        ws.addEventListener("close", () => {
          this.hasJoined = false;
          this.alert("Disconnesso dal server, mi sto riconnettendo");
          setTimeout(this.connectWS, 1000);
        });
        ws.addEventListener("open", () => {
          this.hasJoined = false;
          console.log("Connected to Websocket");
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
              if (!this.hasJoined) {
                this.askNickname();
              }
              break;
            case "KEYBOARD":
              this.keyboard = message.keyboard;
              break;
            case "JOINED":
              console.log("Joined successfully");
              this.player = message.player;
              this.overlay.show = false;
              this.hasJoined = true;
              break;
            case "PLAYER_INFO":
              this.player = message.player;
              break;
            case "PLAYERS":
              this.players = message.players;
              break;
            case "WIN":
            case "LOST":
              if (message.type === "WIN") {
                this.openOverlay("La parola è stata indovinata!", "Complimenti ai giocatori, la parola era:");
              } else {
                this.openOverlay("GAME OVER!", "La parola era:");
              }
              let divs = [];
              for (let letter of message.word) {
                divs.push(`<div class="word-letter">${letter}</div>`);
              }
              this.overlay.html = `<div class="end-screen-word">${divs.join("\n")}</div>`;
              break;
          }
        });
      } catch (error) {
        this.alert("Errore di connessione al server");
      }
    },
    askNickname() {
      console.log("Asking for a nickname");
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
            this.$refs.overlay.focusInput();
            return;
          }

          this.send("JOIN", {nickname});
        }
      });
    },
    handleGameStatus() {
      switch (this.game.status) {
        case GameStatus.LOBBY:
          console.log("Game Status: LOBBY");
          this.showLobby = true;
          this.disableStartVote = false;
          if (this.hasJoined) {
            this.overlay.show = false;
          }
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
          this.alert("Tra 10 secondi inizia una nuova partita...", "Il gioco è terminato");
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
    },
    "game.turn.player"() {
      this.guessInput = "";
    }
  },
  mounted() {
    this.handleGameStatus();
    this.connectWS();
  }
});

window.app = app;
