//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let gamesWon = 0;
let gamesLost = 0;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";
  
   //showing the Guess button
   document.querySelector("#guessBtn").style.display = "inline";

   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus(); //adding focus to textbox
   playerGuess.value = ""; //clearing the textbox

   let feedback = document.querySelector("#feedback");
   feedback.textContent = ""; //clearing the feedback

   //clearing previous guesses
   document.querySelector("#guesses").textContent = "";
}

function checkGuess()
{
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    
    if (guess < 1 || guess > 99) 
    {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }
    
    attempts++;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    
    if (guess == randomNumber)
    {
        feedback.textContent = "You Won!! You guessed it in " + attempts + " attempt(s)!";
        feedback.style.color = "darkgreen";
        gamesWon++;
        updateStats();
        gameOver();
    } else
    {
        document.querySelector("#guesses").textContent += guess + " ";
        
        if (attempts >= 7)
        {
            feedback.textContent = "Sorry, you lost! The number was " + randomNumber;
            feedback.style.color = "red";
            gamesLost++;
            updateStats();
            gameOver();
        } else if (guess > randomNumber)
        {
            feedback.textContent = "Guess was too high";
        } else
        {
            feedback.textContent = "Guess was too low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //hides Guess button
    resetBtn.style.display = "inline"; //shows Reset button
}

function updateStats() {
     console.log("updateStats called! gamesWon:", gamesWon, "gamesLost:", gamesLost);
    document.querySelector("#gamesWon").textContent = gamesWon;
    document.querySelector("#gamesLost").textContent = gamesLost;
}