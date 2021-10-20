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

let letters = [];

let lives = 6;
let totalLives = lives;
updateLives();

// chiedi al giocatore 1 di inserire una parola
overlayTitle.innerText = "Giocatore 1, scegli una parola:"
overlayContent.innerHTML = `
    <br>
    <br>
    <div class="flex">
      <div class="input-group">
        <input type="text" placeholder="Topolino" id="word-input" required />
        <label for="word-input" class="input-label">Parola</label>
      </div>
      <button onclick="setWord()">Conferma</button>
    </div>`;


// imposta le lettere sulla pagina
function setWord() {
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

  wordContainer.innerHTML = "";
  letters = [];

  for (let c of word) {
    let wordLetter = document.createElement("div");
    wordLetter.classList.add("word-letter");

    wordContainer.appendChild(wordLetter);
    letters.push({
      letter: c,
      guessed: false,
      element: wordLetter
    });
  }

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
