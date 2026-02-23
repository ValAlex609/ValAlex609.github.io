const wordList = [
  { word: "javascript", hint: "A popular programming language for the web", specificHint: "It runs in your browser and makes websites interactive" },
  { word: "elephant", hint: "The largest land animal on Earth", specificHint: "It has a long trunk, big ears, and gray skin" },
  { word: "keyboard", hint: "You use this every day at a computer", specificHint: "It has keys for every letter, number, and symbol" },
  { word: "mountains", hint: "Very tall natural landforms", specificHint: "Think Everest, the Alps, or the Rockies" },
  { word: "umbrella", hint: "Keeps you dry in the rain", specificHint: "It opens up and you hold it above your head" },
  { word: "library", hint: "A building you visit to read or borrow things", specificHint: "You can borrow books here for free with a card" },
  { word: "compass", hint: "Used for navigation and direction", specificHint: "Its needle always points North" },
  { word: "pineapple", hint: "A tropical fruit", specificHint: "It's spiky on the outside, sweet and yellow on the inside" },
  { word: "astronaut", hint: "A person with a very high-flying career", specificHint: "They train at NASA and wear a spacesuit" },
  { word: "lightning", hint: "Something you see during a storm", specificHint: "It's a giant spark of electricity from the sky" },
  { word: "treasure", hint: "Something valuable that is hidden away", specificHint: "Pirates are famous for burying this" },
  { word: "volcano", hint: "A geological landform", specificHint: "It can erupt and spew lava from its top" },
  { word: "dolphin", hint: "A sea creature known for being clever", specificHint: "It's a mammal, not a fish, and loves to leap out of water" },
  { word: "blanket", hint: "Something you find on a bed", specificHint: "You wrap yourself in it to stay warm" },
  { word: "notebook", hint: "A common school or office supply", specificHint: "It has lined pages you write notes on" },
];

const MAX_WRONG = 6;
const SPECIFIC_HINT_THRESHOLD = 5;

let selectedWord = "";
let selectedHint = "";
let selectedSpecificHint = "";
let guessedLetters = [];
let wrongCount = 0;
let gameOver = false;

const wordDisplay = document.getElementById("word-display");
const keyboard = document.getElementById("keyboard");
const messageEl = document.getElementById("message");
const wrongLettersEl = document.getElementById("wrong-letters");
const hintArea = document.getElementById("hint-area");
const livesCounter = document.getElementById("lives-counter");
const restartBtn = document.getElementById("restart-btn");

function pickRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

function updateHintDisplay() {
  if (wrongCount >= SPECIFIC_HINT_THRESHOLD) {
    hintArea.innerHTML = `<span class="hint-label">Hint:</span> ${selectedHint}<br><span class="hint-extra">Extra hint: ${selectedSpecificHint}</span>`;
  } else {
    hintArea.innerHTML = `<span class="hint-label">Hint:</span> ${selectedHint}`;
  }

  const livesLeft = MAX_WRONG - wrongCount;
  const lifeWord = livesLeft === 1 ? "life" : "lives";
  livesCounter.textContent = `${livesLeft} ${lifeWord} left`;

  if (livesLeft <= 1) {
    livesCounter.style.color = "red";
  } else if (livesLeft <= 3) {
    livesCounter.style.color = "darkorange";
  } else {
    livesCounter.style.color = "black";
  }
}

function renderWordDisplay() {
  wordDisplay.innerHTML = "";
  for (let i = 0; i < selectedWord.length; i++) {
    const letterBox = document.createElement("div");
    letterBox.classList.add("letter-box");
    if (guessedLetters.includes(selectedWord[i])) {
      letterBox.textContent = selectedWord[i];
      letterBox.style.color = "green";
    }
    wordDisplay.appendChild(letterBox);
  }
}

function buildKeyboard() {
  keyboard.innerHTML = "";
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < alphabet.length; i++) {
    const letter = alphabet[i];
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.classList.add("key");
    btn.setAttribute("data-letter", letter);
    btn.addEventListener("click", function () {
      handleGuess(letter);
    });
    keyboard.appendChild(btn);
  }
}

function handleGuess(letter) {
  if (gameOver || guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);
  const btn = keyboard.querySelector(`[data-letter="${letter}"]`);

  if (selectedWord.includes(letter)) {
    btn.classList.add("correct");
    btn.disabled = true;
    renderWordDisplay();
    checkWin();
  } else {
    btn.classList.add("wrong");
    btn.disabled = true;
    wrongCount++;
    wrongLettersEl.textContent = guessedLetters
      .filter(l => !selectedWord.includes(l))
      .join(", ");
    updateHintDisplay();
    checkLoss();
  }
}

function checkWin() {
  const allGuessed = selectedWord.split("").every(l => guessedLetters.includes(l));
  if (allGuessed) {
    messageEl.textContent = "You won!";
    messageEl.className = "win";
    document.getElementById("container").style.backgroundColor = "#efffef";
    disableKeyboard();
    gameOver = true;
  }
}

function checkLoss() {
  if (wrongCount >= MAX_WRONG) {
    messageEl.textContent = `Game over! The word was: ${selectedWord}`;
    messageEl.className = "lose";
    document.getElementById("container").style.backgroundColor = "#fff0f0";
    revealWord();
    disableKeyboard();
    gameOver = true;
  }
}

function revealWord() {
  wordDisplay.innerHTML = "";
  for (let i = 0; i < selectedWord.length; i++) {
    const letterBox = document.createElement("div");
    letterBox.classList.add("letter-box");
    letterBox.textContent = selectedWord[i];
    if (guessedLetters.includes(selectedWord[i])) {
      letterBox.style.color = "green";
    } else {
      letterBox.style.color = "red";
    }
    wordDisplay.appendChild(letterBox);
  }
}

function disableKeyboard() {
  const allKeys = keyboard.querySelectorAll(".key");
  allKeys.forEach(btn => {
    btn.disabled = true;
  });
}

function startGame() {
  guessedLetters = [];
  wrongCount = 0;
  gameOver = false;

  document.getElementById("container").style.backgroundColor = "white";
  messageEl.textContent = "";
  messageEl.className = "";
  wrongLettersEl.textContent = "";

  const picked = pickRandomWord();
  selectedWord = picked.word;
  selectedHint = picked.hint;
  selectedSpecificHint = picked.specificHint;

  updateHintDisplay();
  renderWordDisplay();
  buildKeyboard();
}

restartBtn.addEventListener("click", function () {
  startGame();
});

document.addEventListener("keydown", function (e) {
  const letter = e.key.toLowerCase();
  if (letter.length === 1 && letter >= "a" && letter <= "z") {
    handleGuess(letter);
  }
});

startGame();