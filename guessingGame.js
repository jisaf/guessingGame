/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber, 
    guessArray = [],
    guessCount = 0;
var item = generateWinningNumber(0,820);
console.log(item);

/* **** Guessing Game Functions **** */

// Generate the Winning Number
//refactor to close winningNumber to remove it as a global variable
function generateWinningNumber(){
	var rand = function getRandomInt(min, max) { // function to generate a random whole number between the two attributes
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    var index = rand(0,820); // set index to the result of the function. REFACTOR FOR CLOSURE
    var item = items[index]; // find item at that index in the items array
	winningNumber = +item.rounded_price // set the winning number to the rounded price of the item object, +make it a number
	console.log(item.image_src);
	return item;

}
//item = generateWinningNumber(0,820);

// Fetch the Players Guess

function playersGuessSubmission(e){
	// add code here
	e.preventDefault();
	playersGuess = +$("#guess").val();
	$("#guess").val("");
	checkGuess(playersGuess, winningNumber);
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
		$("#hilo"+guessArray.length).text("Hot")
}

// Check if the Player's Guess is the winning number 

function checkGuess(guess, actual){
	// add code here
	for (var i = -1 ; i < guessArray.length ; i++){ // check if already guessed that number
		if (guessArray[i] === guess){
			alert("Try again, you've already guessed "+guess);
			return;
		};
	}
	guessArray.push(guess); //add guess to the array to store it
	guessCount++; // increment guessCount so they can't go over 5
	$("#guess"+guessArray.length).text(guess);//insert guess into results box
	if (guessCount >= 5 && guess != actual) {
		alert("Sorry, you lost! The actual price is " + winningNumber);
	} else if (guess === actual) {
		alert("Winner!");
	}
	console.log(guessCount);



	//fun with closures below - clearly no idea what I'm doing here.
	// function addGuess(guess){
	// 	var guessArr = [];
	// 	var guessPush = function (guess) {
	// 		guessArr.push(guess);
	// 		return console.log(guessArr);
	// 	};
	// 	return guessPush;
	// };
	// var guess = addGuess;
	// guess(guess);
	
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
	$("#guess_btn").on("click", playersGuessSubmission);
	$("#item-image").attr("src", item.image_src); //update the item image
$("#item-name").text(item.title);
	// $("#item-image").on("click", function(){
	// 		$(this).find("img").attr("src", item.image_src); //update the item image

	// });
});

