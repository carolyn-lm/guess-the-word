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
const remainingGuesses = document.querySelector(".remaining");
//span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
//paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//play again button (hidden)
const playAgainButton = document.querySelector(".play-again");

//word to guess
const word = "magnolia";
//list of letters guessed
const guessedLetters = [];

//reset word-in-progress to circles
const resetWordDisplay = function (word) {
    let wordLetters = [];
    for (let letter of word) {
        wordLetters.push("●");
    }
    wordDisplay.innerText = wordLetters.join("");
};

resetWordDisplay(word);

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
        message.innerText = "Please enter a letter from A to Z (1)";
    } else if (input.length > 1) {
        //entered more than one letter
        message.innerText = "Please enter a letter from A to Z (2)";
    } else if (input.match(acceptedLetter) === null) {
        //not a letter
        message.innerText = "Please enter a letter from A to Z (3)";
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
        updateLettersGuessed();
        updateWord(guessedLetters);
    }

};

//display list of all letters guessed so far
const updateLettersGuessed = function () {
    guessedLettersList.innerHTML = "";
    for (let letter of guessedLetters) {
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
    for (let letter of wordArray) {
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

//Check if they have guessed all the letters
const checkForWin = function () {
    //see if word displayed matches the original word
    if (wordDisplay.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
    }
};