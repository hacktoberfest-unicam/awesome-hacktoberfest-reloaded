let overlay = document.getElementById("overlay");
let overlayTitle = document.getElementById("overlay-title");
let overlayContent = document.getElementById("overlay-content");
let wordContainer = document.getElementById("word-container");
let livesText = document.getElementById("lives");
let keyboard = document.getElementById("keyboard");

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

overlayTitle.innerText = "Giocatore 1, scegli una parola:"
overlayContent.innerHTML = `
    <br>
    <br>
    <div class="flex">
      <div class="input-group">
        <input type="input" placeholder="Topolino" id="word-input" required />
        <label for="word-input" class="input-label">Parola</label>
      </div>
      <button onclick="setWord()">Conferma</button>
    </div>`;


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

function updateLives() {
  livesText.innerText = `${lives}/${totalLives}`;
}

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

function checkHasWon() {
  for (let l of letters) {
    if (!l.guessed) {
      return;
    }
  }
  openOverlay("Hai vinto, Giocatore 2");
}

function openOverlay(title, content) {
  overlay.classList.remove("hide");
  overlayTitle.innerText = title;
  overlayContent.innerText = content ? content : "";
}
