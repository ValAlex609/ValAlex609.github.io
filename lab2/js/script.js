//event listeners
document.querySelector("#guessButton").addEventListener("click", guess)

let randomNumber = Math.floor(Math.random() * 99 + 1)

function guess(){
    let userGuess= document.querySelector("#userGuess").value;
    //"value" is ONLY for input elements
    //alert(userGuess);
    document.querySelector("#userGuesses").textContent += userGuess + " ";
    document.querySelector("#userGuesses").textContent += `${userGuess}`;
    document.querySelector("#userGuessses").style.color = "red";
    document.querySelector("#userGuessses").style.backgroundColor = "yellow";
    if (userGuess > randomNumber)
    {

    }
}