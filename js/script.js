// *** page elements ***

// unordered list where player's guessed letters will appear
const guessedLettersList = document.querySelector(".guessed-letters");
//"Guess!" button
const guessButton = document.querySelector(".guess");
//text input to guess a letter
const guessInput = document.querySelector(".letter");
//paragraph with word in progress
const wordDisplay = document.querySelector(".word-in-progress");
//paragraph where the remaining guesses will display
const remainingGuessesDisplay = document.querySelector(".remaining");
//span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
//paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//play again button (hidden)
const playAgainButton = document.querySelector(".play-again");

// *** other global variables ***

//word to guess
let word = "magnolia";
//list of letters guessed
let guessedLetters = [];
//number of remaining guesses
let remainingGuesses = 8;

//Get a word to guess
const getWord = async function () {
    //Get data from text file
    const data = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    //convert to text
    const textData = await data.text();
    //convert to array
    const wordArray = textData.split("\n");
    //get random index
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    //save word to guess using random index
    word = wordArray[randomIndex].trim();
    //set placeholders
    resetWordDisplay(word);
};

//Call getWord to start the game
getWord();

//Set placeholders for each letter in the word
const resetWordDisplay = function (word) {
    let wordLetters = [];
    for (let letter of word) {
        wordLetters.push("●");
    }
    wordDisplay.innerText = wordLetters.join("");
};

//Guess Button event handler
guessButton.addEventListener("click", function (e) {
    e.preventDefault();

    //Get user guess
    const userInput = guessInput.value;
    //verify guess is valid
    const validatedInput = validateInput(userInput);
    //if valid, then make a guess
    if (validatedInput) {
        makeGuess(validatedInput);
    }
    //reset text input
    guessInput.value = "";
});

//Verifies guess from text input is valid (a single letter)
//Returns letter guessed if valid, otherwise undefined
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        //no value in input
        message.innerText = "Please enter a letter from A to Z";
    } else if (input.length > 1) {
        //entered more than one letter
        message.innerText = "Please enter a letter from A to Z";
    } else if (input.match(acceptedLetter) === null) {
        //not a letter
        message.innerText = "Please enter a letter from A to Z";
    } else {
        //valid guess, return
        return input;
    }
};


//Make sure this is a new guess and then update display
const makeGuess = function (guess) {
    //make sure guess is uppercase
    const newGuess = guess.toUpperCase();
    //check if user already guessed this letter
    if (guessedLetters.includes(newGuess)) {
        message.innerText = "You've already guessed that letter, try again.";
    } else {
        //new guess, save to list of letters guessed and update display
        guessedLetters.push(newGuess);
        checkGuess(newGuess);
        updateLettersGuessed();
        updateWord(guessedLetters);
    }

};

//display list of all letters guessed so far
const updateLettersGuessed = function () {
    guessedLettersList.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};

//update word display to show any correctly guessed letters
const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const updatedWordArray = [];

    //create new array of letters which contains any correctly guessed letters and placeholders for those not yet guessed
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            //guess is in word, display
            updatedWordArray.push(letter);
        } else {
            //otherwise, keep the placeholder
            updatedWordArray.push("●");
        }
    }

    //update display of word, convert updatedWordArray to a string
    wordDisplay.innerText = updatedWordArray.join("");
    checkForWin();

};

const checkGuess = function (guess) {
    //check if guess is in the word and update message to user
    const wordToGuess = word.toUpperCase();
    if (wordToGuess.includes(guess)) {
        message.innerText = `Good guess! The word has the letter ${guess}`;
    } else {
        message.innerText = `Sorry, the word does not contain ${guess}. Try again!`;
        //decrease number of guesses left
        remainingGuesses -= 1;
    }

    //Check how many guesses remaining
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over. The word was <span class="highlight">${wordToGuess}</span>`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = "1 guess";
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }

};

//Check if they have guessed all the letters
const checkForWin = function () {
    //see if word displayed matches the original word
    if (wordDisplay.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesDisplay.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    //Remove win class
    message.classList.remove("win");
    //reset message & list of guessed letters
    message.innerText = "";
    guessedLettersList.innerHTML = "";
    guessedLetters = [];
    //reset guesses to 8
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = "8 guesses";

    //Show guess button, message, and letters guessed
    guessButton.classList.remove("hide");
    remainingGuessesDisplay.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
    //hide play again button
    playAgainButton.classList.add("hide");

    //get new word
    getWord();
});