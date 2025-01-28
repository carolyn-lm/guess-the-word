// *** page elements ***

// unordered list where player's guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
//"Guess!" button
const guessButton = document.querySelector(".guess");
//text input to guess a letter
const guessInput = document.querySelector(".letter");
//paragraph with word in progress
const wordDisplay = document.querySelector(".word-in-progress");
//paragraph where the remaining guesses will display
const remainingGuesses = document.querySelector(".remaining");
//span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
//paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//play again button (hidden)
const playAgainButton = document.querySelector(".play-again");

//word to guess
const word = "magnolia";

//reset word-in-progress to circles
const resetWordDisplay = function (word) {
    let wordLetters = [];
    for (let letter of word) {
        wordLetters.push("●");
    }
    wordDisplay.innerText = wordLetters.join("");
};

resetWordDisplay(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const userInput = guessInput.value;
    console.log(userInput);
    guessInput.value = "";

});