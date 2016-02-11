/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber, 
    guessArray = [],
    lastDistance; // refactor to use guessArray, we already have this info.
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
	$("#result").attr("class", "alert").hide();
	checkGuess(playersGuess, winningNumber);

}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
	var distance = playersGuess - winningNumber; // how far were they?
	if (guessArray.length < 2) {
		distance = 0; 
	} else {
		distance = playersGuess - winningNumber
	}
	console.log("distance ", distance);
	console.log("difference ", lastDistance-distance);
	


//refactor below into guessMessage();
	var nearfar = "you can always guess again" // if no lastDistance, don't know if closer or farther so be generic


	if (lastDistance) {// if last distance exists, use it to set a new nearfar response
		if ((Math.abs(lastDistance) - Math.abs(distance)) > 0) {
			nearfar = "but you're getting closer!";
			$("#guess"+guessArray.length).addClass("alert alert-success");
		} else if ((Math.abs(lastDistance) - Math.abs(distance)) < 0) {
			nearfar = "and you're getting farther away...";
			$("#guess"+guessArray.length).addClass("alert alert-danger");
		}
	}
	if (!lastDistance && distance > 0) { // distance === 0 already handled in checkGuess
		lastDistance = distance;
		return "Good first guess, try coming down a bit though"
	} else if (!lastDistance && distance < 0) {
		lastDistance = distance;
		return "Good first guess, try going up a bit though"
	} else if (Math.abs(distance) < 5){
		lastDistance = distance;
		return "You're REALLY close!"
	} else if (Math.abs(distance) > 100){
		lastDistance = distance;
		return "Yeah...you don't really know what things cost do you?"
	} else if (Math.abs(distance) > 50){
		lastDistance = distance;
		return "You're pretty far off, "+ nearfar;
	} else if (Math.abs(distance) > 10){
		lastDistance = distance;
		return "You're more than $10 off " + nearfar;
	} else if (Math.abs(distance) > 5){
		lastDistance = distance;

		return "So so close...more than $5 off " + nearfar;
	}

}

// Check if the Player's Guess is the winning number 

function checkGuess(guess, actual){
	// add code here
	for (var i = -1 ; i < guessArray.length ; i++){ // check if already guessed that number
		if (guessArray[i] === guess) {
			$("#result").text("Try again, you've already guessed "+guess).addClass("alert-warning").show();
			return;
		};
	}
	guessArray.push(guess); //add guess to the array to store it
	$("#guess"+guessArray.length).text(guess);//insert guess into results box
	if (guessArray.length >= 5 && guess != actual) {
		$("#result").text("Sorry, you lost! The actual price is " + winningNumber).addClass("alert-danger").show();
		$("#guess"+guessArray.length).addClass("alert alert-danger");
	} else if (guess === actual) {
		$("#result").text("Winner!").addClass("alert-success").show();
		$("#guess"+guessArray.length).addClass("alert alert-success");
		$("#guess_btn").hide();
		$("#new_btn").show();
	} else {
		$("#result").text(lowerOrHigher()).addClass("alert-info").show();
	}



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
	$("#new_btn").on("click", playAgain);
	// $("#item-image").on("click", function(){
	// 		$(this).find("img").attr("src", item.image_src); //update the item image

	// });
});

